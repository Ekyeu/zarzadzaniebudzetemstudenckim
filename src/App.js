//npm install react-router-dom
//npm install react-chartjs-2 chart.js
// do importowania
// 🥸☝️
import React, { createContext, useContext, useState } from "react";
import {BrowserRouter as Router,Route,Routes,Link,Navigate,useNavigate} from "react-router-dom"; import { Line } from "react-chartjs-2";
import {Chart as Wykres,CategoryScale,LinearScale,PointElement,LineElement,Title,Tooltip,Legend,} from "chart.js"; import "./App.css";

Wykres.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// autoryzwoaniae danego uzytkownika logowaniae/wylogowanie itd
const KontekstAutoryzacji = createContext();

const DostawcaAutoryzacji = ({ children }) => { //children czyli uzytkownicy na stronie, zapisuje ich aby dalo sie ich potem odczyatc ich transakcje itp
  const [uzytkownik, ustawUzytkownik] = useState(null);

  const zaloguj = (nazwaUzytkownika) => 
  {
    const zapisanyUzytkownik =
      JSON.parse(localStorage.getItem(nazwaUzytkownika)) || {
        username: nazwaUzytkownika,
        balance: 10000,
        frozen: 0,
        transactions: [],
      };
    ustawUzytkownik(zapisanyUzytkownik);
  };

  const wyloguj = () => 
  {
    if (uzytkownik) {
      localStorage.setItem(
        uzytkownik.username,
        JSON.stringify(uzytkownik)
      );
    }
    ustawUzytkownik(null);
  };

  const dodajTransakcje = (opis, kwota) => {
    if (!uzytkownik || kwota <= 0 || kwota > uzytkownik.balance) 
    {
      alert("Nieprawidłowa kwota!");
      return;
    }
    ustawUzytkownik((poprzedni) => 
    {
      const nowaTransakcja = { opis, kwota };
      const zaktualizowany = {
        ...poprzedni,
        balance: poprzedni.balance - kwota,
        transactions: [...poprzedni.transactions, nowaTransakcja],
      };
      localStorage.setItem(poprzedni.username, JSON.stringify(zaktualizowany));
      return zaktualizowany;
    });
  };

  const zamrozSrodki = (kwota) => 
  {
    if (!uzytkownik || kwota <= 0 || kwota > uzytkownik.balance) {
      alert("Nieprawidłowa kwota!");
      return;
    }
    ustawUzytkownik((poprzedni) => 
    {
      const zaktualizowany = {
        ...poprzedni,
        balance: poprzedni.balance - kwota,
        frozen: poprzedni.frozen + kwota,
      };
      localStorage.setItem(poprzedni.username, JSON.stringify(zaktualizowany));
      return zaktualizowany;
    });
  };

  const odmrozSrodki = (kwota) => 
  {
    if (!uzytkownik || kwota <= 0 || kwota > uzytkownik.frozen) 
    {
      alert("Nieprawidłowa kwota!");
      return;
    }
    ustawUzytkownik((poprzedni) => 
    {
      const zaktualizowany = 
      {
        ...poprzedni,
        balance: poprzedni.balance + kwota,
        frozen: poprzedni.frozen - kwota,
      };
      localStorage.setItem(poprzedni.username, JSON.stringify(zaktualizowany));
      return zaktualizowany;
    });
  };

  const wplacSrodki = (kwota) => 
  {
    if (kwota <= 0) 
    {
      alert("Nieprawidłowa kwota!");
      return;
    }
    ustawUzytkownik((poprzedni) => 
    {
      const zaktualizowany = 
      {
        ...poprzedni,
        balance: poprzedni.balance + kwota,
      };
      localStorage.setItem(poprzedni.username, JSON.stringify(zaktualizowany));
      return zaktualizowany;
    });
  };

  return (
    <KontekstAutoryzacji.Provider
      value={{
        uzytkownik,
        zaloguj,
        wyloguj,
        dodajTransakcje,
        zamrozSrodki,
        odmrozSrodki,
        wplacSrodki,
      }}
    >
      {children}
    </KontekstAutoryzacji.Provider>
  );
};


// spradza czy uzyrnwik hest zalogowany jesli nie to wyrzuca go do strony logowania 
const TrasaChroniona = ({ element }) => {
  const { uzytkownik } = useContext(KontekstAutoryzacji);
  return uzytkownik ? element : <Navigate to="/login" />;
};


// logowanie uzytkownika
const Logowanie = () => 
{
  const { zaloguj } = useContext(KontekstAutoryzacji);
  const [nazwaUzytkownika, ustawNazwa] = useState("");
  const nawigacja = useNavigate();

  const obsluzLogowanie = (e) => {
    e.preventDefault();
    zaloguj(nazwaUzytkownika);
    nawigacja("/");
  };
  return (
    <div className="strona-logowania">
      <div className="kontener-logowania">
        <h1>Logowanie</h1>
        <form onSubmit={obsluzLogowanie}>
          <input
            type="text"
            placeholder="Nazwa użytkownika"
            value={nazwaUzytkownika}
            onChange={(e) => ustawNazwa(e.target.value)}
            required
          />
          <button type="submit">Zaloguj</button>
        </form>
      </div>
    </div>
  );
};

