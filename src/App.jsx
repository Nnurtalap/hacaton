import { CarAnalyzer } from "./components/carAnaliz";

function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900">inDrive</h1>
        <p className="text-gray-600">Car Safety Analysis</p>
      </div>
      <CarAnalyzer />
       <div className="text-center mt-8">
          <p className="text-sm text-gray-400">Прототип для демонстрации ML-модели</p>
       </div>
    </div>
  );
}

export default App;