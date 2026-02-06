"use client"

import { useGetProductBySlug } from "@/api/useGetProductBySlug";
import { useParams } from "next/navigation"
import SkeletonProduct from "./skeleton-product";
import CarouselProduct from "./carousel-product";
import Breadcrumb from "@/components/BreadCrumbs";
import InfoProduct from "./info-product";
import { ProductType } from "@/types/product";
import { renderCharacteristics } from "./renderCharacteristics";

export default function ProductClient() {
    const params = useParams();
    const productSlug = params?.productSlug;
    const category = params?.categorySlug || '';


    if (typeof productSlug === "undefined") {
        return <SkeletonProduct />
    }

    const { result, loading, error } = useGetProductBySlug(productSlug);

    if (result == null || loading) {
        return <SkeletonProduct />
    }
    const product = result[0] as ProductType;
    if (!product) {
        return <SkeletonProduct />
    }
    const area = product.area ?? "";

    const breadcrumbItems = [
        { label: "Inicio", href: "/" },
        {
            label: area,
            href: `/categoria/todos?area=${area.replace(/\s+/g, "+")}`,
        },
        {
            label: `${product.category.categoryName}`, href: `/categoria/${product.category.categoryName
                .toLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .replace(/\s+/g, "-")
                }`
        },
        {
            label: `${product.productName}`
        }
    ];

    let parsedCharacteristics: any = {};
    try {
        if (product.characteristics) {
            parsedCharacteristics = typeof product.characteristics === 'string'
                ? JSON.parse(product.characteristics)
                : product.characteristics;
        }
    } catch (error) {
        console.error('Error parsing characteristics:', error);
        parsedCharacteristics = {};
    }

    return (
        <div className="min-h-screen bg-linear-to-br from-gray-50 to-blue-50/30">
            <Breadcrumb
                items={breadcrumbItems}
                backButton={{
                    show: true,
                    label: "Regresar"
                }} />

            <div className="max-w-7xl mx-auto">
                {product.textSeo && (
                    <p className="text-center py-5 text-3xl text-gray-500">
                        {product.textSeo}
                    </p>
                )}

                <div className="grid sm:grid-cols-2">
                    <div>
                        <CarouselProduct
                            images={product.images && product.images.length > 0 ? product.images.map(img => ({
                                id: img.id,
                                url: img.url,
                                alternativeText: img.alternativeText ?? undefined,
                            })) : []}
                            productName={product.productName}
                        />
                    </div>
                    <div className="sm:px-12">
                        <InfoProduct product={product} />
                    </div>
                </div>

                {/* Sección de Características */}
                <div className="mt-12 bg-linear-to-br from-white to-slate-50/50 rounded-3xl shadow-xl border border-slate-200/50 overflow-hidden">
                    {/* Header con lineare */}
                    <div className="bg-linear-to-r from-slate-800 via-blue-900 to-indigo-900 p-8 text-white relative overflow-hidden">
                        <div className="absolute inset-0 bg-black/10"></div>
                        <div className="relative z-10">
                            <div className="flex items-center gap-4 mb-3">
                                <div className="w-12 h-12 bg-white/20 rounded-xl backdrop-blur-sm flex items-center justify-center">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                                    </svg>
                                </div>
                                <h2 className="text-3xl font-bold">Especificaciones Técnicas</h2>
                            </div>
                            <p className="text-blue-100 text-lg opacity-90">
                                Información detallada y certificaciones médicas del producto
                            </p>
                        </div>
                        {/* Patrón decorativo */}
                        <div className="absolute top-0 right-0 w-40 h-40 opacity-10">
                            <svg viewBox="0 0 100 100" className="w-full h-full">
                                <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="1" />
                                <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="1" />
                                <circle cx="50" cy="50" r="15" fill="currentColor" />
                            </svg>
                        </div>
                    </div>
                    {/* Sección dinámica de características */}
                    {parsedCharacteristics && Object.keys(parsedCharacteristics).length > 0 ? (
                        <div className="mt-3 p-5">
                            {renderCharacteristics(parsedCharacteristics)}
                        </div>
                    ) : (
                        <div className="text-center p-12">
                            <p className="text-slate-500">Sin especificaciones disponibles</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}