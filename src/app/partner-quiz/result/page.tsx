'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { getQuizResult, type QuizAnswer, type QuizResult, saveQuizResult } from '@/lib/partner-quiz-utils'
import html2canvas from 'html2canvas'

type Language = 'th' | 'en'

export default function PartnerQuizResultPage() {
  const router = useRouter()
  const [result, setResult] = useState<QuizResult | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isRevealing, setIsRevealing] = useState(false)
  const [imageError, setImageError] = useState(false)
  const [language, setLanguage] = useState<Language>('th')
  const [isSharing, setIsSharing] = useState(false)
  const resultCardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Get answers from sessionStorage
    const answersJson = sessionStorage.getItem('quiz-answers')
    if (!answersJson) {
      router.push('/partner-quiz')
      return
    }

    try {
      const answers: QuizAnswer[] = JSON.parse(answersJson)
      const quizResult = getQuizResult(answers)
      
      // Save result for future reference
      saveQuizResult(quizResult)
      
      // Add dramatic reveal effect
      setTimeout(() => {
        setResult(quizResult)
        setIsLoading(false)
        setTimeout(() => setIsRevealing(true), 500)
      }, 1000)
    } catch (error) {
      console.error('Error processing quiz result:', error)
      router.push('/partner-quiz')
    }
  }, [router])

  const toggleLanguage = () => {
    setLanguage(lang => lang === 'th' ? 'en' : 'th')
  }

  const getPersonalityText = (personalityData: { th: string; en: string } | string) => {
    if (typeof personalityData === 'string') {
      return personalityData // Fallback for Pokemon without Thai translation
    }
    return personalityData[language]
  }

  const handleRetakeQuiz = () => {
    sessionStorage.removeItem('quiz-answers')
    router.push('/partner-quiz')
  }

  const handleViewPokemon = () => {
    if (result) {
      router.push(`/pokemon/${result.pokemon.id}`)
    }
  }

  const handleImageError = () => {
    setImageError(true)
  }

  const getImageSrc = () => {
    if (!result) return ''
    
    if (imageError) {
      return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${result.pokemon.id}.png`
    }
    
    return result.pokemon.sprite_url
  }

  const generateShareImage = async () => {
    if (!resultCardRef.current || !result) return null

    try {
      setIsSharing(true)

      // Wait for all images to load before capturing
      const images = resultCardRef.current.querySelectorAll('img')
      await Promise.all(
        Array.from(images).map(img => {
          if (img.complete) return Promise.resolve()
          return new Promise((resolve, reject) => {
            img.onload = resolve
            img.onerror = resolve // Continue even if image fails
            setTimeout(resolve, 3000) // Timeout after 3s
          })
        })
      )

      // Generate canvas from the result card element
      const canvas = await html2canvas(resultCardRef.current, {
        backgroundColor: '#1f2937', // gray-800 background
        scale: 2, // Higher quality
        useCORS: true,
        allowTaint: false, // Changed to false for iOS compatibility
        logging: false,
        width: resultCardRef.current.offsetWidth,
        height: resultCardRef.current.offsetHeight,
        imageTimeout: 0, // Disable timeout since we pre-loaded images
        foreignObjectRendering: false // Better iOS compatibility
      })

      // Convert to blob with JPEG for better compatibility on iOS
      return new Promise<Blob | null>((resolve) => {
        canvas.toBlob((blob) => {
          resolve(blob)
        }, 'image/jpeg', 0.92)
      })
    } catch (error) {
      console.error('Error generating share image:', error)
      return null
    } finally {
      setIsSharing(false)
    }
  }

  const handleShareImage = async () => {
    const blob = await generateShareImage()
    if (!blob || !result) {
      alert(language === 'th'
        ? 'ไม่สามารถสร้างภาพได้ กรุณาลองใหม่อีกครั้ง'
        : 'Failed to generate image. Please try again.')
      return
    }

    const shareText = language === 'th'
      ? `🎉 ฉันได้ Pokemon คู่ใจแล้ว! มาดูกันว่าของคุณจะเป็นใคร\n\n💖 Pokemon คู่ใจของฉัน: ${result.personality.pokemon}\n🔥 ความเข้ากัน: ${result.matchScore}%\n✨ ลักษณะเด่น: ${result.dominantTraits.slice(0, 3).join(', ')}\n\n🎯 มาทำแบบทดสอบหา Pokemon คู่ใจของคุณกัน!`
      : `🎉 I found my Pokemon partner! Come see who yours will be\n\n💖 My Pokemon partner: ${result.personality.pokemon}\n🔥 Compatibility: ${result.matchScore}%\n✨ Key traits: ${result.dominantTraits.slice(0, 3).join(', ')}\n\n🎯 Take the quiz to find your Pokemon partner!`

    // Use JPEG extension for the file
    const fileName = `pokemon-partner-${result.personality.pokemon.toLowerCase()}.jpg`
    const file = new File([blob], fileName, { type: 'image/jpeg' })

    try {
      // Check if Web Share API is available and supports files
      if (navigator.share) {
        // Try sharing with file first (works on most mobile browsers)
        try {
          // On iOS, we need to check canShare before attempting
          if (navigator.canShare && navigator.canShare({ files: [file] })) {
            await navigator.share({
              title: language === 'th' ? 'Pokemon คู่ใจของฉัน' : 'My Pokemon Partner',
              text: shareText,
              files: [file]
            })
            return
          }
        } catch (fileShareError) {
          console.log('File sharing not supported, trying text only:', fileShareError)
        }

        // Fallback to text-only sharing if file sharing fails
        try {
          await navigator.share({
            title: language === 'th' ? 'Pokemon คู่ใจของฉัน' : 'My Pokemon Partner',
            text: shareText + '\n\n' + window.location.origin + '/partner-quiz'
          })

          // Download image separately
          const url = URL.createObjectURL(blob)
          const a = document.createElement('a')
          a.href = url
          a.download = fileName
          document.body.appendChild(a)
          a.click()
          document.body.removeChild(a)
          URL.revokeObjectURL(url)
          return
        } catch (textShareError) {
          console.log('Text sharing failed:', textShareError)
        }
      }

      // Final fallback: download image + copy text
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = fileName
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)

      // Copy share text to clipboard
      try {
        await navigator.clipboard.writeText(shareText + '\n\n' + window.location.origin + '/partner-quiz')
        alert(language === 'th'
          ? '🎉 ภาพถูกดาวน์โหลดและข้อความถูกคัดลอกแล้ว!'
          : '🎉 Image downloaded and text copied to clipboard!')
      } catch (clipboardError) {
        alert(language === 'th'
          ? '📸 ภาพถูกดาวน์โหลดแล้ว!'
          : '📸 Image downloaded!')
      }
    } catch (error) {
      console.error('Error sharing:', error)
      alert(language === 'th'
        ? 'เกิดข้อผิดพลาดในการแชร์ กรุณาลองใหม่อีกครั้ง'
        : 'Error sharing content. Please try again.')
    }
  }

  const handleShareText = async () => {
    if (!result) return

    const shareText = language === 'th' 
      ? `🎉 ฉันได้ Pokemon คู่ใจแล้ว!\n\n💖 Pokemon คู่ใจของฉัน: ${result.personality.pokemon}\n🔥 ความเข้ากัน: ${result.matchScore}%\n✨ ลักษณะเด่น: ${result.dominantTraits.slice(0, 3).join(', ')}\n\n🎯 มาทำแบบทดสอบหา Pokemon คู่ใจของคุณกัน!\n🔗 ${window.location.origin}/partner-quiz`
      : `🎉 I found my Pokemon partner!\n\n💖 My Pokemon partner: ${result.personality.pokemon}\n🔥 Compatibility: ${result.matchScore}%\n✨ Key traits: ${result.dominantTraits.slice(0, 3).join(', ')}\n\n🎯 Take the quiz to find your Pokemon partner!\n🔗 ${window.location.origin}/partner-quiz`

    try {
      if (navigator.share) {
        await navigator.share({
          title: language === 'th' ? 'Pokemon คู่ใจของฉัน' : 'My Pokemon Partner',
          text: shareText
        })
      } else {
        await navigator.clipboard.writeText(shareText)
        alert(language === 'th' 
          ? '📋 ข้อความถูกคัดลอกแล้ว!' 
          : '📋 Text copied to clipboard!')
      }
    } catch (error) {
      console.error('Error sharing text:', error)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="relative mb-8">
            <div className="animate-spin rounded-full h-32 w-32 border-4 border-red-500 border-t-transparent mx-auto"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 bg-red-500 rounded-full animate-pulse"></div>
            </div>
          </div>
          <p className="text-white font-pixel text-xl mb-2">
            {language === 'th' ? 'กำลังวิเคราะห์บุคลิก...' : 'Analyzing personality...'}
          </p>
          <p className="text-gray-300 font-pixel">
            {language === 'th' ? 'กำลังหา Pokemon ที่เหมาะกับคุณ' : 'Finding your perfect Pokemon match'}
          </p>
        </div>
      </div>
    )
  }

  if (!result) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center text-white">
          <p className="font-pixel">
            {language === 'th' ? 'เกิดข้อผิดพลาดในการประมวลผล' : 'Error processing results'}
          </p>
          <button 
            onClick={handleRetakeQuiz}
            className="mt-4 px-6 py-3 bg-red-600 border-2 border-red-400 rounded-lg font-pixel hover:bg-red-500"
          >
            {language === 'th' ? 'ลองใหม่' : 'Try Again'}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-between items-start mb-4">
            <button
              onClick={() => router.push('/?section=partner-quiz')}
              className="px-4 py-2 bg-gray-600 border-2 border-gray-400 text-white rounded-lg font-pixel text-sm hover:bg-gray-500 transition-all duration-200"
            >
              {language === 'th' ? '← หน้าหลัก' : '← Home'}
            </button>
            <div className="flex-1">
              <h1 className="text-4xl font-pixel text-white mb-2">
                {language === 'th' 
                  ? '🎉 เจอแล้ว! Pokemon คู่ใจของคุณ' 
                  : '🎉 Found! Your Pokemon Partner'
                }
              </h1>
              <p className="text-gray-300 font-pixel">
                {language === 'th' 
                  ? 'ผลการวิเคราะห์บุคลิกของคุณ'
                  : 'Your personality analysis results'
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

        {/* Match Score */}
        <div className="text-center mb-8">
          <div className="inline-block bg-gradient-to-r from-green-500 to-blue-500 text-white px-6 py-3 rounded-full font-pixel">
            {language === 'th' 
              ? `ความเข้ากัน: ${result.matchScore}%`
              : `Compatibility: ${result.matchScore}%`
            }
          </div>
        </div>

        {/* Pokemon Card */}
        <div 
          ref={resultCardRef}
          className={`
            bg-gradient-to-br from-gray-800 to-gray-900 border-4 border-gray-600 rounded-2xl p-8 mb-8 shadow-2xl
            transform transition-all duration-1000 ${isRevealing ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}
          `}
        >
          <div className="text-center mb-8">
            {/* Pokemon Image */}
            <div className="relative w-64 h-64 mx-auto mb-6">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 to-red-500/20 rounded-full blur-2xl"></div>
              <Image
                src={getImageSrc()}
                alt={result.pokemon.name}
                width={256}
                height={256}
                className="relative z-10 pixelated drop-shadow-2xl"
                onError={handleImageError}
                crossOrigin="anonymous"
                priority
              />
            </div>

            {/* Pokemon Name */}
            <h2 className="text-4xl font-pixel text-white mb-4 capitalize">
              {result.personality.pokemon}
            </h2>

            {/* Pokemon Types */}
            <div className="flex justify-center gap-2 mb-6">
              {result.pokemon.types.map(type => (
                <span
                  key={type}
                  className={`
                    px-4 py-2 rounded-full font-pixel text-sm border-2 capitalize
                    ${type === 'fire' ? 'bg-red-600 border-red-400 text-white' :
                      type === 'water' ? 'bg-blue-600 border-blue-400 text-white' :
                      type === 'grass' ? 'bg-green-600 border-green-400 text-white' :
                      type === 'electric' ? 'bg-yellow-600 border-yellow-400 text-black' :
                      type === 'psychic' ? 'bg-pink-600 border-pink-400 text-white' :
                      type === 'ice' ? 'bg-cyan-600 border-cyan-400 text-white' :
                      type === 'dragon' ? 'bg-purple-600 border-purple-400 text-white' :
                      type === 'dark' ? 'bg-gray-800 border-gray-600 text-white' :
                      type === 'fairy' ? 'bg-pink-400 border-pink-300 text-white' :
                      type === 'fighting' ? 'bg-red-700 border-red-500 text-white' :
                      type === 'poison' ? 'bg-purple-700 border-purple-500 text-white' :
                      type === 'ground' ? 'bg-yellow-700 border-yellow-500 text-white' :
                      type === 'flying' ? 'bg-indigo-500 border-indigo-300 text-white' :
                      type === 'bug' ? 'bg-green-500 border-green-300 text-white' :
                      type === 'rock' ? 'bg-yellow-800 border-yellow-600 text-white' :
                      type === 'ghost' ? 'bg-purple-800 border-purple-600 text-white' :
                      type === 'steel' ? 'bg-gray-500 border-gray-300 text-white' :
                      'bg-gray-600 border-gray-400 text-white'
                    }
                  `}
                >
                  {type}
                </span>
              ))}
            </div>
          </div>

          {/* Personality Description */}
          <div className="bg-gray-700/50 rounded-lg p-6 mb-6">
            <h3 className="text-2xl font-pixel text-white mb-4 text-center">
              {language === 'th' ? 'บุคลิกของคุณ' : 'Your Personality'}
            </h3>
            <p className="text-gray-200 leading-relaxed text-lg text-center font-light">
              {getPersonalityText(result.personality.personality)}
            </p>
          </div>

          {/* Dominant Traits */}
          <div className="text-center">
            <h3 className="text-xl font-pixel text-white mb-4">
              {language === 'th' ? 'จุดเด่นของคุณ' : 'Your Strengths'}
            </h3>
            <div className="flex flex-wrap justify-center gap-2">
              {result.dominantTraits.slice(0, 5).map(trait => (
                <span
                  key={trait}
                  className="px-3 py-1 bg-blue-600/30 border border-blue-400 rounded-full text-blue-200 font-pixel text-sm"
                >
                  {trait}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto">
          <button
            onClick={handleViewPokemon}
            className="w-full px-6 py-4 bg-blue-600 border-2 border-blue-400 text-white rounded-lg font-pixel hover:bg-blue-500 transition-all duration-200 shadow-lg text-center min-h-[56px] flex items-center justify-center"
          >
            {language === 'th' 
              ? `ดูข้อมูล ${result.personality.pokemon}`
              : `View ${result.personality.pokemon} Details`
            }
          </button>
          
          <button
            onClick={handleRetakeQuiz}
            className="w-full px-6 py-4 bg-gray-600 border-2 border-gray-400 text-white rounded-lg font-pixel hover:bg-gray-500 transition-all duration-200 shadow-lg text-center min-h-[56px] flex items-center justify-center"
          >
            {language === 'th' ? 'ทำแบบทดสอบใหม่' : 'Retake Quiz'}
          </button>
        </div>

        {/* Share Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto mt-6">
          <button
            onClick={handleShareImage}
            disabled={isSharing}
            className="w-full px-6 py-4 bg-gradient-to-r from-pink-500 to-purple-600 border-2 border-pink-400 text-white rounded-lg font-pixel hover:from-pink-600 hover:to-purple-700 transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed text-center min-h-[56px] flex items-center justify-center"
          >
            {isSharing 
              ? (language === 'th' ? '🔄 กำลังสร้างภาพ...' : '🔄 Generating Image...')
              : (language === 'th' ? '📸 แชร์เป็นภาพ' : '📸 Share as Image')
            }
          </button>
          
          <button
            onClick={handleShareText}
            className="w-full px-6 py-4 bg-gradient-to-r from-green-500 to-teal-600 border-2 border-green-400 text-white rounded-lg font-pixel hover:from-green-600 hover:to-teal-700 transition-all duration-200 shadow-lg text-center min-h-[56px] flex items-center justify-center"
          >
            {language === 'th' ? '💬 แชร์ข้อความ' : '💬 Share Text'}
          </button>
        </div>

        {/* Share Section */}
        <div className="text-center mt-8">
          <p className="text-gray-400 font-pixel text-sm mb-4">
            {language === 'th' 
              ? 'แชร์ Pokemon คู่ใจของคุณให้เพื่อนๆ ดู!'
              : 'Share your Pokemon partner with friends!'
            }
          </p>
          <div className="text-gray-500 font-pixel text-xs">
            {language === 'th' 
              ? `คะแนนความเข้ากัน ${result.matchScore}% • จุดเด่น: ${result.dominantTraits.slice(0, 3).join(', ')}`
              : `Compatibility ${result.matchScore}% • Strengths: ${result.dominantTraits.slice(0, 3).join(', ')}`
            }
          </div>
        </div>
      </div>
    </div>
  )
}