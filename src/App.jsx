import React from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import About from './components/About';
import Blogs from './components/Blogs';
import Services from './components/Services';
import Design from './components/Design';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AllBlogs from './components/Allblogs/AllBlogs';
import AdminBlogs from './components/Admin/AdminBlogs';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCouch } from '@fortawesome/free-solid-svg-icons';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';

library.add(faCouch);

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <div className="App" style={{ fontFamily: 'Montserrat, sans-serif' }}>
          <Navbar />
          <Routes>
            <Route path="/" element={
              <>
                <HeroSection />
                <About />
                <Blogs />
                <Services />
                <Design />
                <Contact />
                <Footer />
              </>
            } />
            <Route path="/blogs" element={<AllBlogs />} />
            <Route path="/admin/blogs" element={<AdminBlogs />} />
          </Routes>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;