"use client"

import FeaturedProducts from "@/components/featured-products";
import Breadcrumb from "@/components/BreadCrumbs";

export default function Page() {
    
     const breadcrumbItems = [
        { label: "Inicio", href: "/" },
        { label: "Productos Destacados" },
        
    ];

    return (
        <div>
            <Breadcrumb
                items={breadcrumbItems}
                backButton={{
                    show: true,
                    label: "Regresar"
                }} />
            <FeaturedProducts />
        </div>
    )
}