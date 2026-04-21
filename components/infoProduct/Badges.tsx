// components/InfoProduct/Badges.tsx
import { XCircle } from "lucide-react";
import { ProductType } from "@/types/product";

export const AvailabilityBadge = ({
  active,
  purchaseType,
}: {
  active: boolean;
  purchaseType?: ProductType["purchaseType"];
}) => {
  if (!active)
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 border border-red-300">
        <XCircle className="w-3 h-3" />
        No disponible
      </span>
    );

  if (purchaseType !== "buy")
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 border border-yellow-300">
        <span className="w-1.5 h-1.5 rounded-full bg-yellow-500" />
        Disponible bajo cotización
      </span>
    );

  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-300">
      <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
      Disponible
    </span>
  );
};

export const CategoryBadge = ({ label }: { label: string }) => (
  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
    {label}
  </span>
);

export const AreaBadge = ({ label }: { label: string }) => (
  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600 border border-gray-200">
    {label}
  </span>
);