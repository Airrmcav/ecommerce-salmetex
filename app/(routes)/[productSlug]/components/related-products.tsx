"use client";

import Link from "next/link";
import { ProductType } from "@/types/product";
import { ProductCard } from "@/components/ui/product-card";

interface RelatedProductsProps {
  products: ProductType[];
  currentProductSlug: string;
}

export default function RelatedProducts({
  products,
  currentProductSlug,
}: RelatedProductsProps) {
  if (!products || products.length === 0) {
    return null;
  }

  return (
    <section className="mt-16">
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800">
          Productos Relacionados
        </h2>
        <Link
          href="/categoria/todos"
          className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
        >
          Ver todos
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {products.slice(0, 4).map((product) => (
          <ProductCard key={product.documentId} product={product} />
        ))}
      </div>
    </section>
  );
}