"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Camera, Upload, X } from "lucide-react"

interface PhotoUploadProps {
  currentPhoto?: string
  onPhotoChange: (photo: string) => void
  className?: string
}

export function PhotoUpload({ currentPhoto, onPhotoChange, className = "" }: PhotoUploadProps) {
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (file: File) => {
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        onPhotoChange(result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const files = Array.from(e.dataTransfer.files)
    if (files.length > 0) {
      handleFileSelect(files[0])
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      handleFileSelect(files[0])
    }
  }

  const removePhoto = () => {
    onPhotoChange("/placeholder.svg?height=200&width=200")
  }

  return (
    <div className={className}>
      <Card>
        <CardContent className="p-6">
          <div className="text-center space-y-4">
            <h3 className="text-lg font-semibold">Profile Photo</h3>

            {/* Photo Preview */}
            <div className="relative inline-block">
              <motion.div whileHover={{ scale: 1.05 }} className="relative">
                <img
                  src={currentPhoto || "/placeholder.svg?height=200&width=200"}
                  alt="Profile preview"
                  className="w-32 h-32 rounded-full object-cover border-4 border-border shadow-lg"
                />
                {currentPhoto && !currentPhoto.includes("placeholder") && (
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute -top-2 -right-2 w-6 h-6 rounded-full"
                    onClick={removePhoto}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                )}
              </motion.div>
            </div>

            {/* Upload Area */}
            <motion.div
              className={`border-2 border-dashed rounded-lg p-6 transition-colors ${
                isDragging ? "border-primary bg-primary/5" : "border-muted-foreground/25 hover:border-primary/50"
              }`}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              whileHover={{ scale: 1.02 }}
            >
              <div className="space-y-3">
                <Camera className="h-8 w-8 mx-auto text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Drop your photo here</p>
                  <p className="text-xs text-muted-foreground">or click to browse</p>
                </div>
                <Button variant="outline" onClick={() => fileInputRef.current?.click()} className="w-full">
                  <Upload className="mr-2 h-4 w-4" />
                  Choose Photo
                </Button>
              </div>
            </motion.div>

            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileInput} className="hidden" />

            <p className="text-xs text-muted-foreground">Recommended: Square image, at least 200x200px</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
