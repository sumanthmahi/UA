import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const About = () => {
  const { isDarkMode } = useTheme();

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  // Professional image selection
  const images = [
    { 
      src: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80', 
      alt: 'Modern office space design',
      width: '100%', 
      height: '100%', 
      gridColumn: 'span 1', 
      gridRow: 'span 1' 
    },
    { 
      src: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80', 
      alt: 'Elegant living room design',
      width: '100%', 
      height: '100%', 
      gridColumn: 'span 2', 
      gridRow: 'span 2' 
    },
    { 
      src: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1580&q=80', 
      alt: 'Contemporary kitchen design',
      width: '100%', 
      height: '100%', 
      gridColumn: 'span 1', 
      gridRow: 'span 1' 
    },
    { 
      src: 'https://images.unsplash.com/photo-1600121848594-d8644e57abab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1580&q=80', 
      alt: 'Minimalist bedroom design',
      width: '100%', 
      height: '100%', 
      gridColumn: 'span 1', 
      gridRow: 'span 1' 
    },
    { 
      src: 'https://images.unsplash.com/photo-1600566752228-4d3d4b5d2a87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1580&q=80', 
      alt: 'Luxury bathroom design',
      width: '100%', 
      height: '100%', 
      gridColumn: 'span 1', 
      gridRow: 'span 1' 
    }
  ];

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: isDarkMode ? '#121212' : '#ffffff',
      color: isDarkMode ? '#f4f4f4' : '#1f2937',
      transition: 'background-color 0.3s, color 0.3s',
      fontFamily: "'Inter', sans-serif"
    }}>
      {/* Company Description */}
      <section style={{
        padding: '6rem 2rem',
        backgroundColor: isDarkMode ? '#1a1a1a' : '#f9fafb',
        transition: 'background-color 0.3s',
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '3rem',
          alignItems: 'center',
          '@media (minWidth: 768px)': {
            gridTemplateColumns: '1fr 1fr'
          }
        }}>
          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 style={{
              fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
              fontWeight: 300,
              color: isDarkMode ? '#f4f4f4' : '#111827',
              marginBottom: '1.5rem',
              letterSpacing: '0.5px'
            }}>
              Crafting Exceptional Spaces
            </h2>
            <p style={{
              color: isDarkMode ? '#d1d5db' : '#4b5563',
              lineHeight: '1.8',
              marginBottom: '1.5rem',
              fontSize: '1.1rem'
            }}>
              Urban Associates is a passionate collective of designers, architects, and visionaries dedicated to transforming interiors with bold, creative designs.
            </p>
            <p style={{
              color: isDarkMode ? '#d1d5db' : '#4b5563',
              lineHeight: '1.8',
              marginBottom: '2rem',
              fontSize: '1.1rem'
            }}>
              Our approach combines aesthetic excellence with functional design, creating spaces that not only look stunning but also enhance the way you live and work.
            </p>
          </motion.div>
          
          <motion.div
            style={{
              position: 'relative',
              height: '400px',
              borderRadius: '8px',
              overflow: 'hidden',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
            }}
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <img
              src="https://images.unsplash.com/photo-1600210492493-0946911123ea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80"
              alt="Design team working"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;