# TourPlanner Pro - Pakiet Deploymentu

## Zawartość archiwum

- `index.html` - Główna strona aplikacji
- `200.html` - Plik dla SPA routing (kopia index.html)  
- `assets/` - Zbudowane pliki CSS i JavaScript

## Deployment na Surge.sh

### Wymagania
```bash
npm install -g surge
```

### Kroki
1. Wypakuj archiwum do dowolnego folderu
2. Otwórz terminal w folderze z wypakowanymi plikami
3. Uruchom:
```bash
surge
```
4. Podaj swoje dane (email/hasło przy pierwszym użyciu)
5. Zostaw project path (naciśnij Enter)
6. Podaj domenę lub zostaw puste dla automatycznej

### Przykład
```
Welcome to Surge! (surge.sh)
          email: twoj@email.com
       password: [ukryte]
        project: /ścieżka/do/wypakowanych/plików/
         domain: tourplanner-pro.surge.sh
         upload: [====================] 100%
            CDN: [====================] 100%
   Success! - Published to tourplanner-pro.surge.sh
```

## Własna domena

Aby użyć własnej domeny, utwórz plik `CNAME` z nazwą domeny:
```bash
echo "moja-domena.surge.sh" > CNAME
```

## Aktualizacje

Po każdej zmianie kodu po stronie developera:
1. Pobierz nowy pakiet ZIP
2. Wypakuj w tym samym miejscu (zastąp pliki)
3. Uruchom `surge` ponownie

## Wsparcie

### Automatyczna detekcja tokenu
Aplikacja próbuje wykryć tokeny Bearer z sesji TourPlanner automatycznie, ale może nie działać z powodu CORS na niektórych domenach.

### NAJŁATWIEJSZY SPOSÓB - Skrypt do konsoli
Generator zawiera gotowy skrypt JavaScript do konsoli:

1. **Otwórz TourPlanner** w przeglądarce i zaloguj się
2. **Naciśnij F12** → zakładka "Console"
3. **Skopiuj skrypt** z sekcji "Skrypt do konsoli" w generatorze
4. **Wklej w konsoli** i naciśnij Enter
5. **Wykonaj akcję** w TourPlanner (odśwież, otwórz listę)
6. **Token zostanie automatycznie skopiowany** do schowka!

### Alternatywnie - ręczne wprowadzenie tokenu
Jeśli skrypt nie działa:

1. **Otwórz TourPlanner** w przeglądarce i zaloguj się
2. **Otwórz narzędzia developerskie** (F12)
3. **Przejdź do zakładki Network**
4. **Odśwież stronę TourPlanner** lub wykonaj jakąś akcję
5. **Znajdź żądanie API** (np. do `/territories`, `/events`, `/actions`)
6. **Kliknij na żądanie** → zakładka Headers
7. **Skopiuj wartość** z `Authorization: Bearer [TOKEN]`
8. **Wklej token** w generatorze (bez "Bearer ")

### Instrukcja użytkowania bookmarkletu:
1. Skopiuj wygenerowany kod bookmarkletu
2. Dodaj go jako zakładkę w przeglądarce
3. Gdy jesteś na stronie TourPlanner, kliknij zakładkę
4. Wypełnij formularz i utwórz akcję