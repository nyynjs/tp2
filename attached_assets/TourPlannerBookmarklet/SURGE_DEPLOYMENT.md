# TourPlanner Pro - Deployment na Surge.sh

## Szybki Start

**Jedną komendą:**
```bash
npm run build && cp dist/public/index.html dist/public/200.html && cd dist/public && surge
```

## Krok po kroku

### Przygotowanie (jednorazowe)

1. **Zainstaluj surge globalnie:**
```bash
npm install -g surge
```

2. **Zarejestruj się w surge (opcjonalnie):**
```bash
surge login
```

### Deployment

1. **Zbuduj aplikację:**
```bash
npm run build
```

2. **Przygotuj routing dla SPA:**
```bash
cp dist/public/index.html dist/public/200.html
```

3. **Deployuj:**
```bash
cd dist/public
surge
```

4. **Podaj dane przy pierwszym użyciu:**
   - **Email:** Twój email 
   - **Password:** Hasło (będzie ukryte)
   - **Domain:** Możesz podać własną domenę lub zostawić puste dla automatycznej

### Przykład sesji:

```
Welcome to Surge! (surge.sh)
          email: twoj@email.com
       password: [ukryte]
        project: /projekt/dist/public/
         domain: tourplanner-pro.surge.sh
         upload: [====================] 100%
            CDN: [====================] 100%
             IP: 138.197.235.123
   Success! - Published to tourplanner-pro.surge.sh
```

## Funkcjonalność

### ✅ Co działa:
- **Automatyczna detekcja tokenu** z sesji TourPlanner
- **Generator bookmarkletów** z tokenem użytkownika  
- **Responsywny interfejs** na wszystkich urządzeniach
- **Kopiowanie do schowka** jednym kliknięciem
- **Instrukcje instalacji** krok po kroku

### 🎯 Jak używać:
1. Otwórz stronę w przeglądarce
2. Zaloguj się do TourPlanner w nowej karcie
3. Wykonaj dowolną akcję w TourPlanner (np. otwórz listę akcji)
4. Wróć do generatora - token zostanie automatycznie wykryty
5. Skopiuj wygenerowany bookmarklet
6. Dodaj go do zakładek w przeglądarce

## Aktualizacje

### Automatyczne wdrażanie:
```bash
# Dodaj do package.json (jeśli można):
"scripts": {
  "deploy": "npm run build && cp dist/public/index.html dist/public/200.html && cd dist/public && surge"
}

# Użyj:
npm run deploy
```

### Własna domena:
```bash
# Utwórz plik z domeną:
echo "moja-domena.surge.sh" > dist/public/CNAME

# Lub użyj własnej domeny:
echo "tourplanner.mojafirma.pl" > dist/public/CNAME
```

## Rozwiązywanie problemów

### Błąd 404 przy odświeżeniu:
- ✅ **Rozwiązane:** Plik `200.html` zapewnia poprawne routing

### Token nie zostaje wykryty:
- Sprawdź czy jesteś zalogowany do TourPlanner
- Wykonaj jakąś akcję w TourPlanner (otwórz listę, edytuj profil)
- Kliknij "Sprawdź ponownie" w generatorze

### Problemy z domeną:
```bash
# Sprawdź status domeny:
surge list

# Usuń domenę:
surge teardown moja-domena.surge.sh
```

## Uwagi techniczne

- **Frontend-only:** Aplikacja działa bez serwera backend
- **SPA routing:** Plik `200.html` obsługuje React Router
- **Token security:** Token jest przetwarzany tylko lokalnie w przeglądarce
- **Performance:** Statyczne pliki serwowane przez CDN Surge