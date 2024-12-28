import React from 'react';
import { Filter } from 'lucide-react';
import { POKEMON_TYPES } from '../constants/pokemon';

interface TypeFilterProps {
  value: string;
  onChange: (value: string) => void;
}

export function TypeFilter({ value, onChange }: TypeFilterProps) {
  return (
    <div className="relative">
      <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-10 pr-8 py-2 rounded-lg border appearance-none bg-white focus:ring-2 focus:ring-red-500 focus:border-transparent"
      >
        <option value="">All Types</option>
        {POKEMON_TYPES.map((type) => (
          <option key={type} value={type}>
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </option>
        ))}
      </select>
    </div>
  );
}