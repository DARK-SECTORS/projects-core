import Hero from "./components/Hero";
import Showreels from "./components/Showreels";
import Portfolio from "./components/Portfolio";
import Clients from "./components/Clients";
import YoutubeProjects from "./components/YoutubeProjects";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Preloader from "./components/Preloader";
import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading && <Preloader />}
      
      {!loading && (
        <div className="relative">
          <Header />
          <Hero />
          
          {/* Сітка 2 колонки */}
          <div className="content-grid">
            {/* Ліва колонка */}
            <div className="left-column">
              <Showreels />
              <Portfolio />
            </div>

            {/* Права колонка */}
            <div className="right-column">
              <Clients />
              <YoutubeProjects />
            </div>
          </div>

          <Footer />
        </div>
      )}
    </>
  );
}

export default App;