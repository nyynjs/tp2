import { useState } from 'react';
import { Copy, Check, Terminal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

export default function ConsoleScriptSection() {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const consoleScript = `
// === TourPlanner Token Extractor ===
(function() {
  console.log('🔍 Szukam tokenu Bearer...');
  
  let token = null;
  
  // Method 1: Check network requests
  const performanceEntries = performance.getEntriesByType('resource');
  console.log('📡 Sprawdzam ' + performanceEntries.length + ' żądań sieciowych...');
  
  // Method 2: Intercept fetch/XHR for 5 sekund
  const originalFetch = window.fetch;
  const originalXHRSend = XMLHttpRequest.prototype.send;
  const originalXHROpen = XMLHttpRequest.prototype.open;
  
  // Override fetch
  window.fetch = function(input, init) {
    if (init && init.headers) {
      const headers = new Headers(init.headers);
      const auth = headers.get('authorization') || headers.get('Authorization');
      if (auth && auth.startsWith('Bearer ')) {
        token = auth.replace('Bearer ', '').trim();
        console.log('✅ TOKEN ZNALEZIONY w fetch: ' + token);
      }
    }
    return originalFetch.apply(this, arguments);
  };
  
  // Override XMLHttpRequest
  const xhrRequests = new Map();
  XMLHttpRequest.prototype.open = function(method, url) {
    xhrRequests.set(this, { method, url });
    return originalXHROpen.apply(this, arguments);
  };
  
  XMLHttpRequest.prototype.send = function(data) {
    const self = this;
    const reqData = xhrRequests.get(this);
    
    this.addEventListener('readystatechange', function() {
      if (this.readyState === 4 && reqData) {
        // Try to get auth header from request
        const authHeader = this.getAllResponseHeaders();
        console.log('📤 XHR Request to: ' + reqData.url);
      }
    });
    
    return originalXHRSend.apply(this, arguments);
  };
  
  // Override setRequestHeader to catch outgoing auth headers
  const originalSetRequestHeader = XMLHttpRequest.prototype.setRequestHeader;
  XMLHttpRequest.prototype.setRequestHeader = function(name, value) {
    if (name.toLowerCase() === 'authorization' && value.startsWith('Bearer ')) {
      token = value.replace('Bearer ', '').trim();
      console.log('✅ TOKEN ZNALEZIONY w XHR header: ' + token);
    }
    return originalSetRequestHeader.apply(this, arguments);
  };
  
  // Method 3: Check localStorage/sessionStorage
  console.log('💾 Sprawdzam localStorage i sessionStorage...');
  const stores = [localStorage, sessionStorage];
  for (const store of stores) {
    for (let i = 0; i < store.length; i++) {
      const key = store.key(i);
      if (key) {
        const value = store.getItem(key);
        if (value) {
          // Look for UUID pattern
          const uuidMatch = value.match(/[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}/gi);
          if (uuidMatch) {
            console.log('🔑 Potencjalny token w ' + key + ': ' + uuidMatch[0]);
            if (!token) token = uuidMatch[0];
          }
          
          // Look for JWT tokens
          const jwtMatch = value.match(/eyJ[A-Za-z0-9_-]+\\.[A-Za-z0-9_-]+\\.[A-Za-z0-9_-]+/);
          if (jwtMatch) {
            console.log('🎫 Potencjalny JWT token w ' + key + ': ' + jwtMatch[0].substring(0, 50) + '...');
            if (!token) token = jwtMatch[0];
          }
        }
      }
    }
  }
  
  // Method 4: Check cookies
  console.log('🍪 Sprawdzam cookies...');
  const cookies = document.cookie.split(';');
  for (const cookie of cookies) {
    const [name, value] = cookie.trim().split('=');
    if (value) {
      const tokenMatch = value.match(/[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}/gi);
      if (tokenMatch) {
        console.log('🍪 Token w cookie ' + name + ': ' + tokenMatch[0]);
        if (!token) token = tokenMatch[0];
      }
    }
  }
  
  // Wait for network activity and show result
  setTimeout(() => {
    // Restore original functions
    window.fetch = originalFetch;
    XMLHttpRequest.prototype.send = originalXHRSend;
    XMLHttpRequest.prototype.open = originalXHROpen;
    XMLHttpRequest.prototype.setRequestHeader = originalSetRequestHeader;
    
    if (token) {
      console.log('%c🎉 SUCCESS! TOKEN ZNALEZIONY:', 'color: green; font-size: 16px; font-weight: bold');
      console.log('%c' + token, 'color: green; font-size: 14px; background: #f0f8f0; padding: 5px; border-radius: 3px;');
      console.log('%c📋 Token skopiowany do schowka!', 'color: blue; font-size: 12px;');
      
      // Copy to clipboard
      navigator.clipboard.writeText(token).then(() => {
        alert('✅ TOKEN ZNALEZIONY I SKOPIOWANY!\\n\\n' + token.substring(0, 20) + '...\\n\\nMożesz teraz wkleić go w generatorze bookmarkletu.');
      }).catch(() => {
        alert('✅ TOKEN ZNALEZIONY:\\n\\n' + token + '\\n\\nSkopiuj go ręcznie i wklej w generatorze.');
      });
    } else {
      console.log('%c❌ Nie znaleziono tokenu Bearer', 'color: red; font-size: 16px; font-weight: bold');
      console.log('%c💡 Spróbuj:', 'color: orange; font-size: 14px; font-weight: bold');
      console.log('  1. Odśwież stronę TourPlanner');
      console.log('  2. Wykonaj jakąś akcję (otwórz listę, edytuj profil)');
      console.log('  3. Uruchom ten skrypt ponownie');
      alert('❌ Nie znaleziono tokenu.\\n\\nSpróbuj odświeżyć stronę, wykonać jakąś akcję w TourPlanner i uruchomić skrypt ponownie.');
    }
  }, 3000);
  
  console.log('⏳ Monitoruję żądania sieciowe przez 3 sekundy...');
  console.log('💡 Wykonaj teraz jakąś akcję w TourPlanner (odśwież, otwórz listę, etc.)');
})();`.trim();

  const copyScript = async () => {
    try {
      await navigator.clipboard.writeText(consoleScript);
      setCopied(true);
      toast({
        title: "Skopiowano!",
        description: "Skrypt został skopiowany do schowka. Wklej go w konsoli przeglądarki na stronie TourPlanner.",
      });
      setTimeout(() => setCopied(false), 3000);
    } catch (error) {
      toast({
        title: "Błąd kopiowania",
        description: "Nie udało się skopiować. Zaznacz kod ręcznie.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="bg-blue-50 border border-blue-200 p-6 rounded-2xl">
      <div className="flex items-center gap-3 mb-4">
        <Terminal className="w-6 h-6 text-blue-600" />
        <h3 className="text-lg font-bold text-blue-800">
          🔧 Skrypt do konsoli - automatyczne wyciągnięcie tokenu
        </h3>
      </div>
      
      <div className="space-y-4">
        <div className="bg-blue-100 p-4 rounded-lg">
          <h4 className="font-semibold text-blue-800 mb-2">Instrukcja:</h4>
          <ol className="text-sm text-blue-700 space-y-1 list-decimal list-inside">
            <li>Otwórz stronę TourPlanner i zaloguj się</li>
            <li>Naciśnij F12 (otwórz narzędzia developerskie)</li>
            <li>Przejdź do zakładki "Console"</li>
            <li>Skopiuj i wklej poniższy skrypt</li>
            <li>Naciśnij Enter</li>
            <li>Wykonaj jakąś akcję w TourPlanner (odśwież, otwórz listę)</li>
            <li>Token zostanie automatycznie skopiowany do schowka!</li>
          </ol>
        </div>

        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto max-h-40 overflow-y-auto">
          <pre>{consoleScript}</pre>
        </div>

        <Button
          onClick={copyScript}
          className="w-full bg-blue-600 hover:bg-blue-700"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 mr-2" />
              Skopiowano!
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 mr-2" />
              Skopiuj skrypt do konsoli
            </>
          )}
        </Button>

        <div className="text-xs text-blue-600 bg-blue-100 p-3 rounded">
          <strong>💡 Wskazówka:</strong> Ten skrypt będzie monitorować żądania sieciowe przez 3 sekundy i automatycznie znajdzie token Bearer. 
          Jeśli nie znajdzie od razu, wykonaj jakąś akcję w TourPlanner (odśwież stronę, otwórz listę akcji, etc.) podczas działania skryptu.
        </div>
      </div>
    </div>
  );
}