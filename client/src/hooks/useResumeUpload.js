import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { uploadResumeService } from "../services/analysisService.js";

/**
 * useResumeUpload
 *
 * Encapsulates the upload flow.
 * After a successful upload, navigates to /analysis/:id automatically.
 */
const useResumeUpload = () => {
  const navigate = useNavigate();

  const [file,        setFile]        = useState(null);
  const [progress,    setProgress]    = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [error,       setError]       = useState(null);

  const handleUpload = useCallback(
    async () => {
      if (!file) {
        setError("Please select a PDF file first.");
        return;
      }

      setIsUploading(true);
      setError(null);
      setProgress(0);

      try {
        const data = await uploadResumeService(file, null, setProgress);
        setProgress(100);
        // Navigate to the dedicated Analysis page
        navigate(`/analysis/${data.analysisId}`, { state: { parsedData: data } });
      } catch (err) {
        setError(err.message || "Upload failed. Please try again.");
        setProgress(0);
      } finally {
        setIsUploading(false);
      }
    },
    [file, navigate]
  );

  const reset = useCallback(() => {
    setFile(null);
    setProgress(0);
    setIsUploading(false);
    setError(null);
  }, []);

  return { file, setFile, progress, isUploading, error, handleUpload, reset };
};

export { useResumeUpload };
