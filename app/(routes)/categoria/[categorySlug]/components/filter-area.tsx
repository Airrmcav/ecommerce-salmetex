import { useGetProductField } from "@/api/getProductField";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FilterTypes } from "@/types/filters";
import { Filter, Loader2, Stethoscope } from "lucide-react";

type FiltersAreaProps = {
    setFilterArea: (area: string) => void;
    filterArea: string;
    setFilterCategory: (category: string) => void;
}

const FilterArea = (props: FiltersAreaProps) => {
    const { setFilterArea, filterArea, setFilterCategory } = props;
    const { result, loading }: FilterTypes = useGetProductField();

    return (
        <div className="bg-white rounded-2xl border border-blue-100 shadow-lg p-6 my-0">
            {/* Header Section */}
            <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-xl">
                    <Filter className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                    <h3 className="text-xl font-bold text-gray-900">Filtrar por Área</h3>
                    <p className="text-sm text-gray-600">Selecciona el área médica de tu interés</p>
                </div>
            </div>

            {/* Decorative Line */}
            <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mb-4"></div>

            {/* Loading State */}
            {loading && result === null && (
                <div className="flex items-center justify-center py-3">
                    <div className="flex flex-col items-center gap-3">
                        <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
                        <p className="text-gray-600 font-medium">Cargando áreas médicas...</p>
                        <div className="flex gap-1">
                            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-100"></div>
                            <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce delay-200"></div>
                        </div>
                    </div>
                </div>
            )}

            {/* Radio Group */}
            {result !== null && (
                <div className="space-y-1">
                    <RadioGroup 
                        onValueChange={(value) => {
                            // Al seleccionar un área, limpiamos el filtro de categoría
                            setFilterCategory('');
                            setFilterArea(value);
                        }}
                        value={filterArea}
                        className="space-y-3"
                    >
                        {result.schema.attributes.area.enum.map((area: string) => (
                            <div 
                                key={area} 
                                className="group relative"
                            >
                                <div className="flex items-center space-x-4 p-2 rounded-xl border-2 border-gray-100 hover:border-blue-200 hover:bg-blue-50/30 transition-all duration-300 cursor-pointer">
                                    <RadioGroupItem 
                                        value={area} 
                                        id={area}
                                        className="text-blue-600 border-2 border-gray-300 group-hover:border-blue-400 transition-colors duration-200"
                                    />
                                    
                                    {/* Icon based on area */}
                                    <div className="p-2 rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50 group-hover:from-blue-100 group-hover:to-indigo-100 transition-colors duration-300">
                                        <Stethoscope className="w-4 h-4 text-blue-600 group-hover:text-blue-700" />
                                    </div>
                                    
                                    <Label 
                                        htmlFor={area}
                                        className="flex-1 text-gray-700 group-hover:text-gray-900 font-medium cursor-pointer transition-colors duration-200 text-sm"
                                    >
                                        {area}
                                    </Label>
                                    
                                    {/* Hover indicator */}
                                    <div className="w-2 h-2 rounded-full bg-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                </div>
                                
                                {/* Selection indicator line */}
                                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-indigo-500 rounded-r-full opacity-0 "></div>
                            </div>
                        ))}
                    </RadioGroup>

                    {/* Results count */}
                    <div className="mt-6 pt-4 border-t border-gray-100">
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-gray-600">
                                <span className="font-semibold text-blue-600">
                                    {result.schema.attributes.area.enum.length}
                                </span> áreas disponibles
                            </p>
                            <div className="flex items-center gap-1 text-xs text-gray-500">
                                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                                <span>Filtros activos</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Empty State */}
            {result !== null && result.schema.attributes.area.enum.length === 0 && (
                <div className="text-center py-8">
                    <div className="mb-4">
                        <div className="w-16 h-16 mx-auto bg-gray-100 rounded-2xl flex items-center justify-center">
                            <Filter className="w-8 h-8 text-gray-400" />
                        </div>
                    </div>
                    <h4 className="font-semibold text-gray-700 mb-2">No hay áreas disponibles</h4>
                    <p className="text-sm text-gray-500">
                        No se encontraron áreas médicas para filtrar en este momento.
                    </p>
                </div>
            )}
        </div>
    );
}

export default FilterArea;