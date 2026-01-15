import { persist, createJSONStorage } from "zustand/middleware"
import { create } from "zustand"
import { toast } from "sonner";
import { ProductType } from "@/types/product"

interface CartStore {
    items: ProductType[],
    addItem: (data: ProductType) => void
    removeItem: (id: number) => void
    removeAll: () => void
    updateQuantity: (id: number, quantity: number) => void
    getTotalItems: () => number
    getTotalPrice: () => number
}

export const useCart = create(persist<CartStore>((set, get) => ({
    items: [],
    
    addItem: (data: ProductType) => {
        const currentItems = get().items
        const existingItem = currentItems.find((item) => item.id === data.id)

        // Verificar si el producto tiene precio
        if (!data.price || data.price <= 0) {
            toast.error("No se puede agregar al carrito", {
                description: `${data.productName} no tiene precio definido. Por favor, consulta con nosotros.`,
                duration: 3000,
                style: {
                    background: '#fef2f2',
                    border: '1px solid #fecaca',
                    color: '#dc2626'
                }
            });
            return;
        }

        if (existingItem) {
            // Si el producto ya existe, incrementamos su cantidad en 1
            const updatedItems = currentItems.map(item => {
                if (item.id === data.id) {
                    return { ...item, quantity: (item.quantity || 1) + 1 };
                }
                return item;
            });
            
            set({ items: updatedItems });
            
            toast.success("✅ ¡Cantidad actualizada!", {
                description: `🏥 ${data.productName} ahora tiene ${(existingItem.quantity || 1) + 1} unidades`,
                duration: 3000,
                style: {
                    background: '#f0fdf4',
                    border: '1px solid #bbf7d0',
                    color: '#16a34a'
                }
            });
            return;
        }

        // Si es un producto nuevo, lo agregamos con cantidad 1
        const newProduct = { ...data, quantity: 1 };
        
        set({
            items: [...get().items, newProduct]
        })
        
        toast.success("✅ ¡Producto agregado!", {
            description: `🏥 ${data.productName} se agregó a tu carrito`,
            duration: 4000,
            style: {
                background: '#f0fdf4',
                border: '1px solid #bbf7d0',
                color: '#16a34a'
            },
            action: {
                label: "↩️ Deshacer",
                onClick: () => {
                    get().removeItem(data.id);
                },
            },
        });
    },
    
    removeItem: (id: number) => {
        const itemToRemove = get().items.find(item => item.id === id);
        
        set({ items: [...get().items.filter((item) => item.id !== id)] })
        
        if (itemToRemove) {
            toast.success("🗑️ Producto eliminado", {
                description: `${itemToRemove.productName} fue eliminado del carrito`,
                duration: 4000,
                style: {
                    background: '#fef3c7',
                    border: '1px solid #fcd34d',
                    color: '#d97706'
                },
                action: {
                    label: "🔄 Restaurar",
                    onClick: () => {
                        get().addItem(itemToRemove);
                    },
                },
            });
        }
    },
    
    removeAll: () => {
        const itemsCount = get().items.length;
        
        if (itemsCount === 0) {
            toast.info("🛒 El carrito ya está vacío", {
                description: "¡Agrega algunos productos médicos!",
                duration: 2000,
                style: {
                    background: '#eff6ff',
                    border: '1px solid #93c5fd',
                    color: '#2563eb'
                }
            });
            return;
        }

        const previousItems = [...get().items];
        set({ items: [] });
        
        toast.success("🧹 Carrito vaciado", {
            description: `Se eliminaron ${itemsCount} productos`,
            duration: 5000,
            style: {
                background: '#f3f4f6',
                border: '1px solid #9ca3af',
                color: '#374151'
            },
            action: {
                label: "🔙 Restaurar todo",
                onClick: () => {
                    set({ items: previousItems });
                    toast.success("🎉 ¡Productos restaurados!", {
                        duration: 3000,
                        style: {
                            background: '#f0fdf4',
                            border: '1px solid #bbf7d0',
                            color: '#16a34a'
                        }
                    });
                },
            },
        });
    },

    // Función para actualizar la cantidad de un producto
    updateQuantity: (id: number, quantity: number) => {
        const currentItems = get().items;
        const itemToUpdate = currentItems.find(item => item.id === id);
        
        if (!itemToUpdate) return;
        
        // Si la cantidad es 0 o menor, eliminamos el producto
        if (quantity <= 0) {
            get().removeItem(id);
            return;
        }
        
        // Actualizamos la cantidad del producto
        const updatedItems = currentItems.map(item => {
            if (item.id === id) {
                return { ...item, quantity: quantity };
            }
            return item;
        });
        
        set({ items: updatedItems });
        
        toast.success("✅ Cantidad actualizada", {
            description: `${itemToUpdate.productName}: ${quantity} unidad(es)`,
            duration: 2000,
            style: {
                background: '#f0fdf4',
                border: '1px solid #bbf7d0',
                color: '#16a34a'
            }
        });
    },

    // Funciones de métricas
    getTotalItems: () => {
        return get().items.reduce((total, item) => {
            return total + (item.quantity || 1);
        }, 0);
    },

    getTotalPrice: () => {
        return get().items.reduce((total, item) => {
            const price = parseFloat(item.price?.toString() || "0");
            const quantity = item.quantity || 1;
            return total + (price * quantity);
        }, 0);
    }
}), {
    name: "cart-storage",
    storage: createJSONStorage(() => localStorage)
}))

// Hook adicional para notificaciones de carrito
export const useCartNotifications = () => {
    const { items, getTotalItems, getTotalPrice } = useCart();

    const showCartSummary = () => {
        const totalItems = getTotalItems();
        const totalPrice = getTotalPrice();
        
        if (totalItems === 0) {
            toast.info("🛒 Tu carrito está vacío", {
                description: "¡Agrega algunos productos médicos!",
                duration: 3000,
                style: {
                    background: '#eff6ff',
                    border: '1px solid #93c5fd',
                    color: '#2563eb'
                }
            });
            return;
        }

        toast.success("📊 Resumen del carrito", {
            description: `${totalItems} productos • Total: ${totalPrice.toLocaleString()}`,
            duration: 4000,
            style: {
                background: '#f0f9ff',
                border: '1px solid #7dd3fc',
                color: '#0284c7'
            },
            action: {
                label: "💳 Ir a checkout",
                onClick: () => {
                    console.log("Ir al checkout");
                },
            },
        });
    };

    const showLowStockWarning = (productName: string, stock: number) => {
        toast.warning("⚠️ ¡Stock limitado!", {
            description: `Solo quedan ${stock} unidades de ${productName}`,
            duration: 5000,
            style: {
                background: '#fffbeb',
                border: '1px solid #fed7aa',
                color: '#ea580c'
            }
        });
    };

    const showProductAvailable = (productName: string) => {
        toast.success("✅ ¡Producto disponible!", {
            description: `🚚 ${productName} está en stock y listo para envío`,
            duration: 3000,
            style: {
                background: '#ecfdf5',
                border: '1px solid #a7f3d0',
                color: '#059669'
            }
        });
    };

    return {
        showCartSummary,
        showLowStockWarning,
        showProductAvailable
    };
};