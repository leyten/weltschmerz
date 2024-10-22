'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { BarChart, ChartContainer } from "@/components/ui/chart"
import { BarChart as BarChartIcon, Twitter, Send, Copy } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"

const TypewriterText = ({ children, onComplete, speed = 50, isActive }: { children: string; onComplete?: () => void; speed?: number; isActive: boolean }) => {
  const textRef = useRef<HTMLParagraphElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [typedText, setTypedText] = useState('')
  const [isCompleted, setIsCompleted] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (textRef.current) {
      observer.observe(textRef.current)
    }

    return () => {
      if (textRef.current) {
        observer.unobserve(textRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (isVisible && isActive && children && !isCompleted) {
      let i = 0
      const typeWriter = () => {
        if (i <= children.length) {
          setTypedText(children.slice(0, i))
          i++
          if (i <= children.length) {
            setTimeout(typeWriter, speed)
          } else {
            setIsCompleted(true)
            if (onComplete) {
              onComplete()
            }
          }
        }
      }
      typeWriter()
    }
  }, [isVisible, isActive, children, onComplete, speed, isCompleted])

  if (!isActive && !isCompleted) {
    return null
  }

  return (
    <p ref={textRef} className={`mb-4 ${isActive && !isCompleted ? 'typewriter' : ''} text-[#8a8d9f]`} aria-label={children}>
      {isCompleted ? children : typedText}
    </p>
  )
}

const SequentialTypewriter = ({ texts, speed = 50 }: { texts: string[]; speed?: number }) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const handleComplete = () => {
    if (currentIndex < texts.length - 1) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  return (
    <>
      {texts.map((text, index) => (
        <TypewriterText
          key={index}
          onComplete={handleComplete}
          speed={speed}
          isActive={index === currentIndex}
        >
          {text}
        </TypewriterText>
      ))}
    </>
  )
}

const ContactAddressBar = () => {
  const [copied, setCopied] = useState(false)
  const address = "TBA"

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(address)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  return (
    <div className="flex items-center space-x-2 mb-12">
      <Button
        variant="outline"
        size="icon"
        onClick={copyToClipboard}
        className="bg-[#1a1a20] text-[#d84550] hover:text-[#ff1a1a] hover:bg-[#121218] transition-colors duration-200 border border-[#2a2a30] p-2"
      >
        {copied ? 'Copied!' : <Copy className="w-4 h-4" />}
      </Button>
      <div className="flex-grow bg-[#1a1a20] p-2 rounded-lg border border-[#2a2a30]">
        <span className="text-[#d84550] font-mono">{address}</span>
      </div>
    </div>
  )
}

export default function CryptoWeltschmerzSite() {
  const chartData = [
    { name: "Hope", value: 10 },
    { name: "Despair", value: 90 },
    { name: "Memes", value: 50 },
    { name: "Reality", value: 30 },
    { name: "Void", value: 100 },
  ]

  return (
    <div className="min-h-screen bg-[#121218] text-[#8a8d9f] font-mono">
      <style jsx global>{`
        @keyframes blink {
          0% { opacity: 0; }
          50% { opacity: 1; }
          100% { opacity: 0; }
        }
        .typewriter::after {
          content: '|';
          animation: blink 1s infinite;
        }
        body {
          background-color: #121218;
        }
      `}</style>
      <header className="bg-[#1a1a20] p-4 sticky top-0 z-10 border-b border-[#2a2a30]">
        <nav className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-[#d84550]">Weltschmerz</h1>
          <div className="flex space-x-4">
            <Link href="#chart">
              <Button variant="ghost" size="sm" className="text-[#8a8d9f] hover:text-[#ff1a1a] hover:bg-[#121218]">
                <BarChartIcon className="w-5 h-5 mr-2" />
                CHART
              </Button>
            </Link>
            <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <Button variant="ghost" size="sm" className="text-[#8a8d9f] hover:text-[#ff1a1a] hover:bg-[#121218]">
                <Twitter className="w-5 h-5 mr-2" />
                TWITTER
              </Button>
            </Link>
            <Link href="https://telegram.org" target="_blank" rel="noopener noreferrer">
              <Button variant="ghost" size="sm" className="text-[#8a8d9f] hover:text-[#ff1a1a] hover:bg-[#121218]">
                <Send className="w-5 h-5 mr-2" />
                TELEGRAM
              </Button>
            </Link>
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-8">
        <section className="mb-12">
          <h2 className="text-4xl font-bold mb-4 text-[#d84550]">Echoes of $NULL</h2>
          <TypewriterText isActive={true} speed={50}>
            in the void of memes and dreams... pixels flicker... wallets empty... we are but specks of dust in the blockchain...
          </TypewriterText>
          <Card className="bg-[#1a1a20] border-[#2a2a30] mt-6">
            <CardContent className="p-6">
              <div className="flex justify-center">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-aB0b9FH5cqJevBsRhlcotx5O80gCEb.png"
                  alt="A man overlooking a misty, mountainous landscape"
                  width={500}
                  height={375}
                  className="w-full md:w-2/3 lg:w-1/2 h-auto object-cover rounded-lg mb-6 filter grayscale contrast-125 opacity-80"
                />
              </div>
              <blockquote className="text-2xl italic text-[#d84550]">
                "to the moon" they said... but the moon was just another rock in the endless void...
              </blockquote>
              <p className="text-right mt-4 text-[#8a8d9f]">- anonymous bag holder</p>
            </CardContent>
          </Card>
        </section>

        <ContactAddressBar />

        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-[#d84550]">Fragments of Lost Fortunes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="relative overflow-hidden rounded-lg">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-YKtjluVsuk69Alh3NUHogdipuxtxI5.png"
                alt="A skeleton sitting in a window, looking out at a cityscape"
                width={500}
                height={500}
                className="object-cover w-full md:w-5/6 lg:w-3/4 h-auto mx-auto transition-transform duration-1000 hover:scale-110 filter grayscale contrast-125 opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#121218] to-transparent opacity-70"></div>
            </div>
            <div>
              <SequentialTypewriter
                texts={[
                  "green candles... red candles... flickering hopes... melting away like wax in the inferno of market volatility...",
                  "we chased the dragon of wealth... only to find ourselves in the abyss of loss...",
                  "hodl... they said... diamond hands... they memed... but in the end... we were left with nothing but screenshots of fleeting gains... and the bitter taste of regret..."
                ]}
                speed={40}
              />
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-[#d84550]">Echoes of the Void</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="relative overflow-hidden rounded-lg group">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-qDujscDWrFuzWwNjGDSxouoc7B90DH.png"
                alt="A skull-faced figure in a suit, sitting at a desk"
                width={400}
                height={400}
                className="object-cover w-full h-full transition-transform duration-1000 group-hover:scale-110 filter grayscale contrast-125 opacity-80"
              />
              <div className="absolute inset-0 bg-[#121218] opacity-50 transition-opacity duration-300 group-hover:opacity-30"></div>
            </div>
            <div className="relative overflow-hidden rounded-lg group">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-n71VTrGhS0imxh4pGQFyeBNDj1N3rh.png"
                alt="A portrait of a bearded man with a skull figure behind him"
                width={400}
                height={400}
                className="object-cover w-full h-full transition-transform duration-1000 group-hover:scale-110 filter grayscale contrast-125 opacity-80"
              />
              <div className="absolute inset-0 bg-[#121218] opacity-50 transition-opacity duration-300 group-hover:opacity-30"></div>
            </div>
            <div className="relative overflow-hidden rounded-lg group">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-vUahcCU6PfGKMUqzeZoLBDhUBLZHiW.png"
                alt="A jester in a red costume, sitting in an ornate chair"
                width={400}
                height={400}
                className="object-cover w-full h-full transition-transform duration-1000 group-hover:scale-110 filter grayscale contrast-125 opacity-80"
              />
              <div className="absolute inset-0 bg-[#121218] opacity-50 transition-opacity duration-300 group-hover:opacity-30"></div>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-[#d84550]">The Futility of HODLing</h2>
          <SequentialTypewriter
            texts={[
              "in the grand tapestry of existence... our memecoins are but fleeting jokes... whispers in the void... we cling to wallets full of worthless tokens... as if they could fill the emptiness within...",
              "lambos and moon... empty promises... we should have known... in the end... we're all just bag holders in the cosmic joke of life... our portfolios as meaningless as our dreams...",
              "perhaps... in giving up... we find liberation... let go of the charts... embrace the void... for in nothingness... we find everything... or nothing at all..."
            ]}
            speed={30}
          />
        </section>
      </main>

      <footer className="bg-[#1a1a20] text-center p-4 text-[#8a8d9f] border-t border-[#2a2a30]">
        <p>&copy; {new Date().getFullYear()} Weltschmerz. All rights reserved. Or not. Nothing matters anyway.</p>
      </footer>
    </div>
  )
}