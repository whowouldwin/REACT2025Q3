import './App.css';
import { type FC } from 'react';
import { Routes, Route } from 'react-router-dom';

import { MainLayout } from '@/app/layouts/main/MainLayout';

import About from './pages/About';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import { useCharacterData } from './utils/hooks/useCharacterData';

export const App: FC = () => {
  const characterData = useCharacterData();

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
