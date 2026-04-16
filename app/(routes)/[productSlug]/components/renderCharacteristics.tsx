// helpers/renderCharacteristics.tsx
import React from "react";

type CharacteristicsData = Record<string, unknown>;

type AccentColor = "blue" | "teal" | "amber" | "gray";

const ACCENT_COLORS: AccentColor[] = ["blue", "teal", "amber", "gray"];

const ACCENT_STYLES: Record<AccentColor, { bar: string; bg: string; stroke: string }> = {
  blue:  { bar: "#185FA5", bg: "#E6F1FB", stroke: "#185FA5" },
  teal:  { bar: "#0F6E56", bg: "#E1F5EE", stroke: "#0F6E56" },
  amber: { bar: "#854F0B", bg: "#FAEEDA", stroke: "#854F0B" },
  gray:  { bar: "var(--color-border-secondary)", bg: "#F1EFE8", stroke: "#5F5E5A" },
};

function getIcon(key: string): React.ReactNode {
  const k = key.toLowerCase();

  if (k.includes("dimensión") || k.includes("tamaño") || k.includes("medidas")) {
    return (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
      </svg>
    );
  }
  if (k.includes("peso")) {
    return (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10" />
      </svg>
    );
  }
  if (k.includes("potencia") || k.includes("voltaje") || k.includes("energía")) {
    return (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    );
  }
  if (k.includes("temperatura") || k.includes("temp")) {
    return (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    );
  }
  if (k.includes("certificación") || k.includes("certificado") || k.includes("norma")) {
    return (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    );
  }
  if (k.includes("material") || k.includes("construcción")) {
    return (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    );
  }

  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function formatLabel(key: string): string {
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (s) => s.toUpperCase())
    .trim();
}

function isPlainObject(val: unknown): val is CharacteristicsData {
  return typeof val === "object" && val !== null && !Array.isArray(val);
}

interface NestedRowsProps {
  data: CharacteristicsData;
}

function NestedRows({ data }: NestedRowsProps) {
  return (
    <div className="flex flex-col gap-1.5 mt-2">
      {Object.entries(data).map(([key, value]) => {
        if (isPlainObject(value)) {
          return (
            <div key={key} className="rounded-md bg-slate-50 border border-slate-100 px-3 py-2">
              <p className="text-xs font-medium text-slate-500 mb-1.5">{formatLabel(key)}</p>
              <NestedRows data={value as CharacteristicsData} />
            </div>
          );
        }
        return (
          <div
            key={key}
            className="flex items-center justify-between gap-3 rounded-md bg-slate-50 px-3 py-1.5"
          >
            <span className="text-xs text-slate-500 shrink-0">{formatLabel(key)}</span>
            <span className="text-xs font-medium text-slate-800 text-right">{String(value)}</span>
          </div>
        );
      })}
    </div>
  );
}

interface SpecCardProps {
  label: string;
  value: unknown;
  accentColor: AccentColor;
}

function SpecCard({ label, value, accentColor }: SpecCardProps) {
  const accent = ACCENT_STYLES[accentColor];
  const isNested = isPlainObject(value);

  return (
    <div className="rounded-xl border border-slate-200/60 bg-white overflow-hidden hover:border-slate-300 transition-colors duration-150">
      <div style={{ height: 2, background: accent.bar }} />
      <div className="px-4 py-3.5">
        <div className="flex items-center gap-2.5 mb-2.5">
          <div
            className="w-7 h-7 rounded-md flex items-center justify-center shrink-0"
            style={{ background: accent.bg, color: accent.stroke }}
          >
            {getIcon(label)}
          </div>
          <span className="text-sm font-medium text-slate-800 capitalize">
            {formatLabel(label)}
          </span>
        </div>

        {isNested ? (
          <NestedRows data={value as CharacteristicsData} />
        ) : (
          <p className="text-sm text-slate-600 bg-slate-50 rounded-md px-3 py-2 leading-relaxed">
            {String(value)}
          </p>
        )}
      </div>
    </div>
  );
}

interface RenderCharacteristicsProps {
  data: CharacteristicsData;
}

export function RenderCharacteristics({ data }: RenderCharacteristicsProps) {
  if (!isPlainObject(data)) return null;

  return (
    <div className="flex flex-col gap-2">
      {Object.entries(data).map(([key, value], index) => (
        <SpecCard
          key={key}
          label={key}
          value={value}
          accentColor={ACCENT_COLORS[index % ACCENT_COLORS.length]}
        />
      ))}
    </div>
  );
}