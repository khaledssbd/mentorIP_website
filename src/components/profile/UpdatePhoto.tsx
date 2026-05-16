"use client";

import { useState, useRef } from "react";
import { Camera, Loader2, Check, X } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { updateProfilePhoto } from "@/services/auth";
import { toast } from "sonner";
import { getInitials } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

interface UpdatePhotoProps {
  initialImage?: string;
  name: string;
}

export function UpdatePhoto({ initialImage, name }: UpdatePhotoProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState(initialImage);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);

    // Preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleCancel = () => {
    setSelectedFile(null);
    setPreview(initialImage);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSave = async () => {
    if (!selectedFile) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append("user", selectedFile);

    try {
      const res = await updateProfilePhoto(formData);
      if (res.success) {
        toast.success("Profile photo updated successfully!");
        setSelectedFile(null);
        router.refresh();
      } else {
        toast.error(res.message || "Failed to update photo");
      }
    } catch {
      toast.error("An error occurred while uploading. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative group">
        <Avatar className="w-24 h-24 md:w-32 md:h-32 border-2 border-background shadow-sm transition-opacity group-hover:opacity-80">
          <AvatarImage src={preview} alt={name} className="object-cover" />
          <AvatarFallback className="text-3xl font-bold bg-primary/10 text-primary">
            {getInitials(name)}
          </AvatarFallback>
        </Avatar>
        
        {!selectedFile && (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-foreground/40 rounded-full"
          >
            <Camera className="w-8 h-8 text-primary-foreground" />
          </button>
        )}

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />
      </div>

      {selectedFile && (
        <div className="flex items-center gap-2 animate-in fade-in zoom-in-95 duration-200">
          <Button
            size="sm"
            onClick={handleSave}
            disabled={isUploading}
            className="h-8 px-3 rounded-lg font-bold text-[10px] uppercase"
          >
            {isUploading ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin mr-1" />
            ) : (
              <Check className="w-3.5 h-3.5 mr-1" />
            )}
            Save Photo
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={handleCancel}
            disabled={isUploading}
            className="h-8 px-3 rounded-lg font-bold text-[10px] uppercase"
          >
            <X className="w-3.5 h-3.5 mr-1" />
            Cancel
          </Button>
        </div>
      )}
    </div>
  );
}
