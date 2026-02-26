import { useCart } from "@/hooks/use-cart";
import { formatPrice } from "@/lib/formatPrice";
import { cn } from "@/lib/utils";
import { ProductType } from "@/types/product";
import { X, Package, Stethoscope, Eye, Plus, Minus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface CartItemProps {
    product: ProductType
}

const CartItem = (props: CartItemProps) => {
    const { product } = props
    const { removeItem, updateQuantity } = useCart();
    const router = useRouter();
    const [isRemoving, setIsRemoving] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);

    const handleRemove = async (e: React.MouseEvent) => {
        e.stopPropagation(); // Evita que se active el onClick del contenedor
        setIsRemoving(true);
        
        // Pequeña animación antes de remover
        setTimeout(() => {
            removeItem(product.id);
        }, 200);
    };

    const handleViewProduct = () => {
        router.push(`/${product.slug}`);
    };

    return (
        <li className={cn(
            "group relative bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 p-4 mb-4",
            isRemoving && "scale-95 opacity-50"
        )}>
            {/* Indicador visual de categoría médica */}
            <div className="absolute top-4 left-4 w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            
            <div className="flex flex-col sm:flex-row items-center justify-between">
                {/* Imagen placeholder con icono médico */}
                <div className="flex items-center space-x-4 flex-1">
                    <div className="w-16 h-16 rounded-lg sm:flex items-center justify-center border border-blue-200 group-hover:from-blue-100 group-hover:to-blue-200 transition-colors hidden">
                        {product.images && product.images.length > 0 ? (
                            <img 
                                src={product.images[0].url} 
                                alt={product.productName} 
                                className="w-12 h-12 object-contain" 
                                loading="lazy"
                            />
                        ) : (
                            <div className="w-12 h-12 flex items-center justify-center bg-blue-50 rounded-md">
                                <span className="text-xl">🏥</span>
                            </div>
                        )}
                    </div>

                    {/* Información del producto */}
                    <div className="flex-1 min-w-0">
                        <h3 className="text-lg pt-3 sm:pt-0 font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                            {product.productName}
                        </h3>
                        
                        {/* Precio destacado */}
                        <div className="flex items-center space-x-2 my-3 sm:my-2">
                            <span className="text-2xl font-bold text-green-600">
                                {formatPrice(product.price ?? 0)}
                            </span>
                            <span className="text-sm text-gray-500 bg-green-50 px-2 py-1 rounded-full">
                                Incluye IVA
                            </span>
                            <span className="text-sm text-gray-500 my-2 sm:my-0">
                                x {product.quantity || 1} = {formatPrice((product.price ?? 0) * (product.quantity || 1))}
                            </span>
                        </div>

                        {/* Información adicional */}
                        <div className="flex items-center space-x-4 my-2 sm:my-0 text-sm text-gray-600">
                            <div className="flex items-center space-x-1">
                                <Stethoscope className="w-4 h-4" />
                                <p className="pl-1">
                                {product.category.categoryName}
                                </p>
                            </div>
                            <div className="flex items-center space-x-1">
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                <span>Disponible</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Control de cantidad y botones de acción */}
                <div className="flex flex-col items-end space-y-3 ml-4">
                    {/* Control de cantidad */}
                    <div className="flex items-start bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                        <button 
                            onClick={() => {
                                setIsUpdating(true);
                                const newQuantity = Math.max(1, (product.quantity || 1) - 1);
                                updateQuantity(product.id, newQuantity);
                                setTimeout(() => setIsUpdating(false), 300);
                            }}
                            className="p-1 cursor-pointer
                             bg-gray-200 hover:bg-gray-300 text-gray-700 transition-colors"
                            disabled={isUpdating}
                            aria-label="Disminuir cantidad"
                        >
                            <Minus className="w-4 h-4" />
                        </button>
                        
                        <input 
                            type="number" 
                            min="1"
                            value={product.quantity || 1}
                            onChange={(e) => {
                                const value = parseInt(e.target.value);
                                if (isNaN(value) || value < 1) return;
                                setIsUpdating(true);
                                updateQuantity(product.id, value);
                                setTimeout(() => setIsUpdating(false), 300);
                            }}
                            className="cursor-pointer w-12 text-center bg-white border-0 focus:ring-0 text-gray-700"
                            disabled={isUpdating}
                            aria-label={`Cantidad de ${product.productName}`}
                        />
                        
                        <button 
                            onClick={() => {
                                setIsUpdating(true);
                                const newQuantity = (product.quantity || 1) + 1;
                                updateQuantity(product.id, newQuantity);
                                setTimeout(() => setIsUpdating(false), 300);
                            }}
                            className="cursor-pointer p-1 bg-gray-200 hover:bg-gray-300 text-gray-700 transition-colors"
                            disabled={isUpdating}
                            aria-label="Aumentar cantidad"
                        >
                            <Plus className="w-4 h-4" />
                        </button>
                    </div>
                    
                    {/* Botones de acción */}
                    <div className="flex items-center space-x-2">
                        {/* Botón ver producto */}
                        <button
                            onClick={handleViewProduct}
                            className="p-2 cursor-pointer bg-blue-400 text-white rounded-full transition-all duration-200 group/btn"
                            title="Ver producto"
                            aria-label={`Ver detalles de ${product.productName}`}
                        >
                            <Eye className="w-5 h-5 group-hover/btn:scale-110 transition-transform" />
                        </button>

                        {/* Botón eliminar */}
                        <button
                            onClick={handleRemove}
                            className="p-2 cursor-pointer bg-red-400 text-white rounded-full transition-all duration-200 group/btn"
                            title="Eliminar del carrito"
                            aria-label={`Eliminar ${product.productName} del carrito`}
                            disabled={isRemoving}
                        >
                            <X className={cn(
                                "w-5 h-5 group-hover/btn:scale-110 transition-transform",
                                isRemoving && "animate-spin"
                            )} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Hover effect overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
        </li>
    );
}

export default CartItem;