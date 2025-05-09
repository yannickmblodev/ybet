import Link from "next/link";
import BreadCrumb from "@/components/BreadCrumb";
import Sponsor from "@/components/Sponsor";
interface matchInterface {
  id: number;
  img: string;
  title: string;
  team1: {
    name: string;
    img: string;
  };
  team2: {
    name: string;
    img: string;
  };
}
const matchData = [
  {
    Aujourdhui: [
      {
        id: 1,
        img: "/img/table/kpbkorea.png",
        title: "CS:GO. Esports Battle 2x2",
        team1: { name: "NightRaid", img: "/img/table/hanwha.png" },
        team2: { name: "Snake", img: "/img/table/nexen.png" },
      },
      {
        id: 2,
        img: "/img/table/kpbkorea.png",
        title: "CS:GO. Esports Battle 2x2",
        team2: { name: "NightRaid", img: "/img/table/bears.png" },
        team1: { name: "Snake", img: "/img/table/samsung.png" },
      },
      {
        id: 3,
        img: "/img/table/kpbkorea.png",
        title: "CS:GO. Esports Battle 2x2",
        team1: { name: "ALTERNATE aTTaX", img: "/img/table/tiger.png" },
        team2: { name: "SnakBeyond Possible", img: "/img/table/twins.png" },
      },
      {
        id: 4,
        img: "/img/table/cpbl.png",
        title: "CS:GO. Esports Battle 2x2",
        team1: { name: "Lodis by Illuminar", img: "/img/table/dinos.png" },
        team2: { name: "9INE", img: "/img/table/nin.png" },
      },
      {
        id: 5,
        img: "/img/table/csgo3.png",
        title: "CS:GO. Esports Battle 2x2",
        team1: { name: "NightRaid", img: "/img/table/nightraid.png" },
        team2: { name: "Snake", img: "/img/table/snake.png" },
      },
    ],
  },
  {
    Tomorrow: [
      {
        id: 6,
        img: "/img/table/usamlb.png",
        title: "USA. MLB",
        team1: { name: "Rhyno", img: "/img/table/c.png" },
        team2: { name: "Panthers eSports", img: "/img/table/rays.png" },
      },
    ],
  },
  {
    "Prematch 09.4.2023": [
      {
        id: 7,
        img: "/img/table/ecl.png",
        title: "CS:GO. Esports Battle 2x2",
        team1: { name: "Lodis by Illuminar", img: "/img/table/lodis.png" },
        team2: { name: "9INE", img: "/img/table/nin.png" },
      },
      {
        id: 8,
        img: "/img/table/international.png",
        title: "CS:GO. Esports Battle 2x2",
        team1: { name: "ONYX", img: "/img/table/dnyx.png" },
        team2: { name: "OOProspects", img: "/img/table/oopro.png" },
      },
      {
        id: 9,
        img: "/img/table/ecl.png",
        title: "CS:GO. Esports Battle 2x2",
        team1: { name: "AGO", img: "/img/table/sgo.png" },
        team2: { name: "9INE", img: "/img/table/nin.png" },
      },
      {
        id: 10,
        img: "/img/table/csgo2.png",
        title: "CS:GO. Esports Battle 2x2",
        team1: { name: "Bad News Eagles", img: "/img/table/nightraid.png" },
        team2: { name: "Eternal Fire", img: "/img/table/snake.png" },
      },
    ],
  },
];
const baseball = () => {
  return (
    <>
      <BreadCrumb title="Baseball" />
      {/* <!--Breadcumnd--> */}

      {/* <!--Main-body-tabing--> */}
      <div className="main-body-tabbing">
        <div className="container">
          <div className="main-tabbing">
            <div className="tab-content" id="tabContentmain">
              {/* <!--all tab start--> */}
              <div
                className="tab-pane fade show active"
                id="betsall"
                role="tabpanel">
                <div className="match-table">
                  {/* <!--table five--> */}
                  {matchData.map((item, index) => (
                    <div key={index}>
                      {Object.entries(item).map(([key, value]) => (
                        <div key={key}>
                          <div className="match-table-head pt-20 pb-20">
                            <h2>{key} </h2>
                          </div>
                          <div className="table-wrap mb-5">
                            {value.map((singleItem: matchInterface) => (
                              <div key={singleItem.id} className="table-inner">
                                <div className="table-head">
                                  <Link href="details" className="left-compo">
                                    <span>
                                      <img src={singleItem.img} alt="icon" />
                                    </span>
                                    <span>{singleItem.title}</span>
                                  </Link>
                                  <ul className="right-compo">
                                    <li>Live : 6m</li>
                                    <li>Vainqueur du match</li>
                                    <li>Total</li>
                                  </ul>
                                </div>
                                <div className="table-body">
                                  <ul className="table-body-left">
                                    <li>
                                      <Link href="#0">
                                        <span>{singleItem.team1.name}</span>
                                        <span className="icon">
                                          <img
                                            src={singleItem.team1.img}
                                            alt="flag"
                                          />
                                        </span>
                                      </Link>
                                    </li>
                                    <li>
                                      <Link href="#0" className="vs">
                                        VS
                                      </Link>
                                    </li>
                                    <li>
                                      <Link href="#0">
                                        <span className="icon">
                                          <img
                                            src={singleItem.team2.img}
                                            alt="flag"
                                          />
                                        </span>
                                        <span>{singleItem.team2.name}</span>
                                      </Link>
                                    </li>
                                  </ul>
                                  <div className="table-body-right">
                                    <Link
                                      href="#0"
                                      className="table-pointing-box">
                                      <span className="list">1</span>
                                      <span>5.58</span>
                                    </Link>
                                    <Link
                                      href="#0"
                                      className="table-pointing-box">
                                      <span className="list">2</span>
                                      <span>2.98</span>
                                    </Link>
                                    <Link
                                      href="#0"
                                      className="table-pointing-box">
                                      <span className="list">O 2.5</span>
                                      <span>1.84</span>
                                    </Link>
                                    <Link
                                      href="#0"
                                      className="table-pointing-box">
                                      <span className="list">U 2.5</span>
                                      <span>5.7</span>
                                    </Link>
                                    <Link
                                      href="#0"
                                      className="table-pointing-box">
                                      <span className="last-digit">+25</span>
                                    </Link>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
              {/* <!--all tab End--> */}
            </div>
          </div>
        </div>
      </div>
      {/* <!--Main-body-tabing--> */}

      {/* <!--Sponsor Section--> */}
      <Sponsor />
    </>
  );
};

export default baseball;
