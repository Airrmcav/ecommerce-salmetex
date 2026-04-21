// components/InfoProduct/ProductDetails.tsx
import { CheckCircle } from "lucide-react";

type Props = {
  description?: string;
  characteristics?: string[];
};

export const ProductDetails = ({ description, characteristics }: Props) => (
  <>
    {description && (
      <div>
        <h2 className="text-base font-semibold text-gray-900 mb-2">Descripción</h2>
        <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
      </div>
    )}
    {Array.isArray(characteristics) && characteristics.length > 0 && (
      <div>
        <h2 className="text-base font-semibold text-gray-900 mb-2">Características</h2>
        <ul className="space-y-2">
          {characteristics.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-gray-700 bg-gray-50 rounded-lg p-2.5">
              <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    )}
  </>
);