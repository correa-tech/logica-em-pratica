import { NavLink, Link, useLocation } from "react-router-dom";
import { useEffect } from "react";

const titles = {
  "/": "Lógica em Prática · Aprenda C do zero",
  "/aulas/": "Aulas de C · Lógica em Prática",
  "/exercicios/": "Exercícios de C · Lógica em Prática",
  "/laboratorio/": "Laboratório C · Lógica em Prática",
};

export function SiteLayout({ children }) {
  const location = useLocation();
  useEffect(() => { document.title = titles[location.pathname] || titles["/"]; }, [location.pathname]);
  return <>
    <header className="top"><div className="shell"><Link to="/" className="brand"><span className="brandmark">&lt;/&gt;</span>Lógica em Prática <span className="c-badge">C do zero</span></Link><span className="top-note">Um passo de cada vez.</span></div></header>
    <main className="shell">
      <nav className="app-nav" aria-label="Páginas do site">
        <NavLink to="/" end>Início</NavLink><NavLink to="/aulas/">Aulas</NavLink><NavLink to="/exercicios/">Exercícios</NavLink><NavLink to="/laboratorio/">Laboratório C</NavLink>
      </nav>
      {children}
      <footer>Trilha de C99 organizada pelos temas do glossário de Fundamentos de Programação. Explicações e exercícios próprios. Laboratório com interpretador PicoC. <a href="https://www.gnu.org/software/c-intro-and-ref/manual/html_node/index.html" target="_blank" rel="noreferrer">Referência da linguagem: manual GNU C (em inglês)</a>.</footer>
    </main>
  </>;
}
