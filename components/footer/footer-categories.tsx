"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Category {
  id: number;
  categoryName: string;
  slug: string;
}

export default function FooterCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
        if (!baseUrl) {
          setLoading(false);
          return;
        }

        const url = `${baseUrl}/api/categories?pagination[pageSize]=20&fields[0]=categoryName&fields[1]=slug&sort=categoryName:asc`;
        const res = await fetch(url, { next: { revalidate: 86400 } });

        if (!res.ok) {
          setLoading(false);
          return;
        }

        const json = await res.json();
        setCategories(json?.data ?? []);
      } catch (error) {
        console.error("Error fetching footer categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className="space-y-3">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-4 bg-slate-100 rounded animate-pulse w-24" />
        ))}
      </div>
    );
  }

  if (categories.length === 0) {
    return (
      <Link
        href="/categoria/todos"
        className="inline-block text-white p-3 bg-blue-600 rounded-2xl transition-colors duration-200 text-sm hover:bg-blue-700 text-center font-medium w-full"
        aria-label="Ver todos los productos"
      >
        Ver Todos los Equipos Médicos
      </Link>
    );
  }

  return (
    <ul className="space-y-3" role="list" aria-label="Categorías de productos">
      {categories.slice(0, 8).map((category) => (
        <li key={category.id}>
          <Link
            href={`/categoria/${category.slug}`}
            className="text-gray-800 hover:text-blue-400 transition-colors duration-200 text-sm hover:underline underline-offset-4"
          >
            {category.categoryName}
          </Link>
        </li>
      ))}
      <li className="pt-2">
        <Link
          href="/categoria/todos"
          className="inline-block text-white p-3 bg-blue-600 rounded-2xl transition-colors duration-200 text-sm hover:bg-blue-700 text-center font-medium w-full"
          aria-label="Ver todos los equipos médicos"
        >
          Ver Todos los Equipos Médicos
        </Link>
      </li>
    </ul>
  );
}