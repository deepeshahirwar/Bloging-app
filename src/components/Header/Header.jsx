import React, { useState } from 'react';
import { Container, Logo, LogoutBtn } from '../index';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const location = useLocation();
  const [hoveredButton, setHoveredButton] = useState('');
       
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
        <nav className="flex items-center justify-between py-4">
          <div className="flex items-center">
            <Link to="/">
              <Logo width="300px" className="text-white" />
            </Link>
          </div>
          <ul className="flex space-x-6">
            {navItems.map((item) => 
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)}
                    onMouseEnter={() => setHoveredButton(item.slug)}
                    onMouseLeave={() => setHoveredButton('')}
                    className={`px-4 py-2 font-semibold font-lato ${
                      location.pathname === item.slug || hoveredButton === item.slug 
                        ? 'border-b-2 border-accent' 
                        : 'border-b-2 border-transparent'
                    } hover:border-accent transition-all duration-200`}
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
            {authStatus && (
              <li className="bg-primary">
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
