export default function InstructionsCard() {
  const steps = [
    { number: 1, title: 'Dodaj zakładkę:', description: 'Ctrl+Shift+O lub Cmd+Shift+O' },
    { number: 2, title: 'Nazwa:', description: '"TourPlanner Pro"' },
    { number: 3, title: 'URL:', description: 'Wklej skopiowany kod' },
    { number: 4, title: 'Użyj:', description: 'Kliknij zakładkę na stronie TourPlanner' },
  ];

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl border-l-4 border-indigo-500">
      <div className="flex items-center mb-4">
        <span className="bg-indigo-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold mr-3">
          2
        </span>
        <h3 className="text-xl font-bold text-indigo-600">Jak używać</h3>
      </div>

      <div className="space-y-3">
        {steps.map((step) => (
          <div key={step.number} className="flex items-start">
            <div className="bg-indigo-100 text-indigo-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
              {step.number}
            </div>
            <p className="text-gray-700">
              <strong>{step.title}</strong> {step.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
