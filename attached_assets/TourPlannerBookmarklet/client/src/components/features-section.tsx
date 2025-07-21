import { Filter, Calendar, Zap } from 'lucide-react';

export default function FeaturesSection() {
  const features = [
    {
      icon: Filter,
      title: 'Filtrowanie regionów',
      description: 'Szybkie filtrowanie punktów według regionów'
    },
    {
      icon: Calendar,
      title: 'Filtr eventów',
      description: 'Pokazywanie tylko wybranych typów eventów'
    },
    {
      icon: Zap,
      title: 'Automatyczne wykrywanie',
      description: 'Brak potrzeby ręcznego wprowadzania tokenów'
    }
  ];

  return (
    <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-2xl border border-purple-200 mb-6">
      <h3 className="text-xl font-bold text-purple-700 mb-4 text-center">
        ⭐ Funkcje Pro
      </h3>
      <div className="grid md:grid-cols-3 gap-4">
        {features.map((feature, index) => (
          <div key={index} className="text-center">
            <feature.icon className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <h4 className="font-semibold text-gray-800">{feature.title}</h4>
            <p className="text-sm text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
