// components/InfoProduct/ProductDetails.tsx

import { CheckCircle } from "lucide-react";

type Characteristic =
  | string
  | { nombre?: string; categorias?: string[]; caracteristicas?: Record<string, string | number | boolean> };

type Props = {
  description?: string;
  characteristics?: Characteristic[] | Characteristic;
};

// Helper para convertir cualquier formato a string[]
function normalizeCharacteristics(raw: Props["characteristics"]): string[] {
  if (!raw) return [];

  const items = Array.isArray(raw) ? raw : [raw];

  return items.flatMap((item) => {
    if (typeof item === "string") return [item];
    // objeto: extrae nombre u otras propiedades como texto
    const parts: string[] = [];
    if (item.nombre) parts.push(item.nombre);
    if (item.categorias) parts.push(...item.categorias);
    return parts;
  });
}

export const ProductDetails = ({ description, characteristics }: Props) => {
  const items = normalizeCharacteristics(characteristics);

  return (
    <>
      {description && (
        <div>
          <h2 className="text-base font-semibold text-gray-900 mb-2">Descripción</h2>
          <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
        </div>
      )}
      {items.length > 0 && (
        <div>
          <h2 className="text-base font-semibold text-gray-900 mb-2">Características</h2>
          <ul className="space-y-2">
            {items.map((item, i) => (
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
};