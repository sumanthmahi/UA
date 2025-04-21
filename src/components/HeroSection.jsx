import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const HeroSection = () => {
  const { isDarkMode } = useTheme();
  
  return (
    <section style={{
      position: 'relative',
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      color: '#ffffff',
      overflow: 'hidden',
      marginTop: '-4rem',
      backgroundColor: 'transparent',
      transition: 'background-color 0.3s'
    }}>
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundImage: 'url("https://images.unsplash.com/photo-1618219944342-824e40a13285?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        animation: 'zoomIn 20s infinite alternate', 
        zIndex: 0,
      }}></div>

      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: isDarkMode ? 'rgba(0, 0, 0, 0.7)' : 'rgba(0, 0, 0, 0.5)',
        zIndex: 1
      }}></div>

      <div style={{
        position: 'relative',
        zIndex: 2,
        padding: '1.5rem',
        maxWidth: '800px',
        '@media (maxWidth: 640px)': {
          padding: '1rem'
        }
      }}>
        <h1 style={{
          fontSize: '3rem',
          fontFamily: 'Georgia, serif',
          fontWeight: 'bold',
          marginBottom: '1rem',
          lineHeight: '1.2',
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
          animation: 'fadeInUp 1s ease-out',
          '@media (maxWidth: 640px)': {
            fontSize: '2rem'
          }
        }}>
          Transform Your Space with Elegance
        </h1>
        <p style={{
            fontSize: 'clamp(1rem, 2vw, 1.25rem)',
            color: '#e5e7eb',
            maxWidth: '600px',
            margin: '0 auto 2rem',
            lineHeight: '1.6'
          }}>
            Redefining interior spaces with innovative, client-focused designs that inspire and transform.
          </p>
        <motion.button
                   whileHover={{ scale: 1.05 }}
                   whileTap={{ scale: 0.95 }}
                   style={{
                     backgroundColor: 'transparent',
                     color: '#ffffff',
                     border: '1px solid #ffffff',
                     padding: '0.75rem 2rem',
                     fontSize: '1rem',
                     cursor: 'pointer',
                     transition: 'all 0.3s ease',
                     borderRadius: '2px'
                   }}
                 >
                   Explore Our Work
                 </motion.button>
      </div>

      <style>
        {`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes zoomIn {
            from {
              transform: scale(1);
            }
            to {
              transform: scale(1.1);
            }
          }
        `}
      </style>
    </section>
  );
};

export default HeroSection;