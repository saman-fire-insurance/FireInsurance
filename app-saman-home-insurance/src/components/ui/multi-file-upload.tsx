"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Upload, X, FileText, Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface MultiFileUploadProps {
  maxFiles?: number;
  maxSizeMB?: number;
  accept?: string;
  value?: File[];
  onChange?: (files: File[]) => void;
  onError?: (error: string) => void;
  className?: string;
}

export const MultiFileUpload = ({
  maxFiles = 5,
  maxSizeMB = 5,
  accept = "image/*,.pdf",
  value = [],
  onChange,
  onError,
  className,
}: MultiFileUploadProps) => {
  const [files, setFiles] = useState<File[]>(value);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || []);
    
    if (files.length + selectedFiles.length > maxFiles) {
      onError?.(`حداکثر ${maxFiles} فایل می‌توانید انتخاب کنید`);
      return;
    }

    const maxSize = maxSizeMB * 1024 * 1024;
    const validFiles: File[] = [];
    
    for (const file of selectedFiles) {
      if (file.size > maxSize) {
        onError?.(`حجم فایل ${file.name} بیشتر از ${maxSizeMB} مگابایت است`);
        continue;
      }
      validFiles.push(file);
    }

    const newFiles = [...files, ...validFiles];
    setFiles(newFiles);
    onChange?.(newFiles);
    
    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleRemoveFile = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
    onChange?.(newFiles);
  };

  const getFilePreview = (file: File) => {
    if (file.type.startsWith("image/")) {
      return URL.createObjectURL(file);
    }
    return null;
  };

  const getFileIcon = (file: File) => {
    if (file.type.startsWith("image/")) {
      return <ImageIcon className="w-8 h-8 text-blue-500" />;
    }
    return <FileText className="w-8 h-8 text-red-500" />;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      {/* Upload Area */}
      {files.length < maxFiles && (
        <div className="flex flex-col items-center">
          <input
            ref={fileInputRef}
            type="file"
            accept={accept}
            onChange={handleFileChange}
            className="hidden"
            multiple
          />
          <div
            onClick={handleFileSelect}
            className="w-full border-2 border-dashed border-gray-300 rounded-lg p-8 flex flex-col items-center justify-center cursor-pointer hover:border-primary transition-colors"
          >
            <Upload className="w-12 h-12 text-gray-400 mb-3" />
            <p className="text-sm text-gray-500 mb-1">
              {files.length > 0
                ? `${files.length} از ${maxFiles} فایل انتخاب شده`
                : `حداکثر ${maxFiles} فایل، هر کدام تا ${maxSizeMB} مگابایت`}
            </p>
            <Button
              type="button"
              variant="outline"
              className="mt-3 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                handleFileSelect();
              }}
            >
              انتخاب فایل
            </Button>
          </div>
        </div>
      )}

      {/* File Previews */}
      {files.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {files.map((file, index) => {
            const preview = getFilePreview(file);
            return (
              <div
                key={index}
                className="relative border border-gray-200 rounded-lg p-3 flex items-center gap-3 bg-white hover:shadow-md transition-shadow"
              >
                {/* Preview or Icon */}
                <div className="flex-shrink-0">
                  {preview ? (
                    <div className="w-16 h-16 rounded-md overflow-hidden bg-gray-100">
                      <img
                        src={preview}
                        alt={file.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-16 h-16 rounded-md bg-gray-100 flex items-center justify-center">
                      {getFileIcon(file)}
                    </div>
                  )}
                </div>

                {/* File Info */}
                <div className="flex-1 min-w-0 text-right">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {file.name}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {formatFileSize(file.size)}
                  </p>
                </div>

                {/* Remove Button */}
                <button
                  type="button"
                  onClick={() => handleRemoveFile(index)}
                  className="flex-shrink-0 p-1 rounded-full hover:bg-gray-100 transition-colors"
                  aria-label="حذف فایل"
                >
                  <X className="w-5 h-5 text-gray-500 hover:text-red-500" />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
