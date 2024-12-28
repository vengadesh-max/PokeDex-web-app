import React, { useState } from "react";
import { usePokemon } from "./hooks/usePokemon";
import { SearchBar } from "./components/SearchBar";
import { TypeFilter } from "./components/TypeFilter";
import { PokemonCard } from "./components/PokemonCard";
import { PokemonModal } from "./components/PokemonModal";
import { Pagination } from "./components/Pagination";

function App() {
  const {
    pokemon,
    loading,
    error,
    page,
    totalPages,
    setPage,
    searchTerm,
    setSearchTerm,
    selectedType,
    setSelectedType,
    favorites,
    toggleFavorite,
  } = usePokemon();

  const [selectedPokemon, setSelectedPokemon] = useState(null);

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-2">Error</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-500 to-red-600">
      <header className="bg-white/10 backdrop-blur-md text-white shadow-lg sticky top-0 z-10">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-4xl font-bold">Pokédex Lite</h1>
          <p className="text-white/80 mt-2">Discover the first 50 Pokémon</p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 mb-8">
          <div className="space-y-4 md:space-y-0 md:flex md:items-center md:space-x-4">
            <SearchBar value={searchTerm} onChange={setSearchTerm} />
            <TypeFilter value={selectedType} onChange={setSelectedType} />
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent"></div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {pokemon.map((p) => (
                <PokemonCard
                  key={p.id}
                  pokemon={p}
                  isFavorite={favorites.includes(p.id)}
                  onFavoriteClick={() => toggleFavorite(p.id)}
                  onClick={() => setSelectedPokemon(p)}
                />
              ))}
            </div>

            <Pagination
              page={page}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          </>
        )}
      </main>

      {selectedPokemon && (
        <PokemonModal
          pokemon={selectedPokemon}
          onClose={() => setSelectedPokemon(null)}
        />
      )}
    </div>
  );
}

export default App;
