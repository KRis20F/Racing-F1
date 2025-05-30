import React, {  useState } from "react";

// TODO: Implementar diseño de tabla de clasificación
// - Añadir animaciones de cambios de posición
// - Implementar filtros y búsqueda
// - Añadir estadísticas detalladas
// - Incluir gráficos de progreso

interface LeaderboardEntry {
  rank: number;
  username: string;
  wins: number;
  totalEarnings: number;
  rating: number;
}

// Placeholder data
const EXAMPLE_ENTRIES: LeaderboardEntry[] = [
  {
    rank: 1,
    username: "SpeedDemon",
    wins: 50,
    totalEarnings: 10000,
    rating: 1650,
  },
  {
    rank: 2,
    username: "ShadowRacer",
    wins: 45,
    totalEarnings: 8500,
    rating: 1500,
  },
  {
    rank: 3,
    username: "NitroNinja",
    wins: 40,
    totalEarnings: 7000,
    rating: 1400,
  },
  {
    rank: 4,
    username: "PixelPacer",
    wins: 35,
    totalEarnings: 6000,
    rating: 1350,
  },
  {
    rank: 5,
    username: "CircuitChamp",
    wins: 30,
    totalEarnings: 5000,
    rating: 1300,
  },
];

const Leaderboard: React.FC = () => {
  const [entries, setEntries] = useState<LeaderboardEntry[]>(EXAMPLE_ENTRIES);
  const [filter, setFilter] = useState<"all" | "weekly" | "monthly">("all");
  const [loading, setLoading] = useState<boolean>(false);

  // useEffect(() => {
  //   fetchLeaderboard();
  // }, [filter]);

  // const fetchLeaderboard = async () => {
  //   setLoading(true);
  //   try {
  //     // const response = await fetch(`/api/leaderboard?filter=${filter}`); // Real fetch call
  //     // const data = await response.json();
  //     // setEntries(data);
  //     setEntries(EXAMPLE_ENTRIES); // Use example data for now
  //   } catch (error) {
  //     console.error("Error fetching leaderboard:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleFilterChange = (newFilter: "all" | "weekly" | "monthly") => {
    setFilter(newFilter);
    // In a real app, fetchLeaderboard() would be called here by useEffect
    console.log(`Filter changed to: ${newFilter}`);
    // Simulate loading for example
    setLoading(true);
    setTimeout(() => {
      // Potentially update entries based on filter if using static data
      setLoading(false);
    }, 500);
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-white max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold">Leaderboard</h2>
        {/* Botones de Filtro */}
        <div className="flex space-x-2 bg-gray-700 p-1 rounded-lg">
          {(["all", "weekly", "monthly"] as const).map((f) => (
            <button
              key={f}
              className={`px-4 py-1 rounded-md text-sm font-medium transition-colors ${
                filter === f
                  ? "bg-blue-600 text-white"
                  : "text-gray-300 hover:bg-gray-600"
              }`}
              onClick={() => handleFilterChange(f)}
            >
              {f === "all"
                ? "All Time"
                : f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Tabla de Clasificación */}
      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-700 text-left text-gray-300 uppercase text-sm">
              <th className="p-3">Rank</th>
              <th className="p-3">Username</th>
              <th className="p-3 text-right">Wins</th>
              <th className="p-3 text-right">Earnings (COINS)</th>
              <th className="p-3 text-right">Rating</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} className="text-center p-6 text-gray-400">
                  Loading leaderboard...
                </td>
              </tr>
            ) : entries.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center p-6 text-gray-400">
                  No data available for this filter.
                </td>
              </tr>
            ) : (
              entries.map((entry, index) => (
                <tr
                  key={entry.rank}
                  className={`border-b border-gray-700 ${
                    index % 2 === 0 ? "bg-gray-800" : "bg-gray-750" // Alternating rows
                  } hover:bg-gray-600 transition-colors`}
                >
                  <td className="p-3 font-bold">{entry.rank}</td>
                  <td className="p-3">{entry.username}</td>
                  <td className="p-3 text-right">{entry.wins}</td>
                  <td className="p-3 text-right">
                    {entry.totalEarnings.toLocaleString()}
                  </td>
                  <td className="p-3 text-right">{entry.rating}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Add a slightly different gray shade for alternating rows if needed
const customStyles = `
  .bg-gray-750 { background-color: #4a5568; } /* Adjust hex as needed */
`;

// Inject styles (optional, only if needed and Tailwind doesn't cover it well)
// You might need to handle this differently depending on your setup (e.g., styled-components, global CSS)
// const StyleInjector = () => <style>{customStyles}</style>;
// export default () => <><StyleInjector /><Leaderboard /></>;

export default Leaderboard;
