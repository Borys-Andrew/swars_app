import axios from 'axios';
import { Film, Hero } from '../types';

const BASE_URL = 'https://sw-api.starnavi.io';

type HeroesListResponse = {
  count: number;
  results: Hero[];
};

export const getHeroesDetailsList = async (
  page: number,
): Promise<{ data: Hero[]; total: number }> => {
  const response = await axios.get<HeroesListResponse>(
    `${BASE_URL}/people/?page=${page}`,
  );

  const data = response.data.results.map((person) => ({
    ...person,
    imageUrl: `https://starwars-visualguide.com/assets/img/characters/${person.id}.jpg`,
  }));

  return { data, total: response.data.count };
};

export const getHeroDetails = async (id: number) => {
  const response = await axios(`${BASE_URL}/people/${id}`);

  const data = {
    ...response.data,
    imageUrl: `https://starwars-visualguide.com/assets/img/characters/${id}.jpg`,
  };

  return data;
};

export const getFilmsDetails = async () => {
  const response = await axios(`${BASE_URL}/films`);

  const data = response.data.results.map((film: Film) => ({
    ...film,
    posterUrl: `https://starwars-visualguide.com/assets/img/films/${film.id}.jpg`,
  }));

  return data;
};

export const getStarshipDetails = async (id: number) => {
  const response = await axios(`${BASE_URL}/starships/${id}`);

  const data = {
    ...response.data,
    imageUrl: `https://starwars-visualguide.com/assets/img/starships/${id}.jpg`,
  };

  return data;
};
