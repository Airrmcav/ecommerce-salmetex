// hooks/useInfoProduct.ts
import { useState } from "react";
import { ProductType } from "@/types/product";
import { useCart } from "@/hooks/use-cart";
import { useLovedProducts } from "@/hooks/use-loved-products";

export function useInfoProduct(product: ProductType) {
  const { addItem } = useCart();
  const { addLoveItems } = useLovedProducts();

  const [quantity, setQuantity] = useState(1);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState(
    product.variants?.find((v) => v.isDefault) ?? product.variants?.[0] ?? null
  );

  const displayPrice = selectedVariant?.price ?? product.price;
  const hasPrice = Boolean(displayPrice && displayPrice > 0);
  const isAvailable = product.active && hasPrice;
  const isBuyable = product.purchaseType === "buy";

  const handleAddToCart = () => {
    addItem({
      ...product,
      quantity,
      selectedVariant: selectedVariant ?? undefined,
      price: selectedVariant?.price ?? product.price,
    });
  };

  const handleWhatsApp = (type: "quote" | "info") => {
    const message =
      type === "quote"
        ? `Hola, quiero cotizar el producto *${product.productName}*. ¿Me puedes dar precio y tiempo de entrega?`
        : `Hola, tengo algunas dudas sobre el producto *${product.productName}*. ¿Me puedes asesorar?`;

    const url = `https://wa.me/8445954660?text=${encodeURIComponent(message)}`;
    if (typeof window !== "undefined" && (window as any).gtag_report_conversion) {
      (window as any).gtag_report_conversion();
    }
    window.open(url, "_blank");
  };

  const handleShare = (platform: "facebook" | "mail") => {
    if (typeof window === "undefined") return;
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(`Mira este producto: ${product.productName}`);
    const urls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      mail: `mailto:?subject=${title}&body=${encodeURIComponent(window.location.href)}`,
    };
    window.open(urls[platform], "_blank");
  };

  return {
    // estado
    quantity,
    setQuantity,
    isDescriptionExpanded,
    setIsDescriptionExpanded,
    selectedVariant,
    setSelectedVariant,
    // derivados
    displayPrice,
    hasPrice,
    isAvailable,
    isBuyable,
    hasVariants: Boolean(product.variants?.length),
    // handlers
    handleAddToCart,
    handleWhatsApp,
    handleShare,
    addLoveItems,
  };
}