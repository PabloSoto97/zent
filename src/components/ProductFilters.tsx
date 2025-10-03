interface Props {
  categoria: string;
  orden: string;
  categorias: string[];
  onCategoriaChange: (value: string) => void;
  onOrdenChange: (value: string) => void;
}

export const ProductFilters = ({
  categoria,
  orden,
  categorias,
  onCategoriaChange,
  onOrdenChange,
}: Props) => {
  return (
    <div className="text-sm">
      {/* Categorías */}
      <div className="mb-8">
        <h4 className="text-white font-semibold mb-3 text-3xl">Categorías</h4>
        <ul className="space-y-2">
          {categorias.map((cat) => (
            <li key={cat}>
              <button
                onClick={() => onCategoriaChange(cat)}
                className={`text-left transition-colors hover:text-green-400 ${
                  categoria === cat
                    ? "text-green-400 font-medium"
                    : "text-gray-300"
                }`}
              >
                {cat}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Orden */}
      <div>
        <h4 className="text-white font-semibold mb-3 text-2xl">Ordenar por</h4>
        <ul className="space-y-2">
          <li>
            <button
              onClick={() => onOrdenChange("asc")}
              className={`text-left transition-colors hover:text-green-400 ${
                orden === "asc" ? "text-green-400 font-medium" : "text-gray-300"
              }`}
            >
              Menor a mayor
            </button>
          </li>
          <li>
            <button
              onClick={() => onOrdenChange("desc")}
              className={`text-left transition-colors hover:text-green-400 ${
                orden === "desc"
                  ? "text-green-400 font-medium"
                  : "text-gray-300"
              }`}
            >
              Mayor a menor
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};
