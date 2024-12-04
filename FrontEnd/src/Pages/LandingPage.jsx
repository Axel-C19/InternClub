import React from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="bg-gradient-to-b from-blue-500 to-blue-700 text-white">
      <header className="py-4 px-8 flex justify-between items-center bg-gradient-to-r from-gray-800 via-gray-900 to-[#28272f] text-white">
        <div className="flex items-center">
          <img
            src="\src\assets\clubInternLogo.png"
            alt="Club Intern Logo"
            className="w-20 mr-4" // Aumenta la altura y la anchura del logo
          />
        </div>

        <div>
          <a
            href="login"
            className="px-4 py-2 bg-white text-blue-700 rounded-md mr-4"
          >
            Login
          </a>
          <a
            href="signup"
            className="px-4 py-2 bg-white text-blue-700 rounded-md"
          >
            Signup
          </a>
        </div>
      </header>

      <main className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-800 via-gray-900 to-[#28272f] text-white">
        <div className="text-center max-w-4xl">
          <h1 className="text-5xl font-bold mb-6">Club Intern</h1>
          <p className="text-xl leading-relaxed">
            El Club Intern es un grupo enfocado en el desarrollo de software y
            en la preparación de estudiantes para obtener prácticas
            profesionales a través de proyectos innovadores y eventos enfocados
            en tecnología. Nuestro objetivo principal es brindar a los miembros
            las herramientas necesarias para destacar en el competitivo mundo
            laboral, desarrollando habilidades técnicas y construyendo una
            sólida red de contactos.
          </p>
        </div>
      </main>

      <section className="bg-white text-blue-700 py-20 px-8">
        <div className="grid grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">Resumen</h2>
            <p>
              Inspirar y capacitar a estudiantes apasionados por la tecnología,
              ofreciéndoles oportunidades prácticas a través de proyectos reales
              y eventos colaborativos. Fomentamos el aprendizaje continuo y el
              desarrollo profesional para que nuestros miembros puedan acceder a
              pasantías y alcanzar el éxito en sus carreras.
            </p>
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-4">Misión</h2>
            <p>
              Inspirar y capacitar a estudiantes apasionados por la tecnología,
              ofreciéndoles oportunidades prácticas a través de proyectos reales
              y eventos colaborativos. Fomentamos el aprendizaje continuo y el
              desarrollo profesional para que nuestros miembros puedan acceder a
              pasantías y alcanzar el éxito en sus carreras.
            </p>
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-4">Visión</h2>
            <p>
              Ser el club estudiantil líder en desarrollo de software,
              reconocido por impulsar el talento joven hacia el éxito
              profesional mediante proyectos de alto impacto y conexiones
              estratégicas con la industria tecnológica.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
