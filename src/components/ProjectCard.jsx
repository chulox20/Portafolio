import React from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, Github } from 'lucide-react'

const ProjectCard = ({ title, tags, image, github, link, featured, description }) => {
    return (
        <motion.div
            className={`project-card ${featured ? 'featured' : 'standard'}`}
            style={{
                background: 'rgba(0, 0, 0, 0.4)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(229, 178, 62, 0.15)',
                overflow: 'hidden',
                position: 'relative'
            }}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            whileHover={{ y: -5, borderColor: 'var(--accent-color)', boxShadow: '0 10px 40px rgba(229, 178, 62, 0.25)' }}
        >
            <div className="project-card-image-wrapper">
                {image ? (
                    <img src={image} alt={title} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: '50% 20%' }} />
                ) : (
                    <div style={{ position: 'absolute', top: '0', left: '0', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(229, 178, 62, 0.2)', fontSize: '4rem', fontWeight: 'bold' }}>
                        {title.charAt(0)}
                    </div>
                )}
            </div>
            <div className="project-card-content">
                <div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: featured ? '0.6rem' : '0.5rem', marginBottom: featured ? '1.5rem' : '1rem' }}>
                        {tags && tags.map((tag, index) => (
                            <span key={index} style={{ 
                                color: 'var(--accent-color)', 
                                fontSize: featured ? '0.7rem' : '0.65rem', 
                                textTransform: 'uppercase', 
                                letterSpacing: '0.1rem',
                                border: '1px solid rgba(229, 178, 62, 0.3)',
                                padding: featured ? '0.3rem 0.8rem' : '0.2rem 0.6rem',
                                borderRadius: '20px',
                                background: 'rgba(229, 178, 62, 0.05)'
                            }}>
                                {tag}
                            </span>
                        ))}
                    </div>
                    <h3 style={{ 
                        fontSize: featured ? '2.2rem' : '1.5rem', 
                        marginBottom: featured ? '1rem' : '1.5rem', 
                        color: 'var(--text-primary)',
                        fontFamily: featured ? 'var(--font-accent)' : 'inherit',
                        lineHeight: 1.2
                    }}>{title}</h3>
                    {description && (
                        <p style={{ 
                            color: 'var(--text-secondary)', 
                            fontSize: '0.95rem', 
                            lineHeight: '1.7',
                            marginBottom: '1.5rem'
                        }}>
                            {description}
                        </p>
                    )}
                </div>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginTop: '0.5rem' }}>
                    {github && (
                        <a href={github} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-secondary)', transition: 'color 0.3s' }} className="hover-gold">
                            <Github size={featured ? 22 : 20} />
                        </a>
                    )}
                    {link && (
                        <a href={link} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-secondary)', transition: 'color 0.3s' }} className="hover-gold">
                            <ExternalLink size={featured ? 22 : 20} />
                        </a>
                    )}
                </div>
            </div>
        </motion.div>
    )
}

export default ProjectCard
