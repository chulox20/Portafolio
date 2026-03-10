import React, { useEffect, useState } from 'react'
import logo from '../assets/logo.jpg'

const Loader = ({ onFinished }) => {
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval)
                    setTimeout(onFinished, 500)
                    return 100
                }
                return prev + 1
            })
        }, 20)
        return () => clearInterval(interval)
    }, [onFinished])

    return (
        <div className="loader-container">
            <div className="loader-inner">
                <div className="loader-logo" style={{ width: '150px', height: '150px', margin: '0 auto 2rem' }}>
                    <img src={logo} alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%', border: '2px solid var(--accent-color)' }} />
                </div>
                <div className="loader-name" style={{ fontFamily: 'var(--font-main)', fontWeight: '800', fontSize: '2.5rem', letterSpacing: '0.5rem', color: 'var(--text-primary)' }}>BIENVENIDO</div>
                <div className="loading-bar-container" style={{ margin: '2rem auto' }}>
                    <div className="loading-bar-fill" style={{ width: `${progress}%` }}></div>
                </div>
                <p style={{ color: '#808080', marginTop: '1rem', fontSize: '0.8rem', letterSpacing: '0.2rem', fontWeight: '600' }}>
                    CARGANDO... {progress}%
                </p>
            </div>
        </div>
    )
}

export default Loader
