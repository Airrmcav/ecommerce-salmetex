"use client";

import { Badge } from "@/components/ui/badge";
import { ProductType } from "@/types/product";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle, XCircle, Heart, ShoppingCart, PhoneCall } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { useLovedProducts } from "@/hooks/use-loved-products";
import { WhatsAppLink } from "@/components/ui/whatsapp-link";
import { formatPrice } from "@/lib/formatPrice";
import { cn } from "@/lib/utils";

type ProductCardProps = {
  product: ProductType;
  viewMode?: "grid" | "list";
  className?: string;
};

export const ProductCard = ({ product, viewMode = "grid", className }: ProductCardProps) => {
  const { addItem } = useCart();
  const { addLoveItems } = useLovedProducts();

  const hasPrice = !!(product.price && product.price > 0);
  const isBuyable = product.purchaseType === "buy";
  const imageAlt = product.images?.[0]?.alternativeText || product.productName;

  return (
    <article
      className={cn(
        "group relative flex flex-col bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 overflow-hidden",
        viewMode === "list" ? "flex-row" : "",
        className
      )}
    >
      <Link
        href={`/${product.slug}`}
        className="absolute inset-0 z-10"
        aria-label={`Ver ${product.productName}`}
      />

      {viewMode === "grid" ? (
        <GridLayout
          product={product}
          hasPrice={hasPrice}
          isBuyable={isBuyable}
          imageAlt={imageAlt}
          addItem={addItem}
          addLoveItems={addLoveItems}
        />
      ) : (
        <ListLayout
          product={product}
          hasPrice={hasPrice}
          isBuyable={isBuyable}
          imageAlt={imageAlt}
          addItem={addItem}
          addLoveItems={addLoveItems}
        />
      )}
    </article>
  );
};

type AddItem = ReturnType<typeof useCart> extends { addItem: infer T } ? T : (item: ProductType & { quantity: number }) => void;
type AddLoveItems = ReturnType<typeof useLovedProducts> extends { addLoveItems: infer T } ? T : (product: ProductType) => void;

type LayoutProps = {
  product: ProductType;
  hasPrice: boolean;
  isBuyable: boolean;
  imageAlt: string;
  addItem: AddItem;
  addLoveItems: AddLoveItems;
};

