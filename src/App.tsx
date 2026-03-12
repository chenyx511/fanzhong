import { LanguageProvider } from '@/context/LanguageContext';
import Header from '@/sections/Header';
import Hero from '@/sections/Hero';
import About from '@/sections/About';
import GlobalNetwork from '@/sections/GlobalNetwork';
import Products from '@/sections/Products';
import Partners from '@/sections/Partners';
import Process from '@/sections/Process';
import Contact from '@/sections/Contact';
import Footer from '@/sections/Footer';

function App() {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-white">
        <Header />
        <main>
          <Hero />
          <About />
          <GlobalNetwork />
          <Products />
          <Partners />
          <Process />
          <Contact />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
}

export default App;
