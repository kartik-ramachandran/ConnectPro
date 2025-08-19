"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Mic, StopCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface SpeechToTextInputProps extends React.ComponentProps<typeof Input> {
  isTextArea?: boolean
  onValueChange: (value: string) => void
  value: string
}

// Define SpeechRecognition and webkitSpeechRecognition types
declare global {
  interface Window {
    webkitSpeechRecognition: any
    SpeechRecognition: any
  }
}

export function SpeechToTextInput({
  isTextArea = false,
  onValueChange,
  value,
  className,
  ...props
}: SpeechToTextInputProps) {
  const [isListening, setIsListening] = useState(false)
  const [isSpeechRecognitionSupported, setIsSpeechRecognitionSupported] = useState(false)
  const recognitionRef = useRef<SpeechRecognition | null>(null)
  const interimTranscriptRef = useRef("")

  useEffect(() => {
    // Only attempt to access window properties if window is defined (i.e., on the client)
    if (typeof window !== "undefined") {
      if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
        setIsSpeechRecognitionSupported(true)

        const SpeechRecognition: any = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition
        const recognition = new SpeechRecognition()
        recognition.continuous = false // Stop after a pause
        recognition.interimResults = true // Get interim results

        recognition.onstart = () => {
          setIsListening(true)
          interimTranscriptRef.current = ""
        }

        recognition.onresult = (event) => {
          let interimTranscript = ""
          let finalTranscript = ""

          for (let i = event.resultIndex; i < event.results.length; ++i) {
            const transcript = event.results[i][0].transcript
            if (event.results[i].isFinal) {
              finalTranscript += transcript
            } else {
              interimTranscript += transcript
            }
          }
          interimTranscriptRef.current = interimTranscript // Store interim for potential display or immediate feedback

          if (finalTranscript) {
            onValueChange(value + finalTranscript) // Append to existing value
          }
        }

        recognition.onerror = (event) => {
          console.error("Speech recognition error:", event.error)
          setIsListening(false)
        }

        recognition.onend = () => {
          setIsListening(false)
        }

        recognitionRef.current = recognition

        return () => {
          if (recognitionRef.current) {
            recognitionRef.current.stop()
          }
        }
      } else {
        console.warn("Web Speech API is not supported in this browser.")
        setIsSpeechRecognitionSupported(false)
      }
    }
  }, [onValueChange, value])

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop()
    } else {
      recognitionRef.current?.start()
    }
  }

  const Component = isTextArea ? Textarea : Input

  return (
    <div className="relative flex items-center">
      <Component
        value={value}
        onChange={(e) => onValueChange(e.target.value)}
        className={cn(isTextArea ? "pr-10" : "pr-10", className)} // Adjust padding for button
        {...props}
      />
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={toggleListening}
        className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
        disabled={!isSpeechRecognitionSupported} // Use the state variable here
      >
        {isListening ? <StopCircle className="h-4 w-4 text-red-500" /> : <Mic className="h-4 w-4" />}
        <span className="sr-only">{isListening ? "Stop listening" : "Start voice input"}</span>
      </Button>
    </div>
  )
}