const GridLayout = ({ product, hasPrice, isBuyable, imageAlt, addItem, addLoveItems }: LayoutProps) => (
  <>
    <div className="relative overflow-hidden bg-white h-52 flex items-center justify-center">
      {product.images && product.images.length > 0 ? (
        <Image
          src={product.images[0].url}
          alt={imageAlt}
          fill
          sizes="(max-width: 768px) 90vw, (max-width: 1280px) 45vw, 30vw"
          className="object-contain group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-gray-100">
          <span className="text-4xl" aria-hidden="true">🏥</span>
        </div>
      )}

      <div className="absolute top-3 right-3 z-20">
        <Badge
          variant={product.active ? "default" : "secondary"}
          className={cn(
            "flex items-center gap-1 px-3 py-1 rounded-full font-medium",
            product.active
              ? "bg-green-100 text-green-800 border-green-200"
              : "bg-red-100 text-red-800 border-red-200"
          )}
        >
          {product.active ? (
            <CheckCircle className="w-3 h-3" aria-hidden="true" />
          ) : (
            <XCircle className="w-3 h-3" aria-hidden="true" />
          )}
          {product.active ? "Disponible" : "No Disponible"}
        </Badge>
      </div>

      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          addLoveItems(product);
        }}
        className="absolute top-3 left-3 z-20 p-2 rounded-full bg-gray-300/5 backdrop-blur-sm hover:bg-white transition-all duration-200 cursor-pointer"
        aria-label={`Agregar ${product.productName} a favoritos`}
        title="Agregar a favoritos"
      >
        <Heart className="w-4 h-4 text-gray-800 hover:text-red-500 transition-colors" aria-hidden="true" />
      </button>

      <div className="absolute bottom-3 left-3 z-20">
        <Badge className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-full text-[9px] font-medium">
          {product.category?.categoryName || "Categoría"}
        </Badge>
      </div>
    </div>

    <div className="p-4 flex-1 flex flex-col min-h-[220px]">
      <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200 min-h-[56px] flex items-start">
        {product.productName}
      </h3>

      <p className="text-gray-600 text-sm leading-relaxed mb-3 flex-1 line-clamp-2 min-h-[40px]">
        {product.description ||
          "Equipo médico de alta calidad diseñado para proporcionar resultados precisos y confiables en entornos clínicos profesionales."}
      </p>

      {hasPrice && (
        <div className="mb-4">
          <span className="text-2xl font-bold text-blue-600">
            {formatPrice(product.price!)}
          </span>
          <span className="text-gray-500 text-sm ml-1">MXN</span>
        </div>
      )}

      <div className="flex gap-2 mt-auto">
        {isBuyable ? (
          <>
            <button
              onClick={(e) => {
                e.preventDefault();
                addItem({ ...product, quantity: 1 });
              }}
              className="flex-1 py-2.5 px-3 rounded-lg font-medium text-sm bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2"
              aria-label={`Agregar ${product.productName} al carrito`}
            >
              <ShoppingCart className="w-4 h-4" aria-hidden="true" />
              Agregar
            </button>

            <WhatsAppLink
              productName={product.productName}
              type="info"
              size="md"
              className="!p-2.5"
              ariaLabel={`Consultar ${product.productName} por WhatsApp`}
            />
          </>
        ) : (
          <>
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              className="flex-1 py-2.5 px-3 rounded-lg font-medium text-sm bg-orange-500 hover:bg-orange-600 text-white shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2"
              aria-label={`Solicitar cotización para ${product.productName}`}
            >
              <PhoneCall className="w-4 h-4" aria-hidden="true" />
              Cotizar
            </button>

            <WhatsAppLink
              productName={product.productName}
              type="quote"
              size="md"
              className="!p-2.5"
              ariaLabel={`Cotizar ${product.productName} por WhatsApp`}
            />
          </>
        )}
      </div>
    </div>
  </>
);

const ListLayout = ({ product, hasPrice, isBuyable, imageAlt, addItem, addLoveItems }: LayoutProps) => (
  <>
    <div className="relative overflow-hidden bg-white w-48 min-h-48 flex items-center justify-center shrink-0">
      {product.images && product.images.length > 0 ? (
        <Image
          src={product.images[0].url}
          alt={imageAlt}
          fill
          sizes="192px"
          className="object-contain"
          loading="lazy"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-gray-100">
          <span className="text-4xl" aria-hidden="true">🏥</span>
        </div>
      )}
    </div>

    <div className="p-4 flex-1 flex flex-col justify-between">
      <div>
        <h3 className="font-bold text-lg text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
          {product.productName}
        </h3>
        <p className="text-gray-600 text-sm line-clamp-2 mb-2">
          {product.description}
        </p>
      </div>

      <div className="flex items-center gap-3">
        {hasPrice && (
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-bold text-blue-600">
              {formatPrice(product.price!)}
            </span>
            <span className="text-gray-500 text-sm">MXN</span>
          </div>
        )}

        <div className="flex gap-2 ml-auto">
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              addLoveItems(product);
            }}
            className="p-2 rounded-lg hover:bg-gray-100 transition cursor-pointer"
            aria-label={`Agregar ${product.productName} a favoritos`}
          >
            <Heart className="w-4 h-4 text-gray-600 hover:text-red-500" aria-hidden="true" />
          </button>

          {isBuyable ? (
            <button
              onClick={(e) => {
                e.preventDefault();
                addItem({ ...product, quantity: 1 });
              }}
              className="px-3 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition cursor-pointer"
              aria-label={`Agregar ${product.productName} al carrito`}
            >
              <ShoppingCart className="w-4 h-4 inline" aria-hidden="true" />
            </button>
          ) : (
            <WhatsAppLink
              productName={product.productName}
              type="quote"
              size="sm"
            />
          )}
        </div>
      </div>
    </div>
  </>
);

export default ProductCard;