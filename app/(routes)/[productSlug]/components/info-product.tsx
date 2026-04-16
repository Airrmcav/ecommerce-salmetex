import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { formatPrice } from "@/lib/formatPrice";
import { ProductType } from "@/types/product";
import {
  Heart,
  ShoppingCart,
  CheckCircle,
  XCircle,
  Share2,
  Facebook,
  Twitter,
  Instagram,
  Mail,
  PhoneCall,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Minus,
  Plus,
  MessageCircle,
} from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { useLovedProducts } from "@/hooks/use-loved-products";
import { useState } from "react";

export type InfoProductProps = {
  product: ProductType;
};

// ─── sub-componentes pequeños ────────────────────────────────────────────────

const AvailabilityBadge = ({
  active,
  purchaseType,
}: {
  active: boolean;
  purchaseType?: "buy" | "quote" | "contact";
}) => {
  if (!active) {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 border border-red-300">
        <XCircle className="w-3 h-3" />
        No disponible
      </span>
    );
  }

  if (purchaseType !== "buy") {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 border border-yellow-300">
        <span className="w-1.5 h-1.5 rounded-full bg-yellow-500" />
        Disponible bajo cotización
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-300">
      <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
      Disponible
    </span>
  );
};

const CategoryBadge = ({ label }: { label: string }) => (
  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
    {label}
  </span>
);

const AreaBadge = ({ label }: { label: string }) => (
  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600 border border-gray-200">
    {label}
  </span>
);

const QuantitySelector = ({
  value,
  onIncrement,
  onDecrement,
}: {
  value: number;
  onIncrement: () => void;
  onDecrement: () => void;
}) => (
  <div className="flex items-center gap-3">
    <span className="text-sm text-gray-500">Cantidad:</span>
    <div className="inline-flex items-center border border-gray-200 rounded-lg overflow-hidden">
      <button
        onClick={onDecrement}
        aria-label="Reducir cantidad"
        className="w-8 h-8 flex items-center cursor-pointer justify-center bg-gray-50 hover:bg-gray-100 transition-colors"
      >
        <Minus className="w-3 h-3" />
      </button>
      <span className="w-8 text-center text-sm font-medium">{value}</span>
      <button
        onClick={onIncrement}
        aria-label="Aumentar cantidad"
        className="w-8 h-8 flex items-center cursor-pointer justify-center bg-gray-50 hover:bg-gray-100 transition-colors"
      >
        <Plus className="w-3 h-3" />
      </button>
    </div>
  </div>
);

// ─── componente principal ─────────────────────────────────────────────────────

