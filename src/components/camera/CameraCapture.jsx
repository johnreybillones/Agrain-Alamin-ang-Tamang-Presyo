import { useEffect } from 'react';
import { useCamera } from '../../hooks/useCamera.js';

/**
 * Full-screen rear camera viewfinder with shutter button.
 * @param {function} onCapture - Called with the captured Blob
 * @param {function} onCancel  - Called when the user cancels
 */
export default function CameraCapture({ onCapture, onCancel }) {
  const { videoRef, isReady, error, startCamera, stopCamera, capturePhoto } = useCamera();

  useEffect(() => {
    startCamera();
    return stopCamera;
  }, [startCamera, stopCamera]);

  async function handleShutter() {
    try {
      const blob = await capturePhoto();
      stopCamera();
      onCapture(blob);
    } catch {
      // fallback: proceed without photo
      stopCamera();
      onCapture(null);
    }
  }

  return (
    <div className="fixed inset-0 z-40 bg-black flex flex-col">
      {/* Viewfinder */}
      <div className="flex-1 relative overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="w-full h-full object-cover"
        />
        {!isReady && !error && (
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-white text-lg">Binubuksan ang camera…</p>
          </div>
        )}
        {error && (
          <div className="absolute inset-0 flex items-center justify-center px-8">
            <p className="text-white text-lg text-center bg-black/60 rounded-xl p-5">{error}</p>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="bg-black py-8 flex items-center justify-center gap-12">
        <button
          onClick={onCancel}
          className="text-white text-base font-semibold px-6 py-3 rounded-xl border border-white/40"
        >
          Kanselahin
        </button>
        <button
          onClick={handleShutter}
          disabled={!!error}
          className="w-20 h-20 rounded-full bg-white border-4 border-gray-300 active:scale-90 transition-transform disabled:opacity-40"
          aria-label="Kumuha ng larawan"
        />
        {/* Spacer to center shutter */}
        <div className="w-24" />
      </div>
    </div>
  );
}
