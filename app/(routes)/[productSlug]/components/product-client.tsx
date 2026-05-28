"use client";

import Breadcrumb from "@/components/BreadCrumbs";

import CarouselProduct from "./carousel-product";
import InfoProduct from "./info-product";
import SkeletonProduct from "./skeleton-product";

import { RenderCharacteristics } from "./renderCharacteristics";

import { ProductType } from "@/types/product";

interface ProductClientProps {
  product: ProductType | null;
}

export default function ProductClient({
  product,
}: ProductClientProps) {
  if (!product) {
    return <SkeletonProduct />;
  }

  const area = product.area ?? "";

  const breadcrumbItems = [
    {
      label: "Inicio",
      href: "/",
    },

    {
      label: area,
      href: `/categoria/todos?area=${encodeURIComponent(
        area,
      )}`,
    },

    {
      label:
        product.category
          ?.categoryName || "Categoría",

      href: `/categoria/${
        product.category?.slug
      }`,
    },

    {
      label: product.productName,
    },
  ];

  /* =========================================================
     PARSE CARACTERÍSTICAS
  ========================================================= */

  let parsedCharacteristics: Record<
    string,
    unknown
  > = {};

  try {
    if (product.characteristics) {
      parsedCharacteristics =
        typeof product.characteristics ===
        "string"
          ? JSON.parse(
              product.characteristics,
            )
          : (product.characteristics as Record<
              string,
              unknown
            >);
    }
  } catch (error) {
    console.error(
      "Error parsing characteristics:",
      error,
    );

    parsedCharacteristics = {};
  }

  const hasCharacteristics =
    Object.keys(parsedCharacteristics)
      .length > 0;

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-blue-50/30">
      {/* =========================================================
          BREADCRUMB
      ========================================================= */}

      <Breadcrumb
        items={breadcrumbItems}
        backButton={{
          show: true,
          label: "Regresar",
        }}
      />

      {/* =========================================================
          CONTENT
      ========================================================= */}

      <div className="max-w-7xl mx-auto pt-2">
        <div className="grid gap-10 lg:grid-cols-2">
          {/* =========================================================
              CAROUSEL
          ========================================================= */}

          <div>
            <CarouselProduct
              images={
                product.images?.map((img) => ({
                  id: img.id,

                  url: img.url,

                  alternativeText:
                    img.alternativeText ??
                    undefined,
                })) ?? []
              }
              productName={
                product.productName
              }
              priority
            />
          </div>

          {/* =========================================================
              INFO PRODUCT
          ========================================================= */}

          <div className="lg:px-6">
            <InfoProduct
              product={product}
            />
          </div>
        </div>

        {/* =========================================================
            CARACTERÍSTICAS
        ========================================================= */}

        <section className="mt-12 overflow-hidden rounded-3xl border border-slate-200/50 bg-linear-to-br from-white to-slate-50/50 shadow-xl">
          {/* HEADER */}

          <div className="relative overflow-hidden bg-linear-to-r from-slate-800 via-blue-900 to-indigo-900 p-8 text-white">
            <div className="absolute inset-0 bg-black/10" />

            <div className="relative z-10">
              <div className="mb-3 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                    />
                  </svg>
                </div>

                <h2 className="text-3xl font-bold">
                  Especificaciones
                  Técnicas
                </h2>
              </div>

              <p className="text-lg text-blue-100 opacity-90">
                Información detallada y
                certificaciones médicas
                del producto
              </p>
            </div>
          </div>

          {/* CONTENT */}

          {hasCharacteristics ? (
            <div className="p-5">
              <RenderCharacteristics
                data={
                  parsedCharacteristics
                }
              />
            </div>
          ) : (
            <div className="p-12 text-center">
              <p className="text-slate-500">
                Sin especificaciones
                disponibles
              </p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}