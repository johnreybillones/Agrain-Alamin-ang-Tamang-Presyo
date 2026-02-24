/**
 * EmptyState — shown when there are no logged expenses yet.
 */
export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
      <span className="text-7xl mb-4">🌾</span>
      <p className="text-2xl font-bold text-gray-700">Walang gastos pa</p>
      <p className="text-lg text-gray-500 mt-2">
        I-tap ang "Mag-log ng Gastos" para magsimula.
      </p>
    </div>
  );
}
