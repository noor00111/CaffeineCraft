import React, { useEffect, useState } from "react";
import "./Header.css";

const links = [
  { href: "#coffee", label: "Coffee" },
  { href: "#kitchen", label: "Kitchen" },
  { href: "#space", label: "The Space" },
  { href: "#visit", label: "Visit" },
];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <header className={`header ${scrolled || menuOpen ? "is-solid" : ""}`}>
      <nav className="navbar wrap" aria-label="Main">
        <a href="#home" className="logo" translate="no">
          <span>Caffeine Craft</span>
        </a>

        <button
          type="button"
          className="menu-toggle"
          aria-expanded={menuOpen}
          aria-controls="site-menu"
          onClick={() => setMenuOpen((open) => !open)}>
          {menuOpen ? "Close" : "Menu"}
        </button>

        <ul id="site-menu" className={`nav-list ${menuOpen ? "is-open" : ""}`}>
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="nav-link"
                onClick={() => setMenuOpen(false)}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
