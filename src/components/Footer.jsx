import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Instagram, Linkedin, Send } from 'lucide-react';
import StyledButton from './StyledButton';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Animation variants
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  // Handle newsletter signup
  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Basic email validation
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address');
      setLoading(false);
      return;
    }

    // Simulate form submission (replace with actual API call in production)
    setTimeout(() => {
      console.log('Newsletter Signup:', email);
      setEmail('');
      setLoading(false);
      alert('Thank you for subscribing to our newsletter!');
    }, 1000);
  };

  return (
    <footer
      style={{
        backgroundColor: '#0f172a',
        color: '#f4f4f4',
        padding: 'clamp(2rem, 8vw, 4rem) clamp(0.5rem, 2vw, 1rem)',
        boxSizing: 'border-box',
        overflowX: 'hidden'
      }}
    >
      <div
        style={{
          maxWidth: 'min(1200px, 95vw)',
          margin: '0 auto',
          padding: '0 clamp(0.5rem, 2vw, 1rem)'
        }}
      >
        {/* Top Section */}
        <motion.div
          {...fadeIn}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(clamp(200px, 30vw, 250px), 1fr))',
            gap: 'clamp(1rem, 4vw, 2rem)',
            marginBottom: 'clamp(1.5rem, 5vw, 3rem)'
          }}
        >
          {/* About Section */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(0.5rem, 2vw, 1rem)' }}>
            <h3
              style={{
                fontSize: 'clamp(1.25rem, 3.5vw, 1.5rem)',
                fontWeight: 500,
                marginBottom: 'clamp(0.5rem, 2vw, 1rem)'
              }}
            >
              Urban Associates
            </h3>
            <p
              style={{
                fontSize: 'clamp(0.75rem, 2vw, 0.875rem)',
                color: 'rgba(255, 255, 255, 0.8)',
                lineHeight: '1.6',
                maxWidth: '20rem'
              }}
            >
              Transforming spaces with timeless elegance and Indian heritage. Let us craft your dream home with bespoke interior design solutions.
            </p>
          </div>

         

          {/* Contact Info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(0.5rem, 2vw, 1rem)' }}>
            <h3
              style={{
                fontSize: 'clamp(1.25rem, 3.5vw, 1.5rem)',
                fontWeight: 500,
                marginBottom: 'clamp(0.5rem, 2vw, 1rem)'
              }}
            >
             Follow Us 
            </h3>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 'clamp(0.5rem, 2vw, 0.75rem)',
                fontSize: 'clamp(0.75rem, 2vw, 0.875rem)',
                color: 'rgba(255, 255, 255, 0.8)'
              }}
            >
            </div>
            {/* Social Media Icons */}
            <div
              style={{
                display: 'flex',
                gap: 'clamp(0.5rem, 2vw, 1rem)',
                marginTop: 'clamp(0.5rem, 2vw, 1rem)'
              }}
            >
              {[
                { icon: <Instagram style={{ width: 'clamp(16px, 2.5vw, 20px)', height: 'clamp(16px, 2.5vw, 20px)' }} />, link: 'https://instagram.com' },
                { icon: <Linkedin style={{ width: 'clamp(16px, 2.5vw, 20px)', height: 'clamp(16px, 2.5vw, 20px)' }} />, link: 'https://linkedin.com' }
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  style={{
                    color: 'rgba(255, 255, 255, 0.8)',
                    transition: 'color 0.2s ease'
                  }}
                  onMouseOver={(e) => (e.target.style.color = '#ffffff')}
                  onMouseOut={(e) => (e.target.style.color = 'rgba(255, 255, 255, 0.8)')}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Newsletter Signup */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(0.5rem, 2vw, 1rem)' }}>
            <h3
              style={{
                fontSize: 'clamp(1.25rem, 3.5vw, 1.5rem)',
                fontWeight: 500,
                marginBottom: 'clamp(0.5rem, 2vw, 1rem)'
              }}
            >
              Newsletter
            </h3>
            <p
              style={{
                fontSize: 'clamp(0.75rem, 2vw, 0.875rem)',
                color: 'rgba(255, 255, 255, 0.8)',
                marginBottom: 'clamp(0.5rem, 2vw, 1rem)'
              }}
            >
              Subscribe for design tips, trends, and exclusive offers.
            </p>
            <div
              style={{
                display: 'flex',
                gap: 'clamp(0.25rem, 1vw, 0.5rem)',
                flexDirection: 'column'
              }}
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                style={{
                  width: '100%',
                  padding: 'clamp(0.5rem, 2vw, 0.75rem)',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.375rem',
                  fontSize: 'clamp(0.75rem, 2vw, 0.875rem)',
                  backgroundColor: '#f9fafb',
                  outline: 'none',
                  minHeight: '48px'
                }}
              />
              <StyledButton
                onClick={handleNewsletterSubmit}
                disabled={loading}
                style={{ width: '100%' }}
              >
                {loading ? 'Subscribing...' : 'Subscribe'}
                {!loading && <Send style={{ marginLeft: '0.5rem', width: 'clamp(12px, 2vw, 16px)', height: 'clamp(12px, 2vw, 16px)' }} />}
              </StyledButton>
            </div>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  backgroundColor: '#fef2f2',
                  padding: 'clamp(0.5rem, 2vw, 0.75rem)',
                  borderRadius: '0.375rem',
                  border: '1px solid #fecaca',
                  color: '#b91c1c',
                  fontSize: 'clamp(0.75rem, 2vw, 0.875rem)',
                  marginTop: 'clamp(0.25rem, 1vw, 0.5rem)',
                  textAlign: 'center'
                }}
              >
                {error}
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Bottom Section */}
        <motion.div
          {...fadeIn}
          style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.2)',
            paddingTop: 'clamp(1rem, 4vw, 2rem)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 'clamp(0.5rem, 2vw, 1rem)',
            textAlign: 'center'
          }}
        >
          <p
            style={{
              fontSize: 'clamp(0.75rem, 2vw, 0.875rem)',
              color: 'rgba(255, 255, 255, 0.8)'
            }}
          >
            &copy; {new Date().getFullYear()} Urban Associates. All rights reserved.
          </p>
          <div
            style={{
              display: 'flex',
              gap: 'clamp(0.5rem, 2vw, 1rem)',
              fontSize: 'clamp(0.75rem, 2vw, 0.875rem)',
              color: 'rgba(255, 255, 255, 0.8)'
            }}
          >
            <Link
              to="/privacy-policy"
              style={{
                color: 'rgba(255, 255, 255, 0.8)',
                textDecoration: 'none',
                transition: 'color 0.2s ease'
              }}
              onMouseOver={(e) => (e.target.style.color = '#ffffff')}
              onMouseOut={(e) => (e.target.style.color = 'rgba(255, 255, 255, 0.8)')}
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms-of-service"
              style={{
                color: 'rgba(255, 255, 255, 0.8)',
                textDecoration: 'none',
                transition: 'color 0.2s ease'
              }}
              onMouseOver={(e) => (e.target.style.color = '#ffffff')}
              onMouseOut={(e) => (e.target.style.color = 'rgba(255, 255, 255, 0.8)')}
            >
              Terms of Service
            </Link>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;