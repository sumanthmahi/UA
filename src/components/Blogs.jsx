import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import StyledButton from './StyledButton';

// Initial blogs to display only when no blogs are posted
const initialBlogs = [
    {
        id: 1,
        title: '5 Trends Shaping Modern Interior Design in 2025',
        excerpt: 'Discover the latest trends transforming homes with bold colors and sustainable materials.',
        content: 'In 2025, interior design is all about blending aesthetics with functionality. From vibrant color palettes to eco-friendly materials, Urban Associates explores the top trends shaping modern spaces.',
        image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80',
        date: 'April 10, 2025',
        author: 'Jane Doe'
    },
    {
        id: 2,
        title: 'Maximizing Small Spaces: Tips from Urban Associates',
        excerpt: 'Learn how to make the most of compact living areas with smart design solutions.',
        content: 'Small spaces can feel grand with the right approach. Our team at Urban Associates shares expert tips on furniture placement, color choices, and multifunctional decor to enhance your home.',
        image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80',
        date: 'April 5, 2025',
        author: 'John Smith'
    },
    {
        id: 3,
        title: 'Sustainable Design: Building a Greener Future',
        excerpt: 'Explore eco-friendly practices that elevate both style and sustainability.',
        content: 'At Urban Associates, we prioritize sustainable materials and innovative designs to create spaces that are both beautiful and environmentally responsible.',
        image: 'https://images.unsplash.com/photo-1598928509261-7db39514c2d2?q=80',
        date: 'April 1, 2025',
        author: 'Emily Brown'
    }
];

const Blogs = () => {
    const { isDarkMode } = useTheme();

    // Load blogs from localStorage; fallback to initialBlogs only if localStorage is empty
    const storedBlogs = localStorage.getItem('blogs');
    const blogs = storedBlogs && JSON.parse(storedBlogs).length > 0 ? JSON.parse(storedBlogs) : initialBlogs;

    const fadeIn = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6 }
    };

    return (
        <div style={{ 
            minHeight: '100vh', 
            backgroundColor: isDarkMode ? '#121212' : '#f3f4f6',
            transition: 'background-color 0.3s' 
        }}>
            {/* Hero Section */}
            <section style={{
                position: 'relative',
                height: 'clamp(200px, 30vh, 300px)',
                background: isDarkMode ? 
                    'linear-gradient(135deg, #000000 0%, #1a1a1a 100%)' : 
                    'linear-gradient(135deg, #1f2937 0%, #4b5563 100%)',
                overflow: 'hidden'
            }}>
                <div style={{
                    position: 'relative',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    padding: '1rem',
                    zIndex: 10
                }}>
                    <motion.div {...fadeIn}>
                        <h1 style={{
                            fontSize: '2rem',
                            color: '#ffffff',
                            fontWeight: 300,
                            maxWidth: '32rem',
                            margin: '0 auto 0.5rem',
                            '@media (minWidth: 768px)': { fontSize: '3rem' }
                        }}>
                            Explore Our Blogs
                        </h1>
                        <p style={{
                            fontSize: '1rem',
                            color: '#d1d5db',
                            maxWidth: '32rem',
                            margin: '0 auto',
                            '@media (minWidth: 768px)': { fontSize: '1.25rem' }
                        }}>
                            Discover design inspiration, tips, and trends from Urban Associates.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Blog Posts */}
            <section style={{
                padding: 'clamp(2rem, 5vw, 4rem) clamp(1rem, 3vw, 2rem)',
            }}>
                <div style={{
                    maxWidth: '1400px',
                    margin: '0 auto',
                }}>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
                        gap: 'clamp(1rem, 3vw, 2rem)',
                        justifyContent: 'center',
                    }}>
                        {blogs.map((blog) => (
                            <motion.div
                                key={blog.id}
                                style={{
                                    backgroundColor: isDarkMode ? '#1a1a1a' : '#ffffff',
                                    color: isDarkMode ? '#f4f4f4' : '#1f2937',
                                    borderRadius: '0.5rem',
                                    overflow: 'hidden',
                                    boxShadow: isDarkMode ? 
                                        '0 4px 6px rgba(255, 255, 255, 0.1)' : 
                                        '0 4px 6px rgba(0, 0, 0, 0.1)',
                                    width: '100%',
                                    minHeight: 'clamp(300px, 40vh, 400px)',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    transition: 'background-color 0.3s, color 0.3s, box-shadow 0.3s'
                                }}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.6 }}
                            >
                                <img
                                    src={blog.image}
                                    alt={blog.title}
                                    style={{
                                        width: '100%',
                                        height: '40%',
                                        objectFit: 'cover'
                                    }}
                                />
                                <div style={{
                                    padding: '1rem',
                                    flex: 1,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between'
                                }}>
                                    <div>
                                        <h3 style={{
                                            fontSize: '1.125rem',
                                            fontWeight: 500,
                                            color: isDarkMode ? '#f4f4f4' : '#1f2937',
                                            marginBottom: '0.5rem',
                                            whiteSpace: 'nowrap',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis'
                                        }}>
                                            {blog.title}
                                        </h3>
                                        <p style={{
                                            fontSize: '0.75rem',
                                            color: isDarkMode ? '#9ca3af' : '#6b7280',
                                            marginBottom: '0.5rem'
                                        }}>
                                            {blog.date} | By {blog.author}
                                        </p>
                                        <p style={{
                                            color: '#4b5563',
                                            fontSize: '0.875rem',
                                            marginBottom: '0.5rem',
                                            display: '-webkit-box',
                                            WebkitLineClamp: 2,
                                            WebkitBoxOrient: 'vertical',
                                            overflow: 'hidden'
                                        }}>
                                            {blog.excerpt}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                margin: '0'
            }}>
                <StyledButton
                    onClick={() => window.location.href = "/blogs"}
                    afterContent="View More"
                >
                    Explore More Blogs
                </StyledButton>
            </div>
        </div>
    );
};

export default Blogs;