import Link from "next/link";
import BreadCrumb from "@/components/BreadCrumb";
import Sponsor from "@/components/Sponsor";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";

const details = ({ matchId }) => {
  const router = useRouter();
  const { id } = router.query; // Récupère l'ID depuis l'URL
  const [match, setMatch] = useState(null);
  const [loading, setLoading] = useState(true);
  const [odds, setOdds] = useState([]);

  console.log("ID du match récupéré :", id); // Ajout du log pour vérifier l'ID

  const fetchMatchOdds = async () => {
    try {
      const response = await axios.get(
        `https://apiv2.allsportsapi.com/football/?met=Odds&matchId=${id}&APIkey=f502da57fbafeda150348df5890f55c5946fe30acd824007828b7eb6f8e7d9ca`
      );

      console.log("Cotes récupérées :", response.data);

      if (response.data.success === 1) {
        setOdds(response.data.result);
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des cotes", error);
    }
  };

  useEffect(() => {
    if (!router.isReady || !id) return; // Attendre que le routeur soit prêt

    console.log("ID du match après chargement :", id); // Vérifier si l'ID est bien récupéré

    const fetchMatchDetails = async () => {
      try {
        const response = await axios.get(
          `https://apiv2.allsportsapi.com/football/?met=Fixtures&APIkey=f502da57fbafeda150348df5890f55c5946fe30acd824007828b7eb6f8e7d9ca&matchId=${id}`
        );

        console.log("Réponse API :", response.data); // Vérifier si l'API renvoie bien les données

        if (response.data.success === 1) {
          setMatch(response.data.result[0]);
        }
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des détails du match",
          error
        );
      } finally {
        setLoading(false);
      }
      fetchMatchOdds();
    };

    fetchMatchDetails();
  }, [router.isReady, id]); // Déclenchement après chargement complet du routeur

  if (!router.isReady || !id) return <p>Chargement...</p>;
  if (loading) return <p>Chargement des détails du match...</p>;
  if (!match) return <p>Aucun détail trouvé pour ce match.</p>;
  return (
    <>
      <BreadCrumb title="Details" />
      {/* <!--Breadcumnd--> */}

      {/* <!--Banner--> */}
      <div className="details-banner pt-60 pb-60">
        <div className="container">
          <div className="details-wrapper">
            <div className="scoreboard-head">
              <span>
                <img src="/img/table/details/scoreboard.png" alt="img" />
              </span>
              <span className="text-base">{match.league_name}</span>
            </div>
            <div className="banner-wrapper owl-theme owl-carousel">
              <div className="details-img">
                <div className="details-progress">
                  <div className="detail-progress-items">
                    <div className="bar1">
                      <div className="changchun">
                        <img src={match.home_team_logo} alt="img" />
                      </div>
                    </div>
                    <p>{match.event_home_team}</p>
                  </div>
                  <div className="detail-progress-items details-middle-items">
                    <Link href="#0" className="live">
                      {match.event_date} à {match.event_time}
                    </Link>
                    <div className="detaisl-middle-circle-wrap d-flex align-items-center">
                      <h3 className="gra"></h3>
                      <div className="bar-middle-circle">
                        <svg
                          width="100"
                          height="100"
                          viewBox="0 0 100 100"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M83.4422 83.4422C84.4988 84.4988 86.2179 84.5035 87.2159 83.3913C93.1946 76.728 97.2863 68.5673 99.0393 59.7545C100.969 50.0555 99.9784 40.0021 96.194 30.8658C92.4096 21.7295 86.001 13.9206 77.7785 8.42652C69.5561 2.93245 59.8891 4.51887e-07 50 0C40.1109 -4.51887e-07 30.4439 2.93245 22.2215 8.42652C13.999 13.9206 7.59041 21.7295 3.80602 30.8658C0.0216423 40.0021 -0.968525 50.0555 0.960735 59.7545C2.71371 68.5673 6.80542 76.728 12.7841 83.3913C13.7821 84.5035 15.5012 84.4988 16.5578 83.4422V83.4422C17.6144 82.3856 17.6075 80.6777 16.6169 79.559C11.3911 73.6573 7.81207 66.4618 6.26793 58.6988C4.54746 50.0495 5.43047 41.0841 8.80529 32.9366C12.1801 24.789 17.8952 17.8252 25.2278 12.9257C32.5604 8.02626 41.1812 5.41117 50 5.41117C58.8188 5.41117 67.4396 8.02626 74.7722 12.9257C82.1048 17.8252 87.8199 24.789 91.1947 32.9366C94.5695 41.0841 95.4525 50.0495 93.7321 58.6989C92.1879 66.4618 88.6089 73.6573 83.3831 79.559C82.3925 80.6777 82.3856 82.3856 83.4422 83.4422V83.4422Z"
                            fill="#D9D9D9"
                          />
                          <path
                            d="M15.4609 17.6919C14.3697 16.6711 12.6512 16.7239 11.6909 17.8687C3.97445 27.0681 -0.194085 38.7672 0.00693804 50.8329C0.207961 62.8986 4.7639 74.4523 12.7825 83.3896C13.7804 84.5018 15.4997 84.4973 16.5563 83.4407V83.4407C17.613 82.3842 17.606 80.6762 16.6154 79.5574C9.58572 71.6181 5.59499 61.4046 5.41735 50.7428C5.23972 40.081 8.888 29.7402 15.6493 21.5711C16.6021 20.42 16.5522 18.7127 15.4609 17.6919V17.6919Z"
                            fill="url(#paint0_linear_965_3)"
                          />
                          <defs>
                            <linearGradient
                              id="paint0_linear_965_3"
                              x1="-6.43565"
                              y1="115"
                              x2="121.545"
                              y2="94.548"
                              gradientUnits="userSpaceOnUse"
                            >
                              <stop offset="5%" stop-color="#81CD34" />
                              <stop offset="1" stop-color="#00A182" />
                            </linearGradient>
                          </defs>
                        </svg>
                        <span>VS</span>
                      </div>
                      <h3 className="sto"></h3>
                    </div>
                    {/* <div className="matchfixing-box">
                      <Link href="#0" className="match">
                        <span>
                          <img
                            src={"/img/table/details/changchun.png"}
                            alt="img"
                          />
                        </span>
                        <span>10</span>
                      </Link>
                      <Link href="#0" className="match">
                        <span>10</span>
                        <span className="reds">
                          <img src="/img/table/details/red.png" alt="img" />
                        </span>
                      </Link>
                      <Link href="#0" className="match">
                        <span>
                          <img src="/img/table/details/zall.png" alt="img" />
                        </span>
                        <span>10</span>
                      </Link>
                    </div> */}
                    {/* <div>{match.event_final_result || "Non joué"}</div> */}
                    {/* <div>{match.league_name}</div> */}
                  </div>
                  <div className="detail-progress-items detail-last-items">
                    <div className="bar1">
                      <div className="changchun">
                        <img src={match.away_team_logo} alt="img" />
                      </div>
                    </div>
                    <p>{match.event_away_team}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="detail-tap">
              <ul className="nav">
                <li className="nav-item">
                  <Link
                    className="nav-link link-secondary active"
                    id="details-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#detail1"
                    href="#"
                  >
                    <span>Toute les Cotes</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link link-secondary"
                    id="details-tab01"
                    data-bs-toggle="tab"
                    data-bs-target="#details2"
                    href="#"
                  >
                    <span>Vainqueur</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link link-secondary"
                    id="details-tab02"
                    data-bs-toggle="tab"
                    data-bs-target="#details3"
                    href="#"
                  >
                    <span>Total</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link link-secondary"
                    id="details-tab03"
                    data-bs-toggle="tab"
                    data-bs-target="#details4"
                    href="#"
                  >
                    <span>Handicap</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link link-secondary"
                    id="details-tab04"
                    data-bs-toggle="tab"
                    data-bs-target="#details5"
                    href="#"
                  >
                    <span>Score Exact</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link link-secondary"
                    id="details-tab05"
                    data-bs-toggle="tab"
                    data-bs-target="#details6"
                    href="#"
                  >
                    <span>Autre</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="tab-content pt-60" id="d-wrap">
            {/* <!--winner--> */}

            {/* <!--total--> */}

            {/* <!--handicap--> */}

            {/* <!--score--> */}

            {/* <!--others--> */}
          </div>

          <div className="tab-content pt-60" id="d-wrap">
            <div className="tab-pane fade show active" id="detail1">
              {odds.length > 0 ? (
                <ul>
                  {odds.map((odd, index) => (
                    <li key={index}>
                      <strong>{odd.odd_bookmakers}</strong> - {odd.odd_label}:{" "}
                      {odd.odd_value}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>Aucune cote disponible.</p>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* <!--Banner--> */}

      {/* <!--Sponsor Section--> */}
      <Sponsor />
    </>
  );
};

export default details;
