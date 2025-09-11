"use client"
import { useGetCategoryProduct } from "@/api/getCategoryProduct"
import { useGetProductsByArea } from "@/api/getProductsByArea"
import { useGetProductsByCategory } from "@/api/getProductsByCategory"
import { useGetAllProducts } from "@/api/getAllProducts"
import { Separator } from "@/components/ui/separator";
import { ResponseType } from "@/types/response";
import { useParams, useRouter } from "next/navigation";
import FiltersControlsCategory from "./components/filters-controls-area";
import SkeletonSchema from "@/components/skeletonSchema";
import ProductCard from "./components/product.card";
import { ProductType } from "@/types/product";
import { ArrowLeft, Filter, Grid3X3, List, Package, Stethoscope } from "lucide-react";
import { useState, useEffect } from "react";
import Breadcrumb from "@/components/BreadCrumbs";
import FilterCategory from "./components/filter-category";
import FilterArea from "./components/filter-area";

export default function Page() {
    const params = useParams();
    const { categorySlug } = params;
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

    const { result: allProducts, loading: allProductsLoading, error: allProductsError }: ResponseType = useGetAllProducts();
    const { result: categoryProducts, loading: categoryLoading, error: categoryError }: ResponseType = useGetCategoryProduct(categorySlug ?? "");
    const [filterArea, setFilterArea] = useState('');
    const [filterCategory, setFilterCategory] = useState('');
    const { result: areaProducts, loading: areaLoading, error: areaError }: ResponseType = useGetProductsByArea(filterArea);
    const { result: categoryFilterProducts, loading: categoryFilterLoading, error: categoryFilterError }: ResponseType = useGetProductsByCategory(filterCategory);
    
    const router = useRouter();
    
    let loading = categoryLoading;
    let error = categoryError;
    let filteredProducts = categoryProducts;
    
    // Si el slug es 'todos', usar todos los productos
    if (categorySlug === 'todos') {
        loading = allProductsLoading;
        error = allProductsError;
        filteredProducts = allProducts;
        
        // Aplicar filtros si están activos
        if (filterArea !== '' && filterCategory === '') {
            loading = areaLoading;
            error = areaError;
            filteredProducts = areaProducts;
        } else if (filterArea === '' && filterCategory !== '') {
            loading = categoryFilterLoading;
            error = categoryFilterError;
            filteredProducts = categoryFilterProducts;
        } else if (filterArea !== '' && filterCategory !== '') {
            loading = categoryFilterLoading || areaLoading;
            error = categoryFilterError || areaError;
            if (categoryFilterProducts && areaProducts) {
                filteredProducts = categoryFilterProducts.filter((product: ProductType) => 
                    product.area === filterArea
                );
            } else {
                filteredProducts = categoryFilterProducts;
            }
        }
    } else {
        // Lógica original para otras categorías
        if (filterArea !== '' && filterCategory === '') {
            loading = areaLoading;
            error = areaError;
            filteredProducts = areaProducts;
        } else if (filterArea === '' && filterCategory !== '') {
            loading = categoryFilterLoading;
            error = categoryFilterError;
            filteredProducts = categoryFilterProducts;
        } else if (filterArea !== '' && filterCategory !== '') {
            loading = categoryFilterLoading || areaLoading;
            error = categoryFilterError || areaError;
            if (categoryFilterProducts && areaProducts) {
                filteredProducts = categoryFilterProducts.filter((product: ProductType) => 
                    product.area === filterArea
                );
            } else {
                filteredProducts = categoryFilterProducts;
            }
        }
    }
    // Determinar el nombre de la categoría o usar 'Todos los Productos' si es la vista general
    const categoryName = categorySlug === 'todos' ? 'Todos los Productos' : categoryProducts?.[0]?.category?.categoryName || '';

    const breadcrumbItems = [
        { label: "Inicio", href: "/" },
        { label: "Categorías", href: "/categoria/todos" },
        {
            label: categoryName || "Cargando...",
            isActive: true
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30">
            {/* Breadcrumbs */}
            <Breadcrumb
                items={breadcrumbItems}
                backButton={{
                    show: true,
                    label: "Regresar"
                }} />


            <div className="max-w-7xl py-8 mx-auto px-6 lg:px-8">
                {/* Header Section - SEO Optimized */}
                {((categoryProducts !== null && !categoryLoading) || (categorySlug === 'todos' && allProducts !== null && !allProductsLoading)) && (
                    <header className="mb-8">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="p-3 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-2xl hidden md:block">
                                <Stethoscope className="w-8 h-8 text-blue-600" />
                            </div>
                            <div className="flex-1">
                                {/* H1 optimizado para SEO */}
                                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                                    {categorySlug === 'todos' ? (
                                        <>
                                            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                                                Todos los Equipos Médicos
                                            </span>
                                        </>
                                    ) : (
                                        <>
                                            <span className="block">Equipos Médicos de</span>
                                            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                                                {categoryProducts[0].category.categoryName}
                                            </span>
                                        </>
                                    )}
                                </h1>

                                {/* Meta descripción para SEO */}
                                <p className="text-lg text-gray-600 leading-relaxed max-w-3xl">
                                    {categorySlug === 'todos' ? (
                                        <>Descubre nuestra completa selección de equipos médicos de alta calidad. Tecnología certificada, calidad garantizada y soporte técnico especializado.</>
                                    ) : (
                                        <>Descubre nuestra selección de equipos médicos especializados en{' '}
                                        <strong>{categoryProducts[0].category.categoryName.toLowerCase()}</strong>.
                                        Tecnología certificada, calidad garantizada y soporte técnico especializado.</>
                                    )}
                                </p>

                                 {/* Información adicional */}
                                <div className="flex items-center gap-6 mt-4">
                                    <div className="flex items-center gap-2">
                                        <Package className="w-5 h-5 text-blue-600" />
                                        <span className="text-sm font-medium text-gray-700">
                                            {categorySlug === 'todos'
                                                ? (Array.isArray(filteredProducts) ? filteredProducts.length : 0)
                                                : (Array.isArray(categoryProducts) ? categoryProducts.length : 0)
                                            } producto
                                            {(categorySlug === 'todos'
                                                ? (Array.isArray(filteredProducts) ? filteredProducts.length : 0)
                                                : (Array.isArray(categoryProducts) ? categoryProducts.length : 0)
                                            ) !== 1 ? 's' : ''} disponible
                                            {(categorySlug === 'todos'
                                                ? (Array.isArray(filteredProducts) ? filteredProducts.length : 0)
                                                : (Array.isArray(categoryProducts) ? categoryProducts.length : 0)
                                            ) !== 1 ? 's' : ''}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                        <span className="text-sm text-gray-600">Envío disponible</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                                        <span className="text-sm text-gray-600">Certificado médico</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Decorative separator */}
                        <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mt-[45px]"></div>
                    </header>
                )}

                {/* Loading state for header */}
                {loading && (
                    <header className="mb-8">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-14 h-14 bg-gray-200 rounded-2xl animate-pulse"></div>
                            <div className="flex-1">
                                <div className="h-8 bg-gray-200 rounded-lg mb-2 animate-pulse"></div>
                                <div className="h-6 bg-gray-200 rounded-lg w-2/3 animate-pulse"></div>
                            </div>
                        </div>
                    </header>
                )}

                <Separator className="my-6" />

                {/* Main Content Layout */}
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar - Filters */}
                    <aside className="lg:w-80 flex-shrink-0">
                        <div className="">
                            <FilterArea 
                                setFilterArea={setFilterArea} 
                                filterArea={filterArea}
                                setFilterCategory={setFilterCategory}
                            />
                        </div>
                        <div className="">
                            <FilterCategory 
                                setFilterCategory={setFilterCategory}
                                filterCategory={filterCategory}
                                setFilterArea={setFilterArea}
                            />
                        </div>
                    </aside>

                    {/* Main Content - Products */}
                    <main className="flex-1">
                        {/* Filtros activos y botón para limpiar */}
                        {(filterArea !== '' || filterCategory !== '') && (
                            <div className="mb-4 p-4 bg-blue-50 rounded-xl border border-blue-100">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="font-medium text-blue-700 mb-1">Filtros activos:</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {filterArea !== '' && (
                                                <div className="bg-white px-3 py-1 rounded-full text-sm border border-blue-200 flex items-center gap-2">
                                                    <span>Área: {filterArea}</span>
                                                    <button 
                                                        onClick={() => setFilterArea('')}
                                                        className="text-blue-500 hover:text-blue-700"
                                                    >
                                                        ×
                                                    </button>
                                                </div>
                                            )}
                                            {filterCategory !== '' && (
                                                <div className="bg-white px-3 py-1 rounded-full text-sm border border-blue-200 flex items-center gap-2">
                                                    <span>Categoría: {filterCategory}</span>
                                                    <button 
                                                        onClick={() => setFilterCategory('')}
                                                        className="text-blue-500 hover:text-blue-700"
                                                    >
                                                        ×
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <button 
                                        onClick={() => {
                                            setFilterArea('');
                                            setFilterCategory('');
                                        }}
                                        className="px-3 py-1 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg text-sm transition-colors duration-200"
                                    >
                                        Limpiar todos
                                    </button>
                                </div>
                            </div>
                        )}
                        
                        {/* Results Header */}
                        {filteredProducts !== null && !loading && (
                            <div className="flex items-center justify-between mb-6 bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                                <div className="flex items-center gap-3">
                                    <Filter className="w-5 h-5 text-blue-600" />
                                    <div>
                                        <h2 className="font-semibold text-gray-900">
                                            Resultados de búsqueda
                                        </h2>
                                        <p className="text-sm text-gray-600">
                                            {Array.isArray(filteredProducts) ? filteredProducts.length : 0} producto{Array.isArray(filteredProducts) && filteredProducts.length !== 1 ? 's' : ''} encontrado{Array.isArray(filteredProducts) && filteredProducts.length !== 1 ? 's' : ''}
                                        </p>
                                    </div>
                                </div>

                                {/* View Mode Toggle */}
                                <div className="flex items-center gap-2">
                                    <span className="text-sm text-gray-600 mr-2">Vista:</span>
                                    <button
                                        onClick={() => setViewMode('grid')}
                                        className={`cursor-pointer p-2 rounded-lg transition-colors duration-200 ${viewMode === 'grid'
                                            ? 'bg-blue-100 text-blue-600'
                                            : 'text-gray-400 hover:text-gray-600'
                                            }`}
                                    >
                                        <Grid3X3 className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => setViewMode('list')}
                                        className={`cursor-pointer p-2 rounded-lg transition-colors duration-200 ${viewMode === 'list'
                                            ? 'bg-blue-100 text-blue-600'
                                            : 'text-gray-400 hover:text-gray-600'
                                            }`}
                                    >
                                        <List className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Products Grid */}
                        <div className={`gap-3 ${viewMode === 'grid'
                            ? 'grid md:grid-cols-2 xl:grid-cols-3'
                            : 'flex flex-col space-y-4'
                            }`}>
                            {/* Loading State */}
                            {loading && (
                                <div className="col-span-full">
                                    <SkeletonSchema grid={6} />
                                </div>
                            )}


                            {filteredProducts !== null && !loading && Array.isArray(filteredProducts) && filteredProducts.map((product: ProductType) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                    viewMode={viewMode}
                                />
                            ))}

                            {/* Empty State */}
                            {filteredProducts !== null && !loading && filteredProducts.length === 0 && (
                                <div className="col-span-full text-center py-12">
                                    <div className="w-24 h-24 mx-auto bg-gray-100 rounded-2xl flex items-center justify-center mb-4">
                                        <Package className="w-12 h-12 text-gray-400" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-700 mb-2">
                                        No se encontraron productos
                                    </h3>
                                    <p className="text-gray-500 max-w-md mx-auto">
                                        No hay productos disponibles en esta categoría en este momento.
                                        Intenta ajustar los filtros o revisa otras categorías.
                                    </p>
                                </div>
                            )}

                            {/* Error State */}
                            {error && (
                                <div className="col-span-full text-center py-12">
                                    <div className="bg-red-50 border border-red-200 rounded-xl p-8 max-w-md mx-auto">
                                        <h3 className="text-lg font-semibold text-red-700 mb-2">
                                            Error al cargar productos
                                        </h3>
                                        <p className="text-red-600 text-sm">{error}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}
