'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Pokedex from '@/components/Pokedex'
import GenerationSelector from '@/components/GenerationSelector'
import TypeAdvantage from '@/components/TypeAdvantage'
import { GenerationNumber } from '@/types/pokemon'

function HomeContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [activeSection, setActiveSection] = useState<'quiz' | 'pokedex' | 'types' | 'partner-quiz'>('pokedex')
  const [partnerQuizLanguage, setPartnerQuizLanguage] = useState<'th' | 'en'>('th')

  useEffect(() => {
    const section = searchParams.get('section')
    if (section && (section === 'quiz' || section === 'pokedex' || section === 'types' || section === 'partner-quiz')) {
      setActiveSection(section as 'quiz' | 'pokedex' | 'types' | 'partner-quiz')
    } else {
      // Check if we should restore active section from localStorage
      const savedActiveSection = sessionStorage.getItem('active-section')
      if (savedActiveSection && (savedActiveSection === 'quiz' || savedActiveSection === 'pokedex' || savedActiveSection === 'types' || savedActiveSection === 'partner-quiz')) {
        setActiveSection(savedActiveSection as 'quiz' | 'pokedex' | 'types' | 'partner-quiz')
      }
    }
  }, [searchParams])

  // Save active section when it changes
  useEffect(() => {
    sessionStorage.setItem('active-section', activeSection)
  }, [activeSection])

  const startQuiz = (generation: GenerationNumber | null) => {
    if (generation === null) {
      router.push('/quiz/all')
    } else {
      router.push(`/quiz/${generation}`)
    }
  }

  const startPartnerQuiz = () => {
    // Clear any existing quiz session data for fresh start
    sessionStorage.removeItem('quiz-answers')
    router.push('/partner-quiz')
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="floating-pokeball" style={{
          position: 'absolute',
          top: '10%',
          left: '5%',
          animation: 'float 6s ease-in-out infinite'
        }}>⚪</div>
        <div className="floating-pokeball" style={{
          position: 'absolute',
          top: '20%',
          right: '10%',
          animation: 'float 8s ease-in-out infinite 2s'
        }}>🔴</div>
        <div className="floating-pokeball" style={{
          position: 'absolute',
          bottom: '15%',
          left: '15%',
          animation: 'float 7s ease-in-out infinite 4s'
        }}>🟡</div>
        <div className="floating-pokeball" style={{
          position: 'absolute',
          bottom: '25%',
          right: '5%',
          animation: 'float 9s ease-in-out infinite 1s'
        }}>🔵</div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto p-2 sm:p-4">
        {/* Compact Header */}
        <div className="text-center mb-4 sm:mb-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-2 game-title">
            <span className="text-yellow-400">P</span>
            <span className="text-red-500">O</span>
            <span className="text-blue-500">K</span>
            <span className="text-green-500">E</span>
            <span className="text-purple-500">M</span>
            <span className="text-pink-500">O</span>
            <span className="text-orange-500">N</span>
          </h1>
          <div className="text-lg md:text-xl gradient-text font-semibold mb-2">
            TOOLKIT
          </div>
          <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            ⚡ Complete Pokemon companion tools! ⚡
          </div>
        </div>

        {/* Compact Navigation */}
        <div className="flex gap-2 sm:gap-3 justify-center mb-4 sm:mb-6 flex-wrap">
          <button
            onClick={() => setActiveSection('pokedex')}
            className={`compact-nav-button ${activeSection === 'pokedex' ? 'active' : ''}`}
          >
            📱 Pokedex
          </button>
          <button
            onClick={() => setActiveSection('types')}
            className={`compact-nav-button ${activeSection === 'types' ? 'active' : ''}`}
          >
            ⚔️ Type Chart
          </button>
          <button
            onClick={() => setActiveSection('quiz')}
            className={`compact-nav-button ${activeSection === 'quiz' ? 'active' : ''}`}
          >
            🎯 Who's that Pokemon?
          </button>
          <button
            onClick={() => setActiveSection('partner-quiz')}
            className={`compact-nav-button ${activeSection === 'partner-quiz' ? 'active' : ''}`}
          >
            💖 Partner Quiz
          </button>
        </div>

        {/* Pokedex Section */}
        {activeSection === 'pokedex' && <Pokedex />}

        {/* Type Chart Section */}
        {activeSection === 'types' && <TypeAdvantage />}

        {/* Quiz Section */}
        {activeSection === 'quiz' && (
          <div className="quiz-selection-area">
            <GenerationSelector
              title="Choose Your Region"
              subtitle="💡 Identify Pokemon silhouettes • 10 questions per quiz • Score tracking"
              onGenerationSelect={startQuiz}
            />
          </div>
        )}

        {/* Partner Quiz Section */}
        {activeSection === 'partner-quiz' && (
          <div className="partner-quiz-section">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                <span className="mr-3">🎯</span>
                <span className="gradient-text thai-text">หา Pokemon คู่ใจ</span>
              </h2>
              <p className="text-lg mb-6 thai-text" style={{ color: 'var(--text-secondary)' }}>
                💫 ตอบคำถามบุคลิกเพื่อค้นหา Pokemon ที่เหมาะกับคุณมากที่สุด
              </p>
              <div className="mb-6 text-sm thai-text" style={{ color: 'var(--text-secondary)' }}>
                ✨ 10 คำถามสุ่มจาก 30 ข้อ • วิเคราะห์บุคลิกจากคำตอบ • ได้รับคำอธิบายเชิงบวก
              </div>
              <button
                onClick={startPartnerQuiz}
                className="start-quiz-button bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-8 py-4 rounded-xl text-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-lg thai-text"
              >
                🚀 เริ่มทำแบบทดสอบ
              </button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
              <div className="feature-card p-6 rounded-lg" style={{ backgroundColor: 'var(--card-bg)', border: '2px solid var(--border-color)' }}>
                <div className="text-4xl mb-4">🧠</div>
                <h3 className="text-lg font-bold mb-2 thai-text">วิเคราะห์บุคลิก</h3>
                <p className="text-sm thai-text" style={{ color: 'var(--text-secondary)' }}>
                  คำถามที่ออกแบบมาเพื่อเข้าใจบุคลิกของคุณอย่างลึกซึ้ง
                </p>
              </div>

              <div className="feature-card p-6 rounded-lg" style={{ backgroundColor: 'var(--card-bg)', border: '2px solid var(--border-color)' }}>
                <div className="text-4xl mb-4">⚡</div>
                <h3 className="text-lg font-bold mb-2 thai-text">ผลลัพธ์ทันที</h3>
                <p className="text-sm thai-text" style={{ color: 'var(--text-secondary)' }}>
                  ระบบจับคู่ Pokemon ที่เหมาะกับบุคลิกของคุณภายในไม่กี่วินาที
                </p>
              </div>

              <div className="feature-card p-6 rounded-lg" style={{ backgroundColor: 'var(--card-bg)', border: '2px solid var(--border-color)' }}>
                <div className="text-4xl mb-4">💝</div>
                <h3 className="text-lg font-bold mb-2 thai-text">คำอธิบายเชิงบวก</h3>
                <p className="text-sm thai-text" style={{ color: 'var(--text-secondary)' }}>
                  ได้รับคำอธิบายบุคลิกที่สร้างแรงบันดาลใจและทำให้รู้สึกดี
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default function Home() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <HomeContent />
    </Suspense>
  )
}