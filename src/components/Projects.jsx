import { useTheme } from '../context/ThemeContext';

const Projects = () => {
    const { isDarkMode } = useTheme();

    const styles = {
        projects: {
            padding: '4rem 0',
            transition: 'all 0.5s ease',
        },
        projectsLight: {
            backgroundColor: '#f8f9fa',
            color: '#212529',
        },
        projectsDark: {
            backgroundColor: '#121212',
            color: '#ffffff',
        },
        projectList: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
            padding: '2rem',
            maxWidth: '1200px',
            margin: '0 auto',
        },
        projectItem: {
            borderRadius: '10px',
            overflow: 'hidden',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        },
        projectItemLight: {
            backgroundColor: '#ffffff',
            color: '#212529',
        },
        projectItemDark: {
            backgroundColor: '#1e1e1e',
            color: '#ffffff',
        },
        projectImage: {
            width: '100%',
            height: '200px',
            objectFit: 'cover',
        },
        projectContent: {
            padding: '1.5rem',
        },
    };

    const projects = [
        {
            id: 1,
            title: "Modern Luxury Villa",
            description: "A contemporary 4-bedroom villa featuring Indo-modern fusion design with sustainable materials and smart home integration.",
            image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop",
            link: "#"
        },
        {
            id: 2,
            title: "Traditional Apartment Makeover",
            description: "Complete renovation of a 3BHK apartment blending traditional Indian elements with modern functionality.",
            image: "https://images.unsplash.com/photo-1600121848594-d8644e57abab?w=800&auto=format&fit=crop",
            link: "#"
        },
        {
            id: 3,
            title: "Minimalist Studio Design",
            description: "Space-optimized studio apartment design with multi-functional furniture and Vastu-compliant layout.",
            image: "https://images.unsplash.com/photo-1616137466211-f939a420be84?w=800&auto=format&fit=crop",
            link: "#"
        },
        {
            id: 4,
            title: "Corporate Office Interior",
            description: "Modern office space design incorporating biophilic elements and collaborative workspaces.",
            image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&auto=format&fit=crop",
            link: "#"
        },
        {
            id: 5,
            title: "Restaurant Redesign",
            description: "Contemporary dining space with traditional Indian motifs and ambient lighting design.",
            image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop",
            link: "#"
        },
        {
            id: 6,
            title: "Luxury Penthouse",
            description: "Premium penthouse interior featuring custom artwork, designer furniture, and panoramic city views.",
            image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop",
            link: "#"
        }
    ];

    return (
        <div
            style={{
                ...styles.projects,
                ...(isDarkMode ? styles.projectsDark : styles.projectsLight)
            }}
            id="projects"
        >
            <h1>Projects</h1>
            <div style={styles.projectList}>
                {projects.map((project) => (
                    <div
                        key={project.id}
                        style={{
                            ...styles.projectItem,
                            ...(isDarkMode ? styles.projectItemDark : styles.projectItemLight)
                        }}
                    >
                        <img
                            src={project.image}
                            alt={project.title}
                            style={styles.projectImage}
                        />
                        <div style={styles.projectContent}>
                            <h2>{project.title}</h2>
                            <p>{project.description}</p>
                            <a href={project.link}>Learn More</a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Projects;
