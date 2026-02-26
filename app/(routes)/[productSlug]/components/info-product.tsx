import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
} from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { useLovedProducts } from "@/hooks/use-loved-products";
import { useState } from "react";

export type InfoProductProps = {
  product: ProductType;
};

const InfoProduct = (props: InfoProductProps) => {
  const { product } = props;
  const { addItem } = useCart();
  const { addLoveItems } = useLovedProducts();
  const [quantity, setQuantity] = useState(1);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  const handleIncrement = () => setQuantity((prev) => prev + 1);
  const handleDecrement = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleAddToCart = () => {
    const productWithQuantity = { ...product, quantity };
    addItem(productWithQuantity);
  };

  const handleWhatsApp = () => {
    const phoneNumber = "8445954660";
    const message = `Hola, quiero *cotizar ahora* el producto: ${product.productName}.`;
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    if (typeof window !== "undefined" && (window as any).gtag_report_conversion) {
      (window as any).gtag_report_conversion();
    }

    window.open(url, "_blank");
  };

  const handleShare = (platform: "facebook" | "twitter" | "instagram" | "mail") => {
    if (typeof window === "undefined") return;
    const currentUrl = encodeURIComponent(window.location.href);
    const productTitle = encodeURIComponent(`Mira este producto: ${product.productName}`);

    const urls: Record<string, string> = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`,
      twitter: `https://twitter.com/intent/tweet?url=${currentUrl}&text=${productTitle}`,
      instagram: `https://www.instagram.com/`,
      mail: `mailto:?subject=${productTitle}&body=${encodeURIComponent(`Échale un vistazo: ${window.location.href}`)}`,
    };

    window.open(urls[platform], "_blank");
  };

  const hasPrice = product.price && product.price > 0;
  const isAvailable = product.active && hasPrice;

  return (
    <div className="max-w-2xl mx-auto p-3 bg-white rounded-lg">
      <h1 className="text-3xl font-bold text-gray-900 mb-2 leading-tight">
        {product.productName}
      </h1>
      {product.programa && (
        <div className="mb-1 p-3 bg-gray-50 rounded-lg border border-gray-200">
          <div className="flex items-center gap-4">
            <div>
              <p className="text-sm text-gray-500">Programa</p>
              <h2 className="text-lg font-semibold text-gray-900">
                {product.programa.namePrograma}
              </h2>
              {product.programa.description && (
                <>
                  <p
                    className={`text-xs text-gray-600 mt-1 ${
                      isDescriptionExpanded ? "" : "line-clamp-2"
                    }`}
                  >
                    {product.programa.description}
                  </p>
                  <button
                    onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                    aria-expanded={isDescriptionExpanded}
                    className="flex cursor-pointer items-center gap-1 text-sm text-blue-600 hover:text-blue-700 mt-2 font-medium transition-colors"
                  >
                    {isDescriptionExpanded ? (
                      <>Ver menos <ChevronUp className="w-4 h-4" /></>
                    ) : (
                      <>Ver más <ChevronDown className="w-4 h-4" /></>
                    )}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Badges: Categoría, Área, Disponibilidad */}
      <div className="space-y-3 mb-0 flex justify-start gap-2 flex-wrap">
        <Badge
          variant="outline"
          className="px-2 py-1 text-sm font-medium bg-blue-50 text-blue-700 border-blue-200"
        >
          {product.category.categoryName}
        </Badge>

        {product.area && (
          <Badge
            variant="outline"
            className="px-2 py-1 text-sm font-medium bg-gray-50 text-gray-700 border-gray-200"
          >
            {product.area}
          </Badge>
        )}

        <Badge
          className={`${
            product.active
              ? "bg-green-100 text-green-800 border-green-300"
              : "bg-red-100 text-red-800 border-red-300"
          } px-2 py-1 text-sm font-medium border`}
        >
          {product.active ? (
            <>
              <CheckCircle className="w-4 h-4 mr-2" aria-hidden="true" />
              Disponible
            </>
          ) : (
            <>
              <XCircle className="w-4 h-4 mr-2" aria-hidden="true" />
              No Disponible
            </>
          )}
        </Badge>
      </div>

      {/* Precio */}
      <div className="mb-3 mt-2">
        <span className="text-4xl font-bold text-gray-900">
          {hasPrice ? formatPrice(product.price!) : "Consultar precio"}
        </span>
        {hasPrice && (
          <span className="text-gray-600 ml-2">IVA incluido</span>
        )}
      </div>

      {/* Agregar al carrito y Favoritos */}
      <div className="flex gap-2 mb-0 max-w-87.5 sm:max-w-none">
        <Button
          className="flex-1 cursor-pointer bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 text-lg font-normal rounded-lg"
          disabled={!isAvailable}
          onClick={handleAddToCart}
          aria-label={
            !hasPrice
              ? "Consultar precio de este producto"
              : `Agregar ${product.productName} al carrito`
          }
          title={
            !hasPrice
              ? "Este producto no tiene precio definido"
              : "Agregar al carrito"
          }
        >
          <ShoppingCart className="w-5 h-5 mr-2" aria-hidden="true" />
          {!hasPrice ? "Consultar precio" : "Agregar al Carrito"}
        </Button>

        <Button
          variant="outline"
          onClick={() => addLoveItems(product)}
          aria-label={`Agregar ${product.productName} a favoritos`}
          className="flex-1 sm:flex-none px-4 py-3 border-2 border-gray-300 hover:border-red-400 hover:bg-red-50 rounded-lg group cursor-pointer"
        >
          <Heart className="w-5 h-5 group-hover:fill-red-400 group-hover:text-red-400 transition-all" aria-hidden="true" />
        </Button>
      </div>

      {/* Cotizar por WhatsApp */}
      <div className="my-2">
        <Button
          className="w-full cursor-pointer bg-green-500 hover:bg-green-600 text-white py-4 px-6 text-lg font-medium rounded-lg flex items-center justify-center gap-3"
          onClick={handleWhatsApp}
          aria-label={`Cotizar ${product.productName} por WhatsApp`}
        >
          <PhoneCall aria-hidden="true" />
          Cotizar por WhatsApp
        </Button>
      </div>

      {/* Compartir */}
      <div className="my-4 max-w-87.5 sm:max-w-none">
        <div className="flex items-center justify-center gap-2 mb-3" aria-label="Compartir producto">
          <Share2 className="w-5 h-5 text-gray-600" aria-hidden="true" />
          <span className="font-medium text-gray-900">Compartir</span>

          <Button
            variant="outline"
            size="sm"
            className="cursor-pointer flex items-center gap-2 px-4 py-2 bg-blue-50 border-blue-200 hover:bg-blue-100 text-blue-700"
            onClick={() => handleShare("facebook")}
            aria-label="Compartir en Facebook"
          >
            <Facebook className="w-4 h-4" aria-hidden="true" />
            Facebook
          </Button>

          <Button
            variant="outline"
            size="sm"
            className="cursor-pointer flex items-center gap-2 px-4 py-2 bg-gray-50 border-gray-200 hover:bg-gray-100 text-gray-700"
            onClick={() => handleShare("twitter")}
            aria-label="Compartir en X (Twitter)"
          >
            <Twitter className="w-4 h-4" aria-hidden="true" />X
          </Button>

          <Button
            variant="outline"
            size="sm"
            className="cursor-pointer flex items-center gap-2 px-4 py-2 bg-pink-50 border-pink-200 hover:bg-pink-100 text-pink-700"
            onClick={() => handleShare("instagram")}
            aria-label="Ir a Instagram de Salmetexmed"
          >
            <Instagram className="w-4 h-4" aria-hidden="true" />
            Instagram
          </Button>

          <Button
            variant="outline"
            size="sm"
            className="hidden sm:flex cursor-pointer items-center gap-2 px-4 py-2 bg-gray-50 border-gray-200 hover:bg-gray-100 text-gray-700"
            onClick={() => handleShare("mail")}
            aria-label="Compartir por correo electrónico"
          >
            <Mail className="w-4 h-4" aria-hidden="true" />
            Correo
          </Button>
        </div>
      </div>

      <Separator className="my-3" />

      {/* Descripción — h2 para jerarquía correcta de headings */}
      {product.description && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">
            Descripción
          </h2>
          <p className="text-gray-700 leading-relaxed text-sm text-justify">
            {product.description}
          </p>
        </div>
      )}

      {/* Características — h2 para jerarquía correcta de headings */}
      {Array.isArray(product.characteristics) &&
        product.characteristics.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Características
            </h2>
            <div className="space-y-3">
              {product.characteristics.map(
                (characteristic: string, index: number) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg"
                  >
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 shrink-0" aria-hidden="true" />
                    <span className="text-gray-700">{characteristic}</span>
                  </div>
                ),
              )}
            </div>
          </div>
        )}
    </div>
  );
};

export default InfoProduct;