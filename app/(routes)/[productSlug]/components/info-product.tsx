// components/InfoProduct/index.tsx
import { Separator } from "@/components/ui/separator";
import { ProductType } from "@/types/product";
import { useInfoProduct } from "../../../../hooks/useInfoProduct";
import { AvailabilityBadge, CategoryBadge, AreaBadge } from "../../../../components/infoProduct/Badges";
import { ProgramaCard } from "../../../../components/infoProduct/ProgramaCard";
import { PriceSection } from "../../../../components/infoProduct/PriceSection";
import { VariantSelector } from "../../../../components/infoProduct/VariantSelector";
import { PurchaseActions } from "../../../../components/infoProduct/PurchaseActions";
import { ShareButtons } from "../../../../components/infoProduct/ShareButtons";
import { ProductDetails } from "../../../../components/infoProduct/ProductDetails";

export const InfoProduct = ({ product }: { product: ProductType }) => {
  const {
    quantity, setQuantity,
    isDescriptionExpanded, setIsDescriptionExpanded,
    selectedVariant, setSelectedVariant,
    displayPrice, hasPrice, isAvailable, isBuyable, hasVariants,
    handleAddToCart, handleWhatsApp, handleShare, addLoveItems,
  } = useInfoProduct(product);

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-4">
      <div className="flex flex-wrap items-center gap-1.5">
        <CategoryBadge label={product.category.categoryName} />
        {product.area && <AreaBadge label={product.area} />}
        <AvailabilityBadge active={product.active} purchaseType={product.purchaseType} />
      </div>

      <h1 className="text-2xl font-semibold text-gray-900 leading-snug">
        {product.productName}
      </h1>

      {product.programa && (
        <ProgramaCard
          programa={product.programa}
          isExpanded={isDescriptionExpanded}
          onToggle={() => setIsDescriptionExpanded((v) => !v)}
        />
      )}

      <PriceSection
        displayPrice={displayPrice}
        hasPrice={hasPrice}
        mercadolibreUrl={product.mercadolibre_url}
      />

      <Separator />

      {hasVariants && (
        <VariantSelector
          variants={product.variants!}
          selectedVariant={selectedVariant}
          onSelect={setSelectedVariant}
        />
      )}

      <PurchaseActions
        product={product}
        quantity={quantity}
        isBuyable={isBuyable}
        isAvailable={isAvailable}
        onIncrement={() => setQuantity((v) => v + 1)}
        onDecrement={() => setQuantity((v) => Math.max(1, v - 1))}
        onAddToCart={handleAddToCart}
        onWhatsApp={handleWhatsApp}
        onLove={() => addLoveItems(product)}
      />

      <ShareButtons onShare={handleShare} />

      <Separator />

      <ProductDetails
        description={product.description}
        characteristics={product.characteristics}
      />
    </div>
  );
};

export default InfoProduct;