// zamrazanie srodkow, subkonto do osczedania gotowki
const PanelInwestycji = () => 
{
  const { uzytkownik, zamrozSrodki, odmrozSrodki, wplacSrodki } = useContext(KontekstAutoryzacji);
  const [kwota, ustawKwota] = useState("");
  const [wplata, ustawWplate] = useState("");

  const obsluzWplate = (e) => 
  {
    e.preventDefault();
    wplacSrodki(parseFloat(wplata));
    ustawWplate("");
  };
  return (
    <div className="panel-inwestycji">
      <div className="sekcja-wplaty">
        <h2>Wpłać środki</h2>
        <form onSubmit={obsluzWplate} className="formularz-wplaty">
          <input
            type="number"
            placeholder="Kwota do wpłaty"
            value={wplata}
            onChange={(e) => ustawWplate(e.target.value)}
          />
          <button type="submit">Wpłać</button>
        </form>
      </div>
      <hr />
      <h2>Panel Inwestycji</h2>
      <p>Zamrożone środki: {uzytkownik?.frozen} PLN</p>
      <input
        type="number"
        placeholder="Kwota"
        value={kwota}
        onChange={(e) => ustawKwota(e.target.value)}
      />
      <div className="przyciski">
        <button onClick={() => { zamrozSrodki(parseFloat(kwota)); ustawKwota(""); }}>Zamroź</button>
        <button onClick={() => { odmrozSrodki(parseFloat(kwota)); ustawKwota(""); }}>Odmroź</button>
      </div>
    </div>
  );
};


// wyswietlanie wykresu, pobiera dane i na tej podsatwwie podaje jak wydatki zmieniaja sie dla uzytkownika (kwota tych wydatkow)
const WykresTransakcji = () => 
{
  const { uzytkownik } = useContext(KontekstAutoryzacji);
  const etykiety = uzytkownik?.transactions.map((_, i) => `Tx ${i + 1}`) || [];
  const daneTransakcji = uzytkownik?.transactions.map(t => t.kwota) || [];

  const dane = {
    labels: etykiety,
    datasets: [
      {
        label: "Kwota transakcji",
        data: daneTransakcji,
        fill: false,
        borderColor: "#3b82f6",
        backgroundColor: "#3b82f6",
        tension: 0.1,
      },
    ],
  };

  const opcje = 
  {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Wykres transakcji" },
    },
  };

  return <div className="kontener-wykresu"><Line data={dane} options={opcje} /></div>;
};

// glowan strona dla apliakcji
const StronaGlowna = () => 
{
  const { uzytkownik, dodajTransakcje, wyloguj } = useContext(KontekstAutoryzacji);
  const [opis, ustawOpis] = useState("");
  const [kwota, ustawKwota] = useState("");

  const obsluzDodawanie = (e) => 
  {
    e.preventDefault();
    dodajTransakcje(opis, parseFloat(kwota));
    ustawOpis("");
    ustawKwota("");
  };

  return (
    <div className="kontener-dashboard">
      <div className="panel-lewy">
        <div className="sekcja-naglowka">
          <h1>Budżet Studencki</h1>
          <button onClick={wyloguj} className="przycisk-wyloguj">Wyloguj</button>
        </div>
        <div className="sekcja-salda">
          <p className="saldo">Saldo: {uzytkownik?.balance} PLN</p>
        </div>
        <form onSubmit={obsluzDodawanie} className="formularz-transakcji">
          <input
            type="text"
            placeholder="Opis"
            value={opis}
            onChange={(e) => ustawOpis(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Kwota"
            value={kwota}
            onChange={(e) => ustawKwota(e.target.value)}
            required
          />
          <button type="submit">Dodaj Transakcję</button>
        </form>
        <div className="sekcja-transakcji">
          <h2>Historia Transakcji</h2>
          <ul className="lista-transakcji">
            {uzytkownik?.transactions.map((t, i) => (
              <li key={i} className="element-transakcji">
                {t.opis}: {t.kwota} PLN
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="panel-prawy">
        <PanelInwestycji />
        <div className="sekcja-przyszle">
          <h2>Przyszłe Funkcje</h2>
          <p>Możesz tutaj dodać nowe moduły.</p>
          <WykresTransakcji />
        </div>
      </div>
    </div>
  );
};

// cala aplikacja ktora odwoluje sie do pozostalych funkcji
const Aplikacja = () => 
{return (
    <DostawcaAutoryzacji>
      <Router>
        <nav className="nawigacja">
          <Link to="/">Home</Link>
        </nav>
        <Routes>
          <Route path="/login" element={<Logowanie />} />
          <Route path="/" element={<TrasaChroniona element={<StronaGlowna />} />} />
        </Routes>
      </Router>
    </DostawcaAutoryzacji>
  );
};

export default Aplikacja;
