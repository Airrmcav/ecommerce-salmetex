import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useState } from "react";
import { ChevronLeft, ChevronRight, ZoomIn, ChevronUp, ChevronDown } from "lucide-react";

interface CarouselProductProps {
    images: {
        id: number;
        url: string;
        alternativeText?: string;
    }[];
    productName?: string;
}

const CarouselProduct = (props: CarouselProductProps) => {
    const { images, productName } = props;
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [isZoomed, setIsZoomed] = useState(false);
    const [thumbnailStartIndex, setThumbnailStartIndex] = useState(0);
    
    // console.log("CarouselProduct images", images);

    // Número de miniaturas visibles a la vez
    const visibleThumbnails = 4;
    const canScrollUp = thumbnailStartIndex > 0;
    const canScrollDown = thumbnailStartIndex + visibleThumbnails < images.length;

    const scrollThumbnailsUp = () => {
        if (canScrollUp) {
            setThumbnailStartIndex(thumbnailStartIndex - 1);
        }
    };

    const scrollThumbnailsDown = () => {
        if (canScrollDown) {
            setThumbnailStartIndex(thumbnailStartIndex + 1);
        }
    };

    // Asegurar que la imagen seleccionada esté visible
    const ensureSelectedThumbnailVisible = (index: number) => {
        if (index < thumbnailStartIndex) {
            setThumbnailStartIndex(index);
        } else if (index >= thumbnailStartIndex + visibleThumbnails) {
            setThumbnailStartIndex(Math.max(0, index - visibleThumbnails + 1));
        }
    };

    const handleImageSelect = (index: number) => {
        setSelectedImageIndex(index);
        ensureSelectedThumbnailVisible(index);
    };

    const handlePrevImage = () => {
        const newIndex = selectedImageIndex === 0 ? images.length - 1 : selectedImageIndex - 1;
        handleImageSelect(newIndex);
    };

    const handleNextImage = () => {
        const newIndex = selectedImageIndex === images.length - 1 ? 0 : selectedImageIndex + 1;
        handleImageSelect(newIndex);
    };

    if (!images || images.length === 0) {
        return (
            <div className="flex items-center justify-center h-64 sm:h-96 bg-gradient-to-br from-gray-50 to-blue-50/30 rounded-2xl border border-gray-200 mx-4 sm:mx-0">
                <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-2xl flex items-center justify-center">
                        <span className="text-2xl">🏥</span>
                    </div>
                    <p className="text-gray-500">Sin imágenes disponibles</p>
                </div>
            </div>
        );
    }

    return (
        <div className="lg:sticky top-35 z-10 lg:top-35 px-4 sm:px-0">
            <div className="w-full max-w-7xl mx-auto">
                <div className="flex gap-2 sm:gap-4">
                    {/* Thumbnails Column - Left Side - Only visible on desktop */}
                    {images.length > 1 && (
                        <div className="flex-col w-16 sm:w-20 lg:w-24 flex-shrink-0 hidden md:flex">
                            {/* Scroll Up Button */}
                            <button
                                onClick={scrollThumbnailsUp}
                                disabled={!canScrollUp}
                                aria-label="Ver miniaturas anteriores"
                                className={`mb-2 p-1.5 sm:p-2 rounded-lg transition-all duration-200 ${
                                    canScrollUp 
                                        ? 'bg-white hover:bg-gray-50 border border-gray-200 shadow-sm hover:shadow-md text-gray-700' 
                                        : 'bg-gray-100 border border-gray-200 text-gray-400 cursor-not-allowed'
                                }`}
                            >
                                <ChevronUp className="w-3 h-3 sm:w-4 sm:h-4" aria-hidden="true" />
                            </button>

                            {/* Thumbnails Container */}
                            <div className="flex flex-col gap-2 overflow-hidden p-1 sm:p-2 lg:p-3" role="list" aria-label="Miniaturas de imágenes del producto">
                                {images.slice(thumbnailStartIndex, thumbnailStartIndex + visibleThumbnails).map((image, relativeIndex) => {
                                    const actualIndex = thumbnailStartIndex + relativeIndex;
                                    return (
                                        <button
                                            key={image.id}
                                            onClick={() => handleImageSelect(actualIndex)}
                                            aria-label={`Ver imagen ${actualIndex + 1}${image.alternativeText ? `: ${image.alternativeText}` : ''}`}
                                            aria-current={selectedImageIndex === actualIndex ? "true" : "false"}
                                            className={`relative group transition-all duration-300 ${
                                                selectedImageIndex === actualIndex
                                            }`}
                                            role="listitem"
                                        >
                                            <div className="w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-white rounded-xl border border-gray-200 overflow-hidden shadow-md">
                                                <img
                                                    src={image.url}
                                                    alt={image.alternativeText || `Miniatura ${actualIndex + 1}`}
                                                    className="w-full h-full object-contain p-0.5 sm:p-1 group-hover:scale-110 transition-transform duration-200 cursor-pointer"
                                                    loading="lazy"
                                                />
                                            </div>
                                            
                                            {/* Active indicator */}
                                            {selectedImageIndex === actualIndex && (
                                                <div className="absolute -top-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-blue-600 rounded-full flex items-center justify-center">
                                                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full"></div>
                                                </div>
                                            )}
                                            
                                            {/* Image number overlay */}
                                            <div className="absolute bottom-0.5 right-0.5 sm:bottom-1 sm:right-0 bg-black/70 text-white text-[10px] sm:text-xs px-1 sm:px-1.5 py-0.5 rounded">
                                                {actualIndex + 1}
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>

                            {/* Scroll Down Button */}
                            <button
                                onClick={scrollThumbnailsDown}
                                disabled={!canScrollDown}
                                aria-label="Ver más miniaturas"
                                className={`mt-2 p-1.5 sm:p-2 rounded-lg transition-all duration-200 ${
                                    canScrollDown 
                                    ? 'bg-white hover:bg-gray-50 border border-gray-200 shadow-sm hover:shadow-md text-gray-700' 
                                    : 'bg-gray-100 border border-gray-200 text-gray-400 cursor-not-allowed'
                                }`}
                            >
                                <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4" aria-hidden="true" />
                            </button>

                            {/* Thumbnail Counter */}
                            <div className="mt-2 sm:mt-3 text-center">
                                <div className="text-[10px] sm:text-xs text-gray-500 bg-gray-100 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full">
                                    {images.length} fotos
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Main Image Display */}
                    <div className="flex-1 relative group max-w-[355px] sm:max-w-none">
                        <div className="relative overflow-hidden bg-white rounded-xl sm:rounded-2xl border border-gray-200 shadow-lg aspect-square max-w-full">
                            <div className="flex items-center justify-center w-full h-full">
                                <img
                                    src={images[selectedImageIndex].url}
                                    alt={images[selectedImageIndex].alternativeText || `${productName} - Imagen ${selectedImageIndex + 1}`}
                                    className={`w-full h-full object-contain p-2 sm:p-4 transition-transform duration-300 ${
                                        isZoomed ? 'scale-150 cursor-zoom-out' : 'cursor-zoom-in hover:scale-105'
                                    }`}
                                    onClick={() => setIsZoomed(!isZoomed)}
                                    loading="lazy"
                                />
                            </div>
                            
                            {/* Zoom Icon Indicator */}
                            <div className="absolute top-2 right-2 sm:top-4 sm:right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="bg-white/90 backdrop-blur-sm rounded-full p-1.5 sm:p-2 shadow-lg">
                                    <ZoomIn className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" />
                                </div>
                            </div>
                            
                            {/* Image Counter */}
                            <div className="absolute bottom-2 left-2 sm:bottom-4 sm:left-4">
                                <div className="bg-black/70 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
                                    {selectedImageIndex + 1} / {images.length}
                                </div>
                            </div>
                            
                            {/* Navigation Arrows for Main Image */}
                            {images.length > 1 && (
                                <>
                                    <button
                                        onClick={handlePrevImage}
                                        aria-label="Imagen anterior"
                                        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 sm:p-3 shadow-lg transition-all duration-200 opacity-0 group-hover:opacity-100 focus:opacity-100"
                                    >
                                        <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" aria-hidden="true" />
                                    </button>
                                    <button
                                        onClick={handleNextImage}
                                        aria-label="Imagen siguiente"
                                        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 sm:p-3 shadow-lg transition-all duration-200 opacity-0 group-hover:opacity-100 focus:opacity-100"
                                    >
                                        <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" aria-hidden="true" />
                                    </button>
                                </>
                            )}
                        </div>
                        
                        {/* Medical Equipment Badge */}
                        <div className="absolute top-3 left-3 sm:top-6 sm:left-6 bg-blue-600 text-white px-2 py-1 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-semibold shadow-lg">
                            Equipo Médico Certificado
                        </div>
                    </div>
                </div>

                {/* Mobile Thumbnails (horizontal scroll below main image for small screens) */}
                {images.length > 1 && (
                    <div className="md:hidden mt-4 space-y-3">
                        <h4 className="text-base sm:text-lg font-semibold text-gray-800 text-center">Galería de imágenes</h4>
                        <div className="flex gap-2 justify-start overflow-x-auto pb-2 px-1">
                            {images.map((image, index) => (
                                <button
                                    key={image.id}
                                    onClick={() => setSelectedImageIndex(index)}
                                    className={`relative flex-shrink-0 group transition-all duration-300 ${
                                        selectedImageIndex === index
                                            ? 'ring-2 sm:ring-4 ring-blue-500 ring-offset-1 sm:ring-offset-2'
                                            : 'hover:ring-2 hover:ring-blue-300 hover:ring-offset-1'
                                    }`}
                                >
                                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-xl border border-gray-200 overflow-hidden shadow-md">
                                        <img
                                            src={image.url}
                                            alt={image.alternativeText || `Miniatura ${index + 1}`}
                                            className="w-full h-full object-contain p-0.5 sm:p-1 group-hover:scale-110 transition-transform duration-200"
                                        />
                                    </div>
                                    
                                    {/* Active indicator */}
                                    {selectedImageIndex === index && (
                                        <div className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 w-3 h-3 sm:w-4 sm:h-4 bg-blue-600 rounded-full flex items-center justify-center">
                                            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full"></div>
                                        </div>
                                    )}
                                    
                                    {/* Image number overlay */}
                                    <div className="absolute bottom-0.5 right-0.5 bg-black/70 text-white text-[10px] px-1 py-0.5 rounded">
                                        {index + 1}
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Medical Certification Info */}
                <div className="mt-4 sm:mt-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-blue-100 hidden sm:block">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs sm:text-sm gap-2 sm:gap-0">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                            <span className="text-gray-700 font-medium">Certificación médica vigente</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            <span className="text-gray-700">Garantía incluida</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CarouselProduct;