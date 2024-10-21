import React, { useState } from 'react';
import { Container, Logo, LogoutBtn } from '../index';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const location = useLocation();

  // State to track which button is being hovered
  const [hoveredButton, setHoveredButton] = useState('');

  const navItems = [
    {
      name: 'Home',
      slug: "/",
      active: true
    }, 
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ];

  return (
    <header className='py-4 shadow bg-slate-300'>
      <Container>
        <nav className='flex'>
          <div className='mr-4'>
            <Link to='/'>
              <Logo width='70px' />
            </Link>
          </div>
          <ul className='flex ml-auto'>
            {navItems.map((item) => 
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)}
                    onMouseEnter={() => setHoveredButton(item.slug)}
                    onMouseLeave={() => setHoveredButton('')}
                    className={`inline-block px-6 py-2 duration-200 relative transition-all ${
                      location.pathname === item.slug || hoveredButton === item.slug 
                        ? 'border-b-2 border-black' 
                        : 'border-b-2 border-transparent'
                    }`}
                  >
                    {item.name}
                    {/* Bottom Border Effect */}
                    <span
                      className={`absolute left-0 bottom-0 w-full h-[2px] bg-black transition-transform duration-500 ease-in ${
                        hoveredButton === item.slug || location.pathname === item.slug
                          ? 'scale-x-100'
                          : 'scale-x-0'
                      }`}
                    ></span>
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
    </header>
  );
}

export default Header;
