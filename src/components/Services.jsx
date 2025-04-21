import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const services = [
  {
    id: 1,
    title: 'Residential Design',
    description: 'Transform your home into a personalized sanctuary with our tailored residential solutions.',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80'
  },
  {
    id: 2,
    title: 'Commercial Design',
    description: 'Elevate your business space with functional yet stunning commercial interior designs.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80'
  },
  {
    id: 5,
    title: 'Sustainable Design',
    description: 'Eco-conscious designs that combine beauty with environmental responsibility.',
    image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80'
  },
  {
    id: 6,
    title: 'Lighting Design',
    description: 'Illuminate your space with lighting solutions that enhance mood and functionality.',
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80'
  },
  {
    id: 7,
    title: 'Color Consultation',
    description: 'Expert guidance in selecting the perfect color palette for your space and personality.',
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80'
  },
  {
    id: 8,
    title: 'Home Staging',
    description: 'Prepare your property for sale with professional staging that maximizes appeal.',
    image: 'https://images.unsplash.com/photo-1600121848594-d8644e57abab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1580&q=80'
  }
];

const Services = () => {
  const { isDarkMode } = useTheme();

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15 // Faster stagger for more items
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const cardHover = {
    scale: 1.03,
    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    transition: {
      duration: 0.3,
      ease: "easeInOut"
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      padding: '4rem 1rem',
      backgroundColor: isDarkMode ? '#121212' : '#f8fafc',
      transition: 'background-color 0.3s'
    }}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
          textAlign: 'center',
          marginBottom: '3rem'
        }}
      >
        <h2 style={{
          fontSize: 'clamp(1.5rem, 5vw, 2.5rem)',
          fontWeight: 300,
          color: isDarkMode ? '#f4f4f4' : '#1f2937',
          marginBottom: '1rem',
        }}>
          Our Services
        </h2>
        <p style={{
          fontSize: 'clamp(1rem, 3vw, 1.25rem)',
          color: isDarkMode ? '#d1d5db' : '#4b5563',
          maxWidth: '36rem',
          margin: '0 auto'
        }}>
          Discover our comprehensive range of interior design services tailored to your needs.
        </p>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
          gap: 'clamp(1rem, 3vw, 2rem)',
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '0 clamp(0.5rem, 2vw, 1rem)'
        }}
      >
        {services.map((service) => (
          <motion.div
            key={service.id}
            variants={item}
            whileHover={cardHover}
            style={{
              backgroundColor: isDarkMode ? '#1a1a1a' : '#ffffff',
              color: isDarkMode ? '#f4f4f4' : '#1f2937',
              boxShadow: isDarkMode ? 
                '0 4px 6px rgba(255, 255, 255, 0.1)' : 
                '0 4px 6px rgba(0, 0, 0, 0.1)',
              borderRadius: '0.5rem',
              overflow: 'hidden',
              minHeight: 'clamp(300px, 40vh, 400px)',
              display: 'flex',
              flexDirection: 'column',
              transition: 'background-color 0.3s, color 0.3s, box-shadow 0.3s'
            }}
          >
            <div style={{
              position: 'relative',
              paddingTop: '66.67%',
              overflow: 'hidden'
            }}>
              <img
                src={service.image}
                alt={service.title}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
            </div>
            <div style={{
              padding: 'clamp(1rem, 3vw, 1.5rem)',
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}>
              <h3 style={{
                fontSize: 'clamp(1.1rem, 2.5vw, 1.25rem)',
                fontWeight: 500,
                color: isDarkMode ? '#f4f4f4' : '#1f2937',
                marginBottom: '0.5rem'
              }}>
                {service.title}
              </h3>
              <p style={{
                fontSize: 'clamp(0.875rem, 2vw, 1rem)',
                color: isDarkMode ? '#d1d5db' : '#4b5563',
                lineHeight: 1.6
              }}>
                {service.description}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          textAlign: 'center',
          marginTop: 'clamp(2rem, 5vw, 4rem)'
        }}
      >
        <Link to="/contact">
        </Link>
      </motion.div>
    </div>
  );
};

export default Services;