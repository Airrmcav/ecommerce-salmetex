import { Calendar, User, ArrowRight, Tag } from "lucide-react";

export default function Page() {
    const blogPosts = [
        {
            id: 1,
            title: "Ventiladores Mecánicos de Nueva Generación: Tecnología Avanzada para Cuidados Intensivos",
            excerpt: "Los nuevos ventiladores mecánicos incorporan algoritmos inteligentes que se adaptan automáticamente a las necesidades respiratorias del paciente, mejorando significativamente los resultados clínicos.",
            author: "Dr. María González",
            date: "15 de Agosto, 2025",
            category: "Equipos de Ventilación",
            readTime: "8 min"
        },
        {
            id: 2,
            title: "Monitores de Signos Vitales: Precisión y Conectividad en el Punto de Atención",
            excerpt: "La integración de sensores de alta precisión con sistemas de conectividad inalámbrica permite un monitoreo continuo y en tiempo real de los parámetros vitales más críticos.",
            author: "Ing. Carlos Mendoza",
            date: "12 de Agosto, 2025",
            category: "Monitoreo",
            readTime: "6 min"
        },
        {
            id: 3,
            title: "Equipos de Diálisis: Innovaciones en Terapia Renal Sustitutiva",
            excerpt: "Los sistemas de diálisis modernos ofrecen mayor biocompatibilidad y eficiencia en la depuración, reduciendo el tiempo de tratamiento y mejorando la calidad de vida del paciente.",
            author: "Dr. Ana Rodríguez",
            date: "8 de Agosto, 2025",
            category: "Nefrología",
            readTime: "10 min"
        },
        {
            id: 4,
            title: "Bombas de Infusión Inteligentes: Seguridad y Precisión en la Administración de Medicamentos",
            excerpt: "Las nuevas bombas de infusión cuentan con sistemas de verificación automática y alertas preventivas que minimizan errores de medicación y optimizan la terapia farmacológica.",
            author: "Farm. Luis Herrera",
            date: "5 de Agosto, 2025",
            category: "Farmacoterapia",
            readTime: "7 min"
        },
        {
            id: 5,
            title: "Equipos de Electrocirugía: Tecnología de Radiofrecuencia para Procedimientos Mínimamente Invasivos",
            excerpt: "Los generadores de electrocirugía de última generación proporcionan control preciso de la energía, permitiendo procedimientos más seguros con menor trauma tisular y recuperación más rápida.",
            author: "Dr. Roberto Silva",
            date: "1 de Agosto, 2025",
            category: "Cirugía",
            readTime: "9 min"
        },
        {
            id: 6,
            title: "Sistemas de Imagenología Digital: Diagnóstico por Imagen de Alta Resolución",
            excerpt: "La transición hacia sistemas de rayos X digitales ofrece imágenes de calidad superior con menor exposición a radiación, facilitando diagnósticos más precisos y seguros.",
            author: "Tec. Patricia Morales",
            date: "28 de Julio, 2025",
            category: "Diagnóstico",
            readTime: "5 min"
        }
    ];

    const categories = ["Todos", "Equipos de Ventilación", "Monitoreo", "Nefrología", "Farmacoterapia", "Cirugía", "Diagnóstico"];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-slate-200">
                <div className="max-w-6xl mx-auto px-6 py-8">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold text-slate-800 mb-2">
                            Blog Médico Profesional
                        </h1>
                        <p className="text-slate-600 text-lg max-w-2xl mx-auto">
                            Actualizaciones técnicas, innovaciones y análisis profundos sobre equipos médicos de vanguardia
                        </p>
                    </div>
                </div>
            </header>

            {/* Navigation Categories */}
            <div className="bg-white border-b border-slate-200">
                <div className="max-w-6xl mx-auto px-6 py-4">
                    <div className="flex flex-wrap gap-2 justify-center">
                        {categories.map((category, index) => (
                            <button
                                key={index}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                                    index === 0 
                                        ? 'bg-blue-600 text-white shadow-md' 
                                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                                }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <main className="max-w-6xl mx-auto px-6 py-12">
                {/* Featured Article */}
                <div className="mb-16">
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 text-white shadow-xl">
                        <div className="flex items-center gap-2 mb-4">
                            <Tag className="w-4 h-4" />
                            <span className="text-blue-200 text-sm font-medium">Artículo Destacado</span>
                        </div>
                        <h2 className="text-3xl font-bold mb-4 leading-tight">
                            {blogPosts[0].title}
                        </h2>
                        <p className="text-blue-100 text-lg mb-6 leading-relaxed">
                            {blogPosts[0].excerpt}
                        </p>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-6 text-blue-200 text-sm">
                                <div className="flex items-center gap-2">
                                    <User className="w-4 h-4" />
                                    <span>{blogPosts[0].author}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4" />
                                    <span>{blogPosts[0].date}</span>
                                </div>
                                <span>{blogPosts[0].readTime} de lectura</span>
                            </div>
                            <button className="flex items-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors">
                                Leer más
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Articles Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogPosts.slice(1).map((post) => (
                        <article 
                            key={post.id}
                            className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-slate-200 overflow-hidden group"
                        >
                            <div className="p-6">
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-xs font-medium">
                                        {post.category}
                                    </span>
                                    <span className="text-slate-500 text-xs">
                                        {post.readTime}
                                    </span>
                                </div>
                                
                                <h3 className="text-xl font-bold text-slate-800 mb-3 leading-tight group-hover:text-blue-600 transition-colors">
                                    {post.title}
                                </h3>
                                
                                <p className="text-slate-600 mb-6 leading-relaxed">
                                    {post.excerpt}
                                </p>
                                
                                <div className="flex items-center justify-between text-sm text-slate-500 pt-4 border-t border-slate-100">
                                    <div className="flex items-center gap-2">
                                        <User className="w-4 h-4" />
                                        <span>{post.author}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Calendar className="w-4 h-4" />
                                        <span>{post.date}</span>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="px-6 pb-6">
                                <button className="w-full flex items-center justify-center gap-2 text-blue-600 hover:text-blue-700 font-medium py-3 hover:bg-blue-50 rounded-lg transition-colors">
                                    Continuar leyendo
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        </article>
                    ))}
                </div>

                {/* Load More Button */}
                <div className="text-center mt-16">
                    <button className="bg-slate-800 text-white px-8 py-4 rounded-lg font-medium hover:bg-slate-700 transition-colors shadow-lg">
                        Cargar más artículos
                    </button>
                </div>
            </main>

        </div>
    );
}