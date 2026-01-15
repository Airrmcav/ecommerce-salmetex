"use client"
import { useLovedProducts } from "@/hooks/use-loved-products"
import LovedItemsProduct from "./components/loved-item-products"
import { Stethoscope, ShoppingCart, Star, Filter, Activity, Package, CheckCheckIcon } from "lucide-react"
import { useRouter } from "next/navigation";
import Breadcrumb from "@/components/BreadCrumbs";

export default function Page() {
    const { lovedItems } = useLovedProducts()
    const router = useRouter();

    const breadcrumbItems = [
        { label: "Inicio", href: "/" },
        {
            label: "Productos Favoritos",
            isActive: true
        }
    ];


    return (
        <div className="min-h-screen bg-white max-w-5xl mx-auto">
            {/* Breadcrumbs */}
            <Breadcrumb
                items={breadcrumbItems}
                backButton={{
                    show: true,
                    label: "Regresar"
                }} />

            <div className="container mx-auto px-6 py-2 mt-3">
                {/* Header Section */}
                <div className="mb-12">
                    <div className="flex items-center mb-6">
                        <div className="bg-blue-600 p-3 rounded-lg mr-4">
                            <Stethoscope className="w-8 h-8 text-white" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                Equipos Médicos Seleccionados
                            </h1>
                            <p className="text-gray-600 text-lg">
                                Lista personalizada de equipamiento médico profesional
                            </p>
                        </div>
                    </div>

                    <div className="bg-white border-l-4 border-blue-600 p-4 rounded-r-lg shadow-sm">
                        <p className="text-gray-700 leading-relaxed">
                            Mantenga un registro de los equipos médicos de su interés para facilitar
                            futuras consultas y procesos de adquisición. Todos los productos están
                            certificados y cumplen con estándares internacionales de calidad médica.
                        </p>
                    </div>

                    {lovedItems.length > 0 && (
                        <div className="mt-3 flex items-center gap-4">
                            <div className="bg-blue-50 border border-blue-200 px-4 py-2 rounded-lg flex items-center">
                                <Package className="w-4 h-4 text-blue-600 mr-2" />
                                <span className="text-blue-800 font-medium">
                                    {lovedItems.length} {lovedItems.length === 1 ? 'equipo seleccionado' : 'equipos seleccionados'}
                                </span>
                            </div>
                            <div className="bg-green-50 border border-green-200 px-4 py-2 rounded-lg flex items-center">
                                <Activity className="w-4 h-4 text-green-600 mr-2" />
                                <span className="text-green-800 font-medium">
                                    Disponible para cotización
                                </span>
                            </div>
                        </div>
                    )}
                </div>

                {/* Content Section */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    {lovedItems.length === 0 ? (
                        <div className="text-center py-20 px-8">
                            <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Package className="w-10 h-10 text-gray-400" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-3">
                                No hay equipos seleccionados
                            </h3>
                            <p className="text-gray-600 max-w-md mx-auto mb-8 leading-relaxed">
                                Explore nuestro catálogo de equipamiento médico profesional y
                                marque los productos de su interés para crear su lista personalizada.
                            </p>
                            <div className="space-y-3">
                                <button
                                    onClick={() => router.push("/categoria/todos")}
                                    className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200 inline-flex items-center">
                                    <Stethoscope className="w-5 h-5 mr-2" />
                                    Explorar Catálogo
                                </button>
                                <div className="text-sm text-gray-500">
                                    <span>○ Equipos certificados</span>
                                    <span className="mx-2">○</span>
                                    <span>Garantía internacional</span>
                                    <span className="mx-2">○</span>
                                    <span>Soporte técnico</span>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div>
                            {/* Toolbar */}
                            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                                <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                                    <div className="flex items-center text-gray-700">
                                        <Star className="w-4 h-4 mr-2 text-yellow-500" />
                                        <span className="font-medium">{lovedItems.length}</span>
                                        <span className="ml-1">equipos médicos seleccionados</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        
                                        <button className="px-4 py-2 flex gap-3 items-center bg-white border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium text-gray-700 transition-colors">
                                            <CheckCheckIcon className="text-green-600"/> Vista Lista
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Products Grid */}
                            <div className="p-6">
                                <div className="flex flex-col gap-6">
                                    {lovedItems.map((item) => (
                                        <LovedItemsProduct
                                            key={item.id}
                                            product={item}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Action Section */}
                {lovedItems.length > 0 && (
                    <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8 border border-blue-100">
                        <div className="max-w-4xl mx-auto text-center">
                            <h3 className="text-2xl font-bold text-gray-900 mb-3">
                                Solicitar Cotización Profesional
                            </h3>
                            <p className="text-gray-700 mb-8 max-w-2xl mx-auto leading-relaxed">
                                Nuestro equipo de especialistas médicos está listo para proporcionarle
                                una cotización detallada con precios preferenciales y opciones de financiamiento.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                                <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-all duration-200 inline-flex items-center shadow-lg hover:shadow-xl">
                                    <ShoppingCart className="w-5 h-5 mr-2" />
                                    Solicitar Cotización
                                </button>
                                {/* <button className="bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-lg font-medium transition-colors duration-200">
                                    Descargar Lista PDF
                                </button> */}
                                <div className="text-sm text-gray-600 sm:ml-4">
                                    <div className="flex items-center">
                                        <Activity className="w-4 h-4 mr-1 text-green-500" />
                                        <span>Respuesta en 24 horas</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Info Footer */}
                <div className="mt-8 text-center text-sm text-gray-500">
                    <p>Todos los equipos médicos cuentan con certificaciones y garantía.</p>
                </div>
            </div>
        </div>
    )
}