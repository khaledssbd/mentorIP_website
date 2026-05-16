"use client"

import React, { useState } from 'react'
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ResumeUploadModal } from "./ResumeUploadModal"

export function JoinTeamCTA() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <section className="max-w-4xl mx-auto">
        <div className="bg-muted p-12 md:p-16 rounded-[3rem] border border-border text-center space-y-8 shadow-2xl relative overflow-hidden group/cta">
          <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-primary via-blue-600 to-primary animate-linear-x opacity-50" />
          <h4 className="text-2xl md:text-3xl font-black text-foreground uppercase tracking-tight">
            Interested in joining our wing?
          </h4>
          <p className="text-muted-foreground font-medium italic text-lg">
            We are always looking for passionate legal professionals and IP specialists to expand our global reach.
          </p>
          <Button 
            size="lg" 
            onClick={() => setIsModalOpen(true)}
            className="rounded-full px-10 py-7 font-black text-xs uppercase tracking-[0.2em] shadow-xl group/btn overflow-hidden relative"
          >
            <span className="relative z-10 flex items-center gap-2">
              Send Your CV <ArrowRight className="w-4 h-4" />
            </span>
            <div className="absolute inset-0 bg-linear-to-r from-primary via-blue-600 to-primary bg-size-[200%_100%] animate-linear-x opacity-0 group-hover/btn:opacity-100 transition-opacity" />
          </Button>
        </div>
      </section>

      <ResumeUploadModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  )
}
