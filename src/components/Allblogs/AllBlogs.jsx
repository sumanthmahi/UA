import React from 'react';
import { motion } from 'framer-motion';

const AllBlogs = () => {
  // Load posted blogs from localStorage
  const blogs = JSON.parse(localStorage.getItem('blogs') || '[]');

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f3f4f6' }}>
      {/* Hero Section */}
      <section style={{
        position: 'relative',
        height: '30vh',
        background: 'linear-gradient(135deg, #1f2937 0%, #4b5563 100%)',
        overflow: 'hidden',
        marginTop: '-9vh'
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
              All Posted Blogs
            </h1>
            <p style={{
              fontSize: '1rem',
              color: '#d1d5db',
              maxWidth: '32rem',
              margin: '0 auto',
              '@media (minWidth: 768px)': { fontSize: '1.25rem' }
            }}>
              Explore all blogs posted by Urban Associates.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Blog Posts */}
      <section style={{
        padding: '4rem 1rem',
        backgroundColor: '#f9fafb'
      }}>
        <div style={{
          maxWidth: '80rem',
          margin: '0 auto',
          padding: '0 1rem'
        }}>
          {blogs.length === 0 ? (
            <motion.div
              {...fadeIn}
              style={{
                textAlign: 'center',
                color: '#4b5563',
                fontSize: '1.25rem'
              }}
            >
              No blogs have been posted yet.
            </motion.div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(330px, 1fr))',
              gap: '2rem',
              justifyContent: 'center',
              '@media (minWidth: 768px)': { gridTemplateColumns: 'repeat(3, 330px)' }
            }}>
              {blogs.map((blog) => (
                <motion.div
                  key={blog.id}
                  style={{
                    backgroundColor: '#ffffff',
                    borderRadius: '0.5rem',
                    overflow: 'hidden',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    width: '330px',
                    height: '320px',
                    display: 'flex',
                    flexDirection: 'column'
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
                        color: '#1f2937',
                        marginBottom: '0.5rem',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }}>
                        {blog.title}
                      </h3>
                      <p style={{
                        fontSize: '0.75rem',
                        color: '#6b7280',
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
                    <button style={{
                      padding: '0.5rem 1rem',
                      backgroundColor: '#1f2937',
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: '0.25rem',
                      cursor: 'pointer',
                      fontSize: '0.875rem',
                      alignSelf: 'flex-start'
                    }}>
                      Read More
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default AllBlogs;