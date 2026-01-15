"use client"

import { useState, useEffect, useMemo } from "react";
import { useGetCategories } from "@/api/getProducts";
import { useGetProductsByArea } from "@/api/getProductsByArea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ResponseType } from "@/types/response";
import { CategoryType } from "@/types/category";
import { ProductType } from "@/types/product";
import { ChevronDown, Loader2, Package2, Grid3X3 } from "lucide-react";

type FiltersCategoryProps = {
    setFilterCategory: (category: string) => void;
    filterCategory: string;
    setFilterArea: (area: string) => void;
    filterArea: string;
}

const FilterCategory = (props: FiltersCategoryProps) => {
    const { setFilterCategory, filterCategory, setFilterArea, filterArea } = props;
    const { result, loading, error }: ResponseType = useGetCategories();
    const { result: areaProducts, loading: areaLoading }: ResponseType = useGetProductsByArea(filterArea);
    const [isExpanded, setIsExpanded] = useState(false);

    // Auto-expandir cuando hay área seleccionada (excepto Mobiliario médico)
    useEffect(() => {
        if (filterArea && filterArea !== 'Mobiliario médico') {
            setIsExpanded(true);
        }
        // No cerramos cuando filterArea está vacío para mantener abierto si el usuario seleccionó una categoría
    }, [filterArea]);

    // Obtener las categorías únicas de los productos del área seleccionada
    const categoriesFromArea = useMemo(() => {
        if (!areaProducts || !Array.isArray(areaProducts)) return [];
        const categoryNames = new Set<string>();
        areaProducts.forEach((product: ProductType) => {
            if (product.category?.categoryName) {
                categoryNames.add(product.category.categoryName);
            }
        });
        return Array.from(categoryNames);
    }, [areaProducts]);

    // Filtrar y ordenar categorías
    const sortedCategories = useMemo(() => {
        if (!result) return [];
        let categories = [...result].filter(a => a && a.categoryName);
        
        // Si hay un área seleccionada (y no es Mobiliario médico), filtrar por categorías del área
        if (filterArea && filterArea !== 'Mobiliario médico' && categoriesFromArea.length > 0) {
            categories = categories.filter(cat => categoriesFromArea.includes(cat.categoryName));
        }
        
        return categories.sort((a, b) => a.categoryName.localeCompare(b.categoryName));
    }, [result, filterArea, categoriesFromArea]);

    // No mostrar el filtro si el área es "Mobiliario médico"
    if (filterArea === 'Mobiliario médico') {
        return null;
    }

    const handleCategorySelect = (value: string) => {
        // No limpiamos el área para mantener el filtro activo
        setFilterCategory(value);
        setIsExpanded(true); // Mantener dropdown abierto al seleccionar
    };

    const toggleExpanded = () => {
        if (!loading && result) {
            setIsExpanded(!isExpanded);
        }
    };

    // Encontrar la categoría seleccionada para mostrar en el header
    const selectedCategory = sortedCategories.find(cat => cat && cat.categoryName === filterCategory);

    return (
        <div className="bg-white rounded-2xl border border-blue-100 shadow-lg overflow-hidden mt-3">
            {/* Header Clickeable */}
            <div 
                onClick={toggleExpanded}
                className={`flex items-center gap-3 p-4 cursor-pointer transition-all duration-200 
                    ${isExpanded ? 'bg-linar-to-r from-blue-50 to-indigo-50 border-b border-gray-100' : 'hover:bg-gray-50'}`}
            >
                <div className="p-1.5 bg-linear-to-r from-blue-100 to-indigo-100 rounded-lg">
                    <Grid3X3 className="w-4 h-4 text-blue-600" />
                </div>
                
                <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900">
                        {selectedCategory ? selectedCategory.categoryName : 'Filtrar por Categoría'}
                    </h3>
                    {!selectedCategory && (
                        <p className="text-xs text-gray-500">Selecciona una categoría</p>
                    )}
                </div>

                {/* Counter badge */}
                {result && !loading && (
                    <div className="px-2 py-1 bg-blue-100 rounded-full">
                        <span className="text-xs font-semibold text-blue-600">
                            {result.length}
                        </span>
                    </div>
                )}

                {/* Loading o Arrow */}
                {loading ? (
                    <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />
                ) : (
                    <ChevronDown 
                        className={`w-5 h-5 text-gray-500 transition-transform duration-200 
                            ${isExpanded ? 'rotate-180' : 'rotate-0'}`} 
                    />
                )}
            </div>

            {/* Contenido Expandible */}
            {isExpanded && (
                <div className="border-t border-gray-100">
                    {/* Error State */}
                    {error && (
                        <div className="p-6 text-center">
                            <div className="w-12 h-12 mx-auto bg-red-100 rounded-xl flex items-center justify-center mb-3">
                                <Package2 className="w-6 h-6 text-red-400" />
                            </div>
                            <h4 className="font-semibold text-red-700 mb-1">Error al cargar categorías</h4>
                            <p className="text-xs text-red-600">{error}</p>
                        </div>
                    )}

                    {/* Empty State */}
                    {result && result.length === 0 && (
                        <div className="p-6 text-center">
                            <div className="w-12 h-12 mx-auto bg-gray-100 rounded-xl flex items-center justify-center mb-3">
                                <Package2 className="w-6 h-6 text-gray-400" />
                            </div>
                            <h4 className="font-semibold text-gray-700 mb-1">No hay categorías disponibles</h4>
                            <p className="text-xs text-gray-500">
                                No se encontraron categorías para filtrar.
                            </p>
                        </div>
                    )}

                    {/* Lista de Categorías - Scrollable */}
                    {result && result.length > 0 && (
                        <div className="max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-blue-200 scrollbar-track-gray-100">
                            <div className="p-4 space-y-1">
                                <RadioGroup 
                                    onValueChange={handleCategorySelect}
                                    value={filterCategory}
                                    className="space-y-2"
                                >
                                    {sortedCategories.map((category: CategoryType) => (
                                        <div 
                                            key={category.id} 
                                            className="group relative"
                                        >
                                            <div className={`flex items-center space-x-3 p-3 rounded-lg border transition-all duration-200 cursor-pointer
                                                ${filterCategory === category.categoryName 
                                                    ? 'border-blue-300 bg-blue-50 shadow-sm' 
                                                    : 'border-gray-200 hover:border-blue-200 hover:bg-gray-50'
                                                }`}>
                                                
                                                <RadioGroupItem 
                                                    value={category.categoryName} 
                                                    id={category.categoryName}
                                                    className="text-blue-600 border-gray-300 group-hover:border-blue-400"
                                                />
                                                
                                                <div className={`p-1.5 rounded-md transition-colors duration-200
                                                    ${filterCategory === category.categoryName 
                                                        ? 'bg-blue-100' 
                                                        : 'bg-gray-100 group-hover:bg-blue-50'
                                                    }`}>
                                                    <Package2 className="w-3.5 h-3.5 text-blue-600" />
                                                </div>
                                                
                                                <Label 
                                                    htmlFor={category.categoryName}
                                                    className="flex-1 text-sm text-gray-700 group-hover:text-gray-900 font-medium cursor-pointer"
                                                >
                                                    {category.categoryName}
                                                </Label>
                                                
                                                {filterCategory === category.categoryName && (
                                                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </RadioGroup>
                            </div>
                        </div>
                    )}

                    {/* Footer con indicador de scroll si hay muchas categorías */}
                    {result && result.length > 4 && (
                        <div className="px-4 py-2 bg-gray-50 border-t border-gray-100">
                            <p className="text-xs text-center text-gray-500">
                                ↕ Desliza para ver más opciones
                            </p>
                        </div>
                    )}
                </div>
            )}

            {/* Indicador cuando está cerrado y hay selección */}
            {!isExpanded && selectedCategory && (
                <div className="px-4 py-2 bg-blue-50 border-t border-blue-100">
                    <p className="text-xs text-blue-600 text-center">
                        ✓ {selectedCategory.categoryName} seleccionada
                    </p>
                </div>
            )}
        </div>
    );
}

export default FilterCategory;