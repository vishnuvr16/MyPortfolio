"use client"

import type React from "react"
import { useState, useRef, useEffect, useCallback } from "react"
import { MessageCircle, Send, X, Minimize2, Maximize2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

interface Size {
  width: number
  height: number
}

interface Position {
  x: number
  y: number
}

type ResizeDirection =
  | "none"
  | "bottom-right"
  | "bottom"
  | "right"
  | "top"
  | "left"
  | "top-left"
  | "top-right"
  | "bottom-left"

// --- Constants ---
const DEFAULT_SIZE: Size = { width: 400, height: 600 }
const MIN_SIZE: Size = { width: 300, height: 400 }
const MINIMIZED_HEIGHT = 64
const ANCHOR_OFFSET = 24
const RESIZE_HANDLE_SIZE = 6

export default function AIChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content:
        "Hi! 👋 I'm Vishnu's AI assistant. I can answer questions about their skills, experience, projects, and help you get to know them better. What would you like to know?",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  // Position and Size State for the full window
  const [chatPosition, setChatPosition] = useState<Position>({ x: 0, y: 0 })
  const [chatSize, setChatSize] = useState<Size>(DEFAULT_SIZE)
  
  const [hasUserMoved, setHasUserMoved] = useState(false) 

  // State to manage dragging and resizing
  const [isDragging, setIsDragging] = useState(false)
  const [isResizing, setIsResizing] = useState(false)
  const [resizeDirection, setResizeDirection] = useState<ResizeDirection>("none")

  // Refs for DOM elements and transient state
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const dragOffset = useRef({ x: 0, y: 0 })
  const resizeStart = useRef({ x: 0, y: 0, width: DEFAULT_SIZE.width, height: DEFAULT_SIZE.height, posX: 0, posY: 0 })
  const rAFRef = useRef<number>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  // Calculate Initial Position (Bottom Right Corner)
  const calculateInitialPosition = useCallback(() => {

    if (!hasUserMoved) {
        const initialX = window.innerWidth - chatSize.width - ANCHOR_OFFSET
        const initialY = window.innerHeight - chatSize.height - ANCHOR_OFFSET
        setChatPosition({ x: initialX, y: initialY })
    }
  }, [chatSize.height, chatSize.width, hasUserMoved])

  // Toggle open/close state
  const handleOpenToggle = useCallback(() => {
    setIsOpen((prev) => !prev)
    setIsMinimized(false)
  }, [])

  // Toggle minimize/maximize state
  const handleMinimizeToggle = useCallback(() => {
    setIsMinimized((prev) => !prev)
  }, [])

  // --- Drag & Resize Event Handlers ---

  const handleDragMouseDown = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement
    if (target.closest("button") || target.closest("input")) return

    setIsDragging(true)
    dragOffset.current = {
      x: e.clientX - chatPosition.x,
      y: e.clientY - chatPosition.y,
    }
    e.preventDefault()
  }

  const handleResizeMouseDown = (e: React.MouseEvent, direction: ResizeDirection) => {
    if (isMinimized) return // Disable resize when minimized

    e.stopPropagation()
    setIsResizing(true)
    setResizeDirection(direction)

    resizeStart.current = {
      x: e.clientX,
      y: e.clientY,
      width: chatSize.width,
      height: chatSize.height,
      posX: chatPosition.x,
      posY: chatPosition.y,
    }
    e.preventDefault()
  }

  const updateWindow = useCallback((e: MouseEvent) => {
    if (isDragging) {
      // DRAGGING LOGIC
      const newX = e.clientX - dragOffset.current.x
      const newY = e.clientY - dragOffset.current.y
      setChatPosition({ x: newX, y: newY })
      // FIX 2: Set flag when the user drags the window
      if (!hasUserMoved) {
        setHasUserMoved(true)
      }
    } else if (isResizing) {
      // RESIZING LOGIC
      const { x: startX, y: startY, width: startW, height: startH, posX: startPX, posY: startPY } = resizeStart.current
      const deltaX = e.clientX - startX
      const deltaY = e.clientY - startY
      let newW = startW
      let newH = startH
      let newX = startPX
      let newY = startPY

      switch (resizeDirection) {
        // Bottom Edges
        case "bottom-right":
          newW = Math.max(startW + deltaX, MIN_SIZE.width)
          newH = Math.max(startH + deltaY, MIN_SIZE.height)
          break
        case "bottom":
          newH = Math.max(startH + deltaY, MIN_SIZE.height)
          break
        case "bottom-left":
          newW = Math.max(startW - deltaX, MIN_SIZE.width)
          newH = Math.max(startH + deltaY, MIN_SIZE.height)
          if (newW > MIN_SIZE.width) newX = startPX + (deltaX > 0 ? deltaX : 0) // Adjusted boundary check
          break

        // Top Edges
        case "top":
          newH = Math.max(startH - deltaY, MIN_SIZE.height)
          if (newH > MIN_SIZE.height) newY = startPY + (deltaY < 0 ? deltaY : 0) // Adjusted boundary check
          break
        case "top-right":
          newW = Math.max(startW + deltaX, MIN_SIZE.width)
          newH = Math.max(startH - deltaY, MIN_SIZE.height)
          if (newH > MIN_SIZE.height) newY = startPY + (deltaY < 0 ? deltaY : 0)
          break
        case "top-left":
          newW = Math.max(startW - deltaX, MIN_SIZE.width)
          newH = Math.max(startH - deltaY, MIN_SIZE.height)
          if (newW > MIN_SIZE.width) newX = startPX + (deltaX > 0 ? deltaX : 0)
          if (newH > MIN_SIZE.height) newY = startPY + (deltaY < 0 ? deltaY : 0)
          break

        // Side Edges
        case "right":
          newW = Math.max(startW + deltaX, MIN_SIZE.width)
          break
        case "left":
          newW = Math.max(startW - deltaX, MIN_SIZE.width)
          if (newW > MIN_SIZE.width) newX = startPX + (deltaX > 0 ? deltaX : 0)
          break
      }

      setChatSize({ width: newW, height: newH })
      setChatPosition({ x: newX, y: newY })
      
      // Setting this flag when resizing is also generally good practice
      if (!hasUserMoved) {
        setHasUserMoved(true)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDragging, isResizing, resizeDirection, hasUserMoved])

  // Performance Optimization: Use requestAnimationFrame for smooth UI updates
  const handleDragOrResize = useCallback(
    (e: MouseEvent) => {
      if (rAFRef.current) {
        cancelAnimationFrame(rAFRef.current)
      }
      rAFRef.current = requestAnimationFrame(() => updateWindow(e))
    },
    [updateWindow]
  )

  const handleMouseUp = useCallback(() => {
    if (rAFRef.current) {
      cancelAnimationFrame(rAFRef.current)
    }
    setIsDragging(false)
    setIsResizing(false)
    setResizeDirection("none")
  }, [])

  // --- Side Effects ---
  useEffect(() => {
    if (isOpen) {
      // FIX 3: Only call calculateInitialPosition if the window hasn't been moved.
      if (!isMinimized && !hasUserMoved) {
        calculateInitialPosition()
      }
      inputRef.current?.focus()

      window.addEventListener("mousemove", handleDragOrResize)
      window.addEventListener("mouseup", handleMouseUp)
    }

    // Cleanup function
    return () => {
      window.removeEventListener("mousemove", handleDragOrResize)
      window.removeEventListener("mouseup", handleMouseUp)
      if (rAFRef.current) {
        cancelAnimationFrame(rAFRef.current)
      }
    }
  }, [isOpen, handleDragOrResize, handleMouseUp, calculateInitialPosition, isMinimized, hasUserMoved])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true) // Start loading state

    try {
        const messagesPayload = [
            ...messages, 
            userMessage
        ];

        const response = await fetch("/api/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ messages: messagesPayload }),
        })

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json()
        
        const assistantResponseText = data.message; 

        const assistantMessage: Message = {
            id: (Date.now() + 1).toString(),
            role: "assistant",
            content: assistantResponseText,
            timestamp: new Date(),
        }

        setMessages((prev) => [...prev, assistantMessage])

    } catch (error) {
        console.error("Error fetching AI response:", error)
        const errorMessage: Message = {
            id: (Date.now() + 1).toString(),
            role: "assistant",
            content: "Sorry, I ran into an error trying to fetch a response. Please try again.",
            timestamp: new Date(),
        }
        setMessages((prev) => [...prev, errorMessage])
    } finally {
        setIsLoading(false)
    }
}

  return (
    <div className="absolute">
      {/* Chat Button (Always visible when chat is closed or minimized) */}
      {!isOpen || isMinimized ? (
        <button
          onClick={handleOpenToggle}
          className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full shadow-lg shadow-accent/40 flex items-center justify-center text-white hover:shadow-xl hover:shadow-accent/60 transition-all duration-300 hover:scale-110 z-40 group cursor-pointer"
          aria-label="Open AI chat"
        >
          <MessageCircle size={24} className="group-hover:rotate-12 transition-transform" />
          <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
        </button>
      ) : null}

      {/* Chat Window */}
      {isOpen && (
        <div
          className={cn(
            "fixed z-50 transition-shadow duration-300 rounded-2xl shadow-2xl bg-background/95 backdrop-blur flex flex-col pointer-events-auto",
            isDragging ? "cursor-grabbing" : isResizing ? "select-none" : ""
          )}
          style={{
            // Dynamic Positioning and Sizing
            top: isMinimized ? `${window.innerHeight - ANCHOR_OFFSET - MINIMIZED_HEIGHT}px` : `${chatPosition.y}px`,
            left: isMinimized ? `${ANCHOR_OFFSET}px` : `${chatPosition.x}px`,
            width: isMinimized ? '300px' : `${chatSize.width}px`,
            height: isMinimized ? `${MINIMIZED_HEIGHT}px` : `${chatSize.height}px`,
            minWidth: `${MIN_SIZE.width}px`,
            minHeight: `${MIN_SIZE.height}px`,
          }}
        >
          {/* Resizing Handles (Around the border) */}
          {!isMinimized && (
            <>
              {/* Top Edge and Corners */}
              <div onMouseDown={(e) => handleResizeMouseDown(e, "top-left")} className={`absolute top-0 left-0 w-${RESIZE_HANDLE_SIZE} h-${RESIZE_HANDLE_SIZE} cursor-nwse-resize p-2`}></div>
              <div onMouseDown={(e) => handleResizeMouseDown(e, "top")} className={`absolute top-0 left-${RESIZE_HANDLE_SIZE} right-${RESIZE_HANDLE_SIZE} h-2 cursor-ns-resize`}></div>
              <div onMouseDown={(e) => handleResizeMouseDown(e, "top-right")} className={`absolute top-0 right-0 w-${RESIZE_HANDLE_SIZE} h-${RESIZE_HANDLE_SIZE} cursor-nesw-resize p-2`}></div>
              
              {/* Left & Right Edges */}
              <div onMouseDown={(e) => handleResizeMouseDown(e, "left")} className={`absolute top-${RESIZE_HANDLE_SIZE} bottom-${RESIZE_HANDLE_SIZE} left-0 w-2 cursor-ew-resize`}></div>
              <div onMouseDown={(e) => handleResizeMouseDown(e, "right")} className={`absolute top-${RESIZE_HANDLE_SIZE} bottom-${RESIZE_HANDLE_SIZE} right-0 w-2 cursor-ew-resize`}></div>

              {/* Bottom Edge and Corners */}
              <div onMouseDown={(e) => handleResizeMouseDown(e, "bottom-left")} className={`absolute bottom-0 left-0 w-${RESIZE_HANDLE_SIZE} h-${RESIZE_HANDLE_SIZE} cursor-nesw-resize p-2`}></div>
              <div onMouseDown={(e) => handleResizeMouseDown(e, "bottom")} className={`absolute bottom-0 left-${RESIZE_HANDLE_SIZE} right-${RESIZE_HANDLE_SIZE} h-2 cursor-ns-resize`}></div>
              <div onMouseDown={(e) => handleResizeMouseDown(e, "bottom-right")} className={`absolute right-0 bottom-0 w-${RESIZE_HANDLE_SIZE} h-${RESIZE_HANDLE_SIZE} cursor-nwse-resize bg-white/10 rounded-tl-lg p-2`}></div>
            </>
          )}

          {/* Header (Drag Handle) */}
          <div
            className={cn(
                "h-16 bg-gradient-to-r from-primary to-accent rounded-t-2xl p-4 flex items-center justify-between",
                !isMinimized && "cursor-grab"
            )}
            onMouseDown={!isMinimized ? handleDragMouseDown : undefined}
          >
            <div className="flex items-center gap-3 pointer-events-none">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <MessageCircle size={20} className="text-white" />
              </div>
              <div className="text-white select-none">
                <p className="font-semibold text-sm">Vishnu's Assistant</p>
                {!isMinimized && (
                  <p className="text-xs text-white/80">Always here to help</p>
                )}
              </div>
            </div>
            <div className="flex gap-2 pointer-events-auto">
              <button
                onClick={handleMinimizeToggle}
                className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors cursor-pointer"
                aria-label="Toggle minimize"
              >
                {isMinimized ? <Maximize2 size={18} /> : <Minimize2 size={18} />}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors cursor-pointer"
                aria-label="Close chat"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Messages Area and Input (Visible only when not minimized) */}
          {!isMinimized && (
            <>
              {/* Messages Area */}
              <div
                className="flex-1 overflow-y-auto space-y-4 p-4"
                style={{ maxHeight: `calc(${chatSize.height}px - ${MINIMIZED_HEIGHT}px - 80px)` }}
              >
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={cn(
                      "flex gap-3 animate-fadeIn",
                      message.role === "user" ? "justify-end" : "justify-start"
                    )}
                  >
                    <div
                      className={cn(
                        "max-w-xs px-4 py-3 rounded-2xl text-sm shadow-md",
                        message.role === "user"
                          ? "bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-br-none"
                          : "bg-white/10 text-foreground rounded-bl-none"
                      )}
                    >
                      <p className="leading-relaxed">{message.content}</p>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex gap-3 justify-start">
                    <div className="bg-white/10 px-4 py-3 rounded-2xl rounded-bl-none">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-accent rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-accent rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-accent rounded-full animate-bounce"
                          style={{ animationDelay: "0.4s" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <form
                onSubmit={handleSendMessage}
                className="h-20 border-t border-white/10 p-4 rounded-b-2xl flex-shrink-0"
              >
                <div className="flex gap-2 h-full">
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask me anything..."
                    disabled={isLoading}
                    className="flex-1 bg-white/10 text-foreground placeholder:text-foreground/50 rounded-lg px-4 py-2 border border-white/20 focus:border-accent focus:outline-none transition-colors disabled:opacity-50"
                  />
                  <button
                    type="submit"
                    disabled={isLoading || !input.trim()}
                    className="bg-gradient-to-r from-primary to-accent text-primary-foreground p-2 rounded-lg hover:shadow-lg hover:shadow-accent/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                    aria-label="Send message"
                  >
                    <Send size={18} />
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      )}

      {/* Styles */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        :global(.animate-fadeIn) {
          animation: fadeIn 0.3s ease-out;
        }
        
        .transition-shadow {
            transition: box-shadow 0.3s ease;
        }

        .pointer-events-none { pointer-events: none; }
        .pointer-events-auto { pointer-events: auto; }
      `}</style>
    </div>
  )
}