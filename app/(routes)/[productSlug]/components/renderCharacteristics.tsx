// helpers/renderCharacteristics.tsx - Versión mejorada
import React from "react";

export function renderCharacteristics(data: any, level = 0): React.ReactNode {
  if (!data || typeof data !== "object") return null;
  
  const getIcon = (key: string) => {
    const keyLower = key.toLowerCase();
    
    // Iconos específicos para equipos médicos
    if (keyLower.includes('dimensión') || keyLower.includes('tamaño') || keyLower.includes('medidas')) {
      return (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/>
        </svg>
      );
    }
    if (keyLower.includes('peso') || keyLower.includes('weight')) {
      return (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M9 9l3-3 3 3"/>
        </svg>
      );
    }
    if (keyLower.includes('potencia') || keyLower.includes('voltaje') || keyLower.includes('energía')) {
      return (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
        </svg>
      );
    }
    if (keyLower.includes('temperatura') || keyLower.includes('temp')) {
      return (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
        </svg>
      );
    }
    if (keyLower.includes('certificación') || keyLower.includes('certificado') || keyLower.includes('norma')) {
      return (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/>
        </svg>
      );
    }
    if (keyLower.includes('material') || keyLower.includes('construcción')) {
      return (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
        </svg>
      );
    }
    
    // Icono por defecto
    return (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
      </svg>
    );
  };

  const getGradientColor = (level: number) => {
    const colors = [
      'from-blue-500 to-teal-500',
      'from-teal-500 to-green-500', 
      'from-green-500 to-blue-500',
      'from-purple-500 to-pink-500'
    ];
    return colors[level % colors.length];
  };

  return (
    <div className={`space-y-4 ${level > 0 ? 'ml-6' : ''}`}>
      {Object.entries(data).map(([key, value], index) => (
        <div key={key} className={`group relative ${level === 0 ? 'mb-6' : 'mb-4'}`}>
          {/* Tarjeta principal */}
          <div className={`
            relative overflow-hidden rounded-2xl border transition-all duration-300 
            ${level === 0 
              ? 'bg-gradient-to-br from-white via-slate-50/50 to-blue-50/30 border-slate-200/60 shadow-lg hover:shadow-xl' 
              : 'bg-white/80 border-slate-200/40 shadow-sm hover:shadow-md'
            }
            hover:border-blue-300/40 group-hover:scale-[1.01]
          `}>
            
            {/* Línea decorativa superior para elementos principales */}
            {level === 0 && (
              <div className={`h-1 bg-gradient-to-r ${getGradientColor(index)}`}></div>
            )}
            
            {/* Contenido */}
            <div className={`p-${level === 0 ? '6' : '4'}`}>
              {/* Header con icono */}
              <div className="flex items-start gap-3 mb-0">
                <div className={`
                  flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center
                  ${level === 0 
                    ? `bg-gradient-to-br ${getGradientColor(index)} text-white shadow-lg` 
                    : 'bg-slate-100 text-slate-600'
                  }
                  transition-transform duration-300 group-hover:scale-110
                `}>
                  {getIcon(key)}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className={`
                    font-bold capitalize leading-tight
                    ${level === 0 ? 'text-xl text-slate-800' : 'text-lg text-slate-700'}
                  `}>
                    {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                  </h4>
                  {level === 0 && (
                    <div className="w-12 h-0.5 bg-gradient-to-r from-blue-400 to-transparent mt-1 opacity-60"></div>
                  )}
                </div>
              </div>
              
              {/* Contenido del valor */}
              <div className={level === 0 ? 'ml-13' : 'ml-13'}>
                {typeof value === "object" && value !== null ? (
                  <div className={`
                    ${level === 0 ? 'pl-6 border-l-2 border-gradient-to-b from-blue-200 to-teal-200' : 'pl-4 border-l border-slate-200'}
                    relative
                  `}>
                    {/* Línea decorativa */}
                    {level === 0 && (
                      <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-400 to-teal-400 rounded-full"></div>
                    )}
                    {renderCharacteristics(value, level + 1)}
                  </div>
                ) : (
                  <div className="bg-slate-50/50 rounded-xl p-4 border border-slate-100">
                    <p className={`
                      ${level === 0 ? 'text-base text-slate-700' : 'text-sm text-slate-600'}
                      leading-relaxed font-medium
                    `}>
                      {String(value)}
                    </p>
                  </div>
                )}
              </div>
            </div>
            
            {/* Brillo sutil en hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
          </div>
          
          {/* Sombra suave adicional para elementos principales */}
          {level === 0 && (
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-teal-600/5 rounded-2xl blur-xl -z-10 group-hover:opacity-75 transition-opacity duration-300"></div>
          )}
        </div>
      ))}
    </div>
  );
}