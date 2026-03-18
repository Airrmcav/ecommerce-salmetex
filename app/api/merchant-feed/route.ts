import { NextResponse } from "next/server";

const BASE_URL = "https://salmetexmed.com.mx";
const API_URL =
  "https://backend-ecommerce-production-fb02.up.railway.app/api/products?populate=*";

// 🧼 limpiar texto
const clean = (text: any) => {
  if (!text) return "";
  return String(text)
    .replace(/&/g, "y")
    .replace(/</g, "")
    .replace(/>/g, "")
    .replace(/"/g, "")
    .trim();
};

// 🏷️ marca
const getBrand = (name: string) => {
  const n = name.toLowerCase();
  if (n.includes("beurer")) return "Beurer";
  if (n.includes("microgyn")) return "Microgyn";
  return "Salmetex";
};

// 🧠 detectar tipo de cliente
const getIntent = (product: any) => {
  const name = product.productName.toLowerCase();
  const area = (product.area || "").toLowerCase();

  if (
    area.includes("equipo") ||
    name.includes("rayos x") ||
    name.includes("colposcopio")
  ) {
    return "b2b";
  }

  return "paciente";
};

// 🧠 A/B testing (determinístico por ID)
const getVariant = (id: number) => {
  return id % 2 === 0 ? "A" : "B";
};

// 🧠 títulos dinámicos avanzados
const generateTitle = (product: any) => {
  const base = clean(product.productName);
  const brand = getBrand(product.productName);
  const intent = getIntent(product);
  const variant = getVariant(product.id);

  // 🔥 B2B
  if (intent === "b2b") {
    if (variant === "A") {
      return `${base} | Equipo Médico Profesional en México | Venta para Clínicas`;
    } else {
      return `${base} ${brand !== "Salmetex" ? "| " + brand : ""} | Uso Hospitalario | Cotización`;
    }
  }

  // 🧑‍⚕️ Paciente
  if (variant === "A") {
    return `${base} | Compra en México | Envío Rápido`;
  } else {
    return `${base} ${brand !== "Salmetex" ? "| " + brand : ""} | Uso en Casa | Mejor Precio`;
  }
};

// 🧠 labels inteligentes
const getCustomLabels = (product: any) => {
  const price = Number(product.price);
  const intent = getIntent(product);
  const variant = getVariant(product.id);

  let value = "bajo_valor";
  if (price > 50000) value = "alto_valor";
  else if (price > 10000) value = "medio_valor";

  return {
    label0: value, // 💰 valor
    label1: intent, // 🎯 b2b / paciente
    label2: variant, // 🧪 A/B test
  };
};

// 🧠 categoría Google
const getGoogleCategory = (area: string) => {
  const a = (area || "").toLowerCase();

  if (a.includes("mobiliario"))
    return "Business & Industrial > Medical Furniture";
  if (a.includes("equipo"))
    return "Health & Beauty > Medical Equipment";

  return "Health & Beauty > Medical Supplies";
};

export async function GET() {
  try {
    const res = await fetch(API_URL, { cache: "no-store" });
    const json = await res.json();

    const products = json.data || [];

    const filtered = products.filter(
      (p: any) => p.price && p.price > 0 && p.active
    );

    const items = filtered
      .map((product: any) => {
        try {
          const title = generateTitle(product);
          const description = clean(product.description);
          const link = `${BASE_URL}/producto/${product.slug}`;

          const imageUrl = product.images?.[0]?.url
            ? `https://backend-ecommerce-production-fb02.up.railway.app${product.images[0].url}`
            : "";

          if (!title || !imageUrl) return "";

          const brand = getBrand(product.productName);
          const category = clean(product.category?.categoryName);
          const googleCategory = getGoogleCategory(product.area);

          const { label0, label1, label2 } = getCustomLabels(product);

          return `
<item>
<g:id>${product.id}</g:id>
<g:title><![CDATA[${title}]]></g:title>
<g:description><![CDATA[${description} Disponible en México. Compra segura en Salmetex.]]></g:description>
<g:link><![CDATA[${link}]]></g:link>
<g:image_link><![CDATA[${imageUrl}]]></g:image_link>
<g:brand><![CDATA[${brand}]]></g:brand>
<g:condition>new</g:condition>
<g:availability>in stock</g:availability>
<g:price>${product.price} MXN</g:price>
<g:product_type><![CDATA[${category}]]></g:product_type>
<g:google_product_category><![CDATA[${googleCategory}]]></g:google_product_category>
<g:identifier_exists>no</g:identifier_exists>

<!-- 🔥 INTELIGENCIA -->
<g:custom_label_0><![CDATA[${label0}]]></g:custom_label_0>
<g:custom_label_1><![CDATA[${label1}]]></g:custom_label_1>
<g:custom_label_2><![CDATA[${label2}]]></g:custom_label_2>

</item>`;
        } catch {
          return "";
        }
      })
      .join("");

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss xmlns:g="http://base.google.com/ns/1.0" version="2.0">
<channel>
<title>SalmetexMed</title>
<link>${BASE_URL}</link>
<description>Productos médicos</description>
${items}
</channel>
</rss>`;

    return new NextResponse(xml, {
      headers: { "Content-Type": "application/xml" },
    });
  } catch {
    return NextResponse.json({ error: "feed error" }, { status: 500 });
  }
}