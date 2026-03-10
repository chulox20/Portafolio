import React from 'react'
import { motion } from 'framer-motion'

const SectionHeader = ({ title, subtitle }) => {
    return (
        <div className="section-header" style={{ marginBottom: '4rem', textAlign: 'center' }}>
            <motion.p
                style={{ color: '#C5A059', letterSpacing: '0.4rem', textTransform: 'uppercase', fontSize: '0.8rem', marginBottom: '1rem' }}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
            >
                {subtitle}
            </motion.p>
            <motion.h2
                style={{ fontFamily: 'var(--font-accent)', fontSize: '3rem', color: 'var(--text-primary)' }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
            >
                {title}
            </motion.h2>
            <div style={{ width: '50px', height: '2px', background: '#C5A059', margin: '1.5rem auto 0' }}></div>
        </div>
    )
}

export default SectionHeader
