import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCouch, faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);
  const { isDarkMode, toggleTheme } = useTheme();

  // Style constants
  const navStyles = {
    nav: {
      backdropFilter: 'blur(8px)',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      zIndex: 50,
      position: 'sticky',
      top: 0,
      left: 0,
      right: 0,
      transition: 'background-color 0.3s ease',
      backgroundColor: 'transparent'
    },
    container: {
      maxWidth: '1280px',
      margin: '0 auto',
      padding: '0 1rem'
    },
    navInner: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: '4rem'
    },
    logoContainer: {
      display: 'flex',
      alignItems: 'center',
      flexShrink: 0
    },
    logoIcon: {
      fontSize: '2rem',
      color: isDarkMode ? '#ffffff' : '#000000',
      marginRight: '0.5rem',
      transition: 'color 0.3s ease'
    },
    logoText: {
      fontSize: '1.5rem',
      color: isDarkMode ? '#ffffff' : '#000000',
      fontWeight: 600,
      marginRight: 'auto',
      transition: 'color 0.3s ease'
    },
    mobileLogoText: {
      fontSize: '1.2rem',
      color: isDarkMode ? '#ffffff' : '#000000',
      fontWeight: 'bold',
      marginRight: 'auto',
      transition: 'color 0.3s ease'
    },
    desktopNav: {
      display: 'flex',
      gap: '2rem'
    },
    navLink: {
      color: isDarkMode ? '#ffffff' : ' #000000',
      textDecoration: 'none',
      fontSize: '1rem',
      padding: '0.5rem',
      transition: 'color 0.3s ease',
      fontFamily: 'Montserrat, sans-serif',
      fontWeight: 700,
      position: 'relative' // Added for underline positioning
    },
    mobileMenuButton: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '0.5rem',
      borderRadius: '0.375rem',
      color: '#9ca3af',
      backgroundColor: 'transparent',
      border: 'none',
      cursor: 'pointer'
    },
    mobileMenu: {
      position: 'fixed',
      top: 0,
      left: 0,
      height: '100vh',
      width: '75%',
      maxWidth: '300px',
      backgroundColor: isDarkMode ? '#121212' : '#ffffff',
      boxShadow: '2px 0 8px rgba(0, 0, 0, 0.2)',
      transform: 'translateX(0)',
      transition: 'transform 0.3s ease-in-out, background-color 0.3s ease',
      zIndex: 100
    },
    mobileOverlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100vh',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      zIndex: 99
    },
    mobileLink: {
      display: 'block',
      padding: '0.75rem',
      color: isDarkMode ? '#ffffff' : '#000000',
      textDecoration: 'none',
      fontSize: '1rem',
      transition: 'all 0.3s',
      fontFamily: 'Montserrat, sans-serif',
      fontWeight: 500
    },
    themeToggle: {
      backgroundColor: 'transparent',
      border: 'none',
      cursor: 'pointer',
      padding: '0.5rem',
      marginLeft: '1rem',
      color: isDarkMode ? '#ffffff' : '#000000',
      transition: 'color 0.3s ease'
    }
  };

  // Navigation links data
  const navLinks = [
    { name: 'Blogs', href: '/blogs' },
    { name: 'Services', href: '/services' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' }
  ];

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
      if (window.innerWidth >= 640) setIsOpen(false);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <nav style={navStyles.nav}>
      <div style={navStyles.container}>
        <div style={navStyles.navInner}>
          <div style={navStyles.logoContainer}>
            <FontAwesomeIcon icon={faCouch} style={navStyles.logoIcon} />
            <span style={isMobile && isOpen ? navStyles.mobileLogoText : navStyles.logoText}>
              Urban Associates
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center' }}>
            {/* Desktop Navigation */}
            <div style={{ ...navStyles.desktopNav, display: isMobile ? 'none' : 'flex' }}>
              {navLinks.map(link => (
                <a
                  key={link.name}
                  href={link.href}
                  style={navStyles.navLink}
                  className="nav-link-hover"
                >
                  {link.name}
                </a>
              ))}
              <button
                onClick={toggleTheme}
                style={navStyles.themeToggle}
                aria-label="Toggle theme"
              >
                <FontAwesomeIcon icon={isDarkMode ? faSun : faMoon} />
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              style={{ ...navStyles.mobileMenuButton, display: isMobile ? 'flex' : 'none' }}
              onMouseEnter={(e) => {
                e.target.style.color = '#6b7280';
                e.target.style.backgroundColor = '#f3f4f6';
              }}
              onMouseLeave={(e) => {
                e.target.style.color = '#9ca3af';
                e.target.style.backgroundColor = 'transparent';
              }}
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <svg style={{ width: '1.5rem', height: '1.5rem' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg style={{ width: '1.5rem', height: '1.5rem' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && isMobile && (
        <>
          <div style={navStyles.mobileMenu}>
            <div style={{ display: 'flex', flexDirection: 'column', padding: '1rem', gap: '1rem' }}>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                paddingBottom: '1rem', 
                borderBottom: `1px solid ${isDarkMode ? '#333' : '#e5e7eb'}` 
              }}>
                <span style={navStyles.mobileLogoText}>
                  Urban Associates
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <button
                    onClick={toggleTheme}
                    style={{
                      ...navStyles.themeToggle,
                      color: isDarkMode ? '#ffffff' : '#000000'
                    }}
                    aria-label="Toggle theme"
                  >
                    <FontAwesomeIcon icon={isDarkMode ? faSun : faMoon} />
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    style={{ 
                      padding: '0.5rem', 
                      backgroundColor: 'transparent', 
                      border: 'none', 
                      cursor: 'pointer',
                      color: isDarkMode ? '#ffffff' : '#9ca3af'
                    }}
                  >
                    <svg style={{ width: '1.5rem', height: '1.5rem' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
              {navLinks.map(link => (
                <a
                  key={link.name}
                  href={link.href}
                  style={navStyles.mobileLink}
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
          <div onClick={() => setIsOpen(false)} style={navStyles.mobileOverlay} />
        </>
      )}

      <style>
        {`
          @font-face {
            font-family: 'Brolink';
            src: url('/fonts/Brolink-Sci-fi-Logo-Font.ttf') format('truetype');
          }
          .brolink-font {
            font-family: 'Brolink', sans-serif;
          }
          
          .nav-link-hover {
            position: relative;
          }
          
          .nav-link-hover::after {
            content: '';
            position: absolute;
            width: 0;
            height: 2px;
            bottom: 0;
            left: 0;
            background-color: ${isDarkMode ? '#ffffff' : '#000000'};
            transition: width 0.3s ease-in-out;
          }
          
          .nav-link-hover:hover::after {
            width: 100%;
          }
        `}
      </style>
    </nav>
  );
};

export default Navbar;