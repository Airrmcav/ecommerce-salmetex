// components/InfoProduct/VariantSelector.tsx
import { ProductType } from "@/types/product";

type Variant = NonNullable<ProductType["variants"]>[number];

type Props = {
  variants: Variant[];
  selectedVariant: Variant | null;
  onSelect: (variant: Variant) => void;
};

export const VariantSelector = ({ variants, selectedVariant, onSelect }: Props) => (
  <div>
    {selectedVariant && (
      <p className="text-xs text-gray-500 my-2">
        Configuración seleccionada:{" "}
        <span className="font-medium text-gray-800">{selectedVariant.name}</span>
      </p>
    )}
    <div className="flex flex-wrap gap-2">
      {variants.map((variant) => (
        <button
          key={variant.id}
          onClick={() => onSelect(variant)}
          className={`px-3 cursor-pointer py-2 text-sm rounded-lg border ${
            selectedVariant?.id === variant.id
              ? "bg-blue-600 text-white border-blue-600"
              : "bg-white border-gray-300 hover:border-blue-400"
          }`}
        >
          {variant.name}
        </button>
      ))}
    </div>
  </div>
);