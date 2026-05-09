import React from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, Github } from 'lucide-react'

const ProjectCard = ({ title, tags, image, github, link }) => {
    return (
        <motion.div
            className="project-card"
            style={{
                background: 'rgba(0, 0, 0, 0.4)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(197, 160, 89, 0.1)',
                overflow: 'hidden',
                position: 'relative',
                height: '100%'
            }}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            whileHover={{ y: -10, borderColor: 'var(--accent-color)', boxShadow: '0 10px 40px rgba(197, 160, 89, 0.2)' }}
        >
            <div style={{ width: '100%', height: '250px', background: '#121212', position: 'relative', overflow: 'hidden' }}>
                {image ? (
                    <img src={image} alt={title} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: '50% 20%' }} />
                ) : (
                    <div style={{ position: 'absolute', top: '0', left: '0', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(197, 160, 89, 0.2)', fontSize: '4rem', fontWeight: 'bold' }}>
                        {title.charAt(0)}
                    </div>
                )}
            </div>
            <div style={{ padding: '2rem' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
                    {tags && tags.map((tag, index) => (
                        <span key={index} style={{ 
                            color: 'var(--accent-color)', 
                            fontSize: '0.65rem', 
                            textTransform: 'uppercase', 
                            letterSpacing: '0.1rem',
                            border: '1px solid rgba(197, 160, 89, 0.3)',
                            padding: '0.2rem 0.6rem',
                            borderRadius: '20px',
                            background: 'rgba(197, 160, 89, 0.05)'
                        }}>
                            {tag}
                        </span>
                    ))}
                </div>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: 'var(--text-primary)' }}>{title}</h3>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    {github && (
                        <a href={github} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-secondary)', transition: 'color 0.3s' }} className="hover-gold">
                            <Github size={20} />
                        </a>
                    )}
                    <a href={link} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-secondary)', transition: 'color 0.3s' }} className="hover-gold">
                        <ExternalLink size={20} />
                    </a>
                </div>
            </div>
        </motion.div>
    )
}

export default ProjectCard
