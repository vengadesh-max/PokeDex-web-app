import React from 'react';
import { X } from 'lucide-react';
import { Pokemon } from '../types/pokemon';

interface PokemonModalProps {
  pokemon: Pokemon;
  onClose: () => void;
}

export function PokemonModal({ pokemon, onClose }: PokemonModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center">
          <h2 className="text-2xl font-bold capitalize">{pokemon.name}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <img
              src={pokemon.sprites.front_default}
              alt={pokemon.name}
              className="w-48 h-48 object-contain bg-gray-50 rounded-lg"
            />

            <div className="flex-1">
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <h3 className="text-sm text-gray-500">Height</h3>
                  <p className="text-lg font-medium">{pokemon.height / 10}m</p>
                </div>
                <div>
                  <h3 className="text-sm text-gray-500">Weight</h3>
                  <p className="text-lg font-medium">{pokemon.weight / 10}kg</p>
                </div>
              </div>

              <h3 className="font-semibold mb-2">Abilities</h3>
              <div className="flex flex-wrap gap-2 mb-6">
                {pokemon.abilities.map((ability) => (
                  <span
                    key={ability.ability.name}
                    className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                  >
                    {ability.ability.name}
                  </span>
                ))}
              </div>

              <h3 className="font-semibold mb-2">Stats</h3>
              <div className="space-y-2">
                {pokemon.stats.map((stat) => (
                  <div key={stat.stat.name}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="capitalize">{stat.stat.name}</span>
                      <span>{stat.base_stat}</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full">
                      <div
                        className="h-full bg-blue-500 rounded-full"
                        style={{
                          width: `${(stat.base_stat / 255) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}