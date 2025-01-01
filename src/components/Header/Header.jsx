import React, { useState } from 'react';
import { Container, Logo, LogoutBtn } from '../index';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { name: 'Home', slug: "/", active: true },
    { name: "Login", slug: "/login", active: !authStatus },
    { name: "Signup", slug: "/signup", active: !authStatus },
    { name: "All Posts", slug: "/all-posts", active: authStatus },
    { name: "Add Post", slug: "/add-post", active: authStatus },
  ];

  return (
    <header className="bg-secondary text-white shadow-lg">
      <Container>
        <nav className="flex items-center justify-between py-4 md:py-6 lg:py-8">
          <div className="flex items-center">
            <Link to="/">
              <Logo width="300px" className="text-white" />
            </Link>
          </div>

          {/* Menu Icon */}
          <button
            className="md:hidden z-50"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>

          {/* Desktop Nav */}
          <ul className="hidden md:flex space-x-6 lg:space-x-8">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className={`px-4 py-2 font-semibold ${
                      location.pathname === item.slug
                        ? 'text-accent'
                        : 'hover:text-accent'
                    }`}
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>

      {/* Mobile Fullscreen Menu */}
      <div
        className={`fixed inset-0 bg-black  z-40 text-white transition-transform duration-300 ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* <button
          className="absolute top-6 right-6 text-white text-2xl"
          onClick={() => setMobileMenuOpen(false)}
        >
          X
        </button> */}
        <ul className="flex flex-col items-center justify-center h-full space-y-6">
          {navItems.map((item) =>
            item.active ? (
              <li key={item.name}>
                <button
                  onClick={() => {
                    navigate(item.slug);
                    setMobileMenuOpen(false);
                  }}
                  className="text-xl font-semibold hover:text-accent"
                >
                  {item.name}
                </button>
              </li>
            ) : null
          )}
          {authStatus && (
            <li>
              <LogoutBtn />
            </li>
          )}
        </ul>
      </div>
    </header>
  );
}

export default Header;
