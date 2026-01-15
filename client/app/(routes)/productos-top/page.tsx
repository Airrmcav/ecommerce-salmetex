"use client"

import TopProducts from "@/components/top-products";
import Breadcrumb from "@/components/BreadCrumbs";

export default function Page() {
    
     const breadcrumbItems = [
        { label: "Inicio", href: "/" },
        { label: "Productos Top" },
        
    ];

    return (
        <div>
            <Breadcrumb
                items={breadcrumbItems}
                backButton={{
                    show: true,
                    label: "Regresar"
                }} />
            <TopProducts />
        </div>
    )
}