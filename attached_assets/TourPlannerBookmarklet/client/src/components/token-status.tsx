import { Loader2, CheckCircle, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TokenStatusProps {
  status: 'checking' | 'found' | 'not-found';
  token: string | null;
  error?: string;
  onRefresh: () => void;
}

export default function TokenStatus({ status, token, error, onRefresh }: TokenStatusProps) {
  const maskToken = (token: string) => {
    if (!token || token.length < 24) return token;
    return token.substring(0, 8) + '-****-****-****-' + token.substring(24);
  };

  if (status === 'checking') {
    return (
      <div className="mb-8 p-6 rounded-2xl border-2 bg-blue-50 border-blue-200 transition-all duration-300">
        <div className="flex items-center text-blue-600">
          <Loader2 className="animate-spin h-6 w-6 mr-3" />
          <div>
            <h3 className="font-semibold text-lg">Sprawdzanie połączenia z TourPlanner...</h3>
            <p className="text-sm text-gray-600 mt-1">Szukam aktywnego tokenu w żądaniach sieciowych</p>
          </div>
        </div>
      </div>
    );
  }

  if (status === 'found' && token) {
    return (
      <div className="mb-8 p-6 rounded-2xl border-2 bg-green-50 border-green-200 transition-all duration-300">
        <div className="flex items-center text-green-600">
          <CheckCircle className="h-6 w-6 mr-3" />
          <div className="flex-1">
            <h3 className="font-semibold text-lg">Token znaleziony!</h3>
            <p className="text-sm text-gray-600 mt-1">Automatycznie wykryto aktywną sesję TourPlanner</p>
            <div className="mt-2 bg-green-100 p-3 rounded-lg">
              <span className="text-xs font-mono text-green-800">Token: </span>
              <span className="text-xs font-mono text-green-700">{maskToken(token)}</span>
            </div>
          </div>
          <Button
            onClick={onRefresh}
            variant="outline"
            size="sm"
            className="ml-4"
          >
            Odśwież
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-8 p-6 rounded-2xl border-2 bg-amber-50 border-amber-200 transition-all duration-300">
      <div className="flex items-center text-amber-600">
        <AlertTriangle className="h-6 w-6 mr-3" />
        <div className="flex-1">
          <h3 className="font-semibold text-lg">Nie znaleziono aktywnej sesji</h3>
          <p className="text-sm text-gray-600 mt-1">
            {error || 'Zaloguj się do TourPlanner i odśwież tę stronę'}
          </p>
        </div>
        <Button
          onClick={onRefresh}
          variant="outline"
          size="sm"
          className="ml-4"
        >
          Spróbuj ponownie
        </Button>
      </div>
    </div>
  );
}
