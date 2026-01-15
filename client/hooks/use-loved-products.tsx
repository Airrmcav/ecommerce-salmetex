import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { ProductType } from "@/types/product";
import { toast } from "sonner";

interface RecentlyRemovedItem {
    product: ProductType;
    removedAt: number;
    timeoutId?: NodeJS.Timeout;
}

interface useLovedProductsType {
    lovedItems: ProductType[];
    recentlyRemoved: RecentlyRemovedItem[];
    isLoading: boolean;
    
    // Acciones básicas
    addLoveItems: (data: ProductType) => void;
    removeLovedItem: (id: number) => void;
    
    // Nuevas funcionalidades
    toggleLoveItem: (data: ProductType) => void;
    clearAllLovedItems: () => void;
    undoRemove: (id: number) => void;
    isItemLoved: (id: number) => boolean;
    getLovedItemsCount: () => number;
    
    // Utilidades
    setLoading: (loading: boolean) => void;
    cleanupRecentlyRemoved: () => void;
}

export const useLovedProducts = create(
    persist<useLovedProductsType>(
        (set, get) => ({
            lovedItems: [],
            recentlyRemoved: [],
            isLoading: false,

            addLoveItems: (data: ProductType) => {
                const currentLovedItems = get().lovedItems;
                const existingItem = currentLovedItems.find((item) => item.id === data.id);

                if (existingItem) {
                    toast("🤷‍♀️ Este producto ya está en tus favoritos", {
                        description: "No se puede agregar el mismo producto dos veces",
                        style: {
                            background: "#fef3c7",
                            border: "1px solid #f59e0b",
                            color: "#92400e"
                        },
                        duration: 3000,
                    });
                    return;
                }

                set({ lovedItems: [...currentLovedItems, data] });
                toast("❤️ ¡Producto agregado a favoritos!", {
                    description: `${data.productName || 'Producto'} se guardó en tu lista`,
                    style: {
                        background: "#dcfce7",
                        border: "1px solid #16a34a",
                        color: "#166534"
                    },
                    duration: 4000,
                });
            },

            removeLovedItem: (id: number) => {
                const currentLovedItems = get().lovedItems;
                const itemToRemove = currentLovedItems.find(item => item.id === id);
                
                if (!itemToRemove) return;

                const newLovedItems = currentLovedItems.filter((item) => item.id !== id);
                
                // Crear timeout para limpiar automáticamente después de 10 segundos
                const timeoutId = setTimeout(() => {
                    set(state => ({
                        recentlyRemoved: state.recentlyRemoved.filter(item => item.product.id !== id)
                    }));
                }, 10000);

                // Agregar a elementos recientemente eliminados
                const recentlyRemovedItem: RecentlyRemovedItem = {
                    product: itemToRemove,
                    removedAt: Date.now(),
                    timeoutId
                };

                set({ 
                    lovedItems: newLovedItems,
                    recentlyRemoved: [...get().recentlyRemoved, recentlyRemovedItem]
                });
                
                toast("💔 Producto eliminado de favoritos", {
                    description: `${itemToRemove.productName || 'Producto'} fue removido de tu lista`,
                    style: {
                        background: "#fee2e2",
                        border: "1px solid #dc2626",
                        color: "#991b1b"
                    },
                    duration: 8000,
                    action: {
                        label: "⏪ Deshacer",
                        onClick: () => get().undoRemove(id)
                    }
                });
            },

            toggleLoveItem: (data: ProductType) => {
                const isCurrentlyLoved = get().isItemLoved(data.id);
                
                if (isCurrentlyLoved) {
                    get().removeLovedItem(data.id);
                } else {
                    get().addLoveItems(data);
                }
            },

            undoRemove: (id: number) => {
                const recentlyRemoved = get().recentlyRemoved;
                const itemToRestore = recentlyRemoved.find(item => item.product.id === id);
                
                if (!itemToRestore) return;

                // Limpiar el timeout
                if (itemToRestore.timeoutId) {
                    clearTimeout(itemToRestore.timeoutId);
                }

                // Restaurar el producto
                set(state => ({
                    lovedItems: [...state.lovedItems, itemToRestore.product],
                    recentlyRemoved: state.recentlyRemoved.filter(item => item.product.id !== id)
                }));

                toast("✅ ¡Producto restaurado!", {
                    description: `${itemToRestore.product.productName || 'Producto'} volvió a tus favoritos`,
                    style: {
                        background: "#dbeafe",
                        border: "1px solid #2563eb",
                        color: "#1e40af"
                    },
                    duration: 4000,
                });
            },

            clearAllLovedItems: () => {
                const currentItems = get().lovedItems;
                
                if (currentItems.length === 0) {
                    toast("🤔 No hay productos para eliminar", {
                        description: "Tu lista de favoritos ya está vacía",
                        style: {
                            background: "#f3f4f6",
                            border: "1px solid #6b7280",
                            color: "#374151"
                        },
                    });
                    return;
                }

                // Guardar todos los items para posible restauración
                const recentlyRemovedItems: RecentlyRemovedItem[] = currentItems.map(product => ({
                    product,
                    removedAt: Date.now(),
                    timeoutId: setTimeout(() => {
                        set(state => ({
                            recentlyRemoved: state.recentlyRemoved.filter(item => 
                                !currentItems.some(p => p.id === item.product.id)
                            )
                        }));
                    }, 15000) // 15 segundos para restaurar todos
                }));

                set({ 
                    lovedItems: [],
                    recentlyRemoved: [...get().recentlyRemoved, ...recentlyRemovedItems]
                });
                
                toast("🗑️ Todos los favoritos eliminados", {
                    description: `Se eliminaron ${currentItems.length} productos de tu lista`,
                    style: {
                        background: "#fef2f2",
                        border: "1px solid #ef4444",
                        color: "#dc2626"
                    },
                    duration: 10000,
                    action: {
                        label: "↩️ Restaurar todo",
                        onClick: () => {
                            // Restaurar todos los items
                            const itemsToRestore = get().recentlyRemoved.filter(item => 
                                currentItems.some(p => p.id === item.product.id)
                            );
                            
                            itemsToRestore.forEach(item => {
                                if (item.timeoutId) clearTimeout(item.timeoutId);
                            });

                            set(state => ({
                                lovedItems: currentItems,
                                recentlyRemoved: state.recentlyRemoved.filter(item => 
                                    !currentItems.some(p => p.id === item.product.id)
                                )
                            }));

                            toast("🎉 ¡Todos los favoritos restaurados!", {
                                style: {
                                    background: "#d1fae5",
                                    border: "1px solid #10b981",
                                    color: "#059669"
                                },
                            });
                        }
                    }
                });
            },

            isItemLoved: (id: number) => {
                return get().lovedItems.some(item => item.id === id);
            },

            getLovedItemsCount: () => {
                return get().lovedItems.length;
            },

            setLoading: (loading: boolean) => {
                set({ isLoading: loading });
            },

            cleanupRecentlyRemoved: () => {
                const recentlyRemoved = get().recentlyRemoved;
                recentlyRemoved.forEach(item => {
                    if (item.timeoutId) {
                        clearTimeout(item.timeoutId);
                    }
                });
                set({ recentlyRemoved: [] });
            },
        }),
        {
            name: "loved-products-storage",
            storage: createJSONStorage(() => localStorage),
        }
    )
);

// Hook personalizado para usar con componentes
export const useLovedProductsActions = () => {
    const store = useLovedProducts();
    
    return {
        // Estados
        lovedItems: store.lovedItems,
        isLoading: store.isLoading,
        count: store.getLovedItemsCount(),
        
        // Acciones principales
        addToFavorites: store.addLoveItems,
        removeFromFavorites: store.removeLovedItem,
        toggleFavorite: store.toggleLoveItem,
        clearAll: store.clearAllLovedItems,
        
        // Utilidades
        isLoved: store.isItemLoved,
        setLoading: store.setLoading,
    };
};