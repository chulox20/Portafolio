import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, Github, User, Users, KeyRound, X } from 'lucide-react'

const ProjectCard = ({ title, tags, image, github, link, featured, description, credentials }) => {
    const [showCredentials, setShowCredentials] = useState(false)
    const popupRef = useRef(null)

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (popupRef.current && !popupRef.current.contains(e.target)) {
                setShowCredentials(false)
            }
        }
        if (showCredentials) {
            document.addEventListener('mousedown', handleClickOutside)
        }
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [showCredentials])

    const handleLinkClick = (e) => {
        if (credentials) {
            e.preventDefault()
            setShowCredentials(true)
        }
    }

    return (
        <motion.div
            className={`project-card ${featured ? 'featured' : 'standard'}`}
            style={{
                background: 'rgba(0, 0, 0, 0.4)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(229, 178, 62, 0.15)',
                overflow: 'visible',
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
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginTop: '0.5rem', position: 'relative' }}>
                    {github && (
                        <a href={github} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-secondary)', transition: 'color 0.3s' }} className="hover-gold">
                            <Github size={featured ? 22 : 20} />
                        </a>
                    )}
                    {link && (
                        <a 
                            href={link} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            style={{ color: 'var(--text-secondary)', transition: 'color 0.3s' }} 
                            className="hover-gold"
                            onClick={handleLinkClick}
                        >
                            <ExternalLink size={featured ? 22 : 20} />
                        </a>
                    )}

                    <AnimatePresence>
                        {showCredentials && credentials && (
                            <motion.div
                                ref={popupRef}
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                transition={{ duration: 0.25, ease: 'easeOut' }}
                                style={{
                                    position: 'absolute',
                                    bottom: 'calc(100% + 12px)',
                                    left: 0,
                                    background: 'rgba(10, 10, 10, 0.98)',
                                    border: '1px solid rgba(229, 178, 62, 0.3)',
                                    borderRadius: '16px',
                                    padding: '1.5rem',
                                    minWidth: '300px',
                                    zIndex: 100,
                                    backdropFilter: 'blur(20px)',
                                    boxShadow: '0 20px 60px rgba(0,0,0,0.6), 0 0 30px rgba(229, 178, 62, 0.1)'
                                }}
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem' }}>
                                    <h4 style={{ 
                                        color: 'var(--accent-color)', 
                                        fontSize: '0.85rem', 
                                        textTransform: 'uppercase', 
                                        letterSpacing: '0.15rem',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem'
                                    }}>
                                        <KeyRound size={16} />
                                        Inicio de sesión
                                    </h4>
                                    <button 
                                        onClick={() => setShowCredentials(false)}
                                        style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', padding: '2px' }}
                                    >
                                        <X size={16} />
                                    </button>
                                </div>

                                {credentials.map((group, i) => (
                                    <div key={i} style={{ marginBottom: i < credentials.length - 1 ? '1rem' : '1.2rem' }}>
                                        <div style={{ 
                                            display: 'flex', 
                                            alignItems: 'center', 
                                            gap: '0.4rem', 
                                            marginBottom: '0.5rem',
                                            color: 'var(--text-secondary)',
                                            fontSize: '0.7rem',
                                            textTransform: 'uppercase',
                                            letterSpacing: '0.1rem'
                                        }}>
                                            {group.role === 'admin' ? <User size={13} /> : <Users size={13} />}
                                            {group.label}
                                        </div>
                                        {group.accounts.map((acc, j) => (
                                            <div key={j} style={{ 
                                                background: 'rgba(229, 178, 62, 0.05)', 
                                                border: '1px solid rgba(229, 178, 62, 0.12)',
                                                borderRadius: '10px', 
                                                padding: '0.6rem 0.8rem',
                                                marginBottom: j < group.accounts.length - 1 ? '0.4rem' : 0
                                            }}>
                                                <div style={{ color: 'var(--text-primary)', fontSize: '0.82rem', fontFamily: 'monospace' }}>
                                                    {acc.email}
                                                </div>
                                                <div style={{ color: 'var(--text-secondary)', fontSize: '0.75rem', fontFamily: 'monospace', marginTop: '2px' }}>
                                                    {acc.password}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ))}

                                <a 
                                    href={link} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '0.5rem',
                                        width: '100%',
                                        padding: '0.7rem',
                                        background: 'linear-gradient(135deg, var(--accent-color), #B8860B)',
                                        color: '#000',
                                        border: 'none',
                                        borderRadius: '10px',
                                        fontSize: '0.8rem',
                                        fontWeight: 700,
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.1rem',
                                        textDecoration: 'none',
                                        cursor: 'pointer',
                                        transition: 'opacity 0.3s'
                                    }}
                                >
                                    <ExternalLink size={15} />
                                    Visitar página
                                </a>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </motion.div>
    )
}

export default ProjectCard
