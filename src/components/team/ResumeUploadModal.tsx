/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { Upload, FileText, X } from "lucide-react"
import { applyResume } from "@/services/resume"

interface ResumeUploadModalProps {
  isOpen: boolean
  onClose: () => void
}

export function ResumeUploadModal({ isOpen, onClose }: ResumeUploadModalProps) {
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0]
      // Basic validation: PDF or Word
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
      if (!allowedTypes.includes(selectedFile.type)) {
        toast.error("Please upload a PDF or Word document.")
        return
      }
      setFile(selectedFile)
    }
  }

  const handleSubmit = async () => {
    if (!file) {
      toast.error("Please select a file first.")
      return
    }

    setLoading(true)
    const formData = new FormData()
    formData.append('resume', file)

    try {
      const response = await applyResume(formData)
      if (response?.success) {
        toast.success("Resume submitted successfully!")
        setFile(null)
        onClose()
      } else {
        toast.error(response?.message || "Failed to submit resume")
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Upload Your Resume</DialogTitle>
          <DialogDescription>
            Join our team of legal experts. Please upload your CV in PDF or Word format.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="flex flex-col items-center justify-center border-2 border-dashed border-muted-foreground/25 rounded-xl p-8 transition-colors hover:border-primary/50 group">
            <input
              type="file"
              id="resume-upload"
              className="hidden"
              onChange={handleFileChange}
              accept=".pdf,.doc,.docx"
            />
            {!file ? (
              <Label
                htmlFor="resume-upload"
                className="flex flex-col items-center gap-2 cursor-pointer"
              >
                <div className="p-4 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <Upload className="w-8 h-8 text-primary" />
                </div>
                <span className="text-sm font-medium">Click to select file</span>
                <span className="text-xs text-muted-foreground">PDF, DOC, DOCX (Max 5MB)</span>
              </Label>
            ) : (
              <div className="flex flex-col items-center gap-4 w-full">
                <div className="flex items-center gap-3 p-3 bg-muted rounded-lg w-full">
                  <FileText className="w-8 h-8 text-primary shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{file.name}</p>
                    <p className="text-xs text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setFile(null)}
                    className="shrink-0"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={!file || loading}>
            {loading ? "Submitting..." : "Submit Resume"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
