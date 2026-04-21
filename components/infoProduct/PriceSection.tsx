// components/InfoProduct/PriceSection.tsx
import { ExternalLink } from "lucide-react";
import { formatPrice } from "@/lib/formatPrice";

type Props = {
  displayPrice?: number | null;
  hasPrice: boolean;
  mercadolibreUrl?: string;
};

export const PriceSection = ({
  displayPrice,
  hasPrice,
  mercadolibreUrl,
}: Props) => (
  <div>
    <div className="flex items-baseline gap-2">
      <span className="text-3xl font-semibold text-gray-900">
        {hasPrice ? formatPrice(displayPrice!) : "Consultar precio"}
      </span>
      {hasPrice && (
        <span className="text-sm text-gray-500">MXN · IVA incluido</span>
      )}
    </div>
    {mercadolibreUrl && (
      <a
        href={mercadolibreUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 mt-1 text-xs text-blue-600 hover:underline"
      >
        <ExternalLink className="w-3 h-3" />
        Ver en Mercado Libre
      </a>
    )}
  </div>
);
