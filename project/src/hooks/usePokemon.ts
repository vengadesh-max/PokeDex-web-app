import { useState, useEffect } from 'react';
import { Pokemon, PokemonListResponse } from '../types/pokemon';
import { ITEMS_PER_PAGE } from '../constants/pokemon';
import { getFavorites, saveFavorites } from '../utils/storage';

export function usePokemon() {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('');
  const [favorites, setFavorites] = useState<number[]>(getFavorites);

  useEffect(() => {
    saveFavorites(favorites);
  }, [favorites]);

  useEffect(() => {
    async function fetchPokemon() {
      try {
        setLoading(true);
        const offset = (page - 1) * ITEMS_PER_PAGE;
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon?limit=${ITEMS_PER_PAGE}&offset=${offset}`
        );
        const data: PokemonListResponse = await response.json();
        setTotalPages(Math.ceil(data.count / ITEMS_PER_PAGE));

        const pokemonDetails = await Promise.all(
          data.results.map(async (p) => {
            const res = await fetch(p.url);
            return res.json();
          })
        );

        setPokemon(pokemonDetails);
        setError(null);
      } catch (err) {
        setError('Failed to fetch Pokemon');
      } finally {
        setLoading(false);
      }
    }

    fetchPokemon();
  }, [page]);

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id)
        ? prev.filter((favId) => favId !== id)
        : [...prev, id]
    );
  };

  const filteredPokemon = pokemon.filter((p) => {
    const matchesSearch = p.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesType = !selectedType || p.types.some(t => 
      t.type.name.toLowerCase() === selectedType.toLowerCase()
    );
    return matchesSearch && matchesType;
  });

  return {
    pokemon: filteredPokemon,
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
  };
}