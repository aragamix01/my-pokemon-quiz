'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getRandomQuestions, type QuizAnswer, type QuizQuestion } from '@/lib/partner-quiz-utils'

type Language = 'th' | 'en'

export default function PartnerQuizPage() {
  const router = useRouter()
  const [questions, setQuestions] = useState<QuizQuestion[]>([])
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<QuizAnswer[]>([])
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [language, setLanguage] = useState<Language>('th')

  useEffect(() => {
    // Clear any existing quiz session data for fresh start
    sessionStorage.removeItem('quiz-answers')
    
    // Get random 10 questions when component mounts
    const randomQuestions = getRandomQuestions(10)
    setQuestions(randomQuestions)
    setIsLoading(false)
  }, [])

  const toggleLanguage = () => {
    setLanguage(lang => lang === 'th' ? 'en' : 'th')
  }

  const getText = (textObj: { th: string; en: string }) => {
    return textObj[language]
  }

  const handleChoiceSelect = (choiceIndex: number) => {
    setSelectedChoice(choiceIndex)
    
    // Auto-advance to next question after a short delay
    setTimeout(() => {
      const question = questions[currentQuestion]
      const choice = question.choices[choiceIndex]
      
      // Save the answer
      const newAnswer: QuizAnswer = {
        questionId: question.id,
        choiceIndex: choiceIndex,
        traits: choice.traits
      }
      
      const newAnswers = [...answers, newAnswer]
      setAnswers(newAnswers)

      // Check if this was the last question
      if (currentQuestion + 1 >= questions.length) {
        // Quiz completed, navigate to results
        sessionStorage.setItem('quiz-answers', JSON.stringify(newAnswers))
        router.push('/partner-quiz/result')
      } else {
        // Move to next question
        setCurrentQuestion(currentQuestion + 1)
        setSelectedChoice(null)
      }
    }, 800) // 800ms delay for visual feedback
  }

  const handleBackToHome = () => {
    router.push('/?section=partner-quiz')
  }

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
      // Remove the last answer
      setAnswers(answers.slice(0, -1))
      setSelectedChoice(null)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-500 mx-auto mb-4"></div>
          <p className="text-white font-pixel">
            {language === 'th' ? 'กำลังเตรียมคำถาม...' : 'Preparing questions...'}
          </p>
        </div>
      </div>
    )
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center text-white">
          <p className="font-pixel">
            {language === 'th' ? 'เกิดข้อผิดพลาดในการโหลดคำถาม' : 'Error loading questions'}
          </p>
        </div>
      </div>
    )
  }

  const question = questions[currentQuestion]
  const progress = ((currentQuestion + 1) / questions.length) * 100

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-between items-start mb-4">
            <button
              onClick={handleBackToHome}
              className="px-4 py-2 bg-gray-600 border-2 border-gray-400 text-white rounded-lg font-pixel text-sm hover:bg-gray-500 transition-all duration-200"
            >
              {language === 'th' ? '← หน้าหลัก' : '← Home'}
            </button>
            <div className="flex-1">
              <h1 className="text-4xl font-pixel text-white mb-2">
                {language === 'th' ? 'หา Pokemon คู่ใจ' : 'Find Your Pokemon Partner'}
              </h1>
              <p className="text-gray-300 font-pixel">
                {language === 'th' 
                  ? 'ตอบคำถามเพื่อค้นหา Pokemon ที่เหมาะกับบุคลิกของคุณ'
                  : 'Answer questions to find the Pokemon that matches your personality'
                }
              </p>
            </div>
            <button
              onClick={toggleLanguage}
              className="px-4 py-2 bg-blue-600 border-2 border-blue-400 text-white rounded-lg font-pixel text-sm hover:bg-blue-500 transition-all duration-200"
            >
              {language === 'th' ? 'EN' : 'ไทย'}
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-white font-pixel text-sm">
              {language === 'th' 
                ? `ข้อ ${currentQuestion + 1} จาก ${questions.length}`
                : `Question ${currentQuestion + 1} of ${questions.length}`
              }
            </span>
            <span className="text-white font-pixel text-sm">
              {Math.round(progress)}%
            </span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-3 border-2 border-gray-600">
            <div 
              className="bg-gradient-to-r from-red-500 to-yellow-500 h-full rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-gray-800 border-4 border-gray-600 rounded-lg p-8 mb-8 shadow-2xl">
          <h2 className="text-2xl font-pixel text-white mb-8 text-center leading-relaxed">
            {getText(question.question)}
          </h2>

          {/* Answer Choices */}
          <div className="grid gap-4">
            {question.choices.map((choice, index) => (
              <button
                key={index}
                onClick={() => handleChoiceSelect(index)}
                className={`
                  p-4 rounded-lg border-2 font-pixel text-left transition-all duration-200
                  ${selectedChoice === index
                    ? 'bg-red-600 border-red-400 text-white shadow-lg transform scale-105'
                    : 'bg-gray-700 border-gray-500 text-gray-200 hover:bg-gray-600 hover:border-gray-400'
                  }
                `}
              >
                <div className="flex items-center">
                  <span className="w-8 h-8 rounded-full border-2 border-current flex items-center justify-center mr-4 text-sm">
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span className="flex-1 leading-relaxed">{getText(choice.text)}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-center items-center">
          <button
            onClick={handlePreviousQuestion}
            disabled={currentQuestion === 0}
            className={`
              px-6 py-3 font-pixel rounded-lg border-2 transition-all duration-200
              ${currentQuestion === 0
                ? 'bg-gray-700 border-gray-600 text-gray-500 cursor-not-allowed'
                : 'bg-gray-600 border-gray-400 text-white hover:bg-gray-500 hover:border-gray-300'
              }
            `}
          >
            {language === 'th' ? '← ย้อนกลับ' : '← Back'}
          </button>
        </div>

        {/* Quiz Info */}
        <div className="mt-8 text-center">
          <p className="text-gray-400 font-pixel text-sm">
            {language === 'th' 
              ? 'เลือกคำตอบที่ตรงกับบุคลิกของคุณมากที่สุด • จะไปคำถามถัดไปโดยอัตโนมัติ'
              : 'Choose the answer that best matches your personality • Auto-advances to next question'
            }
          </p>
        </div>
      </div>
    </div>
  )
}