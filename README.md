# Symulator Budżetu Studenckiego

Opis projektu
Symulator Budżetu Studenckiego to aplikacja webowa stworzona w React, umożliwiająca studentom zarządzanie swoimi finansami. Użytkownicy mogą się logować, śledzić swoje saldo oraz dodawać wydatki. Dane są przechowywane lokalnie w przeglądarce za pomocą `localStorage`, co pozwala na zachowanie historii transakcji między sesjami.

## Technologie użyte w projekcie
- **React** – Główna biblioteka do budowy interfejsu użytkownika
- **React Router** – Obsługa nawigacji między stronami
- **Context API** – Zarządzanie stanem użytkownika oraz budżetu
- **localStorage** – Przechowywanie danych użytkownika lokalnie w przeglądarce
- **CSS** – Stylowanie interfejsu użytkownika

## Funkcjonalności
1. **Logowanie użytkownika** – Możliwość podania nazwy użytkownika i rozpoczęcia zarządzania budżetem.
2. **Zarządzanie saldem** – Każdy użytkownik ma swoje saldo początkowe, które zmienia się w zależności od dodanych transakcji.
3. **Dodawanie transakcji** – Możliwość dodawania nowych wydatków, które automatycznie aktualizują saldo.
4. **Przechowywanie danych** – Dane są zapisywane w `localStorage`, dzięki czemu użytkownik po ponownym zalogowaniu ma dostęp do swojego budżetu i historii transakcji.
5. **Wylogowanie** – Możliwość wylogowania użytkownika, co resetuje dane w sesji.
6. **Interfejs użytkownika** – Prosty i czytelny układ aplikacji, zaprojektowany z myślą o wygodzie użytkownika.
7. **Responsywność** – Aplikacja działa zarówno na komputerach, jak i urządzeniach mobilnych.
8. **Filtrowanie i sortowanie transakcji** – Możliwość przeglądania transakcji według daty lub kategorii (funkcja do rozbudowy).

## Podział zadań (dla zespołu)
- **Osoba 1:** Implementacja autoryzacji użytkownika i zarządzania stanem.
- **Osoba 2:** Tworzenie interfejsu użytkownika i systemu dodawania transakcji.
- **Osoba 3 (opcjonalnie):** Optymalizacja przechowywania danych oraz integracja z zewnętrznymi API.

## Możliwe rozszerzenia projektu
1. **Rejestracja i logowanie z Firebase** – Możliwość przechowywania danych w chmurze i synchronizacji między urządzeniami.
2. **Podział na kategorie wydatków** – Użytkownicy mogliby klasyfikować swoje transakcje (np. jedzenie, transport, rozrywka).
3. **Wykresy i statystyki** – Wizualizacja budżetu za pomocą wykresów, np. wydatków w danym miesiącu.
4. **Planowanie budżetu** – Opcja ustawiania miesięcznych limitów wydatków i alertów o przekroczeniu budżetu.
5. **Eksport do pliku CSV** – Możliwość pobrania historii transakcji jako plik.
6. **Aplikacja mobilna** – Rozszerzenie projektu na React Native dla lepszej dostępności.
7. **Automatyczne zapisywanie wydatków** – Możliwość cyklicznego dodawania określonych wydatków (np. abonamenty, czynsz).
8. **Integracja z bankami** – Pobieranie danych o transakcjach bezpośrednio z kont bankowych użytkowników.
9. **System przypomnień** – Powiadomienia o nadchodzących płatnościach i ważnych transakcjach.
10. **Wsparcie dla wielu walut** – Możliwość zarządzania budżetem w różnych walutach i ich automatyczna konwersja.

## Podsumowanie
Projekt stanowi solidną podstawę do dalszego rozwoju. Dzięki wykorzystaniu React, Context API oraz `localStorage`, aplikacja jest szybka i responsywna. W przyszłości można ją łatwo rozbudować o nowe funkcje, takie jak analiza wydatków, integracja z bankami czy aplikacja mobilna.

![logowanie](https://github.com/user-attachments/assets/e19385e4-ac08-47c4-a099-1601ae0113a0)
