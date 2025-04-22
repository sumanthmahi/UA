import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Search } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import StyledButton from './StyledButton';

// Design process steps
const designSteps = [
  {
    id: 1,
    title: "Discovery",
    description: "We begin by understanding your vision, lifestyle, and preferences through detailed consultation.",
    image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=800&auto=format&fit=crop",
    icon: <Search style={{ width: 'clamp(24px, 3vw, 32px)', height: 'clamp(24px, 3vw, 32px)', color: '#374151' }} />,
    color: "#f8fafc",
    borderColor: "#e2e8f0",
    accentColor: "#f4f4f4"
  },
  {
    id: 3,
    title: "Design",
    description:
      "We develop detailed designs featuring vibrant palettes, sustainable local materials, and festive-ready elements, meticulously crafted to reflect your style.",
    image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=800&auto=format&fit=crop",
    icon: <svg style={{ width: 'clamp(24px, 3vw, 32px)', height: 'clamp(24px, 3vw, 32px)', color: '#374151' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>,
    color: "#f8fafc",
    borderColor: "#e2e8f0",
    accentColor: "#f4f4f4",
  },
  {
    id: 4,
    title: "Execution",
    description:
      "Our skilled artisans and trusted vendors execute the design with precision, delivering a timeless space that embodies your vision.",
    image: "https://images.unsplash.com/photo-1631679706909-1844bbd07221?q=80&w=800&auto=format&fit=crop",
    icon: <svg style={{ width: 'clamp(24px, 3vw, 32px)', height: 'clamp(24px, 3vw, 32px)', color: '#374151' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>,
    color: "#f8fafc",
    borderColor: "#e2e8f0",
    accentColor: "#f4f4f4",
  },
];

// Form options
const roomTypes = ["Living Room", "Bedroom", "Kitchen", "Pooja Room", "Dining Area", "Bathroom", "Study Room"];
const styleOptions = [
  "Indian Contemporary",
  "Traditional Indian",
  "Modern",
  "Minimalist",
  "Fusion",
  "Indo-Colonial",
  "Bohemian",
];
const sizeOptions = ["Small (<500 sq.ft)", "Medium (500-1000 sq.ft)", "Large (>1000 sq.ft)"];
const budgetOptions = ["₹10,000-₹50,000", "₹50,000-₹2,00,000", "₹2,00,000-₹5,00,000", "₹5,00,000+"];

// Predefined SVG icons for furniture, lighting, and decor
const svgIcons = {
  sofa: <path d="M5 10h14v2H5zM3 8h18v2H3zM5 6h14v2H5z" />,
  table: <rect x="8" y="8" width="8" height="4" />,
  bed: <rect x="6" y="6" width="12" height="8" />,
  lamp: <path d="M12 6v4m-2 4h4m-2-4v4" />,
  rug: <rect x="8" y="10" width="8" height="2" rx="1" />,
  poojaUnit: <path d="M10 6h4v8h-4zM12 6v-2" />,
  diningTable: <rect x="6" y="8" width="12" height="4" rx="1" />,
};

// Room templates for 2D layout (simple grid-based placement)
const roomTemplates = {
  "Living Room": [
    { type: "sofa", x: 10, y: 20, width: 30, height: 10 },
    { type: "table", x: 50, y: 15, width: 20, height: 10 },
    { type: "lamp", x: 80, y: 10, width: 10, height: 10 },
    { type: "rug", x: 40, y: 30, width: 20, height: 5 },
  ],
  "Bedroom": [
    { type: "bed", x: 30, y: 10, width: 30, height: 20 },
    { type: "lamp", x: 65, y: 10, width: 10, height: 10 },
    { type: "table", x: 10, y: 30, width: 15, height: 10 },
    { type: "rug", x: 30, y: 35, width: 20, height: 5 },
  ],
  "Pooja Room": [
    { type: "poojaUnit", x: 10, y: 10, width: 20, height: 20 }, // Northeast for Vastu
    { type: "lamp", x: 40, y: 10, width: 10, height: 10 },
    { type: "rug", x: 15, y: 35, width: 15, height: 5 },
  ],
  "Dining Area": [
    { type: "diningTable", x: 30, y: 15, width: 30, height: 10 },
    { type: "lamp", x: 65, y: 10, width: 10, height: 10 },
    { type: "rug", x: 30, y: 30, width: 20, height: 5 },
  ],
};

const Design = () => {
  const { isDarkMode } = useTheme();
  // Form state
  const [formData, setFormData] = useState({
    roomType: '',
    style: '',
    size: '',
    budget: '',
    requirements: ''
  });
  const [aiResponses, setAiResponses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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

  // Parse AI response
  const parseAIResponses = (response) => {
    if (!response) return [];

    const designs = [];
    const designRegex = /\*\*Design (\d+)\*\*: ([\s\S]*?)\*\*Layout Description\*\*: ([\s\S]*?)\*\*Estimated Cost \(INR\)\*\*:([\s\S]*?)(?=\*\*Design|\s*$)/g;
    let match;

    while ((match = designRegex.exec(response)) !== null) {
      const [, , suggestion, layout, costBlock] = match;
      const costItems = [];
      const costRegex = /-\s*(.*?): ₹([\d,]+)/g;
      let costMatch;

      while ((costMatch = costRegex.exec(costBlock)) !== null) {
        costItems.push({
          label: costMatch[1].trim(),
          value: `₹${costMatch[2]}`
        });
      }

      const totalMatch = costBlock.match(/Total: ₹([\d,]+)/);
      designs.push({
        suggestion: suggestion.trim(),
        layout: layout.trim(),
        costItems,
        totalCost: totalMatch ? `₹${totalMatch[1]}` : ''
      });
    }

    return designs;
  };

  // Alternative parsing method
  const tryAlternativeParse = (text) => {
    const designs = [];
    const designSections = text.split('**Design');

    designSections.forEach(section => {
      if (section.trim().length < 10) return;

      const suggestionMatch = section.match(/\d+\*\*: (.*?)(?=\*\*Layout Description|$)/s);
      const layoutMatch = section.match(/\*\*Layout Description\*\*: (.*?)(?=\*\*Estimated Cost|$)/s);
      const costMatch = section.match(/\*\*Estimated Cost \(INR\)\*\*:([\s\S]*?)(?=\*\*Design|\s*$)/);

      if (suggestionMatch && costMatch) {
        const costItems = [];
        const costLines = costMatch[1].split('\n').filter(line => line.trim());

        costLines.forEach(line => {
          const itemMatch = line.match(/-\s*(.*?): ₹([\d,]+)/);
          if (itemMatch) {
            costItems.push({
              label: itemMatch[1].trim(),
              value: `₹${itemMatch[2]}`
            });
          }
        });

        const totalMatch = costMatch[1].match(/Total: ₹([\d,]+)/);

        designs.push({
          suggestion: suggestionMatch[1].trim(),
          layout: layoutMatch ? layoutMatch[1].trim() : '',
          costItems,
          totalCost: totalMatch ? `₹${totalMatch[1]}` : ''
        });
      }
    });

    return designs.slice(0, 2); // Return max 2 designs
  };

  // Generate 2D sketch based on room type and layout description
  const generate2DSketch = (roomType, layoutDescription) => {
    const template = roomTemplates[roomType] || roomTemplates["Living Room"];
    const elements = template.map(item => ({
      ...item,
      icon: svgIcons[item.type],
      label: item.type.charAt(0).toUpperCase() + item.type.slice(1),
    }));

    if (layoutDescription) {
      elements.forEach(element => {
        if (layoutDescription.toLowerCase().includes('corner') && element.type === 'lamp') {
          element.x = 80;
          element.y = 10;
        }
        if (layoutDescription.toLowerCase().includes('center') && element.type === 'table') {
          element.x = 40;
          element.y = 20;
        }
        if (layoutDescription.toLowerCase().includes('vastu') && element.type === 'poojaUnit') {
          element.x = 10;
          element.y = 10;
        }
      });
    }

    return elements;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setAiResponses([]);

    // Validate form inputs
    if (!formData.roomType || !formData.style || !formData.size || !formData.budget) {
      setError('Please fill all required fields');
      setLoading(false);
      return;
    }

    try {
      // Enhanced prompt with layout description
      const prompt = `
      Generate two distinct interior design concepts for a ${formData.roomType} in ${formData.style} style.
      Space size: ${formData.size}
      Budget: ${formData.budget}
      Special requirements: ${formData.requirements || 'None'}
      
      For each design concept:
      1. Provide a 50-70 word description incorporating Indian cultural elements
      2. Provide a brief layout description (e.g., placement of furniture, lighting, decor, Vastu considerations)
      3. Include a cost breakdown with 3 items (Furniture, Lighting, Decor)
      4. Ensure total cost is within the specified budget
      
      Format exactly like this:
      
      **Design 1**: [description here]
      **Layout Description**: [layout details here]
      **Estimated Cost (INR)**:
      - Furniture: ₹[amount]
      - Lighting: ₹[amount]
      - Decor: ₹[amount]
      - Total: ₹[total]
      
      **Design 2**: [description here]
      **Layout Description**: [layout details here]
      **Estimated Cost (INR)**:
      - Furniture: ₹[amount]
      - Lighting: ₹[amount]
      - Decor: ₹[amount]
      - Total: ₹[total]
      `.trim();

      // Log the prompt for debugging
      console.log("Prompt Length:", prompt.length);
      console.log("Prompt:", prompt);

      const response = await fetch(
        "https://api.deepinfra.com/v1/inference/mistralai/Mixtral-8x7B-Instruct-v0.1",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer DAc2aY2342GIyeUpf0nKQccrxczY8aiM"
          },
          body: JSON.stringify({
            input: prompt,
            parameters: {
              max_new_tokens: 1000,
              temperature: 0.7
            }
          })
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API request failed: ${response.status} - ${errorText}`);
      }

      const data = await response.json();

      // Debugging: Log the full API response
      console.log("API Response:", data);

      // Handle different response structures
      const generatedText = data.generated_text || data.results?.[0]?.generated_text || data.output || '';

      if (!generatedText) {
        throw new Error("Empty response from API");
      }

      const parsedResponses = parseAIResponses(generatedText);

      if (parsedResponses.length === 0) {
        const fallbackResponses = tryAlternativeParse(generatedText);
        if (fallbackResponses.length > 0) {
          const enhancedResponses = fallbackResponses.map(response => ({
            ...response,
            sketch: generate2DSketch(formData.roomType, response.layout)
          }));
          setAiResponses(enhancedResponses);
        } else {
          throw new Error("Could not parse design suggestions from response");
        }
      } else {
        const enhancedResponses = parsedResponses.map(response => ({
          ...response,
          sketch: generate2DSketch(formData.roomType, response.layout)
        }));
        setAiResponses(enhancedResponses);
      }

    } catch (err) {
      setError(err.message || 'Failed to generate designs. Please try again.');
      console.error("API Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: isDarkMode ? '#121212' : '#ffffff',
      color: isDarkMode ? '#f4f4f4' : '#1f2937',
      boxSizing: 'border-box',
      overflowX: 'hidden',
      transition: 'background-color 0.3s, color 0.3s'
    }}>
      {/* Hero Section */}
      <section style={{
        position: 'relative',
        height: 'clamp(30vh, 50vw, 40vh)',
        background: isDarkMode ?
          'linear-gradient(135deg, #000000 0%, #1a1a1a 100%)' :
          'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'url(https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1600)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.15
        }} />
        <div style={{
          position: 'relative',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: 'clamp(1rem, 5vw, 2rem)',
          zIndex: 10
        }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{
              maxWidth: 'clamp(20rem, 80vw, 48rem)',
              margin: '0 auto'
            }}
          >
            <h1 style={{
              fontSize: 'clamp(1.5rem, 5vw, 2.5rem)',
              fontWeight: 300,
              color: '#ffffff',
              marginBottom: 'clamp(0.5rem, 2vw, 1rem)'
            }}>
              Our Design Process
            </h1>
            <p style={{
              fontSize: 'clamp(0.875rem, 3vw, 1.125rem)',
              fontWeight: 400,
              color: '#e5e7eb',
              maxWidth: 'clamp(18rem, 60vw, 36rem)',
              margin: '0 auto'
            }}>
              Craft your dream home with Urban Associates, blending India's heritage with timeless elegance.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Design Process Steps */}
      <section style={{
        padding: 'clamp(2rem, 8vw, 5rem) clamp(0.5rem, 2vw, 1rem)',
        backgroundColor: isDarkMode ? '#1a1a1a' : '#f8fafc',
        transition: 'background-color 0.3s'
      }}>
        <div style={{
          maxWidth: 'min(1200px, 95vw)',
          margin: '0 auto',
          padding: '0 clamp(0.5rem, 2vw, 1rem)'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(clamp(250px, 30vw, 280px), 1fr))',
            gap: 'clamp(1rem, 3vw, 2rem)',
            padding: 'clamp(0.5rem, 2vw, 1rem)'
          }}>
            {designSteps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{
                  y: -8,
                  boxShadow: isDarkMode ?
                    '0 12px 24px rgba(255, 255, 255, 0.1)' :
                    '0 12px 24px rgba(0, 0, 0, 0.1)',
                  transition: { duration: 0.3 }
                }}
                style={{
                  backgroundColor: isDarkMode ? '#242424' : '#ffffff',
                  borderRadius: '16px',
                  padding: 'clamp(1rem, 3vw, 2rem)',
                  border: `1px solid ${isDarkMode ? '#333333' : '#e2e8f0'}`,
                  boxShadow: isDarkMode ?
                    '0 4px 6px rgba(255, 255, 255, 0.05)' :
                    '0 4px 6px rgba(0, 0, 0, 0.05)',
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s, border-color 0.3s'
                }}
              >
                <div style={{
                  marginBottom: 'clamp(0.5rem, 2vw, 1rem)',
                  padding: 'clamp(0.5rem, 1.5vw, 0.75rem)',
                  borderRadius: '50%',
                  width: 'clamp(48px, 8vw, 64px)',
                  height: 'clamp(48px, 8vw, 64px)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: isDarkMode ? '#333333' : '#ffffff',
                  boxShadow: isDarkMode ?
                    '0 2px 4px rgba(255, 255, 255, 0.05)' :
                    '0 2px 4px rgba(0, 0, 0, 0.05)'
                }}>
                  {step.icon}
                </div>
                <h3 style={{
                  fontSize: 'clamp(1.25rem, 3.5vw, 1.5rem)',
                  fontWeight: '500',
                  color: isDarkMode ? '#f4f4f4' : '#1f2937',
                  marginBottom: 'clamp(0.5rem, 2vw, 1rem)'
                }}>
                  {step.title}
                </h3>
                <p style={{
                  fontSize: 'clamp(0.875rem, 2.5vw, 1rem)',
                  color: isDarkMode ? '#d1d5db' : '#4b5563',
                  lineHeight: '1.6',
                  marginBottom: 'clamp(0.75rem, 2.5vw, 1.5rem)',
                  flex: '1 1 auto'
                }}>
                  {step.description}
                </p>
                <div style={{
                  width: '100%',
                  height: 'clamp(150px, 25vw, 200px)',
                  borderRadius: '10px',
                  overflow: 'hidden',
                  marginTop: 'auto'
                }}>
                  <img
                    src={step.image}
                    alt={step.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.5s ease'
                    }}
                    onMouseOver={(e) => e.target.style.transform = 'scale(1.1)'}
                    onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Design Suggestion Form */}
      <section style={{
        padding: 'clamp(2rem, 8vw, 5rem) clamp(0.5rem, 2vw, 1rem)',
        backgroundColor: isDarkMode ? '#121212' : '#ffffff',
        transition: 'background-color 0.3s'
      }}>
        <div style={{
          maxWidth: 'min(48rem, 95vw)',
          margin: '0 auto',
          padding: '0 clamp(0.5rem, 2vw, 1rem)'
        }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{
              textAlign: 'center',
              marginBottom: 'clamp(1.5rem, 5vw, 3rem)'
            }}
          >
            <h2 style={{
              fontSize: 'clamp(1.5rem, 5vw, 2.25rem)',
              fontWeight: 300,
              color: isDarkMode ? '#f4f4f4' : '#1f2937',
              marginBottom: 'clamp(0.5rem, 2vw, 1rem)'
            }}>
              Discover Your Personalized Design
            </h2>
            <p style={{
              fontSize: 'clamp(0.875rem, 3vw, 1.125rem)',
              color: isDarkMode ? '#d1d5db' : '#4b5563',
              maxWidth: 'clamp(18rem, 60vw, 36rem)',
              margin: '0 auto'
            }}>
              Fill in the details below to receive two customized design suggestions with a 2D layout, tailored to your preferences.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{
              backgroundColor: isDarkMode ? '#1a1a1a' : '#ffffff',
              borderRadius: '12px',
              boxShadow: isDarkMode ?
                '0 10px 25px rgba(255, 255, 255, 0.05)' :
                '0 10px 25px rgba(0, 0, 0, 0.1)',
              overflow: 'hidden',
              transition: 'background-color 0.3s, box-shadow 0.3s'
            }}
          >
            <div style={{
              padding: 'clamp(1rem, 4vw, 2rem)'
            }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(clamp(200px, 45vw, 240px), 1fr))',
                gap: 'clamp(0.75rem, 3vw, 1.5rem)',
                marginBottom: 'clamp(0.75rem, 3vw, 1.5rem)'
              }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label
                    htmlFor="roomType"
                    style={{
                      fontSize: 'clamp(0.75rem, 2vw, 0.875rem)',
                      fontWeight: 600,
                      color: isDarkMode ? '#f4f4f4' : '#1f2937',
                      marginBottom: '0.25rem'
                    }}
                  >
                    Room Type
                  </label>
                  <select
                    id="roomType"
                    name="roomType"
                    value={formData.roomType}
                    onChange={handleInputChange}
                    required
                    style={{
                      width: '100%',
                      padding: 'clamp(0.5rem, 2vw, 0.75rem)',
                      border: `1px solid ${isDarkMode ? '#333333' : '#d1d5db'}`,
                      borderRadius: '0.375rem',
                      fontSize: 'clamp(0.875rem, 2.5vw, 1rem)',
                      backgroundColor: isDarkMode ? '#242424' : '#f9fafb',
                      color: isDarkMode ? '#f4f4f4' : '#1f2937',
                      outline: 'none',
                      transition: 'border-color 0.2s ease',
                      minHeight: '48px'
                    }}
                  >
                    <option value="" disabled>Select Room Type</option>
                    {roomTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label
                    htmlFor="style"
                    style={{
                      fontSize: 'clamp(0.75rem, 2vw, 0.875rem)',
                      fontWeight: 600,
                      color: isDarkMode ? '#f4f4f4' : '#1f2937',
                      marginBottom: '0.25rem'
                    }}
                  >
                    Preferred Style
                  </label>
                  <select
                    id="style"
                    name="style"
                    value={formData.style}
                    onChange={handleInputChange}
                    required
                    style={{
                      width: '100%',
                      padding: 'clamp(0.5rem, 2vw, 0.75rem)',
                      border: `1px solid ${isDarkMode ? '#333333' : '#d1d5db'}`,
                      borderRadius: '0.375rem',
                      fontSize: 'clamp(0.875rem, 2.5vw, 1rem)',
                      backgroundColor: isDarkMode ? '#242424' : '#f9fafb',
                      color: isDarkMode ? '#f4f4f4' : '#1f2937',
                      outline: 'none',
                      transition: 'border-color 0.2s ease',
                      minHeight: '48px'
                    }}
                  >
                    <option value="" disabled>Select Style</option>
                    {styleOptions.map(style => (
                      <option key={style} value={style}>{style}</option>
                    ))}
                  </select>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label
                    htmlFor="size"
                    style={{
                      fontSize: 'clamp(0.75rem, 2vw, 0.875rem)',
                      fontWeight: 600,
                      color: isDarkMode ? '#f4f4f4' : '#1f2937',
                      marginBottom: '0.25rem'
                    }}
                  >
                    Room Size
                  </label>
                  <select
                    id="size"
                    name="size"
                    value={formData.size}
                    onChange={handleInputChange}
                    required
                    style={{
                      width: '100%',
                      padding: 'clamp(0.5rem, 2vw, 0.75rem)',
                      border: `1px solid ${isDarkMode ? '#333333' : '#d1d5db'}`,
                      borderRadius: '0.375rem',
                      fontSize: 'clamp(0.875rem, 2.5vw, 1rem)',
                      backgroundColor: isDarkMode ? '#242424' : '#f9fafb',
                      color: isDarkMode ? '#f4f4f4' : '#1f2937',
                      outline: 'none',
                      transition: 'border-color 0.2s ease',
                      minHeight: '48px'
                    }}
                  >
                    <option value="" disabled>Select Room Size</option>
                    {sizeOptions.map(size => (
                      <option key={size} value={size}>{size}</option>
                    ))}
                  </select>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label
                    htmlFor="budget"
                    style={{
                      fontSize: 'clamp(0.75rem, 2vw, 0.875rem)',
                      fontWeight: 600,
                      color: isDarkMode ? '#f4f4f4' : '#1f2937',
                      marginBottom: '0.25rem'
                    }}
                  >
                    Budget Range
                  </label>
                  <select
                    id="budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleInputChange}
                    required
                    style={{
                      width: '100%',
                      padding: 'clamp(0.5rem, 2vw, 0.75rem)',
                      border: `1px solid ${isDarkMode ? '#333333' : '#d1d5db'}`,
                      borderRadius: '0.375rem',
                      fontSize: 'clamp(0.875rem, 2.5vw, 1rem)',
                      backgroundColor: isDarkMode ? '#242424' : '#f9fafb',
                      color: isDarkMode ? '#f4f4f4' : '#1f2937',
                      outline: 'none',
                      transition: 'border-color 0.2s ease',
                      minHeight: '48px'
                    }}
                  >
                    <option value="" disabled>Select Budget Range</option>
                    {budgetOptions.map(budget => (
                      <option key={budget} value={budget}>{budget}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div style={{ marginBottom: 'clamp(0.75rem, 3vw, 1.5rem)' }}>
                <label
                  htmlFor="requirements"
                  style={{
                    fontSize: 'clamp(0.75rem, 2vw, 0.875rem)',
                    fontWeight: 600,
                    color: isDarkMode ? '#f4f4f4' : '#1f2937',
                    marginBottom: '0.5rem',
                    display: 'block'
                  }}
                >
                  Special Requirements
                </label>
                <textarea
                  id="requirements"
                  name="requirements"
                  value={formData.requirements}
                  onChange={handleInputChange}
                  placeholder="E.g., Vastu-compliant design, Diwali decor, modular furniture"
                  style={{
                    width: '100%',
                    padding: 'clamp(0.5rem, 2vw, 0.75rem)',
                    border: `1px solid ${isDarkMode ? '#333333' : '#d1d5db'}`,
                    borderRadius: '0.375rem',
                    fontSize: 'clamp(0.875rem, 2.5vw, 1rem)',
                    backgroundColor: isDarkMode ? '#242424' : '#f9fafb',
                    color: isDarkMode ? '#f4f4f4' : '#1f2937',
                    minHeight: 'clamp(80px, 20vw, 120px)',
                    outline: 'none',
                    transition: 'border-color 0.2s ease',
                    resize: 'vertical'
                  }}
                />
              </div>

              <StyledButton
                onClick={handleSubmit}
                disabled={loading}
                afterContent={loading ? 'Generating...' : 'Get Designs'}
              >
                {loading ? 'Generating...' : 'Get Your Designs'}
              </StyledButton>
            </div>
          </motion.div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                backgroundColor: isDarkMode ? '#4b5563' : '#fef2f2',
                padding: 'clamp(0.5rem, 2vw, 1rem)',
                borderRadius: '0.375rem',
                border: `1px solid ${isDarkMode ? '#6b7280' : '#fecaca'}`,
                color: isDarkMode ? '#f4f4f4' : '#b91c1c',
                marginTop: 'clamp(0.75rem, 3vw, 1.5rem)',
                textAlign: 'center',
                fontSize: 'clamp(0.75rem, 2vw, 0.875rem)'
              }}
            >
              {error}
            </motion.div>
          )}

          {/* AI Responses */}
          {aiResponses.length > 0 && (
            <div style={{ marginTop: 'clamp(1rem, 4vw, 2rem)' }}>
              {aiResponses.map((response, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  style={{
                    backgroundColor: isDarkMode ? '#1a1a1a' : '#ffffff',
                    borderRadius: '12px',
                    boxShadow: isDarkMode ?
                      '0 10px 25px rgba(255, 255, 255, 0.05)' :
                      '0 10px 25px rgba(0, 0, 0, 0.1)',
                    overflow: 'hidden',
                    marginBottom: 'clamp(1rem, 4vw, 2rem)',
                    transition: 'background-color 0.3s, box-shadow 0.3s'
                  }}
                >
                  <div style={{
                    backgroundColor: isDarkMode ? '#333333' : '#0f172a',
                    padding: 'clamp(0.5rem, 2vw, 1rem) clamp(0.75rem, 3vw, 1.5rem)',
                    color: '#ffffff'
                  }}>
                    <h3 style={{
                      fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
                      fontWeight: 500
                    }}>
                      Design {index + 1}
                    </h3>
                  </div>
                  <div style={{
                    padding: 'clamp(0.75rem, 3vw, 1.5rem) clamp(1rem, 4vw, 2rem)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 'clamp(0.75rem, 3vw, 1.5rem)'
                  }}>
                    <div>
                      <h4 style={{
                        fontSize: 'clamp(0.875rem, 2.5vw, 1.125rem)',
                        fontWeight: 500,
                        color: isDarkMode ? '#f4f4f4' : '#1f2937',
                        marginBottom: 'clamp(0.5rem, 2vw, 0.75rem)'
                      }}>
                        Design Suggestion
                      </h4>
                      <p style={{
                        fontSize: 'clamp(0.75rem, 2vw, 1rem)',
                        color: isDarkMode ? '#d1d5db' : '#4b5563',
                        lineHeight: '1.6'
                      }}>
                        {response.suggestion}
                      </p>
                    </div>

                    <div>
                      <h4 style={{
                        fontSize: 'clamp(0.875rem, 2.5vw, 1.125rem)',
                        fontWeight: 500,
                        color: isDarkMode ? '#f4f4f4' : '#1f2937',
                        marginBottom: 'clamp(0.5rem, 2vw, 0.75rem)'
                      }}>
                        2D Layout
                      </h4>
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        style={{
                          border: `1px solid ${isDarkMode ? '#333333' : '#e2e8f0'}`,
                          borderRadius: '8px',
                          padding: 'clamp(0.5rem, 2vw, 1rem)',
                          backgroundColor: isDarkMode ? '#242424' : '#f9fafb',
                          position: 'relative',
                          width: '100%',
                          maxWidth: 'min(400px, 90vw)',
                          margin: '0 auto',
                          transition: 'background-color 0.3s, border-color 0.3s'
                        }}
                      >
                        <svg
                          viewBox="0 0 100 50"
                          style={{
                            width: '100%',
                            height: 'clamp(150px, 40vw, 200px)',
                            backgroundColor: isDarkMode ? '#121212' : '#ffffff',
                            border: `1px solid ${isDarkMode ? '#333333' : '#d1d5db'}`,
                            borderRadius: '4px',
                            transition: 'background-color 0.3s, border-color 0.3s'
                          }}
                        >
                          <rect x="0" y="0" width="100" height="50" fill="none" stroke={isDarkMode ? '#333333' : '#d1d5db'} strokeWidth="1" />
                          {response.sketch.map((element, idx) => (
                            <g key={idx} transform={`translate(${element.x}, ${element.y})`}>
                              <g
                                style={{ cursor: 'pointer' }}
                                onMouseOver={(e) => {
                                  e.currentTarget.nextSibling.style.opacity = '1';
                                }}
                                onMouseOut={(e) => {
                                  e.currentTarget.nextSibling.style.opacity = '0';
                                }}
                              >
                                <rect
                                  x="0"
                                  y="0"
                                  width={element.width}
                                  height={element.height}
                                  fill={isDarkMode ? '#333333' : '#e2e8f0'}
                                  stroke={isDarkMode ? '#6b7280' : '#6b7280'}
                                  strokeWidth="0.5"
                                />
                                <g transform={`translate(${element.width / 2 - 5}, ${element.height / 2 - 5}) scale(0.5)`}>
                                  {element.icon}
                                </g>
                              </g>
                              <text
                                x={element.width / 2}
                                y={-2}
                                fontSize="4"
                                fill={isDarkMode ? '#f4f4f4' : '#1f2937'}
                                textAnchor="middle"
                                style={{ opacity: 0, transition: 'opacity 0.2s ease' }}
                              >
                                {element.label}
                              </text>
                            </g>
                          ))}
                        </svg>
                        <p style={{
                          fontSize: 'clamp(0.75rem, 2vw, 0.875rem)',
                          color: isDarkMode ? '#d1d5db' : '#4b5563',
                          marginTop: '0.5rem',
                          textAlign: 'center'
                        }}>
                          {response.layout || 'Top-down view of the room layout'}
                        </p>
                      </motion.div>
                    </div>

                    <div>
                      <h4 style={{
                        fontSize: 'clamp(0.875rem, 2.5vw, 1.125rem)',
                        fontWeight: 500,
                        color: isDarkMode ? '#f4f4f4' : '#1f2937',
                        marginBottom: 'clamp(0.5rem, 2vw, 1rem)'
                      }}>
                        Estimated Cost Breakdown
                      </h4>
                      <div style={{ marginBottom: 'clamp(0.75rem, 3vw, 1.5rem)' }}>
                        {response.costItems.map((item, itemIndex) => (
                          <div
                            key={itemIndex}
                            style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              padding: 'clamp(0.5rem, 2vw, 0.75rem) 0',
                              borderBottom: `1px solid ${isDarkMode ? '#333333' : '#f3f4f6'}`
                            }}
                          >
                            <span style={{ color: isDarkMode ? '#d1d5db' : '#4b5563', fontSize: 'clamp(0.75rem, 2vw, 0.875rem)' }}>{item.label}</span>
                            <span style={{ fontWeight: 500, color: isDarkMode ? '#f4f4f4' : '#1f2937', fontSize: 'clamp(0.75rem, 2vw, 0.875rem)' }}>{item.value}</span>
                          </div>
                        ))}

                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: 'clamp(0.5rem, 2vw, 1rem) 0 clamp(0.25rem, 1vw, 0.5rem)',
                            marginTop: '0.5rem'
                          }}
                        >
                          <span style={{ fontWeight: 500, fontSize: 'clamp(0.875rem, 2.5vw, 1.125rem)', color: isDarkMode ? '#f4f4f4' : '#1f2937' }}>Total</span>
                          <span style={{ fontWeight: 700, fontSize: 'clamp(0.875rem, 2.5vw, 1.125rem)', color: isDarkMode ? '#f4f4f4' : '#0f172a' }}>{response.totalCost}</span>
                        </div>
                      </div>

                      <p style={{
                        fontSize: 'clamp(0.75rem, 2vw, 0.875rem)',
                        color: isDarkMode ? '#6b7280' : '#6b7280',
                        marginTop: 'clamp(0.5rem, 2vw, 1rem)'
                      }}>
                        * This is an estimated cost based on your requirements. Actual costs may vary based on final material selections and dimensions.
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section style={{
        padding: 'clamp(2rem, 8vw, 4rem) clamp(0.5rem, 2vw, 1rem)',
        backgroundColor: isDarkMode ? '#000000' : '#0f172a',
        color: isDarkMode ? '#f4f4f4' : '#f4f4f4',
        textAlign: 'center',
        transition: 'background-color 0.3s, color 0.3s'
      }}>
        <div style={{
          maxWidth: 'min(48rem, 95vw)',
          margin: '0 auto'
        }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 'clamp(0.75rem, 3vw, 1.5rem)'
            }}
          >
            <h2 style={{
              fontSize: 'clamp(1.5rem, 5vw, 2rem)',
              fontWeight: 300,
              marginBottom: 'clamp(0.5rem, 2vw, 1rem)'
            }}>
              Ready to Transform Your Space?
            </h2>
            <p style={{
              fontSize: 'clamp(0.875rem, 3vw, 1.125rem)',
              color: isDarkMode ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0.9)',
              maxWidth: 'clamp(18rem, 60vw, 36rem)',
              margin: '0 auto'
            }}>
              Book a consultation with our expert designers and begin your journey to a beautifully crafted home that reflects your unique style and cultural heritage.
            </p>
            <StyledButton
              afterContent="Book Now"
              onClick={() => alert('functionality not implemented yet')}
            >
              Schedule a Consultation
            </StyledButton>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Design;