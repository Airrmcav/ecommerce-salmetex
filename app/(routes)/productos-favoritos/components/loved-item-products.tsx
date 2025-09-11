import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/hooks/use-cart";
import { useLovedProducts } from "@/hooks/use-loved-products";
import { formatPrice } from "@/lib/formatPrice";
import { cn } from "@/lib/utils";
import { ProductType } from "@/types/product";
import { toast } from "sonner";
import {
    X,
    ShoppingCart,
    Heart,
    AlertCircle,
    CheckCircle,
    Stethoscope,
    ShieldCheck
} from "lucide-react";
import { useState } from "react";

interface LovedItemProductProps {
    product: ProductType;
    className?: string;
}

const LovedItemsProduct = ({ product, className }: LovedItemProductProps) => {
    const { removeLovedItem } = useLovedProducts();
    const { addItem, items } = useCart();
    const [isAddingToCart, setIsAddingToCart] = useState(false);

    // Verificar si el producto ya está en el carrito
    const isInCart = items.some(item => item.id === product.id);
    const cartItem = items.find(item => item.id === product.id);

    const addToCheckout = async () => {
        // Si el producto no tiene precio, no permitir agregarlo al carrito
        if (!product.price || product.price <= 0) {
            toast.error("No se puede agregar al carrito", {
                description: `${product.productName} no tiene precio definido. Por favor, consulta con nosotros.`,
                duration: 3000,
                style: {
                    background: '#fef2f2',
                    border: '1px solid #fecaca',
                    color: '#dc2626'
                }
            });
            return;
        }
        
        setIsAddingToCart(true);

        try {
            // Agregar el producto con cantidad 1 por defecto
            const productWithQuantity = { ...product, quantity: 1 };
            addItem(productWithQuantity);
            // Quitar el producto de favoritos después de agregarlo al carrito
            removeLovedItem(product.id);
        } finally {
            setTimeout(() => setIsAddingToCart(false), 500);
        }
    };

    const handleRemoveFromFavorites = () => {
        removeLovedItem(product.id);
    };

    // Determinar el estado de disponibilidad basado en active
    const getAvailabilityStatus = () => {
        if (product.active) {
            return { status: 'available', label: 'Disponible', color: 'success' };
        } else {
            return { status: 'unavailable', label: 'No disponible', color: 'destructive' };
        }
    };

    const availabilityInfo = getAvailabilityStatus();

    return (
        <div className={cn(
            "bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300 group mb-4 w-full",
            className
        )}>
            <div className="flex flex-col sm:flex-row gap-6">
                {/* Imagen del producto */}
                <div className="flex-shrink-0 self-center sm:self-start">
                    <div className="w-48 h-48 sm:w-32 sm:h-32 bg-white rounded-lg overflow-hidden border group-hover:shadow-md transition-shadow relative mx-auto">
                        {product.images?.[0]?.url ? (
                            <img
                                src={product.images[0].url}
                                alt={product.productName}
                                className="w-full h-full object-contain"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                                <Stethoscope size={32} />
                            </div>
                        )}

                    </div>
                </div>

                {/* Contenido principal */}
                <div className="flex-1 flex flex-col justify-between">
                    {/* Información del producto */}
                    <div className="space-y-3">
                        {/* Header con título y categoría */}
                        <div className="flex items-start justify-between gap-4">
                            <h3 className="text-xl font-semibold text-gray-900 leading-tight group-hover:text-blue-600 transition-colors">
                                {product.productName}
                            </h3>
                            <div className="space-x-2 flex align-center">
                                {/* Badge de categoría médica */}
                                {product.category && product.category.categoryName && (
                                    <Badge
                                        variant="secondary"
                                        className="text-xs bg-blue-100 text-blue-800 border-blue-200 flex-shrink-0 hidden sm:flex"
                                    >
                                        <ShieldCheck size={12} className="mr-1" />
                                        {product.category.categoryName}
                                    </Badge>
                                )}
                                {/* Botón eliminar en la esquina de la imagen */}
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={handleRemoveFromFavorites}
                                    className="cursor-pointer w-8 h-8 rounded-full bg-red-400 text-white border border-gray-200 p-0"
                                >
                                    <X size={12} />
                                </Button>
                            </div>
                        </div>

                        {/* Precio */}
                        <div className="flex items-baseline gap-2">
                            {product.price && product.price > 0 ? (
                                <span className="text-2xl font-bold text-gray-900">
                                    {formatPrice(product.price)}
                                </span>
                            ) : (
                                <span className="text-lg font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-lg border border-blue-200">
                                    Solicitar precio
                                </span>
                            )}
                        </div>

                        {/* Badges de información */}
                        <div className="flex flex-wrap gap-2">
                            {/* Estado de disponibilidad */}
                            <Badge
                                variant={availabilityInfo.color as any}
                                className={cn(
                                    "text-xs",
                                    availabilityInfo.status === 'available' && "bg-green-100 text-green-800 border-green-200",
                                    availabilityInfo.status === 'unavailable' && "bg-red-100 text-red-800 border-red-200"
                                )}
                            >
                                {availabilityInfo.status === 'available' && <CheckCircle size={12} className="mr-1" />}
                                {availabilityInfo.status === 'unavailable' && <AlertCircle size={12} className="mr-1" />}
                                {availabilityInfo.label}
                            </Badge>

                            {/* Área médica */}
                            {product.area && (
                                <Badge variant="outline" className="text-xs text-purple-700 border-purple-300">
                                    <Stethoscope size={12} className="mr-1" />
                                    {product.area}
                                </Badge>
                            )}
                        </div>

                        {/* Descripción */}
                        {product.description && (
                            <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
                                {product.description}
                            </p>
                        )}

                        {/* Estado del carrito */}
                        {isInCart && cartItem && (
                            <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                                <CheckCircle size={16} className="text-green-600" />
                                <span className="text-sm text-green-800 font-medium">
                                    ✓ Ya está en tu carrito
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Botones de acción */}
                    <div className="flex flex-col sm:flex-row items-stretch gap-3 mt-4 pt-4 border-t border-gray-100">
                        {/* Botón principal - Agregar al carrito */}
                        <Button
                            onClick={addToCheckout}
                            disabled={!product.active || isAddingToCart}
                            className={cn(
                                "flex-1 rounded-lg font-medium transition-all h-11 w-full cursor-pointer",
                                isInCart
                                    ? "bg-green-600 hover:bg-green-700"
                                    : product.price && product.price > 0
                                        ? "bg-blue-600 hover:bg-blue-700"
                                        : "bg-gray-600 hover:bg-gray-700",
                                isAddingToCart && "animate-pulse",
                                !product.active && "opacity-50 cursor-not-allowed"
                            )}
                        >
                            <ShoppingCart size={16} className="mr-2" />
                            {isAddingToCart
                                ? "Agregando..."
                                : isInCart
                                    ? "Agregar más"
                                    : !product.active
                                        ? "No disponible"
                                        : product.price && product.price > 0
                                            ? "Agregar al carrito"
                                            : "Consultar precio"
                            }
                        </Button>

                        {/* Botón mantener en favoritos */}
                        <Button
                            variant="outline"
                            size="lg"
                            onClick={handleRemoveFromFavorites}
                            className="rounded-lg cursor-pointer border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 hover:text-red-700 transition-all h-11 px-4 w-full sm:w-auto"
                            title="Quitar de favoritos"
                        >
                            <Heart size={16} className="fill-current sm:mr-0 mr-2" />
                            <span className="sm:hidden">Quitar de favoritos</span>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LovedItemsProduct;