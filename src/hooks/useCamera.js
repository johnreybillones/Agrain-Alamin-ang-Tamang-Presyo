import { useState, useRef, useCallback, useEffect } from 'react';

/**
 * Manages getUserMedia lifecycle for the rear camera.
 * Handles iOS Safari quirks and cleans up streams on unmount.
 */
export function useCamera() {
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState(null);

  const startCamera = useCallback(async () => {
    setError(null);
    setIsReady(false);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: 'environment' } },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setIsReady(true);
    } catch (err) {
      if (err.name === 'NotAllowedError') {
        setError('Hindi pinayagan ang camera. Pumunta sa Settings para payagan ang access.');
      } else if (err.name === 'NotFoundError') {
        setError('Walang camera na nahanap sa device na ito.');
      } else {
        setError('Hindi mabuksan ang camera. Subukan muli.');
      }
    }
  }, []);

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
    setIsReady(false);
  }, []);

  /**
   * Capture the current video frame and return it as a JPEG Blob.
   * @returns {Promise<Blob>}
   */
  const capturePhoto = useCallback(() => {
    return new Promise((resolve, reject) => {
      const video = videoRef.current;
      if (!video) return reject(new Error('No video element'));

      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth || 1280;
      canvas.height = video.videoHeight || 720;
      canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
      canvas.toBlob(
        (blob) => {
          if (blob) resolve(blob);
          else reject(new Error('Canvas toBlob failed'));
        },
        'image/jpeg',
        0.7
      );
    });
  }, []);

  // Auto-cleanup on unmount
  useEffect(() => () => stopCamera(), [stopCamera]);

  return { videoRef, isReady, error, startCamera, stopCamera, capturePhoto };
}
