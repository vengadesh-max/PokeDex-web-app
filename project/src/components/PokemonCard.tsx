import React from 'react';
import { Heart } from 'lucide-react';
import { Pokemon } from '../types/pokemon';
import { TYPE_COLORS } from '../constants/pokemon';

interface PokemonCardProps {
  pokemon: Pokemon;
  isFavorite: boolean;
  onFavoriteClick: () => void;
  onClick: () => void;
}

export function PokemonCard({ pokemon, isFavorite, onFavoriteClick, onClick }: PokemonCardProps) {
  return (
    <div 
      className="relative bg-white rounded-lg shadow-lg overflow-hidden transform transition-all hover:scale-105 cursor-pointer"
      onClick={onClick}
    >
      <button
        onClick={(e) => {
          e.stopPropagation();
          onFavoriteClick();
        }}
        className="absolute top-2 right-2 z-10 p-2 rounded-full bg-white/80 hover:bg-white transition-colors"
      >
        <Heart 
          className={`w-6 h-6 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'}`}
        />
      </button>

      <img
        src={pokemon.sprites.front_default}
        alt={pokemon.name}
        className="w-full h-48 object-contain bg-gray-50"
      />

      <div className="p-4">
        <h3 className="text-xl font-bold capitalize mb-2">
          {pokemon.name}
        </h3>

        <div className="flex flex-wrap gap-2">
          {pokemon.types.map((type) => (
            <span
              key={type.type.name}
              className={`px-3 py-1 rounded-full text-white text-sm ${
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