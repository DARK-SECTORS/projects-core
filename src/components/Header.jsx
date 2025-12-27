import "./Header.css";

function Header() {
  const scrollToHero = () => {
    const heroElement = document.getElementById('hero');
    if (heroElement) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header className="header">
      <div className="header-bg"></div>
      
      <div className="header-content">
        <div className="header-logo" onClick={scrollToHero}>
          <img src="/logo.png" alt="Logo" className="logo-img" />
          <h1 className="header-text">
            PROJECTS <span className="core-text">CORE</span>
          </h1>
        </div>
      </div>
    </header>
  );
}

export default Header;