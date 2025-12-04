"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import Breadcrumb from "@/components/BreadCrumbs"
import { useGetProductsByArea } from "@/api/getProductsByArea"
import { useGetCategories } from "@/api/getProducts"
import { ProductType } from "@/types/product"
import { ResponseType } from "@/types/response"
import { Badge } from "@/components/ui/badge"
import IconButton from "@/components/icon-button"
import { Heart, CheckCircle, XCircle, ShoppingCart, Filter, X } from "lucide-react"
import { useRouter } from "next/navigation"
import { useCart } from "@/hooks/use-cart"
import { useLovedProducts } from "@/hooks/use-loved-products"
import { Stethoscope, Syringe, Scissors, Bandage, Pill, Activity, ShieldPlus } from "lucide-react"

export default function Page() {
    const AREA = "Insumos Médicos"
    const { result, loading, error }: ResponseType = useGetProductsByArea(AREA)
    const { result: categoriesData }: ResponseType = useGetCategories()
    const router = useRouter()
    const { addItem } = useCart()
    const { addLoveItems } = useLovedProducts()
    
    const [selectedCategories, setSelectedCategories] = useState<string[]>([])
    const [showMobileFilters, setShowMobileFilters] = useState(false)

    const categoryDescriptions = useMemo(() => {
        const map: Record<string, string> = {}
        if (Array.isArray(categoriesData)) {
            categoriesData.forEach((item: any) => {
                const name = item?.attributes ? item.attributes.categoryName : item?.categoryName
                const desc = item?.attributes ? item.attributes.description : item?.description
                if (name && typeof name === "string") {
                    map[name] = typeof desc === "string" ? desc : ""
                }
            })
        }
        return map
    }, [categoriesData])

    const categoriesWithCount = useMemo(() => {
        const map: Record<string, number> = {}
        if (Array.isArray(result)) {
            result.forEach((p: ProductType) => {
                const key = p?.category?.categoryName || "Sin categoría"
                map[key] = (map[key] || 0) + 1
            })
        }
        return Object.entries(map).map(([name, count]) => ({ name, count }))
    }, [result])

    const filteredProducts = useMemo(() => {
        if (!Array.isArray(result)) return []
        if (selectedCategories.length === 0) return result
        
        return result.filter((p: ProductType) => {
            const categoryName = p?.category?.categoryName || "Sin categoría"
            return selectedCategories.includes(categoryName)
        })
    }, [result, selectedCategories])

    const toggleCategory = (categoryName: string) => {
        setSelectedCategories(prev => 
            prev.includes(categoryName)
                ? prev.filter(c => c !== categoryName)
                : [...prev, categoryName]
        )
    }

    const clearFilters = () => {
        setSelectedCategories([])
    }

    const getCategoryIcon = (categoryName: string) => {
        const name = categoryName.toLowerCase()
        if (name.includes("quirúrgico") || name.includes("quirurgico") || name.includes("cirugía")) {
            return <Scissors className="w-5 h-5" />
        }
        if (name.includes("inyectable") || name.includes("jeringa")) {
            return <Syringe className="w-5 h-5" />
        }
        if (name.includes("curación") || name.includes("vendaje") || name.includes("gasa")) {
            return <Bandage className="w-5 h-5" />
        }
        if (name.includes("medicamento") || name.includes("fármaco")) {
            return <Pill className="w-5 h-5" />
        }
        if (name.includes("cardio") || name.includes("corazón")) {
            return <Heart className="w-5 h-5" />
        }
        if (name.includes("monitoreo") || name.includes("diagnóstico")) {
            return <Activity className="w-5 h-5" />
        }
        if (name.includes("protección") || name.includes("seguridad")) {
            return <ShieldPlus className="w-5 h-5" />
        }
        return <Stethoscope className="w-5 h-5" />
    }

    const breadcrumbItems = [
        { label: "Inicio", href: "/" },
        { label: "Insumos Médicos" }
    ]

    const FilterSidebar = ({ mobile = false }) => (
        <div className={`${mobile ? 'fixed inset-0 z-50 bg-black/50' : ''}`}>
            <div className={`bg-white rounded-xl shadow-lg p-6 ${mobile ? 'fixed right-0 top-0 bottom-0 w-80 overflow-y-auto' : 'sticky top-4'}`}>
                {mobile && (
                    <div className="flex items-center justify-between mb-6 pb-4 border-b">
                        <h3 className="text-lg font-bold text-gray-900">Filtros</h3>
                        <button
                            onClick={() => setShowMobileFilters(false)}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                )}
                
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                        <Filter className="w-5 h-5 text-emerald-600" />
                        Categorías
                    </h3>
                    {selectedCategories.length > 0 && (
                        <button
                            onClick={clearFilters}
                            className="text-sm text-blue-600 hover:text-blue-700 font-medium cursor-pointer"
                        >
                            Limpiar
                        </button>
                    )}
                </div>

                <div className="space-y-2">
                    {categoriesWithCount.map(({ name, count }) => {
                        const isSelected = selectedCategories.includes(name)
                        return (
                            <button
                                key={name}
                                onClick={() => toggleCategory(name)}
                                className={`w-full flex items-center justify-between p-3 rounded-lg transition-all duration-200 ${
                                    isSelected
                                        ? 'bg-emerald-50 border-2 border-emerald-500'
                                        : 'bg-gray-50 border-2 border-transparent hover:bg-gray-100 cursor-pointer'
                                }`}
                            >
                                <div className="flex items-center gap-3 ">
                                    <div className={`${isSelected ? 'text-emerald-600' : 'text-gray-600'}`}>
                                        {getCategoryIcon(name)}
                                    </div>
                                    <span className={`text-sm font-medium text-left  ${
                                        isSelected ? 'text-emerald-700' : 'text-gray-700'
                                    }`}>
                                        {name}
                                    </span>
                                </div>
                                <Badge className={`${
                                    isSelected 
                                        ? 'bg-emerald-600 text-white' 
                                        : 'bg-gray-200 text-gray-700'
                                } rounded-full`}>
                                    {count}
                                </Badge>
                            </button>
                        )
                    })}
                </div>

                {selectedCategories.length > 0 && (
                    <div className="mt-6 pt-4 border-t">
                        <p className="text-sm text-gray-600">
                            Mostrando <span className="font-bold text-emerald-600">{filteredProducts.length}</span> de {result?.length || 0} productos
                        </p>
                    </div>
                )}
            </div>
        </div>
    )

    return (
        <div className="min-h-screen bg-gradient-to-br from-cyan-300 via-white to-teal-500">
            <Breadcrumb
                items={breadcrumbItems}
                backButton={{ show: true, label: "Regresar" }}
            />
            <div className="max-w-7xl mx-auto px-6 py-8">
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-full mb-4">
                        <Stethoscope className="w-8 h-8 text-emerald-700" />
                    </div>
                    <h1 className="text-4xl font-bold text-gray-900">Insumos Médicos</h1>
                    <p className="text-gray-600 mt-2">Productos del área de Insumos Médicos</p>
                </div>

                {/* Botón de filtros móvil */}
                <div className="lg:hidden mb-6">
                    <button
                        onClick={() => setShowMobileFilters(true)}
                        className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-lg font-medium transition-colors"
                    >
                        <Filter className="w-5 h-5" />
                        Filtrar por categoría
                        {selectedCategories.length > 0 && (
                            <Badge className="bg-white text-emerald-600 ml-2">
                                {selectedCategories.length}
                            </Badge>
                        )}
                    </button>
                </div>

                {loading && (
                    <div className="text-center py-10">
                        <Activity className="w-8 h-8 text-emerald-600 animate-pulse mx-auto mb-2" />
                        Cargando productos...
                    </div>
                )}

                {error && !loading && (
                    <div className="text-center py-10 text-red-600">Error al cargar productos</div>
                )}

                {!loading && !error && (
                    <div className="flex gap-8">
                        {/* Sidebar de filtros (desktop) */}
                        <aside className="hidden lg:block w-80 flex-shrink-0">
                            <FilterSidebar />
                        </aside>

                        {/* Sidebar de filtros (mobile) */}
                        {showMobileFilters && (
                            <FilterSidebar mobile />
                        )}

                        {/* Grid de productos */}
                        <div className="flex-1">
                            {selectedCategories.length > 0 && (
                           
                                <div className="mb-6 flex flex-wrap gap-2 items-center">
                                    <div className="flex gap-2">
                                        <Filter className="w-5 h-5" />
                                     Filtros Aplicados: 
                                    </div>
                                    {selectedCategories.map(cat => (
                                        <Badge
                                            key={cat}
                                            className="bg-emerald-100 text-emerald-700 px-5 py-3 text-md flex items-center gap-2"
                                        >
                                            {cat}
                                            <button
                                                onClick={() => toggleCategory(cat)}
                                                className="hover:bg-emerald-200 rounded-full cursor-pointer"
                                            >
                                                <X className="w-5 h-5 bg-red-300 rounded-full" />
                                            </button>
                                        </Badge>
                                    ))}
                                </div>
                            )}

                            {filteredProducts.length > 0 ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                                    {filteredProducts.map((product: ProductType) => {
                                        const imageUrl = product.images?.[0]?.url
                                        const { productName, description, active, price, slug } = product
                                        return (
                                            <Card key={product.id} className="group h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-white rounded-2xl overflow-hidden">
                                                <CardContent className="p-0 h-full flex flex-col">
                                                    <div className="relative overflow-hidden bg-white h-48 flex items-center justify-center">
                                                        {imageUrl ? (
                                                            <img
                                                                src={imageUrl}
                                                                alt={productName}
                                                                className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-300"
                                                                loading="lazy"
                                                            />
                                                        ) : (
                                                            <div className="w-full h-full flex items-center justify-center bg-gray-100">
                                                                <span className="text-4xl">🏥</span>
                                                            </div>
                                                        )}

                                                        <div className="absolute top-4 right-4">
                                                            <Badge
                                                                variant={active ? "default" : "secondary"}
                                                                className={`flex items-center gap-1 px-3 py-1 rounded-full font-medium ${active
                                                                    ? "bg-green-100 text-green-800 border-green-200"
                                                                    : "bg-red-100 text-red-800 border-red-200"
                                                                    }`}
                                                            >
                                                                {active ? (
                                                                    <CheckCircle className="w-3 h-3" />
                                                                ) : (
                                                                    <XCircle className="w-3 h-3" />
                                                                )}
                                                                {active ? "Disponible" : "No Disponible"}
                                                            </Badge>
                                                        </div>

                                                        <IconButton onClick={() => addLoveItems(product)} icon={<Heart className="w-4 h-4 text-gray-800 hover:text-red-500 transition-colors" />} className="absolute top-3 left-3 p-2 rounded-full bg-gray-300/5 backdrop-blur-sm hover:bg-white transition-all duration-200 group-hover:opacity-100" aria-label="Agregar a favoritos" title="Agregar a favoritos" />

                                                        <div className="absolute bottom-3 left-3">
                                                            <Badge className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-full text-xs font-medium">
                                                                {product?.category?.categoryName || "Categoría"}
                                                            </Badge>
                                                        </div>
                                                    </div>

                                                    <div className="p-4 flex-1 flex flex-col min-h-[220px]">
                                                        <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200 min-h-[56px] flex items-start">
                                                            {productName}
                                                        </h3>

                                                        <p className="text-gray-600 text-sm leading-relaxed mb-3 flex-1 line-clamp-2 min-h-[40px]">
                                                            {description || "Equipo médico de alta calidad diseñado para proporcionar resultados precisos y confiables en entornos clínicos profesionales."}
                                                        </p>

                                                        {price && price > 0.00 && (
                                                            <div className="mb-4">
                                                                <span className="text-2xl font-bold text-blue-600">
                                                                    ${price.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                                                                </span>
                                                                <span className="text-gray-500 text-sm ml-1">MXN</span>
                                                            </div>
                                                        )}

                                                        <div className="flex gap-2 mt-auto">
                                                            <button
                                                                onClick={() => {
                                                                    if (slug === "productos-destacados") {
                                                                        router.push(`/productos-destacados`)
                                                                    } else {
                                                                        router.push(`/product/${slug}`)
                                                                    }
                                                                }}
                                                                className={`cursor-pointer flex-1 py-2.5 px-3 rounded-lg font-medium text-sm transition-all duration-200 ${active
                                                                    ? "bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg"
                                                                    : "bg-gray-100 text-gray-400 cursor-not-allowed"
                                                                    }`}
                                                                disabled={!active}
                                                                aria-label={`Ver detalles de ${productName}`}
                                                            >
                                                                Ver Detalles
                                                            </button>
                                                            <IconButton
                                                                onClick={() => {
                                                                    const productWithQuantity = { ...product, quantity: 1 }
                                                                    addItem(productWithQuantity)
                                                                }}
                                                                icon={<ShoppingCart size={20} />}
                                                                className={`${(!product.price || product.price <= 0) ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'} text-white shadow-md hover:shadow-lg`}
                                                                disabled={!product.price || product.price <= 0}
                                                                title={!product.price || product.price <= 0 ? "Este producto no tiene precio definido" : "Agregar al carrito"}
                                                                aria-label={!product.price || product.price <= 0 ? "Este producto no tiene precio definido" : `Agregar ${productName} al carrito`}
                                                            />
                                                        </div>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        )
                                    })}
                                </div>
                            ) : (
                                <div className="text-center py-20">
                                    <Filter className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                    <p className="text-gray-500 text-lg">No hay productos que coincidan con los filtros seleccionados</p>
                                    <button
                                        onClick={clearFilters}
                                        className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
                                    >
                                        Limpiar filtros
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}