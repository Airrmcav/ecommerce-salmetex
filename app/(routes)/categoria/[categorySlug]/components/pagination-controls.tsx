"use client";

import { cn } from "@/lib/utils";

type SetCurrentPage = (page: number | ((prev: number) => number)) => void;

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  compactPages: (number | string)[];
  setCurrentPage: SetCurrentPage;
}

export default function PaginationControls({
  currentPage,
  totalPages,
  compactPages,
  setCurrentPage,
}: PaginationControlsProps) {
  const goToPage = (page: number) => setCurrentPage(page);

  return (
    <nav className="mt-10 flex flex-wrap items-center justify-center gap-2">
      <button
        onClick={() => goToPage(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="rounded-lg cursor-pointer border border-blue-200 bg-white px-4 py-2 text-sm text-blue-700 hover:bg-blue-50 disabled:opacity-40"
      >
        Anterior
      </button>

      {compactPages.map((item, idx) =>
        typeof item === "number" ? (
          <button
            key={`p-${item}`}
            onClick={() => goToPage(item)}
            className={cn(
              "rounded-lg border px-4 py-2 text-sm cursor-pointer",
              currentPage === item
                ? "border-blue-600 bg-blue-600 text-white"
                : "border-blue-200 bg-white text-blue-700 hover:bg-blue-50",
            )}
          >
            {item}
          </button>
        ) : (
          <span key={`e-${idx}`} className="px-2 text-gray-500">
            …
          </span>
        ),
      )}

      <button
        onClick={() => goToPage(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="rounded-lg cursor-pointer border border-blue-200 bg-white px-4 py-2 text-sm text-blue-700 hover:bg-blue-50 disabled:opacity-40"
      >
        Siguiente
      </button>
    </nav>
  );
}