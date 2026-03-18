import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products?populate=*`,
      { cache: "no-store" }
    );

    const json = await res.json();
    const products = json.data;

    const baseUrl = "https://salmetexmed.com.mx";

    // 🔥 Función para limpiar CDATA
    const cdata = (str: string) => `<![CDATA[${str || ""}]]>`;

    // 🔥 Mapeo automático de categorías (nivel agencia)
    const getGoogleCategory = (categoryName: string = "") => {
      const name = categoryName.toLowerCase();

      if (name.includes("mobiliario"))
        return "Business & Industrial > Medical > Medical Furniture";

      if (name.includes("rayos") || name.includes("equipo"))
        return "Health & Beauty > Health Care > Medical Equipment";

      if (name.includes("insumos") || name.includes("desechable"))
        return "Health & Beauty > Health Care";

      return "Health & Beauty > Health Care";
    };

    // 🔥 Filtrar SOLO productos válidos
    const validProducts = products.filter(
      (p: any) =>
        p.price &&
        p.price > 0 &&
        p.images &&
        p.images.length > 0 &&
        p.images[0]?.url
    );

    const itemsXml = validProducts
      .map((product: any) => {
        const title = product.productName;
        const description = product.description || "";
        const link = `${baseUrl}/producto/${product.slug}`;

        // ✅ AQUÍ ESTÁ EL FIX IMPORTANTE
        const imageUrl = product.images[0].url;

        const category = getGoogleCategory(
          product.category?.categoryName
        );

        return `
        <item>
          <g:id>${product.id}</g:id>
          
          <g:title>${cdata(title)}</g:title>
          
          <g:description>${cdata(description)}</g:description>
          
          <g:link>${cdata(link)}</g:link>
          
          <g:image_link>${cdata(imageUrl)}</g:image_link>
          
          <g:availability>in stock</g:availability>
          
          <g:price>${product.price} MXN</g:price>
          
          <g:brand>${cdata("Salmetex")}</g:brand>
          
          <g:condition>new</g:condition>

          <g:google_product_category>${cdata(category)}</g:google_product_category>

          <g:product_type>${cdata(
            `${product.category?.categoryName || ""}, ${product.area || ""}`
          )}</g:product_type>

        </item>
        `;
      })
      .join("");

    const xml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss xmlns:g="http://base.google.com/ns/1.0" version="2.0">
  <channel>
    <title>SalmetexMed</title>
    <link>${baseUrl}</link>
    <description>Productos médicos</description>
    ${itemsXml}
  </channel>
</rss>`;

    return new NextResponse(xml, {
      headers: {
        "Content-Type": "application/xml",
      },
    });
  } catch (error) {
    console.error("Merchant Feed Error:", error);
    return new NextResponse("Error generating feed", { status: 500 });
  }
}
