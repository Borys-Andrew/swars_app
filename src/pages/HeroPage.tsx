import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useReactFlow,
  NodeTypes,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Film, Hero, Starship } from '../types';
import { getFilmsDetails, getHeroDetails, getStarshipDetails } from '../api';
import Loader from '../components/Loader';
import CustomHeroNode from '../components/CustomNode';

const HeroPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [hero, setHero] = useState<Hero>({
    id: 0,
    name: '',
    height: '',
    mass: '',
    hair_color: '',
    skin_color: '',
    eye_color: '',
    birth_year: '',
    gender: '',
    homeworld: 0,
    films: [],
    species: [],
    vehicles: [],
    starships: [],
    created: '',
    edited: '',
    url: '',
    imageUrl: '',
  });
  const [films, setFilms] = useState<Film[]>([]);
  const [starships, setStarships] = useState<{ [key: number]: Starship }>({});
  const [loading, setLoading] = useState<boolean>(true);
  const { fitView } = useReactFlow();

  useEffect(() => {
    const getHero = async (id: number) => {
      try {
        setLoading(true);
        const response = await getHeroDetails(id);
        setHero(response);
      } catch (error) {
        console.error('Error fetching hero:', error);
      } finally {
        setLoading(false);
      }
    };
    getHero(Number(id));
  }, [id]);

  useEffect(() => {
    const getFilms = async () => {
      try {
        setLoading(true);
        const response = await getFilmsDetails();
        const filteredFilms = response.filter((film: Film) =>
          hero.films.includes(+film.id),
        );
        setFilms(filteredFilms);
      } catch (error) {
        console.error('Error fetching films:', error);
      } finally {
        setLoading(false);
      }
    };
    getFilms();
  }, [hero]);

  useEffect(() => {
    const getStarships = async () => {
      const fetchedStarships: { [key: number]: Starship } = {};
      for (const film of films) {
        for (const starshipId of film.starships) {
          if (!fetchedStarships[starshipId]) {
            try {
              const starship = await getStarshipDetails(starshipId);
              fetchedStarships[starshipId] = starship;
            } catch (error) {
              console.error(`Error fetching starship ${starshipId}:`, error);
            }
          }
        }
      }
      setStarships(fetchedStarships);
    };

    if (films.length) {
      getStarships();
    }
  }, [films]);

  const nodeTypes: NodeTypes = {
    customHero: CustomHeroNode,
  };

  const createNodesAndEdges = () => {
    const nodes = [
      {
        id: `hero-${hero.id}`,
        data: { label: hero.name, imageUrl: hero.imageUrl },
        position: { x: 500, y: 0 },
        type: 'customHero',
      },
    ];

    const edges: any = [];

    const filmSpacing = 300;
    const baseX = 500 - ((films.length - 1) * filmSpacing) / 2;

    films.forEach((film, index) => {
      const filmNodeId = `film-${film.id}`;
      const xPos = baseX + index * filmSpacing;
      const yPos = 300;

      nodes.push({
        id: filmNodeId,
        data: { label: film.title, imageUrl: film.posterUrl },
        position: { x: xPos, y: yPos },
        type: 'customHero',
      });

      edges.push({
        id: `hero-film-${film.id}`,
        source: `hero-${hero.id}`,
        target: filmNodeId,
      });

      const starshipSpacing = 200;
      const baseStarshipX =
        xPos - ((film.starships.length - 1) * starshipSpacing) / 2;

      film.starships.forEach((starshipId, shipIndex) => {
        const starshipNodeId = `starship-${starshipId}`;
        const starship = starships[starshipId];

        if (starship) {
          nodes.push({
            id: starshipNodeId,
            data: { label: starship.name, imageUrl: starship.imageUrl },
            position: {
              x: baseStarshipX + shipIndex * starshipSpacing,
              y: 900,
            },
            type: 'customHero',
          });

          edges.push({
            id: `film-starship-${starshipId}`,
            source: filmNodeId,
            target: starshipNodeId,
          });
        }
      });
    });

    return { nodes, edges };
  };

  const { nodes, edges } = createNodesAndEdges();

  useEffect(() => {
    if (nodes.length > 0 && edges.length > 0) {
      fitView({ padding: 0.2 });
    }
  }, [nodes, edges, fitView]);

  return (
    <div className="h-full flex flex-col">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 inline-flex items-center max-w-fit text-yellow-400 font-semibold text-xl transition-all duration-300 transform hover:scale-110 hover:text-yellow-600 hover:underline"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          className="w-5 h-5 mr-2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Back
      </button>
      {loading && <Loader />}
      <div className="h-[calc(100vh-180px)]">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          fitView
          className="w-full h-full text-black"
        >
          <MiniMap />
          <Controls />
          <Background />
        </ReactFlow>
      </div>
    </div>
  );
};

export default HeroPage;
