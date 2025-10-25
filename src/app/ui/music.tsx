// app/ui/music.tsx
'use client'
import { useState, useEffect } from 'react'

// Audio global fuera del componente
let globalAudio: HTMLAudioElement | null = null
let globalIsPlaying = false

export default function MusicPrompt() {
  const [showPrompt, setShowPrompt] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    // MOSTRAR SIEMPRE el prompt cada vez que se entra a la app
    setShowPrompt(true)
    
    // Pero si ya hay música, mantener el estado sincronizado
    if (globalAudio) {
      setIsPlaying(globalIsPlaying)
    }
  }, [])

  const initAudio = () => {
    if (globalAudio) return // Ya existe
    
    globalAudio = new Audio('/music/star-wars-theme.mp3')
    globalAudio.loop = true
    globalAudio.volume = 0.3
    
    globalAudio.addEventListener('play', () => {
      globalIsPlaying = true
      setIsPlaying(true)
    })
    
    globalAudio.addEventListener('pause', () => {
      globalIsPlaying = false
      setIsPlaying(false)
    })
  }

  const toggleMusic = () => {
    if (!globalAudio) {
      initAudio()
    }

    if (globalIsPlaying) {
      globalAudio?.pause()
    } else {
      globalAudio?.play().catch(error => {
        console.log('Error reproduciendo audio:', error)
      })
    }
  }

  const handleAccept = () => {
    setShowPrompt(false)
    initAudio()
    
    // Reproducir si no está ya reproduciéndose
    if (!globalIsPlaying) {
      globalAudio?.play().catch(error => {
        console.log('Error reproduciendo audio:', error)
      })
    }
  }

  const handleDecline = () => {
    setShowPrompt(false)
    if (globalAudio) {
      globalAudio.pause()
      globalIsPlaying = false
      setIsPlaying(false)
    }
  }

  return (
    <>
      {/* Botón de control - mostrar siempre si hay audio */}
      {globalAudio && (
        <button 
          onClick={toggleMusic}
          className="music-control-btn"
          style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            zIndex: 1000,
            background: '#FFE81F',
            color: '#000',
            border: 'none',
            borderRadius: '50%',
            width: '50px',
            height: '50px',
            fontSize: '20px',
            cursor: 'pointer',
            boxShadow: '0 0 10px rgba(255, 232, 31, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.3s ease'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'scale(1.1)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          {isPlaying ? '⏸️' : '▶️'}
        </button>
      )}

      {/* Prompt - mostrar SIEMPRE al entrar a la app */}
      {showPrompt && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(0, 0, 0, 0.9)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 9999
        }}>
          <div style={{
            background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
            border: '2px solid #FFE81F',
            borderRadius: '15px',
            padding: '2rem',
            textAlign: 'center',
            maxWidth: '400px',
            boxShadow: '0 0 30px rgba(255, 232, 31, 0.3)'
          }}>
            <h2 style={{
              color: '#FFE81F',
              marginBottom: '1rem',
              fontSize: '1.5rem'
            }}>
              🎵 ¿Quieres escuchar música de fondo?
            </h2>
            <p style={{
              color: '#ffffff',
              marginBottom: '2rem',
              fontSize: '1.1rem'
            }}>
              La música mejorará tu experiencia Star Wars
            </p>
            <div style={{
              display: 'flex',
              gap: '1rem',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              <button 
                onClick={handleAccept} 
                style={{
                  padding: '12px 24px',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontWeight: 'bold',
                  background: '#FFE81F',
                  color: '#000000'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = '#ffd700';
                  e.currentTarget.style.transform = 'scale(1.05)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = '#FFE81F';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                Sí, ¡que suene la fuerza!
              </button>
              <button 
                onClick={handleDecline} 
                style={{
                  padding: '12px 24px',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontWeight: 'bold',
                  background: '#666666',
                  color: '#ffffff'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = '#888888';
                  e.currentTarget.style.transform = 'scale(1.05)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = '#666666';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                No, prefiero silencio
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}