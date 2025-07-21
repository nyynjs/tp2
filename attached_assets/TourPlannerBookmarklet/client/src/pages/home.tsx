import { useState } from 'react';
import { Rocket, RefreshCw, Edit3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useTokenDetection } from '@/hooks/use-token-detection';
import TokenStatus from '@/components/token-status';
import BookmarkletGenerator from '@/components/bookmarklet-generator';
import InstructionsCard from '@/components/instructions-card';
import FeaturesSection from '@/components/features-section';
import TroubleshootingSection from '@/components/troubleshooting-section';
import ConsoleScriptSection from '@/components/console-script-section';

export default function Home() {
  const { status, token, error, refreshDetection } = useTokenDetection();
  const [manualToken, setManualToken] = useState('');
  const [showManualInput, setShowManualInput] = useState(false);
  
  const finalToken = token || (manualToken.trim() ? manualToken.trim() : null);
  const hasValidToken = status === 'found' || (manualToken.trim().length > 10);

  return (
    <div className="min-h-screen p-5">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-t-3xl shadow-2xl overflow-hidden">
          <div className="tp-gradient-blue p-8 text-center text-white">
            <div className="flex items-center justify-center mb-4">
              <Rocket className="w-10 h-10 mr-3" />
              <h1 className="text-3xl font-bold">TourPlanner Pro</h1>
            </div>
            <p className="text-lg opacity-90">Automatyczny generator bookmarkletu z detekcją tokenu</p>
            <div className="mt-4 inline-flex items-center bg-white bg-opacity-20 rounded-full px-4 py-2">
              <span className="mr-2">✨</span>
              <span className="text-sm font-medium">Bez konieczności podawania tokenu ręcznie</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white shadow-2xl rounded-b-3xl p-8">
          {/* Token Status */}
          <TokenStatus 
            status={status} 
            token={token} 
            error={error} 
            onRefresh={refreshDetection}
          />

          {/* Manual Token Input */}
          {(status === 'not-found' || showManualInput) && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mb-6">
              <div className="flex items-center gap-3 mb-4">
                <Edit3 className="w-5 h-5 text-yellow-600" />
                <h3 className="text-lg font-semibold text-yellow-800">Wprowadź token ręcznie</h3>
                {status !== 'not-found' && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setShowManualInput(false)}
                    className="ml-auto text-yellow-600 hover:text-yellow-800"
                  >
                    ✕
                  </Button>
                )}
              </div>
              <p className="text-yellow-700 text-sm mb-4">
                Skopiuj token Bearer z narzędzi developerskich przeglądarki (Network → Request Headers → Authorization)
              </p>
              <div className="flex gap-3">
                <Input
                  type="text"
                  placeholder="Wklej token Bearer (np. abc123-def456-...)"
                  value={manualToken}
                  onChange={(e) => setManualToken(e.target.value)}
                  className="flex-1"
                />
                <Button
                  onClick={() => setManualToken('')}
                  variant="outline"
                  disabled={!manualToken}
                >
                  Wyczyść
                </Button>
              </div>
              {manualToken.trim() && manualToken.trim().length < 10 && (
                <p className="text-red-600 text-sm mt-2">Token wydaje się za krótki. Sprawdź czy skopiowałeś cały token.</p>
              )}
            </div>
          )}

          {/* Action Cards */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <BookmarkletGenerator token={finalToken} hasToken={hasValidToken} />
            <InstructionsCard />
          </div>

          {/* Console Script */}
          <ConsoleScriptSection />

          {/* Features Section */}
          <FeaturesSection />

          {/* Troubleshooting */}
          <TroubleshootingSection />

          {/* Manual Refresh */}
          <div className="text-center mt-6 space-y-3">
            <div className="flex gap-3 justify-center">
              <Button
                onClick={refreshDetection}
                className="bg-gradient-to-r from-gray-500 to-gray-600 text-white font-semibold py-3 px-8 rounded-xl hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Sprawdź ponownie
              </Button>
              
              {status !== 'not-found' && !showManualInput && (
                <Button
                  onClick={() => setShowManualInput(true)}
                  variant="outline"
                  className="py-3 px-6 rounded-xl"
                >
                  <Edit3 className="w-4 h-4 mr-2" />
                  Ręczne wprowadzenie
                </Button>
              )}
            </div>
            
            <p className="text-sm text-gray-600 max-w-2xl mx-auto">
              <strong>Instrukcja:</strong> Otwórz TourPlanner w nowej karcie, zaloguj się i wykonaj dowolną akcję (np. otwórz listę akcji). 
              Następnie wróć tutaj i kliknij "Sprawdź ponownie" lub wprowadź token ręcznie z narzędzi developerskich.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
