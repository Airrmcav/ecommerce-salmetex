"use client";

export default function ClinicaClient() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center">
        {/* Logo/Title */}
        <div className="mb-8">
          <h1 className="text-5xl md:text-6xl font-bold text-blue-900 mb-4">
            La Clínica es Nuestra
          </h1>
          <div className="h-1 w-32 bg-gradient-to-r from-blue-600 to-cyan-600 mx-auto rounded-full"></div>
        </div>

        {/* Coming Soon Message */}
        <div className="bg-white rounded-2xl shadow-2xl p-12 mb-8">
          <div className="text-6xl mb-6">🏥</div>
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Próximamente
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Estamos preparando nuestro catálogo de equipamiento médico
            profesional
          </p>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div>
              <div className="text-3xl mb-2">✨</div>
              <p className="text-sm text-gray-700 font-medium">
                Productos de Calidad
              </p>
            </div>
            <div>
              <div className="text-3xl mb-2">🚚</div>
              <p className="text-sm text-gray-700 font-medium">
                Envío Nacional
              </p>
            </div>
            <div>
              <div className="text-3xl mb-2">💳</div>
              <p className="text-sm text-gray-700 font-medium">
                Facilidades de Pago
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="text-gray-500 text-sm">
          Equipando clínicas, cuidando vidas
        </p>
      </div>
    </div>
  );
}
