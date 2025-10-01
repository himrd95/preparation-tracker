"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Quote } from "lucide-react"

const quotes = [
  {
    text: "The only way to do great work is to love what you do.",
    author: "Steve Jobs"
  },
  {
    text: "Code is like humor. When you have to explain it, it's bad.",
    author: "Cory House"
  },
  {
    text: "First, solve the problem. Then, write the code.",
    author: "John Johnson"
  },
  {
    text: "Experience is the name everyone gives to their mistakes.",
    author: "Oscar Wilde"
  },
  {
    text: "In order to be irreplaceable, one must always be different.",
    author: "Coco Chanel"
  },
  {
    text: "The best time to plant a tree was 20 years ago. The second best time is now.",
    author: "Chinese Proverb"
  },
  {
    text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    author: "Winston Churchill"
  },
  {
    text: "The way to get started is to quit talking and begin doing.",
    author: "Walt Disney"
  }
]

export function QuoteWidget() {
  const [currentQuote, setCurrentQuote] = useState(quotes[0])

  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * quotes.length)
      setCurrentQuote(quotes[randomIndex])
    }, 10000) // Change quote every 10 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="glass-card rounded-2xl p-6 hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
      <div className="flex items-start space-x-4">
        <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl shadow-lg">
          <Quote className="h-6 w-6 text-white" />
        </div>
        <div className="flex-1">
          <p className="text-gray-800 text-sm leading-relaxed mb-4 font-medium">
            &ldquo;{currentQuote.text}&rdquo;
          </p>
          <div className="flex items-center justify-between">
            <p className="text-gray-600 text-xs font-bold">
              — {currentQuote.author}
            </p>
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
