import React, { useState } from 'react';
import { usePokemon } from './hooks/usePokemon';
import { SearchBar } from './components/SearchBar';
import { TypeFilter } from './components/TypeFilter';
import { PokemonCard } from './components/PokemonCard';
import { PokemonModal } from './components/PokemonModal';
import { Pagination } from './components/Pagination';
import { Pokemon } from './types/pokemon';

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

  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);

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
    <div className="min-h-screen bg-gray-100">
      <header className="bg-red-600 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold">Pokédex Lite</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 space-y-4 md:space-y-0 md:flex md:items-center md:space-x-4">
          <SearchBar value={searchTerm} onChange={setSearchTerm} />
          <TypeFilter value={selectedType} onChange={setSelectedType} />
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-red-500 border-t-transparent"></div>
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