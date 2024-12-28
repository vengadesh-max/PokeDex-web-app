export const getFavorites = (): number[] => {
  const saved = localStorage.getItem('favorites');
  return saved ? JSON.parse(saved) : [];
};

export const saveFavorites = (favorites: number[]): void => {
  localStorage.setItem('favorites', JSON.stringify(favorites));
};