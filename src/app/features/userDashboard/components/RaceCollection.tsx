interface RaceCollectionProps {
  carCollection?: string[];
}

export const RaceCollection = ({ carCollection = [] }: RaceCollectionProps) => {
  return (
    <div className="rounded-2xl bg-[#111C44] p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold text-white">Car Collection</h3>
        <button className="bg-indigo-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
          View All
        </button>
      </div>

      {carCollection.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-400">
            You don't have any cars in your collection yet.
          </p>
          <button className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
            Go to Shop
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {carCollection.map((carId, index) => (
            <div 
              key={index}
              className="bg-[#1B2559] rounded-xl p-4 flex items-center space-x-4 hover:bg-[#1e2a6a] transition-colors cursor-pointer"
            >
              {/* Placeholder para la imagen del auto */}
              <div className="w-16 h-16 bg-indigo-900 rounded-lg flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              
              <div>
                <p className="font-semibold text-white">
                  Car #{carId}
                </p>
                <p className="text-sm text-gray-400">
                  ID: {carId}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}; 