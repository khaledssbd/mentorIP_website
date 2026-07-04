"use client"

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

interface GalleryImage {
  _id: string;
  imageUrl: string;
}

interface GalleryClientProps {
  images: GalleryImage[];
}

export default function GalleryClient({ images }: GalleryClientProps) {
  return (
    <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6 space-y-6">
      {images.map((image, index) => (
        <motion.div
          key={image._id}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ 
            duration: 0.5, 
            delay: index * 0.05,
            ease: "easeOut"
          }}
          className="break-inside-avoid"
        >
          <div className="relative group overflow-hidden rounded-xl bg-muted shadow-md hover:shadow-xl transition-all duration-300">
            <Image
              src={image.imageUrl}
              alt={`Gallery Image ${index + 1}`}
              width={500}
              height={500}
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        </motion.div>
      ))}
    </div>
  )
}
