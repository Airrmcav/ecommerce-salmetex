import { ImageResponse } from "next/og";
import { cache } from "react";
import { formatPrice } from "@/lib/formatPrice";

const getProductForOg = cache(async (slug: string) => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    if (!baseUrl) return null;
    const query =
      `fields[0]=productName` +
      `&fields[1]=price` +
      `&fields[2]=active` +
      `&populate[images][fields][0]=url` +
      `&populate[category][fields][0]=categoryName` +
      `&filters[slug][$eq]=${slug}`;
    const res = await fetch(`${baseUrl}/api/products?${query}`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json?.data?.[0] ?? null;
  } catch {
    return null;
  }
});

export async function generateImageMetadata({
  params,
}: {
  params: Promise<{ productSlug: string }>;
}) {
  const { productSlug } = await params;
  const product = await getProductForOg(productSlug);
  const name = product?.productName ?? "Producto";
  const price = product?.price;
  const category = product?.category?.categoryName ?? "Equipo Médico";
  const imageUrl = product?.images?.[0]?.url;

  return [
    {
      id: "og-product",
      size: { width: 1200, height: 630 },
      alt: name,
      contentType: "image/png",
    },
  ];
}

export default async function Image({
  params,
}: {
  params: Promise<{ productSlug: string }>;
}) {
  const { productSlug } = await params;
  const product = await getProductForOg(productSlug);
  const name = product?.productName ?? "Producto";
  const price = product?.price;
  const category = product?.category?.categoryName ?? "Equipo Médico";
  const imageUrl = product?.images?.[0]?.url;
  const isAvailable = product?.active !== false;

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#ffffff",
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
          {imageUrl ? (
            <div
              style={{
                width: "45%",
                height: "100%",
                backgroundColor: "#f8fafc",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
              }}
            >
              <img
                src={imageUrl}
                alt={name}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  padding: "32px",
                }}
              />
            </div>
          ) : (
            <div
              style={{
                width: "45%",
                height: "100%",
                backgroundColor: "#1e3a5f",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span style={{ fontSize: "120px" }}>🏥</span>
            </div>
          )}

          <div
            style={{
              width: "55%",
              height: "100%",
              padding: "48px 56px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              backgroundColor: "#ffffff",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "16px",
              }}
            >
              <span
                style={{
                  backgroundColor: "#1d4ed8",
                  color: "#ffffff",
                  padding: "4px 12px",
                  borderRadius: "9999px",
                  fontSize: "14px",
                  fontWeight: "600",
                }}
              >
                {category}
              </span>
              <span
                style={{
                  backgroundColor: isAvailable ? "#dcfce7" : "#fee2e2",
                  color: isAvailable ? "#166534" : "#991b1b",
                  padding: "4px 12px",
                  borderRadius: "9999px",
                  fontSize: "14px",
                  fontWeight: "600",
                }}
              >
                {isAvailable ? "Disponible" : "Agotado"}
              </span>
            </div>

            <h1
              style={{
                fontSize: price ? "36px" : "32px",
                fontWeight: "700",
                color: "#0f172a",
                lineHeight: "1.2",
                margin: "0 0 16px 0",
                maxHeight: "140px",
                overflow: "hidden",
              }}
            >
              {name}
            </h1>

            {price && (
              <div style={{ marginBottom: "24px" }}>
                <span
                  style={{
                    fontSize: "42px",
                    fontWeight: "800",
                    color: "#1d4ed8",
                  }}
                >
                  {formatPrice(price)}
                </span>
                <span
                  style={{
                    fontSize: "18px",
                    color: "#64748b",
                    marginLeft: "8px",
                  }}
                >
                  MXN · IVA incluido
                </span>
              </div>
            )}

            {!price && (
              <div
                style={{
                  fontSize: "24px",
                  color: "#64748b",
                  marginBottom: "24px",
                  fontWeight: "500",
                }}
              >
                Solicitar precio
              </div>
            )}

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                marginTop: "auto",
              }}
            >
              <div
                style={{
                  background: "linear-gradient(135deg, #16a34a 0%, #15803d 100%)",
                  borderRadius: "8px",
                  padding: "10px 16px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <span style={{ fontSize: "18px" }}>💬</span>
                <span style={{ color: "#ffffff", fontSize: "14px", fontWeight: "600" }}>
                  WhatsApp disponible
                </span>
              </div>
            </div>

            <div
              style={{
                marginTop: "24px",
                paddingTop: "16px",
                borderTop: "1px solid #e2e8f0",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <span
                style={{
                  fontSize: "16px",
                  fontWeight: "700",
                  color: "#1d4ed8",
                  letterSpacing: "-0.5px",
                }}
              >
                SALMETEXMED
              </span>
              <span style={{ fontSize: "14px", color: "#64748b" }}>
                salmetexmed.com.mx
              </span>
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