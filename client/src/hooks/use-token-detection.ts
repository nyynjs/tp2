import { useState, useEffect } from 'react';

interface TokenDetectionResult {
  status: 'scanning' | 'found' | 'not-found';
  token: string | null;
  error?: string;
}

export function useTokenDetection() {
  const [result, setResult] = useState<TokenDetectionResult>({
    status: 'scanning',
    token: null
  });

  const detectToken = () => {
    setResult({ status: 'scanning', token: null });

    // Method 1: Check localStorage and sessionStorage extensively
    const storageToken = checkAllStorage();
    if (storageToken) {
      setResult({ status: 'found', token: storageToken });
      return;
    }

    // Method 2: Set up network interceptors and wait
    setupNetworkInterceptors();

    // After a short delay, if no token found, show not-found status
    setTimeout(() => {
      setResult(current => {
        if (current.status === 'scanning') {
          return {
            status: 'not-found',
            token: null,
            error: 'Nie znaleziono tokenu automatycznie. Możesz wprowadzić go ręcznie lub sprawdzić ponownie po wykonaniu akcji w TourPlanner.'
          };
        }
        return current;
      });
    }, 2000);
  };

  const checkAllStorage = (): string | null => {
    try {
      const stores = [localStorage, sessionStorage];

      for (const store of stores) {
        // Check all keys in storage
        for (let i = 0; i < store.length; i++) {
          const key = store.key(i);
          if (key) {
            const value = store.getItem(key);
            if (value) {
              // Look for UUID pattern (typical token format)
              const tokenMatch = value.match(/[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}/gi);
              if (tokenMatch && tokenMatch.length > 0) {
                console.log('Found token in storage:', key);
                return tokenMatch[0];
              }

              // Look for JWT-like tokens (base64)
              const jwtMatch = value.match(/eyJ[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+/);
              if (jwtMatch) {
                console.log('Found JWT token in storage:', key);
                return jwtMatch[0];
              }
            }
          }
        }
      }
    } catch (error) {
      console.warn('Error checking storage:', error);
    }
    return null;
  };

  const setupNetworkInterceptors = () => {
    // Store originals
    const originalFetch = window.fetch;
    const originalXHROpen = XMLHttpRequest.prototype.open;
    const originalXHRSend = XMLHttpRequest.prototype.send;

    // Intercept fetch requests
    window.fetch = async function(input: RequestInfo | URL, init?: RequestInit) {
      if (init?.headers) {
        const headers = new Headers(init.headers);
        const authHeader = headers.get('authorization') || headers.get('Authorization');
        if (authHeader && authHeader.startsWith('Bearer ')) {
          const token = authHeader.replace('Bearer ', '').trim();
          console.log('Token found in fetch request:', token);
          setResult({ status: 'found', token });
        }
      }
      return originalFetch.call(this, input, init);
    };

    // Intercept XMLHttpRequest
    const originalSetRequestHeader = XMLHttpRequest.prototype.setRequestHeader;
    XMLHttpRequest.prototype.setRequestHeader = function(name: string, value: string) {
      if (name.toLowerCase() === 'authorization' && value.startsWith('Bearer ')) {
        const token = value.replace('Bearer ', '').trim();
        console.log('Token found in XHR request:', token);
        setResult({ status: 'found', token });
      }
      return originalSetRequestHeader.call(this, name, value);
    };

    // Restore after some time
    setTimeout(() => {
      window.fetch = originalFetch;
      XMLHttpRequest.prototype.open = originalXHROpen;
      XMLHttpRequest.prototype.send = originalXHRSend;
      XMLHttpRequest.prototype.setRequestHeader = originalSetRequestHeader;
    }, 5000);
  };

  const refreshDetection = () => {
    detectToken();
  };

  useEffect(() => {
    // Start detection after component mounts
    const timer = setTimeout(detectToken, 500);
    return () => clearTimeout(timer);
  }, []);

  return {
    ...result,
    refreshDetection
  };
}