const InfoProduct = ({ product }: InfoProductProps) => {
  const { addItem } = useCart();
  const { addLoveItems } = useLovedProducts();
  const [quantity, setQuantity] = useState(1);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  const isBuyable = product.purchaseType === "buy";
  const hasPrice = Boolean(product.price && product.price > 0);
  const isAvailable = product.active && hasPrice;
  const isQuote = product.purchaseType !== "buy";

  const handleAddToCart = () => addItem({ ...product, quantity });

  const handleWhatsApp = (type: "quote" | "info") => {
  const message =
    type === "quote"
      ? `Hola, quiero cotizar el producto *${product.productName}*. ¿Me puedes dar precio y tiempo de entrega?`
    : `Hola, tengo algunas dudas sobre el producto *${product.productName}*. ¿Me puedes asesorar?`;

  const url = `https://wa.me/8445954660?text=${encodeURIComponent(message)}`;

  if (
    typeof window !== "undefined" &&
    (window as any).gtag_report_conversion
  ) {
    (window as any).gtag_report_conversion();
  }

  window.open(url, "_blank");
};

  const handleShare = (platform: "facebook" | "mail") => {
    if (typeof window === "undefined") return;
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(
      `Mira este producto: ${product.productName}`,
    );

    const urls: Record<typeof platform, string> = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      mail: `mailto:?subject=${title}&body=${encodeURIComponent(window.location.href)}`,
    };

    window.open(urls[platform], "_blank");
  };

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-4">
      <div className="flex flex-wrap items-center gap-1.5">
        
        <CategoryBadge label={product.category.categoryName} />
        {product.area && <AreaBadge label={product.area} />}
        <AvailabilityBadge active={product.active}  purchaseType={product.purchaseType}/>
      </div>
      <h1 className="text-2xl font-semibold text-gray-900 leading-snug">
        {product.productName}
      </h1>
      {product.programa && (
        <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-xs text-gray-400 uppercase tracking-wide mb-0.5">
            Programa
          </p>
          <p className="text-sm font-semibold text-gray-900">
            {product.programa.namePrograma}
          </p>
          {product.programa.description && (
            <>
              <p
                className={`text-xs text-gray-600 mt-1 leading-relaxed ${isDescriptionExpanded ? "" : "line-clamp-2"}`}
              >
                {product.programa.description}
              </p>
              <button
                onClick={() => setIsDescriptionExpanded((v) => !v)}
                aria-expanded={isDescriptionExpanded}
                className="inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700 mt-1.5 font-medium"
              >
                {isDescriptionExpanded ? (
                  <>
                    <ChevronUp className="w-3 h-3" /> Ver menos
                  </>
                ) : (
                  <>
                    <ChevronDown className="w-3 h-3" /> Ver más
                  </>
                )}
              </button>
            </>
          )}
        </div>
      )}
      <div>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-semibold text-gray-900">
            {hasPrice ? formatPrice(product.price!) : "Consultar precio"}
          </span>
          {hasPrice && (
            <span className="text-sm text-gray-500">MXN · IVA incluido</span>
          )}
        </div>
        {product.mercadolibre_url && (
          <a
            href={product.mercadolibre_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 mt-1 text-xs text-blue-600 hover:underline"
          >
            <ExternalLink className="w-3 h-3" />
            Ver en Mercado Libre
          </a>
        )}
      </div>

      <Separator />
      <div className="space-y-3">
        {isBuyable && isAvailable && (
          <QuantitySelector
            value={quantity}
            onIncrement={() => setQuantity((v) => v + 1)}
            onDecrement={() => setQuantity((v) => Math.max(1, v - 1))}
          />
        )}

        <div className="flex gap-2">
          {isBuyable ? (
            <Button
              className="flex-1 bg-blue-600 cursor-pointer hover:bg-blue-700 text-white"
              disabled={!isAvailable}
              onClick={handleAddToCart}
            >
              <ShoppingCart className="w-4 h-4 mr-2 " />
              {isAvailable ? "Agregar al carrito" : "No disponible"}
            </Button>
          ) : (
            <Button
              className="flex-1 cursor-pointer bg-orange-500 hover:bg-orange-600 text-white"
              onClick={() => handleWhatsApp("quote")}
            >
              <PhoneCall className="w-4 h-4 mr-2" />
              Solicitar cotización
            </Button>
          )}

          <Button
            variant="outline"
            onClick={() => addLoveItems(product)}
            aria-label={`Agregar ${product.productName} a favoritos`}
            className="px-3 border-gray-200 cursor-pointer hover:border-red-300 hover:bg-red-50 group"
          >
            <Heart className="w-4 h-4 group-hover:fill-red-400 group-hover:text-red-400 transition-all" />
          </Button>
        </div>
        <Button
          className="w-full bg-green-500 cursor-pointer hover:bg-green-600 text-white"
          onClick={() => handleWhatsApp("info")}
          aria-label={`Cotizar ${product.productName} por WhatsApp`}
        >
          <MessageCircle className="w-4 h-4 mr-2" />
          Hablar con un asesor
        </Button>
      </div>
      <div className="hidden md:flex items-center gap-2 flex-wrap">
        <Share2 className="w-4 h-4 text-gray-400" />
        <span className="text-xs text-gray-400 mr-1">Compartir:</span>
        {[
          { id: "facebook" as const, label: "Facebook", icon: Facebook },
          { id: "mail" as const, label: "Correo", icon: Mail },
        ].map(({ id, label, icon: Icon }) => (
          <Button
            key={id}
            variant="outline"
            size="sm"
            className="text-xs h-7 px-3 cursor-pointer"
            onClick={() => handleShare(id)}
            aria-label={`Compartir en ${label}`}
          >
            <Icon className="w-3 h-3 mr-1" />
            {label}
          </Button>
        ))}
      </div>

      <Separator />
      {product.description && (
        <div>
          <h2 className="text-base font-semibold text-gray-900 mb-2">
            Descripción
          </h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            {product.description}
          </p>
        </div>
      )}
      {Array.isArray(product.characteristics) &&
        product.characteristics.length > 0 && (
          <div>
            <h2 className="text-base font-semibold text-gray-900 mb-2">
              Características
            </h2>
            <ul className="space-y-2">
              {product.characteristics.map((item: string, i: number) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-sm text-gray-700 bg-gray-50 rounded-lg p-2.5"
                >
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}
    </div>
  );
};

export default InfoProduct;
