"use client"

import { useMemo } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import Breadcrumb from "@/components/BreadCrumbs"
import { useGetProductsByArea } from "@/api/getProductsByArea"
import { useGetCategories } from "@/api/getProducts"
import { ProductType } from "@/types/product"
import { ResponseType } from "@/types/response"
import { Badge } from "@/components/ui/badge"
import IconButton from "@/components/icon-button"
import { Heart, CheckCircle, XCircle, ShoppingCart } from "lucide-react"
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

    const groupedByCategory = useMemo(() => {
        const map: Record<string, ProductType[]> = {}
        if (Array.isArray(result)) {
            result.forEach((p: ProductType) => {
                const key = p?.category?.categoryName || "Sin categoría"
                if (!map[key]) map[key] = []
                map[key].push(p)
            })
        }
        return map
    }, [result])

    const getCategoryIcon = (categoryName: string) => {
        const name = categoryName.toLowerCase()
        if (name.includes("quirúrgico") || name.includes("quirurgico") || name.includes("cirugía")) {
            return <Scissors className="w-6 h-6" />
        }
        if (name.includes("inyectable") || name.includes("jeringa")) {
            return <Syringe className="w-6 h-6" />
        }
        if (name.includes("curación") || name.includes("vendaje") || name.includes("gasa")) {
            return <Bandage className="w-6 h-6" />
        }
        if (name.includes("medicamento") || name.includes("fármaco")) {
            return <Pill className="w-6 h-6" />
        }
        if (name.includes("cardio") || name.includes("corazón")) {
            return <Heart className="w-6 h-6" />
        }
        if (name.includes("monitoreo") || name.includes("diagnóstico")) {
            return <Activity className="w-6 h-6" />
        }
        if (name.includes("protección") || name.includes("seguridad")) {
            return <ShieldPlus className="w-6 h-6" />
        }
        return <Stethoscope className="w-6 h-6" />
    }

    const breadcrumbItems = [
        { label: "Inicio", href: "/" },
        { label: "Insumos Médicos" }
    ]

    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
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
                    Object.entries(groupedByCategory).length > 0 ? (
                        Object.entries(groupedByCategory).map(([categoryName, products]) => (
                            <section key={categoryName} className="mb-16">
                                <div className="relative mb-6">
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t-2 border-emerald-200"></div>
                                    </div>
                                    <div className="relative flex justify-center">
                                        <div className="bg-gradient-to-br from-emerald-50 via-white to-teal-50 px-6 py-2 rounded-full shadow-sm border border-emerald-100 flex items-center gap-3">
                                            <div className="text-emerald-700">
                                                {getCategoryIcon(categoryName)}
                                            </div>
                                            <h2 className="text-2xl font-bold text-emerald-700">
                                                {categoryName}
                                            </h2>
                                        </div>
                                    </div>
                                </div>
                                {categoryDescriptions[categoryName] && (
                                    <p className="text-sm text-gray-600 mb-6 text-center max-w-3xl mx-auto">
                                        {categoryDescriptions[categoryName]}
                                    </p>
                                )}
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                    {products.map((product: ProductType) => {
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
                            </section>
                        ))
                    ) : (
                        <div className="text-center py-10">No hay productos disponibles en esta área.</div>
                    )
                )}
            </div>
        </div>
    )
}
