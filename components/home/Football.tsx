import { useState, useEffect } from "react";
import Link from "next/link";

// Définition des types
interface Country {
  country_key: number;
  country_name: string;
  country_logo: string;
}

interface League {
  league_key: number;
  league_name: string;
  league_logo: string;
}

interface Match {
  event_key: number;
  event_home_team: string;
  event_away_team: string;
  event_date: string;
  event_time: string;
}

const Football = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [leagues, setLeagues] = useState<{ [key: number]: League[] }>({});
  const [matches, setMatches] = useState<{ [key: number]: Match[] }>({});

  const today = new Date().toISOString().split("T")[0];
  const twoWeeksLater = new Date();
  twoWeeksLater.setDate(twoWeeksLater.getDate() + 14);
  const futureDate = twoWeeksLater.toISOString().split("T")[0];

  // Récupération des pays
  useEffect(() => {
    fetch(
      "https://apiv2.allsportsapi.com/football/?met=Countries&APIkey=f502da57fbafeda150348df5890f55c5946fe30acd824007828b7eb6f8e7d9ca"
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.success === 1) {
          setCountries(data.result as Country[]);
        }
      })
      .catch((err) => console.error("Erreur API Pays:", err));
  }, []);

  // Récupération des ligues d'un pays
  const fetchLeagues = (countryKey: number) => {
    if (leagues[countryKey]) return;
    fetch(
      `https://apiv2.allsportsapi.com/football/?met=Leagues&APIkey=f502da57fbafeda150348df5890f55c5946fe30acd824007828b7eb6f8e7d9ca&countryId=${countryKey}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.success === 1) {
          setLeagues((prev) => ({
            ...prev,
            [countryKey]: data.result as League[],
          }));
        }
      })
      .catch((err) => console.error("Erreur API Leagues:", err));
  };

  // Récupération des matchs d'une ligue
  const fetchMatches = (leagueKey: number) => {
    if (matches[leagueKey]) return;
    fetch(
      `https://apiv2.allsportsapi.com/football/?met=Fixtures&APIkey=f502da57fbafeda150348df5890f55c5946fe30acd824007828b7eb6f8e7d9ca&leagueId=${leagueKey}&from=${today}&to=${futureDate}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.success === 1) {
          setMatches((prev) => ({
            ...prev,
            [leagueKey]: data.result as Match[],
          }));
        }
      })
      .catch((err) => console.error("Erreur API Matches:", err));
  };

  return (
    <div className="countries-tab pb-60">
      <div className="accordion" id="sports">
        {countries.map((country, index) => (
          <div className="accordion-item" key={index}>
            <div className="accordion-header" id={`countrytab${index}`}>
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={`#country${index}`}
                aria-expanded="false"
                aria-controls={`country${index}`}
                onClick={() => fetchLeagues(country.country_key)}
              >
                <span className="icon">
                  <img
                    src={country.country_logo}
                    alt={country.country_name}
                    style={{ width: "25px", height: "25px" }}
                  />
                </span>
                <span>{country.country_name}</span>
              </button>
              <div
                id={`country${index}`}
                className="accordion-collapse collapse"
                data-bs-parent="#sports"
              >
                <div className="accordion-body">
                  {leagues[country.country_key] ? (
                    leagues[country.country_key].map((league, leagueIndex) => (
                      <div key={leagueIndex} className="accordion-item">
                        <div
                          className="accordion-header"
                          id={`leaguetab${league.league_key}`}
                        >
                          <button
                            className="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target={`#league${league.league_key}`}
                            aria-expanded="false"
                            aria-controls={`league${league.league_key}`}
                            onClick={() => fetchMatches(league.league_key)}
                          >
                            <span>
                              <img
                                src={league.league_logo}
                                alt={league.league_name}
                                style={{ width: "30px", height: "30px" }}
                              />
                            </span>
                            <span>{league.league_name}</span>
                          </button>
                        </div>
                        <div
                          id={`league${league.league_key}`}
                          className="accordion-collapse collapse"
                          data-bs-parent={`#country${index}`}
                        >
                          <div className="accordion-body">
                            {matches[league.league_key] ? (
                              matches[league.league_key].map(
                                (match, matchIndex) => (
                                  <div
                                    key={matchIndex}
                                    className="d-flex align-items-center justify-content-between"
                                  >
                                    <span
                                      style={{
                                        color: "white",
                                        padding: 4,
                                        borderBottomColor: "white",
                                        borderWidth: 1,
                                      }}
                                    >
                                      {match.event_home_team} vs{" "}
                                      {match.event_away_team} -{" "}
                                      {match.event_date} {match.event_time}
                                    </span>
                                    <Link href={`/match/${match.event_key}`}>
                                      Détails{" "}
                                      <i className="fas  fa-angle-right"></i>
                                    </Link>
                                  </div>
                                )
                              )
                            ) : (
                              <p>Aucun match prévu.</p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p>Chargement des championnats...</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Football;
