import { useState } from "react";
import { FileService } from "@/swagger/services/FileService";

export interface UploadedFile {
  id?: string;
  url?: string;
  name?: string;
  preview?: string;
  progress: number;
  uploaded: boolean;
  error?: string;
}

export const useFileUpload = () => {
  const [uploading, setUploading] = useState(false);

  const uploadFile = async (file: File): Promise<UploadedFile | null> => {
    if (!file) return null;

    setUploading(true);

    try {
      // Upload file using the API
      const response =
        await FileService.postApiV1DamageClaimUploadFile(
          {
            formData: { file },
          }
        );

      console.log("📤 Server upload response:", response);

      // Handle different response structures
      let fileUrl = '';
      let fileId = '';
      
      if (typeof response === 'string') {
        // If response is just a string URL or ID
        fileUrl = response;
        fileId = response;
      } else if (response && typeof response === 'object') {
        // If response is an object
        fileId = response.id || '';
        fileUrl = response.url || '';
        
        // If url is empty but we have an id, try to construct URL
        if (!fileUrl && fileId) {
          // TODO: Replace with your actual file serving endpoint
          fileUrl = `/api/v1/files/${fileId}`;
          console.warn("⚠️ Server didn't return URL, constructed:", fileUrl);
        }
      }

      console.log("📥 Extracted from response:", { fileId, fileUrl });

      // Create uploaded file object with preview
      const uploadedFile: UploadedFile = {
        id: fileId,
        url: fileUrl,
        name: file.name,
        preview: fileUrl,
        progress: 100,
        uploaded: true,
      };
      
      return uploadedFile;
    } catch (error) {
      console.error("File upload failed:", error);
      return null;
    } finally {
      setUploading(false);
    }
  };

  const uploadMultipleFiles = async (
    files: File[]
  ): Promise<UploadedFile[]> => {
    const uploadPromises = files.map(uploadFile);
    const results = await Promise.all(uploadPromises);
    return results.filter((file): file is UploadedFile => file !== null);
  };

  return {
    uploadFile,
    uploadMultipleFiles,
    uploading,
  };
};
