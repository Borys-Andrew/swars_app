import React, { useEffect, useState } from 'react';
import { Hero } from '../types';
import { getHeroesDetailsList } from '../api';
import HeroComponet from './HeroComponent';
import Loader from './Loader';

const HeroesList = () => {
  const [heroes, setHeroes] = useState<Hero[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchHeroes = async () => {
      try {
        setLoading(true);
        const response = await getHeroesDetailsList(page);
        const { data } = response;

        setHeroes((prev) => [...prev, ...data]);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching heroes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHeroes();
  }, [page]);

  const handleScroll = () => {
    if (
      document.body.scrollHeight - 300 <
      window.scrollY + window.innerHeight
    ) {
      setLoading(true);
    }
  };

  function debounce(func: (...args: any[]) => void, delay: number) {
    let timeoutId: NodeJS.Timeout;
    return function (...args: any[]) {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  }

  window.addEventListener('scroll', debounce(handleScroll, 500));

  useEffect(() => {
    if (loading === true) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [loading]);

  return (
    <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 xl:gap-x-8">
      {loading && <Loader />}
      {heroes.map((hero) => (
        <HeroComponet
          key={hero.id}
          hero={hero}
        />
      ))}
    </div>
  );
};

export default HeroesList;
