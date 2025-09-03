import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { formatPrice } from "@/lib/formatPrice";
import { ProductType } from "@/types/product";
import { 
    Heart, 
    ShoppingCart, 
    CheckCircle, 
    XCircle,
    Share2,
    Facebook,
    Twitter,
    Instagram,
    Mail,
    Shield,
    CreditCard,
    Plus,
    Minus
} from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { useLovedProducts } from "@/hooks/use-loved-products";
import { useState } from "react";

export type InfoProductProps = {
    product: ProductType
}

const InfoProduct = (props: InfoProductProps) => {
    const { product } = props;
    const { addItem, items } = useCart();
    const { addLoveItems } = useLovedProducts();
    const [quantity, setQuantity] = useState(1);
        // console.log(items);
    
    const handleIncrement = () => {
        setQuantity(prev => prev + 1);
    };
    
    const handleDecrement = () => {
        setQuantity(prev => prev > 1 ? prev - 1 : 1);
    };
    
    const handleAddToCart = () => {
        const productWithQuantity = { ...product, quantity };
        addItem(productWithQuantity);
    };
    

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white">
            
            {/* Nombre del Producto */}
            <h1 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">
                {product.productName}
            </h1>
            
            {/* Categoría */}
            <div className="mb-4">
                <Badge variant="outline" className="px-4 py-2 text-base font-medium bg-blue-50 text-blue-700 border-blue-200">
                    {product.category.categoryName}
                </Badge>
                {product.area && (
                    <Badge variant="outline" className="ml-2 px-4 py-2 text-base font-medium bg-gray-50 text-gray-700 border-gray-200">
                        {product.area}
                    </Badge>
                )}
            </div>

            {/* Disponibilidad */}
            <div className="mb-6">
                <Badge 
                    className={`${product.active 
                        ? "bg-green-100 text-green-800 border-green-300" 
                        : "bg-red-100 text-red-800 border-red-300"
                    } px-4 py-2 text-base font-medium border`}
                >
                    {product.active ? (
                        <>
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Disponible
                        </>
                    ) : (
                        <>
                            <XCircle className="w-4 h-4 mr-2" />
                            No Disponible
                        </>
                    )}
                </Badge>
            </div>

            {/* Precio */}
            <div className="mb-6">
                <span className="text-4xl font-bold text-gray-900">
                    {product.price ? formatPrice(product.price) : "Consultar precio"}
                </span>
                <span className="text-gray-600 ml-2">IVA incluido</span>
            </div>

            {/* Control de cantidad */}
            {product.price && product.price > 0 && (
                <div className="flex items-center mb-4">
                    <span className="text-gray-700 mr-4">Cantidad:</span>
                    <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                        <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={handleDecrement}
                            className="h-10 w-10 rounded-none border-r border-gray-300"
                            disabled={quantity <= 1}
                        >
                            <Minus className="h-4 w-4" />
                        </Button>
                        <div className="h-10 w-12 flex items-center justify-center text-gray-900 font-medium">
                            {quantity}
                        </div>
                        <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={handleIncrement}
                            className="h-10 w-10 rounded-none border-l border-gray-300"
                        >
                            <Plus className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            )}
            
            {/* Botones de Agregar al Carrito y Favoritos */}
            <div className="flex gap-4 mb-6">
                <Button 
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 text-lg font-medium rounded-lg"
                    disabled={!product.active || !product.price || product.price <= 0}
                    onClick={handleAddToCart}
                    title={!product.price || product.price <= 0 ? "Este producto no tiene precio definido" : "Agregar al carrito"}
                >
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    {!product.price || product.price <= 0 ? "Consultar precio" : "Agregar al Carrito"}
                </Button>
                
                <Button 
                    variant="outline" 
                    onClick={() => addLoveItems(product)}
                    className="px-4 py-3 border-2 border-gray-300 hover:border-red-400 hover:bg-red-50 rounded-lg group cursor-pointer"
                >
                    <Heart  className="w-5 h-5 group-hover:fill-red-400 group-hover:text-red-400 transition-all" />
                </Button>
            </div>

            {/* Sección Compartir */}
            <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                    <Share2 className="w-5 h-5 text-gray-600" />
                    <span className="font-medium text-gray-900">Compartir</span>
                </div>
                <div className="flex gap-3">
                    <Button 
                        variant="outline" 
                        size="sm"
                        className="flex items-center gap-2 px-4 py-2 bg-blue-50 border-blue-200 hover:bg-blue-100 text-blue-700"
                    >
                        <Facebook className="w-4 h-4" />
                        Facebook
                    </Button>
                    
                    <Button 
                        variant="outline" 
                        size="sm"
                        className="flex items-center gap-2 px-4 py-2 bg-gray-50 border-gray-200 hover:bg-gray-100 text-gray-700"
                    >
                        <Twitter className="w-4 h-4" />
                        X
                    </Button>
                    
                    <Button 
                        variant="outline" 
                        size="sm"
                        className="flex items-center gap-2 px-4 py-2 bg-pink-50 border-pink-200 hover:bg-pink-100 text-pink-700"
                    >
                        <Instagram className="w-4 h-4" />
                        Instagram
                    </Button>
                    
                    <Button 
                        variant="outline" 
                        size="sm"
                        className="flex items-center gap-2 px-4 py-2 bg-gray-50 border-gray-200 hover:bg-gray-100 text-gray-700"
                    >
                        <Mail className="w-4 h-4" />
                        Correo
                    </Button>
                </div>
            </div>

            {/* Botón Pago Seguro */}
            <div className="mb-8">
                <Button 
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-4 px-6 text-lg font-medium rounded-lg flex items-center justify-center gap-3"
                    disabled={!product.active}
                >
                    <Shield className="w-5 h-5" />
                    Pago Seguro
                    <CreditCard className="w-5 h-5" />
                </Button>
                
                {/* Tarjetas Aceptadas */}
                <div className="mt-3 text-center">
                    <p className="text-sm text-gray-600 mb-2">Aceptamos:</p>
                    <div className="flex justify-center items-center gap-2">
                        <div className="px-3 py-1 bg-blue-100 rounded text-xs font-medium text-blue-800">
                            VISA
                        </div>
                        <div className="px-3 py-1 bg-red-100 rounded text-xs font-medium text-red-800">
                            MASTERCARD
                        </div>
                        <div className="px-3 py-1 bg-blue-100 rounded text-xs font-medium text-blue-800">
                            AMEX
                        </div>
                        <div className="px-3 py-1 bg-green-100 rounded text-xs font-medium text-green-800">
                            PAYPAL
                        </div>
                    </div>
                </div>
            </div>

            <Separator className="my-6" />

            {/* Descripción */}
            <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Descripción</h3>
                <p className="text-gray-700 leading-relaxed">
                    {product.description}
                </p>
            </div>

            {/* Características */}
            {Array.isArray(product.characteristics) && product.characteristics.length > 0 && (
                <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Características</h3>
                    <div className="space-y-3">
                        {product.characteristics.map((characteristic: string, index: number) => (
                            <div 
                                key={index}
                                className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg"
                            >
                                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                                <span className="text-gray-700">
                                    {characteristic}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default InfoProduct;