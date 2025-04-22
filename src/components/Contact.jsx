import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import StyledButton from './StyledButton';

// Reused constants from Design.jsx
const roomTypes = ["Living Room", "Bedroom", "Kitchen", "Pooja Room", "Dining Area", "Bathroom", "Study Room"];

const Contact = () => {
  const { isDarkMode } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    message: ''
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Animation variants
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // prevents the default form submission behavior
    setLoading(true); // Set loading state to true to indicate submission in progress
    setError(null); // terminates the previous err messages

    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      setError('Please fill in all required fields (Name, Email, Message).');
      setLoading(false);
      return;
    }

    // Simulate form submission (replace with actual API call in production)
    setTimeout(() => {
      console.log('Form submitted:', formData);
      setFormData({ name: '', email: '', phone: '', projectType: '', message: '' });
      setLoading(false);
      alert('Thank you for your inquiry! We will get back to you soon.');
    }, 1000);
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: isDarkMode ? '#121212' : '#ffffff',
      color: isDarkMode ? '#f4f4f4' : '#1f2937',
      padding: 'clamp(2rem, 5vw, 5rem) clamp(1rem, 3vw, 2rem)',
      transition: 'background-color 0.3s, color 0.3s'
    }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          textAlign: 'center',
          marginBottom: 'clamp(2rem, 4vw, 3rem)'
        }}
      >
        <h2 style={{
          fontSize: 'clamp(1.5rem, 5vw, 2.25rem)',
          fontWeight: 300,
          marginBottom: 'clamp(0.5rem, 2vw, 1rem)'
        }}>
          Get in Touch
        </h2>
        <p style={{
          fontSize: 'clamp(1rem, 2.5vw, 1.125rem)',
          maxWidth: '36rem',
          margin: '0 auto'
        }}>
          Have a project in mind? Fill out the form below or contact us directly.
        </p>
      </motion.div>

      <div style={{
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <motion.div
          {...fadeIn}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
            gap: 'clamp(1.5rem, 4vw, 2rem)'
          }}
        >
          {/* Contact Form */}
          <div style={{
            backgroundColor: isDarkMode ? '#1a1a1a' : '#ffffff',
            borderRadius: '12px',
            boxShadow: isDarkMode ?
              '0 10px 25px rgba(255, 255, 255, 0.05)' :
              '0 10px 25px rgba(0, 0, 0, 0.1)',
            padding: 'clamp(1.5rem, 4vw, 2rem)',
            transition: 'background-color 0.3s, box-shadow 0.3s'
          }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 500, color: isDarkMode ? '#f4f4f4' : '#1f2937', marginBottom: '1.5rem' }}>
              Send Us a Message
            </h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))',
              gap: 'clamp(1rem, 3vw, 1.5rem)'
            }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label
                  htmlFor="name"
                  style={{ fontSize: '0.875rem', fontWeight: 600, color: isDarkMode ? '#f4f4f4' : '#1f2937', marginBottom: '0.25rem' }}
                >
                  Name *
                </label>
                <input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="Your Name"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: `1px solid ${isDarkMode ? '#333333' : '#d1d5db'}`,
                    borderRadius: '0.375rem',
                    fontSize: '1rem',
                    backgroundColor: isDarkMode ? '#242424' : '#f9fafb',
                    color: isDarkMode ? '#f4f4f4' : '#1f2937',
                    outline: 'none',
                    transition: 'background-color 0.3s, border-color 0.3s, color 0.3s'
                  }}
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label
                  htmlFor="email"
                  style={{ fontSize: '0.875rem', fontWeight: 600, color: isDarkMode ? '#f4f4f4' : '#1f2937', marginBottom: '0.25rem' }}
                >
                  Email *
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="Your Email"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: `1px solid ${isDarkMode ? '#333333' : '#d1d5db'}`,
                    borderRadius: '0.375rem',
                    fontSize: '1rem',
                    backgroundColor: isDarkMode ? '#242424' : '#f9fafb',
                    color: isDarkMode ? '#f4f4f4' : '#1f2937',
                    outline: 'none',
                    transition: 'background-color 0.3s, border-color 0.3s, color 0.3s'
                  }}
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label
                  htmlFor="phone"
                  style={{ fontSize: '0.875rem', fontWeight: 600, color: isDarkMode ? '#f4f4f4' : '#1f2937', marginBottom: '0.25rem' }}
                >
                  Phone
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Your Phone"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: `1px solid ${isDarkMode ? '#333333' : '#d1d5db'}`,
                    borderRadius: '0.375rem',
                    fontSize: '1rem',
                    backgroundColor: isDarkMode ? '#242424' : '#f9fafb',
                    color: isDarkMode ? '#f4f4f4' : '#1f2937',
                    outline: 'none',
                    transition: 'background-color 0.3s, border-color 0.3s, color 0.3s'
                  }}
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label
                  htmlFor="projectType"
                  style={{ fontSize: '0.875rem', fontWeight: 600, color: isDarkMode ? '#f4f4f4' : '#1f2937', marginBottom: '0.25rem' }}
                >
                  Project Type
                </label>
                <select
                  id="projectType"
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: `1px solid ${isDarkMode ? '#333333' : '#d1d5db'}`,
                    borderRadius: '0.375rem',
                    fontSize: '1rem',
                    backgroundColor: isDarkMode ? '#242424' : '#f9fafb',
                    color: isDarkMode ? '#f4f4f4' : '#1f2937',
                    outline: 'none',
                    transition: 'background-color 0.3s, border-color 0.3s, color 0.3s'
                  }}
                >
                  <option value="">Select Project Type</option>
                  {roomTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
            </div>
            <div style={{ marginBottom: '1.5rem' }}>
              <label
                htmlFor="message"
                style={{ fontSize: '0.875rem', fontWeight: 600, color: isDarkMode ? '#f4f4f4' : '#1f2937', marginBottom: '0.5rem', display: 'block' }}
              >
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                placeholder="Tell us about your project"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: `1px solid ${isDarkMode ? '#333333' : '#d1d5db'}`,
                  borderRadius: '0.375rem',
                  fontSize: '1rem',
                  backgroundColor: isDarkMode ? '#242424' : '#f9fafb',
                  color: isDarkMode ? '#f4f4f4' : '#1f2937',
                  minHeight: '120px',
                  outline: 'none',
                  resize: 'vertical',
                  transition: 'background-color 0.3s, border-color 0.3s, color 0.3s'
                }}
              />
            </div>
            <StyledButton
              onClick={handleSubmit}
              disabled={loading}
              afterContent={loading ? 'Sending...' : 'Send'}
            >
              {loading ? 'Sending...' : 'Send Message'}
            </StyledButton>
          </div>

          {/* Contact Details */}
          <div style={{
            padding: 'clamp(1.5rem, 4vw, 2rem)',
            backgroundColor: isDarkMode ? '#1a1a1a' : '#ffffff',
            color: isDarkMode ? '#f4f4f4' : '#1f2937',
            transition: 'background-color 0.3s, color 0.3s'
          }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 500, color: isDarkMode ? '#f4f4f4' : '#1f2937', marginBottom: '1.5rem' }}>
              Contact Information
            </h3>
            <motion.div {...fadeIn} style={{ marginBottom: '2rem' }}>
              <p style={{ fontSize: '1rem', color: isDarkMode ? '#d1d5db' : '#4b5563', marginBottom: '0.5rem' }}>
                <strong>Email:</strong> urbanassociated@gmail.com
              </p>
              <p style={{ fontSize: '1rem', color: isDarkMode ? '#d1d5db' : '#4b5563', marginBottom: '0.5rem' }}>
                <strong>Phone:</strong> +91 0000000000
              </p>
              <p style={{ fontSize: '1rem', color: isDarkMode ? '#d1d5db' : '#4b5563' }}>
                <strong>Address:</strong> Bengaluru, karnataka, India
              </p>
            </motion.div>
            <motion.div
              {...fadeIn}
              style={{
                width: '100%',
                height: 'clamp(250px, 40vh, 300px)',
                borderRadius: '8px',
                overflow: 'hidden'
              }}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.978073121155!2d72.83313501490192!3d19.065322987097406!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c9c676018b43%3A0x3f4c93e6376c9b32!2sMumbai%2C%20Maharashtra%2C%20India!5e0!3m2!1sen!2sus!4v1698765432100!5m2!1sen!2sus"
                style={{ width: '100%', height: '100%', border: 'none' }}
                allowFullScreen=""
                loading="lazy"
                title="Office Location"
              ></iframe>
            </motion.div>
            <StyledButton
              onClick={() => alert('functionality not implemented yet')}
              afterContent="Schedule Now"
            >
              Book a Free Consultation
            </StyledButton>
          </div>
        </motion.div>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              backgroundColor: '#fef2f2',
              padding: '1rem',
              borderRadius: '0.375rem',
              border: '1px solid #fecaca',
              color: '#b91c1c',
              marginTop: '1.5rem',
              textAlign: 'center'
            }}
          >
            {error}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Contact;