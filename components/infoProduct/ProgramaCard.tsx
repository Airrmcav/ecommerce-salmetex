// components/InfoProduct/ProgramaCard.tsx
import { ChevronDown, ChevronUp } from "lucide-react";
import { ProductType } from "@/types/product";

type Props = {
  programa: NonNullable<ProductType["programa"]>;
  isExpanded: boolean;
  onToggle: () => void;
};

export const ProgramaCard = ({ programa, isExpanded, onToggle }: Props) => (
  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
    <p className="text-xs text-gray-400 uppercase tracking-wide mb-0.5">Programa</p>
    <p className="text-sm font-semibold text-gray-900">{programa.namePrograma}</p>
    {programa.description && (
      <>
        <p className={`text-xs text-gray-600 mt-1 leading-relaxed ${isExpanded ? "" : "line-clamp-2"}`}>
          {programa.description}
        </p>
        <button
          onClick={onToggle}
          aria-expanded={isExpanded}
          className="inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700 mt-1.5 font-medium"
        >
          {isExpanded ? <><ChevronUp className="w-3 h-3" /> Ver menos</> : <><ChevronDown className="w-3 h-3" /> Ver más</>}
        </button>
      </>
    )}
  </div>
);