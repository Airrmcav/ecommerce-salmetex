import { ImageResponse } from "next/og";
import { getCategoryFromProducts } from "@/lib/category-data";

export async function generateImageMetadata({
  params,
}: {
  params: Promise<{ categorySlug: string }>;
}) {
  const { categorySlug } = await params;
  const category = await getCategoryFromProducts(categorySlug);
  const name = category?.categoryName ?? "Categoría";
  const displaySlug = categorySlug === "todos" ? "Todos los Equipos" : name;

  return [
    {
      id: "og-category",
      size: { width: 1200, height: 630 },
      alt: `${displaySlug} | Salmetexmed`,
      contentType: "image/png",
    },
  ];
}

export default async function Image({
  params,
}: {
  params: Promise<{ categorySlug: string }>;
}) {
  const { categorySlug } = await params;
  const category = await getCategoryFromProducts(categorySlug);
  const displayName = category?.categoryName ?? "Categoría";
  const displaySlug = categorySlug === "todos" ? "Todos los Equipos Médicos" : displayName;

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#0f172a",
          fontFamily: "Inter, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            height: "100%",
            width: "100%",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              padding: "56px 64px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              background: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #0f172a 100%)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "-80px",
                right: "-80px",
                width: "400px",
                height: "400px",
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(29,78,216,0.3) 0%, transparent 70%)",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: "-100px",
                left: "-100px",
                width: "500px",
                height: "500px",
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(29,78,216,0.2) 0%, transparent 70%)",
              }}
            />

            <div style={{ position: "relative", zIndex: 1 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  marginBottom: "24px",
                }}
              >
                <div
                  style={{
                    backgroundColor: "#1d4ed8",
                    padding: "6px 16px",
                    borderRadius: "9999px",
                    fontSize: "14px",
                    fontWeight: "700",
                    color: "#ffffff",
                    letterSpacing: "1px",
                  }}
                >
                  EQUIPO MÉDICO
                </div>
                <div
                  style={{
                    backgroundColor: "rgba(255,255,255,0.1)",
                    padding: "6px 16px",
                    borderRadius: "9999px",
                    fontSize: "14px",
                    color: "#94a3b8",
                  }}
                >
                  México
                </div>
              </div>

              <h1
                style={{
                  fontSize: "56px",
                  fontWeight: "800",
                  color: "#ffffff",
                  lineHeight: "1.1",
                  margin: "0 0 24px 0",
                  maxWidth: "800px",
                }}
              >
                {displaySlug}
              </h1>

              <p
                style={{
                  fontSize: "22px",
                  color: "#94a3b8",
                  lineHeight: "1.5",
                  margin: "0 0 40px 0",
                  maxWidth: "600px",
                }}
              >
                {categorySlug === "todos"
                  ? "Más de 1,000 equipos médicos certificados con envío a todo México"
                  : `Equipos especializados en ${displayName.toLowerCase()} con calidad certificada`}
              </p>

              <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    backgroundColor: "rgba(255,255,255,0.08)",
                    padding: "12px 20px",
                    borderRadius: "12px",
                  }}
                >
                  <span style={{ fontSize: "20px" }}>✅</span>
                  <span style={{ color: "#e2e8f0", fontSize: "16px", fontWeight: "500" }}>
                    COFEPRIS
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    backgroundColor: "rgba(255,255,255,0.08)",
                    padding: "12px 20px",
                    borderRadius: "12px",
                  }}
                >
                  <span style={{ fontSize: "20px" }}>🚚</span>
                  <span style={{ color: "#e2e8f0", fontSize: "16px", fontWeight: "500" }}>
                    Envío nacional
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    backgroundColor: "rgba(255,255,255,0.08)",
                    padding: "12px 20px",
                    borderRadius: "12px",
                  }}
                >
                  <span style={{ fontSize: "20px" }}>💬</span>
                  <span style={{ color: "#e2e8f0", fontSize: "16px", fontWeight: "500" }}>
                    Asesoría WhatsApp
                  </span>
                </div>
              </div>

              <div
                style={{
                  marginTop: "48px",
                  paddingTop: "32px",
                  borderTop: "1px solid rgba(255,255,255,0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <span
                  style={{
                    fontSize: "24px",
                    fontWeight: "800",
                    color: "#1d4ed8",
                    letterSpacing: "-0.5px",
                  }}
                >
                  SALMETEXMED
                </span>
                <span style={{ fontSize: "16px", color: "#64748b" }}>
                  salmetexmed.com.mx
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}