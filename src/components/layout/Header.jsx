import { useSeason } from '../../context/SeasonContext.jsx';

export default function Header() {
  const { season } = useSeason();

  return (
    <header className="bg-green-700 text-white px-4 py-3 flex items-center justify-between shadow-md sticky top-0 z-10">
      <div className="flex items-center gap-2">
        <span className="text-2xl">🌱</span>
        <span className="text-xl font-bold tracking-tight">Level</span>
      </div>
      {season && (
        <span className="text-sm bg-green-600 px-3 py-1 rounded-full font-medium">
          {season.status === 'Active' ? 'Panahon ng Pagtatanim' : season.status}
        </span>
      )}
    </header>
  );
}
