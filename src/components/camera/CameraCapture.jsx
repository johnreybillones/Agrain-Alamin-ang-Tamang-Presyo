import { useRef, useEffect, useCallback } from 'react';

/**
 * CameraCapture — Full-screen camera viewfinder with shutter button.
 * Extracted from LevelAppV2's LogModal camera step.
 * @param {function} onCapture - Called with dataURL string of captured photo
 * @param {function} onCancel  - Called when camera is cancelled
 * @param {function} onError   - Called when camera access fails (skips to form)
 */
export default function CameraCapture({ onCapture, onCancel, onError }) {
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop());
      streamRef.current = null;
    }
  }, []);

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({
      video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 960 } },
    }).then(stream => {
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    }).catch(() => {
      if (onError) onError();
    });

    return () => stopCamera();
  }, [stopCamera, onError]);

  function handleCapture() {
    if (!videoRef.current) return;
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth || 640;
    canvas.height = videoRef.current.videoHeight || 480;
    canvas.getContext('2d').drawImage(videoRef.current, 0, 0);
    const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
    stopCamera();
    onCapture(dataUrl);
  }

  return (
    <div className="camera-fullscreen">
      <video ref={videoRef} autoPlay playsInline muted className="camera-video" />
      <div className="camera-controls">
        <button onClick={onCancel} className="camera-cancel-btn">Kanselahin</button>
        <button onClick={handleCapture} className="camera-capture-btn" aria-label="Kumuha ng larawan">
          <div className="camera-capture-inner" />
        </button>
        <div style={{ width: 80 }} />
      </div>
    </div>
  );
}
