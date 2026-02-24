import { useEffect, useState } from 'react';

/**
 * Shows captured photo for confirmation or retake.
 * @param {Blob}     blob       - The captured image blob
 * @param {function} onConfirm  - User accepts the photo
 * @param {function} onRetake   - User wants to retake
 */
export default function PhotoPreview({ blob, onConfirm, onRetake }) {
  const [url, setUrl] = useState(null);

  useEffect(() => {
    if (blob) {
      const objectUrl = URL.createObjectURL(blob);
      setUrl(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [blob]);

  return (
    <div className="fixed inset-0 z-40 bg-black flex flex-col">
      <div className="flex-1 relative overflow-hidden">
        {url && (
          <img src={url} alt="Nakunang larawan" className="w-full h-full object-cover" />
        )}
      </div>
      <div className="bg-black py-8 flex items-center justify-center gap-6 px-6">
        <button
          onClick={onRetake}
          className="flex-1 min-h-14 rounded-xl border border-white/50 text-white text-lg font-bold"
        >
          Kunan Ulit
        </button>
        <button
          onClick={onConfirm}
          className="flex-1 min-h-14 rounded-xl bg-green-600 text-white text-lg font-bold"
        >
          Gamitin Ito
        </button>
      </div>
    </div>
  );
}
