import React from 'react';
import { Hero } from '../types';
import { Link } from 'react-router-dom';

type HeroComponentProps = {
  hero: Hero;
};

const HeroComponent: React.FC<HeroComponentProps> = ({ hero }) => {
  return (
    <Link
      to={`/${hero.id}`}
      className="group bg-black border border-gray-800 rounded-lg overflow-hidden transform transition-transform hover:scale-105 hover:shadow-2xl"
    >
      <div className="relative">
        <div className="aspect-w-1 aspect-h-1 w-full h-64 overflow-hidden">
          <img
            src={hero.imageUrl}
            alt={`Character ${hero.name}`}
            className="h-full w-full object-cover object-center transition-opacity duration-300 group-hover:opacity-80"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black opacity-70 group-hover:opacity-50"></div>
      </div>
      <div className="p-4 text-center">
        <h3 className="text-lg font-bold text-yellow-400 tracking-wider">
          {hero.name}
        </h3>
        <p className="text-sm text-gray-400">Birth year: {hero.birth_year}</p>
        <p className="text-sm text-gray-400">Gender: {hero.gender}</p>
        <p className="mt-2 text-sm text-gray-500">Height: {hero.height} cm</p>
        <p className="text-sm text-gray-500">Mass: {hero.mass} kg</p>
      </div>
    </Link>
  );
};

export default HeroComponent;
