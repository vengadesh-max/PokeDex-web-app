import React from 'react';
import { Heart } from 'lucide-react';
import { TYPE_COLORS } from '../constants/pokemon';

export function PokemonCard({ pokemon, isFavorite, onFavoriteClick, onClick }) {
  return (
    <div 
      className="relative bg-white rounded-xl shadow-lg overflow-hidden transform transition-all hover:scale-105 cursor-pointer hover:shadow-2xl"
      onClick={onClick}
    >
      <button
        onClick={(e) => {
          e.stopPropagation();
          onFavoriteClick();
        }}
        className="absolute top-2 right-2 z-10 p-2 rounded-full bg-white/80 hover:bg-white transition-colors shadow-md"
      >
        <Heart 
          className={`w-6 h-6 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'}`}
        />
      </button>

      <div className="bg-gray-50 p-4">
        <img
          src={pokemon.sprites.front_default}
          alt={pokemon.name}
          className="w-full h-40 object-contain transform hover:scale-110 transition-transform"
        />
      </div>

      <div className="p-4">
        <h3 className="text-xl font-bold capitalize mb-2 text-gray-800">
          #{pokemon.id.toString().padStart(3, '0')} {pokemon.name}
        </h3>

        <div className="flex flex-wrap gap-2">
          {pokemon.types.map((type) => (
            <span
              key={type.type.name}
              className={`px-3 py-1 rounded-full text-white text-sm font-medium ${
                TYPE_COLORS[type.type.name] || 'bg-gray-500'
              }`}
            >
              {type.type.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}