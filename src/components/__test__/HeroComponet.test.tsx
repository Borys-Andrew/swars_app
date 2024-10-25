import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import HeroComponent from '../HeroComponent';
import { Hero } from '../../types';
import { ReactFlowProvider } from '@xyflow/react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  MemoryRouter,
} from 'react-router-dom';

const mockHero: Hero = {
  id: 23,
  name: 'IG-88',
  height: '200',
  mass: '140',
  hair_color: 'none',
  skin_color: 'metal',
  eye_color: 'red',
  birth_year: '15BBY',
  gender: 'none',
  homeworld: 28,
  films: [2],
  species: [2],
  vehicles: [],
  starships: [],
  created: '2014-12-15T12:51:10.076000Z',
  edited: '2014-12-20T21:17:50.351000Z',
  url: 'https://sw-api.starnavi.io/people/23/',
  imageUrl: 'https://starwars-visualguide.com/assets/img/characters/23.jpg',
};

test('renders title of Hero with correct name', async () => {
  render(
    <MemoryRouter initialEntries={[`/${mockHero.id}`]}>
      <Router>
        <Routes>
          <Route path="/">
            <Route
              path="/:id"
              element={
                <ReactFlowProvider>
                  <HeroComponent hero={mockHero} />
                </ReactFlowProvider>
              }
            />
          </Route>
        </Routes>
      </Router>
    </MemoryRouter>,
  );
  const titleElement = screen.getByText('IG-88');
  expect(titleElement).toBeInTheDocument();
});
