"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageSquare, Send, X } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"

export function SupportChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    { type: "bot", text: "Hi there! How can I help you today?" },
    { type: "bot", text: "Here are some common topics:" },
  ])
  const [input, setInput] = useState("")

  const handleSendMessage = () => {
    if (input.trim()) {
      const newMessages = [...messages, { type: "user", text: input }]
      setMessages(newMessages)
      setInput("")

      // Mock bot response
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { type: "bot", text: "Thanks for your message! A support agent will be with you shortly." },
        ])
      }, 1000)
    }
  }

  const handleSuggestedTopic = (topic: string) => {
    const newMessages = [...messages, { type: "user", text: topic }]
    setMessages(newMessages)
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          type: "bot",
          text: `You selected "${topic}". Please provide more details, and I'll connect you with the right resource.`,
        },
      ])
    }, 500)
  }

  return (
    <>
      {!isOpen && (
        <Button
          className="fixed bottom-4 right-4 z-50 rounded-full p-3 shadow-lg bg-primary hover:bg-primary/90 text-white"
          size="icon"
          onClick={() => setIsOpen(true)}
          aria-label="Open support chat"
        >
          <MessageSquare className="h-6 w-6" />
        </Button>
      )}

      {isOpen && (
        <Card className="fixed bottom-4 right-4 z-50 w-[calc(100vw-2rem)] max-w-sm h-[450px] flex flex-col bg-darkNavy-800 text-white border-darkNavy-700 shadow-xl rounded-lg overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between p-4 border-b border-darkNavy-700">
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Support Chat
            </CardTitle>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} aria-label="Close support chat">
              <X className="h-5 w-5 text-darkNavy-200 hover:text-white" />
            </Button>
          </CardHeader>
          <CardContent className="flex-1 p-4 overflow-hidden flex flex-col">
            <ScrollArea className="flex-1 pr-4">
              <div className="space-y-3">
                {messages.map((msg, index) => (
                  <div key={index} className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[80%] p-2 rounded-lg ${
                        msg.type === "user" ? "bg-primary text-white" : "bg-darkNavy-700 text-darkNavy-100"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
                {messages.length === 2 && ( // Show suggested topics only initially
                  <div className="flex flex-wrap gap-2 mt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-darkNavy-700 text-darkNavy-100 border-darkNavy-600 hover:bg-darkNavy-600"
                      onClick={() => handleSuggestedTopic("Billing Inquiry")}
                    >
                      Billing Inquiry
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-darkNavy-700 text-darkNavy-100 border-darkNavy-600 hover:bg-darkNavy-600"
                      onClick={() => handleSuggestedTopic("Technical Issue")}
                    >
                      Technical Issue
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-darkNavy-700 text-darkNavy-100 border-darkNavy-600 hover:bg-darkNavy-600"
                      onClick={() => handleSuggestedTopic("Feature Request")}
                    >
                      Feature Request
                    </Button>
                  </div>
                )}
              </div>
            </ScrollArea>
          </CardContent>
          <div className="p-4 border-t border-darkNavy-700 flex items-center gap-2">
            <Input
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              className="flex-1 bg-darkNavy-700 border-darkNavy-600 text-white placeholder:text-darkNavy-300 focus-visible:ring-primary"
            />
            <Button
              size="icon"
              onClick={handleSendMessage}
              className="bg-primary hover:bg-primary/90 text-white"
              aria-label="Send message"
            >
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </Card>
      )}
    </>
  )
}
