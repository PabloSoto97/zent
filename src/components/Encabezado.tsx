export const Encabezado = () => {
  return (
    <div className="relative w-full h-[87vh] overflow-hidden">
      {/* Video de fondo */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover brightness-50"
      >
        <source src="/video2.mp4" type="video/mp4" />
        Tu navegador no soporta el elemento de video.
      </video>

      {/* Overlay de texto */}
      <div className="absolute inset-0 flex items-end">
        <div className="w-full mb-4 p-4 sm:p-6 md:p-10 flex flex-col items-center md:items-start text-center md:text-left space-y-2 sm:space-y-3 md:space-y-4">
          {/* Subtítulo */}
          <h2 className="text-white font-[HeadlinesRegular] text-lg sm:text-2xl md:text-3xl lg:text-4xl">
            BIENVENIDO A
          </h2>

          {/* Logo */}
          <img
            src="/logo3.png"
            alt="ZENT"
            className="h-20 sm:h-28 md:h-40 lg:h-20 object-contain"
          />

          {/* Descripción */}
          <h4 className="text-white font-[HeadlinesRegular] text-sm sm:text-base md:text-lg">
            Repuestos y accesorios
          </h4>
        </div>
      </div>
    </div>
  );
};
