'use client'

import { useState, useEffect } from 'react'
import { Quote, RefreshCw } from 'lucide-react'
import { QuoteWidgetContainer, QuoteWidgetCard, Content } from '@/components/ui/styled'

const motivationalQuotes = [
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
    text: "The best way to get started is to quit talking and begin doing.",
    author: "Walt Disney"
  },
  {
    text: "The future belongs to those who believe in the beauty of their dreams.",
    author: "Eleanor Roosevelt"
  },
  {
    text: "It is during our darkest moments that we must focus to see the light.",
    author: "Aristotle"
  },
  {
    text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    author: "Winston Churchill"
  },
  {
    text: "The way to get started is to quit talking and begin doing.",
    author: "Walt Disney"
  },
  {
    text: "Don't be afraid to give up the good to go for the great.",
    author: "John D. Rockefeller"
  },
  {
    text: "Innovation distinguishes between a leader and a follower.",
    author: "Steve Jobs"
  },
  {
    text: "The only impossible journey is the one you never begin.",
    author: "Tony Robbins"
  },
  {
    text: "Your limitation—it's only your imagination.",
    author: "Unknown"
  },
  {
    text: "Great things never come from comfort zones.",
    author: "Unknown"
  },
  {
    text: "Dream it. Wish it. Do it.",
    author: "Unknown"
  },
  {
    text: "Success doesn't just happen. It's planned for.",
    author: "Unknown"
  },
  {
    text: "Push yourself, because no one else is going to do it for you.",
    author: "Unknown"
  },
  {
    text: "Sometimes later becomes never. Do it now.",
    author: "Unknown"
  },
  {
    text: "Great things never come from comfort zones.",
    author: "Unknown"
  },
  {
    text: "Dream bigger. Do bigger.",
    author: "Unknown"
  },
  {
    text: "Don't stop when you're tired. Stop when you're done.",
    author: "Unknown"
  },
  {
    text: "Wake up with determination. Go to bed with satisfaction.",
    author: "Unknown"
  },
  {
    text: "Do something today that your future self will thank you for.",
    author: "Unknown"
  },
  {
    text: "Little things make big days.",
    author: "Unknown"
  },
  {
    text: "It's going to be hard, but hard does not mean impossible.",
    author: "Unknown"
  },
  {
    text: "Don't wait for opportunity. Create it.",
    author: "Unknown"
  },
  {
    text: "Sometimes we're tested not to show our weaknesses, but to discover our strengths.",
    author: "Unknown"
  },
  {
    text: "The key to success is to focus on goals, not obstacles.",
    author: "Unknown"
  },
  {
    text: "Dream it. Believe it. Build it.",
    author: "Unknown"
  }
]

export function QuoteWidget() {
  const [currentQuote, setCurrentQuote] = useState(() => {
    // Select a random quote on initial mount
    const randomIndex = Math.floor(Math.random() * motivationalQuotes.length)
    return motivationalQuotes[randomIndex]
  })
  const [isVisible, setIsVisible] = useState(false)
  const [isExpanded, setIsExpanded] = useState(true) // Start expanded

  useEffect(() => {
    // Show widget after 2 seconds
    const timer = setTimeout(() => setIsVisible(true), 2000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    // Auto-collapse after 5 seconds when widget becomes visible
    let collapseTimer: NodeJS.Timeout
    if (isVisible && isExpanded) {
      collapseTimer = setTimeout(() => {
        setIsExpanded(false)
      }, 5000)
    }
    return () => {
      if (collapseTimer) clearTimeout(collapseTimer)
    }
  }, [isVisible, isExpanded])

  const refreshQuote = () => {
    let randomIndex
    do {
      randomIndex = Math.floor(Math.random() * motivationalQuotes.length)
    } while (motivationalQuotes[randomIndex].text === currentQuote.text && motivationalQuotes.length > 1)
    
    setCurrentQuote(motivationalQuotes[randomIndex])
  }

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded)
  }

  if (!isVisible) return null

  return (
    <QuoteWidgetContainer $isVisible={isVisible}>
      <QuoteWidgetCard $isExpanded={isExpanded} onClick={toggleExpanded}>
          <div className="flex items-start gap-3">
            <Quote className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
            <Content $isExpanded={isExpanded}>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground mb-2">
                  "{currentQuote.text}"
                </p>
                <p className="text-xs text-muted-foreground">
                  — {currentQuote.author}
                </p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  refreshQuote()
                }}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <RefreshCw className="h-4 w-4" />
              </button>
            </Content>
          </div>
      </QuoteWidgetCard>
    </QuoteWidgetContainer>
  )
}
