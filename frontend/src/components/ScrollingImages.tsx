export const ScrollingImages = () => {
  return (
    <div className="w-full overflow-hidden bg-black py-4">
      {/* Versión para escritorio (desktop/laptop): carrusel animado */}
      <div className="hidden sm:flex w-[200%] animate-scroll">
        {/* Bloque 1 */}
        <div className="flex w-1/2 justify-between sm:justify-around gap-8">
          <img
            src="/logos/1.jfif"
            alt="logo-1"
            className="rounded-2xl h-16 lg:h-20"
          />
          <img
            src="/logos/2.png"
            alt="logo-2"
            className="rounded-2xl h-16 lg:h-20"
          />
          <img
            src="/logos/3.png"
            alt="logo-3"
            className="rounded-2xl h-16 lg:h-20"
          />
          <img
            src="/logos/4.png"
            alt="logo-4"
            className="rounded-2xl h-16 lg:h-20"
          />
          <img
            src="/logos/5.png"
            alt="logo-5"
            className="rounded-2xl h-16 lg:h-20"
          />
          <img
            src="/logos/6.png"
            alt="logo-6"
            className="rounded-2xl h-16 lg:h-20"
          />
          <img
            src="/logos/7.jpg"
            alt="logo-7"
            className="rounded-2xl h-16 lg:h-20"
          />

          <img
            src="/logos/9.png"
            alt="logo-9"
            className="rounded-2xl h-16 lg:h-20"
          />
        </div>

        {/* Bloque 2 (clon para que sea infinito) */}
        <div className="flex w-1/2 justify-between sm:justify-around gap-8">
          <img
            src="/logos/1.jfif"
            alt="logo-1"
            className="rounded-2xl h-16 lg:h-20"
          />
          <img
            src="/logos/2.png"
            alt="logo-2"
            className="rounded-2xl h-16 lg:h-20"
          />
          <img
            src="/logos/3.png"
            alt="logo-3"
            className="rounded-2xl h-16 lg:h-20"
          />
          <img
            src="/logos/4.png"
            alt="logo-4"
            className="rounded-2xl h-16 lg:h-20"
          />
          <img
            src="/logos/5.png"
            alt="logo-5"
            className="rounded-2xl h-16 lg:h-20"
          />
          <img
            src="/logos/6.png"
            alt="logo-6"
            className="rounded-2xl h-16 lg:h-20"
          />
          <img
            src="/logos/7.jpg"
            alt="logo-7"
            className="rounded-2xl h-16 lg:h-20"
          />

          <img
            src="/logos/9.png"
            alt="logo-9"
            className="rounded-2xl h-16 lg:h-20"
          />
        </div>
      </div>

      {/* Versión para celular (mobile): fila scrolleable a mano */}
      <div className="flex sm:hidden overflow-x-auto no-scrollbar gap-4 px-4">
        <img
          src="/logos/1.jfif"
          alt="logo-1"
          className="rounded-2xl h-12 flex-shrink-0"
        />
        <img
          src="/logos/2.png"
          alt="logo-2"
          className="rounded-2xl h-12 flex-shrink-0"
        />
        <img
          src="/logos/3.png"
          alt="logo-3"
          className="rounded-2xl h-12 flex-shrink-0"
        />
        <img
          src="/logos/4.png"
          alt="logo-4"
          className="rounded-2xl h-12 flex-shrink-0"
        />
        <img
          src="/logos/5.png"
          alt="logo-5"
          className="rounded-2xl h-12 flex-shrink-0"
        />
        <img
          src="/logos/6.png"
          alt="logo-6"
          className="rounded-2xl h-12 flex-shrink-0"
        />

        <img
          src="/logos/8.png"
          alt="logo-8"
          className="rounded-2xl h-12 flex-shrink-0"
        />
      </div>
    </div>
  );
};
