import Sponsor from "@/components/Sponsor";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import ModalVideo from "react-modal-video";

const Live = ({ onSelectOdds }) => {
  const [isOpen, setOpen] = useState(false);
  const [oddsData, setOddsData] = useState([]);
  const [matches, setMatches] = useState({});
  const [teamLogos, setTeamLogos] = useState({});
  const [selectedOdds, setSelectedOdds] = useState({}); // Stocke les cotes sélectionnées

  useEffect(() => {
    const fetchOdds = async () => {
      try {
        const response = await fetch(
          "https://apiv2.allsportsapi.com/football/?met=OddsLive&APIkey=f502da57fbafeda150348df5890f55c5946fe30acd824007828b7eb6f8e7d9ca"
        );
        const data = await response.json();
        // @ts-ignore
        if (data.success === 1) setOddsData(Object.entries(data.result));
      } catch (error) {
        console.error("Erreur lors du chargement des cotes :", error);
      }
    };
    fetchOdds();
  }, []);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await fetch(
          "https://apiv2.allsportsapi.com/football/?met=Livescore&APIkey=f502da57fbafeda150348df5890f55c5946fe30acd824007828b7eb6f8e7d9ca"
        );
        const data = await response.json();
        if (data.success === 1) {
          const matchesMap = {};
          const logosMap = {};
          await Promise.all(
            data.result.map(async (match) => {
              matchesMap[match.event_key] = {
                team1: match.event_home_team,
                team2: match.event_away_team,
                league: match.league_name,
              };
              try {
                const fixtureResponse = await fetch(
                  `https://apiv2.allsportsapi.com/football/?met=Fixtures&APIkey=f502da57fbafeda150348df5890f55c5946fe30acd824007828b7eb6f8e7d9ca&matchId=${match.event_key}`
                );
                const fixtureData = await fixtureResponse.json();
                if (
                  fixtureData.success === 1 &&
                  fixtureData.result.length > 0
                ) {
                  const fixture = fixtureData.result[0];
                  logosMap[match.event_key] = {
                    team1Logo: fixture.home_team_logo,
                    team2Logo: fixture.away_team_logo,
                  };
                }
              } catch (logoError) {
                console.error(`Erreur lors du chargement des logos`, logoError);
              }
            })
          );
          setMatches(matchesMap);
          setTeamLogos(logosMap);
        }
      } catch (error) {
        console.error("Erreur lors du chargement des matchs :", error);
      }
    };
    fetchMatches();
  }, []);

  const handleSelectOdd = (matchId, oddType, oddValue) => {
    const newSelectedOdds = {
      ...selectedOdds,
      [matchId]:
        selectedOdds[matchId]?.oddType === oddType
          ? null
          : { matchId, oddType, oddValue, ...matches[matchId] },
    };

    setSelectedOdds(newSelectedOdds);

    // Envoyer les données au composant parent
    onSelectOdds(Object.values(newSelectedOdds).filter(Boolean));
  };

  return (
    <>
      <div className="main-body-tabbing">
        <div className="container">
          <div className="main-tabbing">
            <div className="tab-content" id="tabContentmain">
              <div
                className="tab-pane fade show active"
                id="betsall"
                role="tabpanel"
              >
                <div className="match-table">
                  <div className="table-wrap mb-2">
                    {oddsData.length > 0 ? (
                      oddsData.map(([matchId, odds]) => {
                        // @ts-ignore
                        const v1 = odds.find((odd) => odd.odd_type === "Home");
                        // @ts-ignore
                        const draw = odds.find(
                          (odd) => odd.odd_type === "Draw"
                        );
                        // @ts-ignore
                        const v2 = odds.find((odd) => odd.odd_type === "Away");

                        const teams = matches[matchId] || {
                          team1: "Équipe 1",
                          team2: "Équipe 2",
                          league: "Compétition inconnue",
                        };

                        return (
                          <div key={matchId} className="table-inner">
                            <div className="table-head">
                              {/* @ts-ignore */}
                              <span>{teams.league}</span>
                            </div>
                            <div className="table-body">
                              <div className="table-body-left">
                                <Link
                                  href={`/match/${matchId}`}
                                  className="team-link"
                                >
                                  <div className="items">
                                    {/* @ts-ignore */}
                                    <span>{teams.team1}</span>
                                  </div>
                                  <div className="items">
                                    {/* @ts-ignore */}
                                    <span>{teams.team2}</span>
                                  </div>
                                </Link>
                              </div>
                              <div className="table-body-right">
                                {[v1, draw, v2].map(
                                  (odd, index) =>
                                    odd && (
                                      <button
                                        key={index}
                                        className={`table-pointing-box ${
                                          // @ts-ignore
                                          selectedOdds[matchId]?.oddType ===
                                          odd.odd_type
                                            ? "selected"
                                            : ""
                                        }`}
                                        onClick={() =>
                                          handleSelectOdd(
                                            matchId,
                                            odd.odd_type,
                                            odd.odd_value
                                          )
                                        }
                                      >
                                        {odd.odd_type === "Home"
                                          ? "V1"
                                          : odd.odd_type === "Draw"
                                          ? "X"
                                          : "V2"}
                                        : {odd.odd_value}
                                      </button>
                                    )
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <p>Chargement des cotes...</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Sponsor />
    </>
  );
};

export default Live;


// import Sponsor from "@/components/Sponsor";
// import Link from "next/link";
// import React, { useState, useEffect } from "react";
// import ModalVideo from "react-modal-video";

// const Live = ({ onSelectOdds }) => {
//   const [isOpen, setOpen] = useState(false);
//   const [oddsData, setOddsData] = useState([]);
//   const [matches, setMatches] = useState({});
//   const [teamLogos, setTeamLogos] = useState({});
//   const [selectedOdds, setSelectedOdds] = useState({});
//   const [notification, setNotification] = useState(null); // Notification pour les cotes choisies

//   // Récupération des cotes
//   useEffect(() => {
//     const fetchOdds = async () => {
//       try {
//         const response = await fetch(
//           "https://apiv2.allsportsapi.com/football/?met=OddsLive&APIkey=f502da57fbafeda150348df5890f55c5946fe30acd824007828b7eb6f8e7d9ca"
//         );
//         const data = await response.json();
//         // @ts-ignore
//         if (data.success === 1) setOddsData(Object.entries(data.result));
//       } catch (error) {
//         console.error("Erreur lors du chargement des cotes :", error);
//       }
//     };
//     fetchOdds();
//   }, []);

//   // Récupération des matchs
//   useEffect(() => {
//     const fetchMatches = async () => {
//       try {
//         const response = await fetch(
//           "https://apiv2.allsportsapi.com/football/?met=Livescore&APIkey=f502da57fbafeda150348df5890f55c5946fe30acd824007828b7eb6f8e7d9ca"
//         );
//         const data = await response.json();
//         if (data.success === 1) {
//           const matchesMap = {};
//           const logosMap = {};
//           await Promise.all(
//             data.result.map(async (match) => {
//               matchesMap[match.event_key] = {
//                 team1: match.event_home_team,
//                 team2: match.event_away_team,
//                 league: match.league_name,
//               };
//               try {
//                 const fixtureResponse = await fetch(
//                   `https://apiv2.allsportsapi.com/football/?met=Fixtures&APIkey=f502da57fbafeda150348df5890f55c5946fe30acd824007828b7eb6f8e7d9ca&matchId=${match.event_key}`
//                 );
//                 const fixtureData = await fixtureResponse.json();
//                 if (
//                   fixtureData.success === 1 &&
//                   fixtureData.result.length > 0
//                 ) {
//                   const fixture = fixtureData.result[0];
//                   logosMap[match.event_key] = {
//                     team1Logo: fixture.home_team_logo,
//                     team2Logo: fixture.away_team_logo,
//                   };
//                 }
//               } catch (logoError) {
//                 console.error(`Erreur lors du chargement des logos`, logoError);
//               }
//             })
//           );
//           setMatches(matchesMap);
//           setTeamLogos(logosMap);
//         }
//       } catch (error) {
//         console.error("Erreur lors du chargement des matchs :", error);
//       }
//     };
//     fetchMatches();
//   }, []);

//   // Sélection d'une cote + Notification
//   const handleSelectOdd = (matchId, oddType, oddValue) => {
//     setSelectedOdds((prev) => {
//       const updatedOdds = {
//         ...prev,
//         [matchId]: { matchId, oddType, oddValue, ...matches[matchId] },
//       };

//       // Envoie au parent
//       if (typeof onSelectOdds === "function") {
//         onSelectOdds(Object.values(updatedOdds));
//       }

//       // Affichage de la notification
//       setNotification(
//         // @ts-ignore
//         `Vous avez sélectionné ${matches[matchId].team1} vs ${matches[matchId].team2} - Cote: ${oddType} (${oddValue})`
//       );
//       setTimeout(() => setNotification(null), 3000); // Efface après 3 secondes

//       return updatedOdds;
//     });
//   };

//   return (
//     <>
//       {/* Notification */}
//       {notification && <div className="notification">{notification}</div>}

//       <div className="main-body-tabbing">
//         <div className="container">
//           <div className="main-tabbing">
//             <div className="tab-content" id="tabContentmain">
//               <div
//                 className="tab-pane fade show active"
//                 id="betsall"
//                 role="tabpanel"
//               >
//                 <div className="match-table">
//                   <div className="table-wrap mb-2">
//                     {oddsData.length > 0 ? (
//                       oddsData.map(([matchId, odds]) => {
//                         // @ts-ignore
//                         const v1 = odds.find((odd) => odd.odd_type === "Home");
//                         // @ts-ignore
//                         const draw = odds.find(
//                           (odd) => odd.odd_type === "Draw"
//                         );
//                         // @ts-ignore
//                         const v2 = odds.find((odd) => odd.odd_type === "Away");

//                         const teams = matches[matchId] || {
//                           team1: "Équipe 1",
//                           team2: "Équipe 2",
//                           league: "Compétition inconnue",
//                         };

//                         const logos = teamLogos[matchId] || {
//                           team1Logo: "",
//                           team2Logo: "",
//                         };

//                         return (
//                           <div key={matchId} className="table-inner">
//                             <div className="table-head">
//                               {/* @ts-ignore */}
//                               <span>{teams.league}</span>
//                             </div>
//                             <div className="table-body">
//                               <div className="table-body-left">
//                                 <Link
//                                   href={`/match/${matchId}`}
//                                   className="team-link"
//                                 >
//                                   <div className="items">
//                                     {/* @ts-ignore */}
//                                     {logos.team1Logo ? (
//                                       <img
//                                       // @ts-ignore
//                                         src={logos.team1Logo}
//                                         // @ts-ignore
//                                         alt={teams.team1}
//                                         className="team-logo"
//                                       />
//                                     ) : (
//                                       "⚽"
//                                     )}
//                                     {/* @ts-ignore */}
//                                     <span>{teams.team1}</span>
//                                   </div>
//                                   <div className="items">
//                                     {/* @ts-ignore */}
//                                     {logos.team2Logo ? (
//                                       <img
//                                         // @ts-ignore
//                                         src={logos.team2Logo}
//                                         // @ts-ignore
//                                         alt={teams.team2}
//                                         className="team-logo"
//                                       />
//                                     ) : (
//                                       "⚽"
//                                     )}
//                                     {/* @ts-ignore */}
//                                     <span>{teams.team2}</span>
//                                   </div>
//                                 </Link>
//                               </div>
//                               <div className="table-body-right">
//                                 {[v1, draw, v2].map((odd, index) =>
//                                   odd ? (
//                                     <button
//                                       key={index}
//                                       className={`table-pointing-box ${
//                                         // @ts-ignore
//                                         selectedOdds[matchId]?.oddType ===
//                                         odd.odd_type
//                                           ? "selected"
//                                           : ""
//                                       }`}
//                                       onClick={() =>
//                                         handleSelectOdd(
//                                           matchId,
//                                           odd.odd_type,
//                                           odd.odd_value
//                                         )
//                                       }
//                                     >
//                                       {odd.odd_type === "Home"
//                                         ? "V1"
//                                         : odd.odd_type === "Draw"
//                                         ? "X"
//                                         : "V2"}
//                                       : {odd.odd_value}
//                                     </button>
//                                   ) : null
//                                 )}
//                               </div>
//                             </div>
//                           </div>
//                         );
//                       })
//                     ) : (
//                       <p>Chargement des cotes...</p>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <Sponsor />

//       <style jsx>{`
//         .notification {
//           position: fixed;
//           top: 20px;
//           right: 20px;
//           background: green;
//           color: white;
//           padding: 10px;
//           border-radius: 5px;
//           z-index: 1000;
//           font-weight: bold;
//         }
//         .team-logo {
//           width: 40px;
//           height: 40px;
//           margin-right: 5px;
//           object-fit: contain;
//         }
//         .table-pointing-box {
//           transition: all 0.2s ease-in-out;
//         }
//         .table-pointing-box.selected {
//           background-color: #4caf50;
//           color: white;
//         }
//         .table-pointing-box:hover {
//           background-color: white;
//           color: black;
//         }
//       `}</style>
//     </>
//   );
// };

// export default Live;

