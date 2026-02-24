import { useEffect } from 'react';

/**
 * Feedback toast. Auto-dismisses after 3 seconds.
 */
export default function Toast({ message, onDismiss }) {
  useEffect(() => {
    const t = setTimeout(onDismiss, 3000);
    return () => clearTimeout(t);
  }, [onDismiss]);

  return (
    <div
      className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 bg-gray-900 text-white text-lg font-semibold px-6 py-3 rounded-2xl shadow-xl max-w-xs text-center"
      onClick={onDismiss}
    >
      {message}
    </div>
  );
}
