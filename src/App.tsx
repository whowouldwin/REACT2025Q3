import './App.css';
import { type FC } from 'react';
import { Routes, Route, useSearchParams } from 'react-router-dom';

import About from './pages/About.tsx';
import Home from './pages/Home.tsx';
import NotFound from './pages/NotFound.tsx';
import { MainLayout } from './svalka/MainLayout.tsx';
import { useCharacterData } from './utils/hooks/useCharacterData.ts';

export const App: FC = () => {
  const [searchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;
  const characterData = useCharacterData(currentPage);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <MainLayout
            handleSearch={characterData.handleSearch}
            characters={characterData.characters}
          />
        }
      >
        <Route index element={<Home characterData={characterData} />} />
        <Route path="about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default App;
