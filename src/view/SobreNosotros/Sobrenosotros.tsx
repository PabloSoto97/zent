export const SobreNosotros = () => {
  return (
    <section className="relative mt-20 bg-black text-white px-6 py-16 text-center overflow-hidden min-h-[80vh]">
      <div className="absolute inset-0 bg-[url('/texture.jpg')] bg-cover bg-center opacity-85 before:absolute before:inset-0 before:bg-gradient-to-b before:from-black/60 before:to-black"></div>

      <div className="relative z-10 max-w-6xl mx-auto pt-6">
        <h2 className="text-5xl md:text-6xl font-[HeadlinesRegular] text-red-600 mb-6">
          Sobre Nosotros
        </h2>

        <p className="max-w-3xl mx-auto text-lg md:text-xl font-semibold leading-relaxed font-['Roboto_Condensed'] mb-16">
          En <span className="text-red-600">ZENT</span>, somos una empresa de{" "}
          <span className="text-red-600">Corrientes, Argentina</span>, dedicada
          a ofrecer <span className="text-red-600">accesorios</span> y{" "}
          <span className="text-red-600">repuestos de motos</span> de calidad.
          Nos mueve la pasión por las dos ruedas y el compromiso con nuestros
          clientes.
        </p>

        <div className="flex flex-wrap justify-center gap-12 md:gap-16">
          <div className="relative w-[360px] h-[260px] md:h-[240px]">
            <div className="relative z-10 w-full h-full rounded-lg border border-white/20 bg-black/60 p-8 flex flex-col items-center justify-center text-center transition-transform duration-300 hover:-translate-y-2 hover:shadow-[0_8px_20px_rgba(229,9,20,0.4)]">
              <div className="absolute top-[10%] left-[10%] w-2 h-2 bg-white rounded-full shadow-[0_0_10px_#fff] animate-[dotMove_6s_linear_infinite]" />

              <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent rounded-lg pointer-events-none" />

              <h3 className="text-2xl text-red-600 font-['Roboto_Condensed'] mb-4">
                Visión
              </h3>
              <p className="text-lg leading-relaxed font-['Roboto_Condensed']">
                Ser referentes en el mercado de repuestos y accesorios para
                motos en Argentina, destacándonos por la innovación y la
                confianza.
              </p>

              <span className="absolute top-[10%] left-[10%] w-[80%] h-[1px] bg-white/40"></span>
              <span className="absolute bottom-[10%] left-[10%] w-[80%] h-[1px] bg-white/40"></span>
              <span className="absolute top-[10%] left-[10%] w-[1px] h-[80%] bg-white/40"></span>
              <span className="absolute top-[10%] right-[10%] w-[1px] h-[80%] bg-white/40"></span>
            </div>
          </div>

          <div className="relative w-[360px] h-[260px] md:h-[240px]">
            <div className="relative z-10 w-full h-full rounded-lg border border-white/20 bg-black/60 p-8 flex flex-col items-center justify-center text-center transition-transform duration-300 hover:-translate-y-2 hover:shadow-[0_8px_20px_rgba(229,9,20,0.4)]">
              <div className="absolute top-[10%] left-[10%] w-2 h-2 bg-white rounded-full shadow-[0_0_10px_#fff] animate-[dotMove_6s_linear_infinite]" />
              <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent rounded-lg pointer-events-none" />

              <h3 className="text-2xl text-red-600 font-['Roboto_Condensed'] mb-4">
                Misión
              </h3>
              <p className="text-lg leading-relaxed font-['Roboto_Condensed']">
                Brindar soluciones accesibles, confiables y de calidad que
                acompañen a nuestros clientes en cada viaje.
              </p>

              <span className="absolute top-[10%] left-[10%] w-[80%] h-[1px] bg-white/40"></span>
              <span className="absolute bottom-[10%] left-[10%] w-[80%] h-[1px] bg-white/40"></span>
              <span className="absolute top-[10%] left-[10%] w-[1px] h-[80%] bg-white/40"></span>
              <span className="absolute top-[10%] right-[10%] w-[1px] h-[80%] bg-white/40"></span>
            </div>
          </div>

          <div className="relative w-[360px] h-[260px] md:h-[240px]">
            <div className="relative z-10 w-full h-full rounded-lg border border-white/20 bg-black/60 p-8 flex flex-col items-center justify-center text-center transition-transform duration-300 hover:-translate-y-2 hover:shadow-[0_8px_20px_rgba(229,9,20,0.4)]">
              <div className="absolute top-[10%] left-[10%] w-2 h-2 bg-white rounded-full shadow-[0_0_10px_#fff] animate-[dotMove_6s_linear_infinite]" />
              <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent rounded-lg pointer-events-none" />

              <h3 className="text-2xl text-red-600 font-['Roboto_Condensed'] mb-4">
                Valores
              </h3>
              <p className="text-lg leading-relaxed font-['Roboto_Condensed']">
                Pasión, compromiso, confianza e innovación. Son los pilares que
                nos guían día a día.
              </p>

              <span className="absolute top-[10%] left-[10%] w-[80%] h-[1px] bg-white/40"></span>
              <span className="absolute bottom-[10%] left-[10%] w-[80%] h-[1px] bg-white/40"></span>
              <span className="absolute top-[10%] left-[10%] w-[1px] h-[80%] bg-white/40"></span>
              <span className="absolute top-[10%] right-[10%] w-[1px] h-[80%] bg-white/40"></span>
            </div>
          </div>
        </div>
      </div>

      <style>
        {`
        @keyframes dotMove {
          0%, 100% { top: 10%; left: 10%; }
          25% { top: 10%; left: 90%; }
          50% { top: 90%; left: 90%; }
          75% { top: 90%; left: 10%; }
        }
        `}
      </style>
    </section>
  );
};
