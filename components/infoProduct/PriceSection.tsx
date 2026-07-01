// components/InfoProduct/PriceSection.tsx
import { ExternalLink } from "lucide-react";
import { formatPrice } from "@/lib/formatPrice";
import { cn } from "@/lib/utils";

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
  <div className="space-y-2">
    <div className="flex items-baseline gap-2">
      <span className="text-3xl font-semibold text-gray-900">
        {hasPrice ? formatPrice(displayPrice!) : "Consultar precio"}
      </span>
      {hasPrice && (
        <span className="text-sm text-gray-500">MXN · IVA incluido</span>
      )}
    </div>

    {hasPrice && displayPrice && displayPrice > 0 && (
      <div className="flex flex-wrap items-center gap-3" aria-label="Opciones de pago a meses sin intereses">
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 border border-blue-200 rounded-lg">
          <span className="text-xs font-bold text-blue-700 uppercase tracking-wide">MSI</span>
          <span className="text-xs text-blue-600">3, 6, 12 meses</span>
        </div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-50 border border-green-200 rounded-lg">
          <span className="text-xs font-bold text-green-700 uppercase tracking-wide">Pago</span>
          <span className="text-xs text-green-600">seguro con Stripe</span>
        </div>
      </div>
    )}

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
