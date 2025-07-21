import { ArrowRight } from 'lucide-react';

export default function TroubleshootingSection() {
  const troubleshootingItems = [
    {
      problem: 'Nie wykrywa tokenu automatycznie:',
      solution: 'Kliknij "Ręczne wprowadzenie" i skopiuj token z narzędzi developerskich'
    },
    {
      problem: 'Jak znaleźć token w przeglądarce:',
      solution: 'F12 → Network → Odśwież TourPlanner → Znajdź żądanie API → Headers → Authorization: Bearer...'
    },
    {
      problem: 'Bookmarklet nie działa:',
      solution: 'Sprawdź czy poprawnie skopiowałeś cały kod i czy jesteś na stronie TourPlanner'
    },
    {
      problem: 'Błędy CORS na deployed wersji:',
      solution: 'To normalne - API TourPlanner blokuje żądania z innych domen. Użyj ręcznego wprowadzenia tokenu.'
    }
  ];

  return (
    <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-2xl">
      <h3 className="text-lg font-bold text-yellow-800 mb-3">
        ❓ Rozwiązywanie problemów
      </h3>
      <div className="space-y-2 text-sm">
        {troubleshootingItems.map((item, index) => (
          <div key={index} className="flex items-start">
            <ArrowRight className="w-4 h-4 text-yellow-600 mr-2 mt-1 flex-shrink-0" />
            <p>
              <strong>{item.problem}</strong> {item.solution}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
