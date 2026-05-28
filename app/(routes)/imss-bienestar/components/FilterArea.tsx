"use client";

import { useMemo } from "react";

import { useGetProductField } from "@/api/getProductField";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { FilterTypes } from "@/types/filters";

import {
  Filter,
  Loader2,
  Stethoscope,
} from "lucide-react";

type FilterAreaProps = {
  onFilterChange: (area: string) => void;
  value: string;
};

const FilterArea = ({
  onFilterChange,
  value,
}: FilterAreaProps) => {
  /*
  =========================================
  FETCH OPTIMIZADO
  =========================================
  */
  const {
    result,
    loading,
  }: FilterTypes = useGetProductField();

  /*
  =========================================
  OBTENER ENUMS MEMOIZADOS
  =========================================
  */
  const areas = useMemo(() => {
    return (
      result?.schema?.attributes?.area?.enum ?? []
    );
  }, [result]);

  /*
  =========================================
  LOADING
  =========================================
  */
  if (loading) {
    return (
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
        <div className="flex items-center gap-3 mb-5">
          <div className="p-2 rounded-xl bg-blue-100">
            <Filter className="w-5 h-5 text-blue-600" />
          </div>

          <div>
            <h3 className="text-lg font-bold text-gray-900">
              Filtrar por Área
            </h3>

            <p className="text-sm text-gray-500">
              Cargando áreas médicas...
            </p>
          </div>
        </div>

        <div className="flex items-center justify-center py-6">
          <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
        </div>
      </div>
    );
  }

  /*
  =========================================
  EMPTY
  =========================================
  */
  if (!areas.length) {
    return (
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
        <div className="text-center py-4">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-gray-100 flex items-center justify-center mb-4">
            <Filter className="w-6 h-6 text-gray-400" />
          </div>

          <h3 className="text-base font-semibold text-gray-800 mb-1">
            No hay áreas disponibles
          </h3>

          <p className="text-sm text-gray-500">
            No se encontraron filtros disponibles.
          </p>
        </div>
      </div>
    );
  }

  /*
  =========================================
  COMPONENT
  =========================================
  */
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      {/* HEADER */}
      <div className="p-5 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-blue-100">
            <Filter className="w-5 h-5 text-blue-600" />
          </div>

          <div>
            <h3 className="text-lg font-bold text-gray-900">
              Filtrar por Área
            </h3>

            <p className="text-sm text-gray-500">
              Selecciona el área médica
            </p>
          </div>
        </div>

        <div className="w-16 h-1 rounded-full bg-linear-to-r from-blue-500 to-indigo-500 mt-4" />
      </div>

      {/* FILTERS */}
      <div className="p-4">
        <RadioGroup
          value={value}
          onValueChange={onFilterChange}
          className="space-y-2"
        >
          {areas.map((area: string) => {
            const isActive = value === area;

            return (
              <div
                key={area}
                className={`
                  flex items-center gap-3
                  rounded-xl border p-3
                  transition-all duration-200
                  cursor-pointer
                  ${
                    isActive
                      ? "border-blue-300 bg-blue-50"
                      : "border-gray-200 hover:border-blue-200 hover:bg-gray-50"
                  }
                `}
              >
                <RadioGroupItem
                  value={area}
                  id={area}
                />

                <div
                  className={`
                    p-2 rounded-lg
                    ${
                      isActive
                        ? "bg-blue-100"
                        : "bg-gray-100"
                    }
                  `}
                >
                  <Stethoscope className="w-4 h-4 text-blue-600" />
                </div>

                <Label
                  htmlFor={area}
                  className="flex-1 cursor-pointer text-sm font-medium text-gray-700"
                >
                  {area}
                </Label>

                {isActive && (
                  <div className="w-2 h-2 rounded-full bg-blue-600" />
                )}
              </div>
            );
          })}
        </RadioGroup>
      </div>

      {/* FOOTER */}
      <div className="border-t border-gray-100 px-4 py-3 bg-gray-50">
        <div className="flex items-center justify-between">
          <p className="text-xs text-gray-500">
            <span className="font-semibold text-blue-600">
              {areas.length}
            </span>
            {" "}áreas disponibles
          </p>
        </div>
      </div>
    </div>
  );
};

export default FilterArea;
