import { CountriesPage } from '@/pages/countries';
import { Header } from '../widgets/header/ui/header';
import { Footer } from '../widgets/footer/ui/footer';
import { Boundary } from './providers/boundary';

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="px-4 pb-8">
        <Boundary>
          <CountriesPage />
        </Boundary>
      </main>
      <Footer />
    </div>
  );
}
