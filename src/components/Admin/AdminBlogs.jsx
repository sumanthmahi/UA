import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bot, Trash2, Edit2 } from 'lucide-react';

const AdminBlogs = () => {
  const [newBlog, setNewBlog] = useState({
    id: null,
    title: '',
    excerpt: '',
    content: '',
    image: '',
    author: ''
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [blogs, setBlogs] = useState(() => JSON.parse(localStorage.getItem('blogs') || '[]'));
  const [isEditing, setIsEditing] = useState(false);
  const [enableAIPosts, setEnableAIPosts] = useState(() => JSON.parse(localStorage.getItem('enableAIPosts') || 'true'));
  const [lastAIGeneration, setLastAIGeneration] = useState(() => localStorage.getItem('lastAIGeneration') || null);
  const [apiError, setApiError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Update localStorage for blogs, AI settings, and last generation
  useEffect(() => {
    localStorage.setItem('blogs', JSON.stringify(blogs));
    localStorage.setItem('enableAIPosts', JSON.stringify(enableAIPosts));
    localStorage.setItem('lastAIGeneration', lastAIGeneration || '');
  }, [blogs, enableAIPosts, lastAIGeneration]);

  // Generate AI image using DeepInfra's Stable Diffusion
  const generateAIImage = async () => {
    const apiToken = import.meta.env.VITE_DEEPINFRA_API_TOKEN;
    if (!apiToken) {
      throw new Error('API token not found. Please add VITE_DEEPINFRA_API_TOKEN to your .env file.');
    }

    const imagePrompt = 'A modern Indian living room with vibrant colors, minimalist decor, and traditional elements';
    const cacheKey = `ai_image_${imagePrompt}_${new Date().toDateString()}`;
    const cachedImage = localStorage.getItem(cacheKey);
    if (cachedImage) {
      return cachedImage;
    }

    try {
      const response = await fetch('https://api.deepinfra.com/v1/inference/stabilityai/stable-diffusion-xl-base-1.0', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiToken}`
        },
        body: JSON.stringify({
          inputs: imagePrompt,
          parameters: {
            negative_prompt: "blurry, bad quality, text, watermark",
            num_inference_steps: 25,
            guidance_scale: 7.5,
            width: 768,
            height: 512,
            seed: Math.floor(Math.random() * 1000000)
          }
        })
      });

      if (!response.ok) {
        // Return a default placeholder image URL if the API fails
        return 'https://via.placeholder.com/768x512/f3f4f6/1f2937?text=Interior+Design';
      }

      const data = await response.json();
      if (!data.images || !data.images[0]) {
        return 'https://via.placeholder.com/768x512/f3f4f6/1f2937?text=Interior+Design';
      }

      const imageData = `data:image/png;base64,${data.images[0]}`;
      localStorage.setItem(cacheKey, imageData);
      return imageData;

    } catch (err) {
      console.error('Image Generation Details:', err);
      // Return placeholder image instead of throwing error
      return 'https://via.placeholder.com/768x512/f3f4f6/1f2937?text=Interior+Design';
    }
  };

  // Generate a single AI post (text + image)
  const generateSingleAIPost = async (index) => {
    setIsLoading(true);
    setApiError(null);

    const apiToken = import.meta.env.VITE_DEEPINFRA_API_TOKEN;
    if (!apiToken) {
      setApiError('API token not found. Please add VITE_DEEPINFRA_API_TOKEN to your .env file.');
      setIsLoading(false);
      return;
    }

    const textPrompt = `
      You are an expert interior design blogger. Create a unique blog post about modern interior design trends, sustainable design, or Indian heritage in interiors. The post should be engaging, informative, and tailored for an Indian audience. Format the response as follows:
      
      **Title**: [A catchy, concise title (10-15 words)]
      **Excerpt**: [A brief summary of the post (30-50 words)]
      **Content**: [A detailed blog post (150-300 words), incorporating Indian cultural elements, modern trends, or sustainable practices]
      
      Ensure the post is distinct from previously generated posts and uses a professional tone.
    `;

    const cacheKey = `ai_post_${textPrompt}_${new Date().toDateString()}_${index}`;
    const cachedPost = localStorage.getItem(cacheKey);

    try {
      let aiBlog = {};
      // Generate text
      if (cachedPost) {
        aiBlog = JSON.parse(cachedPost);
      } else {
        const textResponse = await fetch('https://api.deepinfra.com/v1/openai/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiToken}`
          },
          body: JSON.stringify({
            model: 'meta-llama/Meta-Llama-3-8B-Instruct',
            messages: [
              { role: 'system', content: 'You are a professional interior design blogger.' },
              { role: 'user', content: textPrompt }
            ],
            max_tokens: 500,
            temperature: 0.7,
            top_p: 0.9
          })
        });

        if (!textResponse.ok) {
          throw new Error(`Failed to generate blog text. Please try again later.`);
        }

        const textData = await textResponse.json();
        if (textData.error) {
          throw new Error(textData.error.message || 'Text API error occurred');
        }

        const generatedText = textData.choices[0]?.message?.content || '';
        aiBlog = parseAIResponse(generatedText);
        localStorage.setItem(cacheKey, JSON.stringify(aiBlog));
      }

      // Generate image - now uses fallback if generation fails
      const imageData = await generateAIImage().catch(() =>
        'https://via.placeholder.com/768x512/f3f4f6/1f2937?text=Interior+Design'
      );

      const blogPost = {
        id: Date.now() + index,
        title: aiBlog.title || 'Untitled AI Post',
        excerpt: aiBlog.excerpt || 'No excerpt provided.',
        content: aiBlog.content || 'No content provided.',
        image: imageData,
        author: 'Urban AI',
        date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        isAI: true
      };

      setBlogs((prevBlogs) => [blogPost, ...prevBlogs]);
    } catch (err) {
      setApiError(`Failed to create blog post: ${err.message}`);
      console.error('AI Generation Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Parse DeepInfra API response to extract title, excerpt, and content
  const parseAIResponse = (text) => {
    const titleMatch = text.match(/\*\*Title\*\*:\s*(.+?)(?=\n|$)/);
    const excerptMatch = text.match(/\*\*Excerpt\*\*:\s*(.+?)(?=\n\*\*|$)/);
    const contentMatch = text.match(/\*\*Content\*\*:\s*(.+?)(?=$)/s);

    return {
      title: titleMatch ? titleMatch[1].trim() : '',
      excerpt: excerptMatch ? excerptMatch[1].trim() : '',
      content: contentMatch ? contentMatch[1].trim() : ''
    };
  };

  // AI Post Generation Logic (Scheduled)
  useEffect(() => {
    if (!enableAIPosts) return;

    const generateAIPosts = () => {
      const today = new Date().toDateString();
      if (lastAIGeneration === today) return; // Skip if already generated today

      const times = [
        new Date().setHours(9, 0, 0, 0),  // 9 AM
        new Date().setHours(14, 0, 0, 0), // 2 PM
        new Date().setHours(19, 0, 0, 0)  // 7 PM
      ];

      times.forEach((time, index) => {
        setTimeout(() => {
          generateSingleAIPost(index);
        }, time - Date.now() > 0 ? time - Date.now() : 0);
      });

      setLastAIGeneration(today);
    };

    generateAIPosts();
    const interval = setInterval(generateAIPosts, 24 * 60 * 60 * 1000); // Check daily
    return () => clearInterval(interval);
  }, [enableAIPosts, lastAIGeneration]);

  // Manual trigger for AI post
  const handleGenerateAIPost = () => {
    generateSingleAIPost(0);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBlog({ ...newBlog, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size must be less than 5MB');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewBlog({ ...newBlog, image: reader.result });
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const blog = {
      id: isEditing ? newBlog.id : Date.now(),
      title: newBlog.title,
      excerpt: newBlog.excerpt,
      content: newBlog.content,
      image: newBlog.image,
      author: newBlog.author,
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      isAI: false
    };

    if (isEditing) {
      setBlogs(blogs.map((b) => (b.id === blog.id ? blog : b)));
    } else {
      setBlogs([blog, ...blogs]);
    }

    setNewBlog({ id: null, title: '', excerpt: '', content: '', image: '', author: '' });
    setImagePreview(null);
    setIsEditing(false);
  };

  const handleEdit = (blog) => {
    setNewBlog(blog);
    setImagePreview(blog.image);
    setIsEditing(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      setBlogs(blogs.filter((blog) => blog.id !== id));
    }
  };

  const handleCancelEdit = () => {
    setNewBlog({ id: null, title: '', excerpt: '', content: '', image: '', author: '' });
    setImagePreview(null);
    setIsEditing(false);
  };

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f3f4f6',
      boxSizing: 'border-box',
      overflowX: 'hidden'
    }}>
      <section style={{
        padding: 'clamp(2rem, 8vw, 4rem) clamp(0.5rem, 2vw, 1rem)',
        backgroundColor: '#ffffff'
      }}>
        <div style={{
          maxWidth: 'min(48rem, 95vw)',
          margin: '0 auto',
          padding: '0 clamp(0.5rem, 2vw, 1rem)'
        }}>
          <motion.div {...fadeIn}>
            {/* AI Controls */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'clamp(0.5rem, 2vw, 1rem)',
              marginBottom: 'clamp(1rem, 4vw, 2rem)',
              alignItems: 'center'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'clamp(0.5rem, 2vw, 1rem)'
              }}>
                <label
                  htmlFor="aiToggle"
                  style={{
                    fontSize: 'clamp(0.875rem, 2.5vw, 1rem)',
                    color: '#1f2937',
                    fontWeight: 500
                  }}
                >
                  Enable AI Auto-Posting
                </label>
                <input
                  type="checkbox"
                  id="aiToggle"
                  checked={enableAIPosts}
                  onChange={() => setEnableAIPosts(!enableAIPosts)}
                  style={{
                    width: 'clamp(20px, 4vw, 24px)',
                    height: 'clamp(20px, 4vw, 24px)',
                    cursor: 'pointer'
                  }}
                />
              </div>
              <motion.button
                onClick={handleGenerateAIPost}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={isLoading}
                style={{
                  padding: 'clamp(0.5rem, 2vw, 0.75rem) clamp(1rem, 4vw, 1.5rem)',
                  backgroundColor: isLoading ? '#6b7280' : '#0f172a',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '0.25rem',
                  cursor: isLoading ? 'not-allowed' : 'pointer',
                  fontSize: 'clamp(0.875rem, 2.5vw, 1rem)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  minHeight: '48px'
                }}
              >
                <Bot style={{ width: 'clamp(14px, 2vw, 16px)', height: 'clamp(14px, 2vw, 16px)' }} />
                {isLoading ? 'Generating...' : 'Generate AI Post'}
              </motion.button>
              {apiError && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{
                    color: '#dc2626',
                    fontSize: 'clamp(0.75rem, 2vw, 0.875rem)',
                    textAlign: 'center',
                    backgroundColor: '#fef2f2',
                    padding: 'clamp(0.25rem, 1vw, 0.5rem)',
                    borderRadius: '0.25rem'
                  }}
                >
                  {apiError}
                </motion.p>
              )}
            </div>

            {/* Blog Form */}
            <h2 style={{
              fontSize: 'clamp(1.5rem, 5vw, 1.875rem)',
              fontWeight: 300,
              color: '#1f2937',
              marginBottom: 'clamp(0.75rem, 3vw, 1.5rem)',
              textAlign: 'center'
            }}>
              {isEditing ? 'Edit Blog Post' : 'Add New Blog Post'}
            </h2>
            <form
              onSubmit={handleSubmit}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 'clamp(0.5rem, 2vw, 1rem)',
                marginBottom: 'clamp(1rem, 4vw, 2rem)'
              }}
            >
              <input
                type="text"
                name="title"
                value={newBlog.title}
                onChange={handleInputChange}
                placeholder="Blog Title"
                required
                style={{
                  padding: 'clamp(0.5rem, 2vw, 0.75rem)',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.25rem',
                  fontSize: 'clamp(0.875rem, 2.5vw, 1rem)',
                  outline: 'none',
                  minHeight: '48px'
                }}
              />
              <input
                type="text"
                name="excerpt"
                value={newBlog.excerpt}
                onChange={handleInputChange}
                placeholder="Excerpt"
                required
                style={{
                  padding: 'clamp(0.5rem, 2vw, 0.75rem)',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.25rem',
                  fontSize: 'clamp(0.875rem, 2.5vw, 1rem)',
                  outline: 'none',
                  minHeight: '48px'
                }}
              />
              <textarea
                name="content"
                value={newBlog.content}
                onChange={handleInputChange}
                placeholder="Blog Content"
                required
                style={{
                  padding: 'clamp(0.5rem, 2vw, 0.75rem)',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.25rem',
                  fontSize: 'clamp(0.875rem, 2.5vw, 1rem)',
                  minHeight: 'clamp(8rem, 20vw, 10rem)',
                  outline: 'none',
                  resize: 'vertical'
                }}
              />
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 'clamp(0.25rem, 1vw, 0.5rem)'
              }}>
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{
                    padding: 'clamp(0.5rem, 2vw, 0.75rem)',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.25rem',
                    fontSize: 'clamp(0.875rem, 2.5vw, 1rem)'
                  }}
                />
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    style={{
                      width: '100%',
                      maxHeight: 'clamp(150px, 40vw, 200px)',
                      objectFit: 'cover',
                      borderRadius: '0.25rem'
                    }}
                  />
                )}
              </div>
              <input
                type="text"
                name="author"
                value={newBlog.author}
                onChange={handleInputChange}
                placeholder="Author Name"
                required
                style={{
                  padding: 'clamp(0.5rem, 2vw, 0.75rem)',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.25rem',
                  fontSize: 'clamp(0.875rem, 2.5vw, 1rem)',
                  outline: 'none',
                  minHeight: '48px'
                }}
              />
              <div style={{
                display: 'flex',
                gap: 'clamp(0.5rem, 2vw, 1rem)',
                flexWrap: 'wrap'
              }}>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    padding: 'clamp(0.5rem, 2vw, 0.75rem)',
                    backgroundColor: '#1f2937',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '0.25rem',
                    cursor: 'pointer',
                    fontSize: 'clamp(0.875rem, 2.5vw, 1rem)',
                    flex: 1,
                    minHeight: '48px'
                  }}
                >
                  {isEditing ? 'Update Blog' : 'Publish Blog'}
                </motion.button>
                {isEditing && (
                  <motion.button
                    type="button"
                    onClick={handleCancelEdit}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                      padding: 'clamp(0.5rem, 2vw, 0.75rem)',
                      backgroundColor: '#6b7280',
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: '0.25rem',
                      cursor: 'pointer',
                      fontSize: 'clamp(0.875rem, 2.5vw, 1rem)',
                      flex: 1,
                      minHeight: '48px'
                    }}
                  >
                    Cancel
                  </motion.button>
                )}
              </div>
            </form>

            {/* Blog List */}
            <h3 style={{
              fontSize: 'clamp(1.25rem, 3.5vw, 1.5rem)',
              fontWeight: 300,
              color: '#1f2937',
              marginBottom: 'clamp(0.5rem, 2vw, 1rem)',
              textAlign: 'center'
            }}>
              Existing Blogs
            </h3>
            {blogs.length === 0 ? (
              <p style={{
                color: '#4b5563',
                textAlign: 'center',
                fontSize: 'clamp(0.875rem, 2.5vw, 1rem)'
              }}>
                No blogs available.
              </p>
            ) : (
              <div style={{
                display: 'grid',
                gap: 'clamp(0.5rem, 2vw, 1rem)',
                gridTemplateColumns: 'repeat(auto-fit, minmax(clamp(250px, 45vw, 300px), 1fr))'
              }}>
                {blogs.map((blog) => (
                  <motion.div
                    key={blog.id}
                    style={{
                      backgroundColor: '#f9fafb',
                      borderRadius: '0.5rem',
                      padding: 'clamp(0.5rem, 2vw, 1rem)',
                      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 'clamp(0.5rem, 2vw, 1rem)',
                      position: 'relative'
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4 }}
                  >
                    {blog.isAI && (
                      <span style={{
                        position: 'absolute',
                        top: 'clamp(0.25rem, 1vw, 0.5rem)',
                        right: 'clamp(0.25rem, 1vw, 0.5rem)',
                        backgroundColor: '#0f172a',
                        color: '#ffffff',
                        padding: 'clamp(0.25rem, 1vw, 0.5rem)',
                        borderRadius: '0.25rem',
                        fontSize: 'clamp(0.75rem, 2vw, 0.875rem)',
                        fontWeight: 500
                      }}>
                        AI-Generated
                      </span>
                    )}
                    <img
                      src={blog.image}
                      alt={blog.title}
                      style={{
                        width: 'clamp(80px, 20vw, 100px)',
                        height: 'clamp(80px, 20vw, 100px)',
                        objectFit: 'cover',
                        borderRadius: '0.25rem'
                      }}
                    />
                    <div style={{ flex: 1, overflow: 'hidden' }}>
                      <h4 style={{
                        fontSize: 'clamp(0.875rem, 2.5vw, 1rem)',
                        fontWeight: 500,
                        color: '#1f2937',
                        marginBottom: 'clamp(0.25rem, 1vw, 0.5rem)',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }}>
                        {blog.title}
                      </h4>
                      <p style={{
                        fontSize: 'clamp(0.75rem, 2vw, 0.875rem)',
                        color: '#6b7280',
                        marginBottom: 'clamp(0.25rem, 1vw, 0.5rem)'
                      }}>
                        {blog.date} | By {blog.author}
                      </p>
                      <div style={{
                        display: 'flex',
                        gap: 'clamp(0.25rem, 1vw, 0.5rem)',
                        flexWrap: 'wrap'
                      }}>
                        <motion.button
                          onClick={() => handleEdit(blog)}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          style={{
                            padding: 'clamp(0.25rem, 1vw, 0.5rem) clamp(0.5rem, 2vw, 1rem)',
                            backgroundColor: '#1f2937',
                            color: '#ffffff',
                            border: 'none',
                            borderRadius: '0.25rem',
                            cursor: 'pointer',
                            fontSize: 'clamp(0.75rem, 2vw, 0.875rem)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.25rem'
                          }}
                        >
                          <Edit2 style={{ width: 'clamp(12px, 2vw, 14px)', height: 'clamp(12px, 2vw, 14px)' }} />
                          Edit
                        </motion.button>
                        <motion.button
                          onClick={() => handleDelete(blog.id)}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          style={{
                            padding: 'clamp(0.25rem, 1vw, 0.5rem) clamp(0.5rem, 2vw, 1rem)',
                            backgroundColor: '#dc2626',
                            color: '#ffffff',
                            border: 'none',
                            borderRadius: '0.25rem',
                            cursor: 'pointer',
                            fontSize: 'clamp(0.75rem, 2vw, 0.875rem)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.25rem'
                          }}
                        >
                          <Trash2 style={{ width: 'clamp(12px, 2vw, 14px)', height: 'clamp(12px, 2vw, 14px)' }} />
                          Delete
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AdminBlogs;