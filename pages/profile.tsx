import Link from "next/link";
import React, { useState, useEffect } from "react";
import BreadCrumb from "@/components/BreadCrumb";
import Sponsor from "@/components/Sponsor";
import { auth } from "@/firebase";
import { onAuthStateChanged, User } from "firebase/auth";

const profile = () => {
  const [user, setUser] = useState<User | null>(null); // Typage de l'état user

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user); // Si l'utilisateur est connecté, mettez à jour l'état
      } else {
        setUser(null); // Si l'utilisateur n'est pas connecté, mettez l'état à null
      }
    });

    return () => unsubscribe(); // Nettoyage de l'écouteur lorsque le composant est démonté
  }, []);

  const annees = [];
  for (let year = 1960; year <= 2007; year++) {
    annees.push(
      // @ts-ignore
      <option key={year} value={year}>
        {year}
      </option>
    );
  }

  return (
    <>
      <BreadCrumb title="Profile" />
      {/* <!--Breadcumnd--> */}

      {/* <!--profile--> */}
      <div className="profile-section pb-60">
        <div className="container">
          <div className="profile-tab">
            <ul className="nav">
              <li className="nav-item">
                <Link
                  className="nav-link link-secondary active"
                  id="profile-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#profile1"
                  href="#"
                >
                  <span>Profile</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link link-secondary"
                  id="profile-tab01"
                  data-bs-toggle="tab"
                  data-bs-target="#profile2"
                  href="#"
                >
                  <span>récompenses</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link link-secondary"
                  id="profile-tab02"
                  data-bs-toggle="tab"
                  data-bs-target="#profile3"
                  href="#"
                >
                  <span>récompenses</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link link-secondary"
                  id="profile-tab03"
                  data-bs-toggle="tab"
                  data-bs-target="#profile4"
                  href="#"
                >
                  <span>portefeuille</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link link-secondary"
                  id="profile-tab04"
                  data-bs-toggle="tab"
                  data-bs-target="#profile5"
                  href="#"
                >
                  <span>Verification</span>
                </Link>
              </li>
              {/* <li className="nav-item">
                <Link
                  className="nav-link link-secondary"
                  id="profile-tab05"
                  data-bs-toggle="tab"
                  data-bs-target="#profile6"
                  href="#"
                >
                  <span>Deconnexion</span>
                </Link>
              </li> */}
            </ul>
          </div>
          <div className="tab-content pt-60" id="pro-wrap">
            <div
              className="tab-pane fade show active"
              id="profile1"
              role="tabpanel"
            >
              <div className="row">
                <div className="col-xxl-7 col-xl-12 col-lg-7">
                  <div className="profile-left-wrap">
                    <div className="accounts-box">
                      <span>Compte</span>
                      <p>Utilisateur Connecter: user.email</p>
                      <Link href="#0">RÉINITIALISER LE BÉNÉFICE NET</Link>
                    </div>
                    <div className="form-box">
                      <div className="form-head">
                        <span>Detail</span>
                      </div>
                      <form action="#0">
                        <div className="form-grp">
                          {/* <input type="text" placeholder="entrer votre nom" /> */}
                          <input
                            type="text"
                            placeholder={user?.name || "entrer votre nom"}
                          />
                          <div className="left-icon">
                            <i className="fas fa-user"></i>
                          </div>
                          <div className="right-lock">
                            <i className="fa-solid fa-lock"></i>
                          </div>
                        </div>
                        <div className="form-grp form-grp-two">
                          <input
                            type="email"
                            placeholder={user?.email || "Entrez votre email"}
                          />

                          <div className="left-icon">
                            <i className="fas fa-envelope"></i>
                          </div>
                          <div className="right-lock">
                            <i className="fa-solid fa-lock"></i>
                          </div>
                          <Link href="#0" className="repeat">
                            <i className="fas fa-repeat"></i>
                          </Link>
                        </div>
                        <div className="form-grp">
                          <input type="number" placeholder="+225 0001010101" />
                          <div className="left-icon">
                            <i className="fas fa-phone"></i>
                          </div>
                          <div className="right-lock">
                            <i className="fa-solid fa-lock"></i>
                          </div>
                        </div>
                      </form>
                    </div>
                    <div className="change-picture-box">
                      <div className="head">
                        <span>Changer sa photo de profiles</span>
                      </div>
                      <div className="change-box">
                        <div className="down">
                          <img src="/img/table/details/picture.png" alt="img" />
                        </div>
                        <Link href="#0">Ajouter une pièce d'identité</Link>
                        <p>
                          Fichiers pris en charge : JPG, JPEG, PNG, BMP PDF, TIE
                          TIFF avec une taille maximale de 5 ME
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <div className="col-xxl-5 col-xl-12 col-lg-5">
                  <div className="right-lebel">
                    <div className="verification">
                      <span>Verification</span>

                      <h6>O tâches accomplies sur 3</h6>
                      <span className="bar"></span>
                    </div>
                    <ul className="lebel-wrap">
                      <li>
                        <span className="text1">N 1</span>
                        <Link href="#0" className="text2">
                          Click here to complete
                        </Link>
                      </li>
                      <li>
                        <span>Level 2</span>
                        <Link href="#0">Complete level 1 first</Link>
                      </li>
                      <li>
                        <span>Level 3</span>
                        <Link href="#0">Complete level 1 first</Link>
                      </li>
                    </ul>
                  </div>
                </div> */}
              </div>
            </div>
            <div className="tab-pane fade" id="profile2" role="tabpanel">
              <div className="row">
                <div className="col-lg-12">
                  <div className="setting-wrap">
                    <div className="setting-box">
                      <h4>Language</h4>
                      <select name="setting-select" id="setting">
                        <option value="1">Francais</option>
                      </select>
                    </div>
                    <div className="setting-box">
                      <h4>Longueur de l'historique du chat</h4>
                      <div className="history">
                        <span className="current-text">
                          Visibilité du bouton d'assistance en ligne :
                        </span>
                        <Link href="#0" className="cmn--btn">
                          <span>50</span>
                        </Link>
                      </div>
                    </div>
                    <div className="setting-box">
                      <h4>Support en Live</h4>
                      <div className="history">
                        <span className="current-text">
                          Current history length:
                        </span>
                        <Link href="#0" className="cmn--btn">
                          <span>Visible</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="tab-pane fade" id="profile4" role="tabpanel">
              <div className="row justify-content-between">
                <h3 className="wallet-title">Déposer ou retirer de l'argent</h3>
                <div className="wallet-tab-wrap">
                  <ul className="nav">
                    <li className="nav-item">
                      <Link
                        className="nav-link link-secondary active"
                        id="wallet-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#wallet1"
                        href="#"
                      >
                        <span>Faire un Dépot</span>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        className="nav-link link-secondary"
                        id="wallet-tab01"
                        data-bs-toggle="tab"
                        data-bs-target="#wallet2"
                        href="#"
                      >
                        <span>Retrait</span>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        className="nav-link link-secondary"
                        id="wallet-tab03"
                        data-bs-toggle="tab"
                        data-bs-target="#wallet3"
                        href="#"
                      >
                        <span>Transactions</span>
                      </Link>
                    </li>
                  </ul>
                  {/* <div className="gift-card">
                    <Link href="#0" className="left-cart">
                      <span>
                        <img src="/img/table/details/gitft.png" alt="img" />
                      </span>
                      <span>Redeem Gift Card</span>
                    </Link>
                    <Link href="#0" className="cmn--btn">
                      <span>Claim</span>
                    </Link>
                  </div> */}
                </div>
                <div className="tab-content" id="wall-wrap">
                  <div
                    className="tab-pane fade show active"
                    id="wallet1"
                    role="tabpanel"
                  >
                    <div className="currency-wrap">
                      <h5 className="currency-title">Mobile Money</h5>

                      <div className="row mb-4 g-3">
                        <div className="col-lg-6">
                          <div className="bitcoin-item">
                            <Link href="#0" className="icon-wrap">
                              <span className="icon">
                                <img
                                  src="/img/table/details/bitcoin.jpg"
                                  alt="icon"
                                  width={40}
                                />
                              </span>
                              <span>MTN CI</span>
                            </Link>
                            <Link href="#0">
                              {/* <span> 1 BTC = $19565.46</span> */}
                            </Link>
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="bitcoin-item">
                            <Link href="#0" className="icon-wrap">
                              <span className="icon">
                                <img
                                  src="/img/table/details/ethereum.jpg"
                                  alt="icon"
                                  width={40}
                                />
                              </span>
                              <span>Orange CI</span>
                            </Link>
                            <Link href="#0">
                              {/* <span> 1 ETH = $1343.21</span> */}
                            </Link>
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="bitcoin-item">
                            <Link href="#0" className="icon-wrap">
                              <span className="icon">
                                <img
                                  src="/img/table/details/thether.jpg"
                                  alt="icon"
                                  width={40}
                                />
                              </span>
                              <span>WAVE CI</span>
                            </Link>
                            <Link href="#0">
                              {/* <span> 1 USDT = $1.00</span> */}
                            </Link>
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="bitcoin-item">
                            <Link href="#0" className="icon-wrap">
                              <span className="icon">
                                <img
                                  src="/img/table/details/litecoin.jpg"
                                  width={40}
                                  alt="icon"
                                />
                              </span>
                              <span>MOOV Africa</span>
                            </Link>
                            <Link href="#0">
                              {/* <span> 1 LTC = $53.76</span> */}
                            </Link>
                          </div>
                        </div>
                      </div>
                      <h5 className="currency-title">Dépot Bancaire</h5>
                      <div className="row mb-4 g-3">
                        <div className="col-lg-4">
                          <div className="bitcoin-item">
                            <Link href="#0" className="icon-wrap">
                              <span className="icon">
                                <img
                                  src="/img/table/details/b1.png"
                                  alt="icon"
                                />
                              </span>
                              <span>Ecopayz</span>
                            </Link>
                          </div>
                        </div>
                        <div className="col-lg-4">
                          <div className="bitcoin-item">
                            <Link href="#0" className="icon-wrap">
                              <span className="icon">
                                <img
                                  src="/img/table/details/b2.png"
                                  alt="icon"
                                />
                              </span>
                              <span>Cards through PayDo wallet top-up</span>
                            </Link>
                          </div>
                        </div>
                      </div>
                      <h5 className="currency-title">Carte de credit</h5>
                      <div className="row g-3">
                        <div className="col-lg-4">
                          <div className="bitcoin-item">
                            <Link href="#0" className="icon-wrap">
                              <span className="icon">
                                <img
                                  src="/img/table/details/master.png"
                                  alt="icon"
                                />
                              </span>
                              <span>MasterCard</span>
                            </Link>
                          </div>
                        </div>
                        <div className="col-lg-4">
                          <div className="bitcoin-item">
                            <Link href="#0" className="icon-wrap">
                              <span className="icon">
                                <img
                                  src="/img/table/details/visa.png"
                                  alt="icon"
                                />
                              </span>
                              <span>Visa</span>
                            </Link>
                          </div>
                        </div>
                        <div className="col-lg-4">
                          <div className="bitcoin-item">
                            <Link href="#0" className="icon-wrap">
                              <span className="icon">
                                <img
                                  src="/img/table/details/paypal.png"
                                  alt="icon"
                                />
                              </span>
                              <span>Paypal</span>
                            </Link>
                          </div>
                        </div>
                        <div className="col-lg-4">
                          <div className="bitcoin-item">
                            <Link href="#0" className="icon-wrap">
                              <span className="icon">
                                <img
                                  src="/img/table/details/paysafe.png"
                                  alt="icon"
                                />
                              </span>
                              <span>Paysafecard</span>
                            </Link>
                          </div>
                        </div>
                        <div className="col-lg-4">
                          <div className="bitcoin-item">
                            <Link href="#0" className="icon-wrap">
                              <span className="icon">
                                <img
                                  src="/img/table/details/gplay.png"
                                  alt="icon"
                                />
                              </span>
                              <span>Google Pay</span>
                            </Link>
                          </div>
                        </div>
                        <div className="col-lg-4">
                          <div className="bitcoin-item">
                            <Link href="#0" className="icon-wrap">
                              <span className="icon">
                                <img
                                  src="/img/table/details/trustly.png"
                                  alt="icon"
                                />
                              </span>
                              <span>Trustly</span>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="tab-pane fade" id="wallet2" role="tabpanel">
                    <div className="currency-wrap">
                      <h5 className="currency-title">Crypto Currencies</h5>
                      <div className="row mb-4 g-3">
                        <div className="col-lg-6">
                          <div className="bitcoin-item">
                            <Link href="#0" className="icon-wrap">
                              <span className="icon">
                                <img
                                  src="/img/table/details/bitcoin.png"
                                  alt="icon"
                                />
                              </span>
                              <span>Bitcoin</span>
                            </Link>
                            <Link href="#0">
                              {/* <span> 1 BTC = $19565.46</span> */}
                            </Link>
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="bitcoin-item">
                            <Link href="#0" className="icon-wrap">
                              <span className="icon">
                                <img
                                  src="/img/table/details/ethereum.png"
                                  alt="icon"
                                />
                              </span>
                              <span>Ethereum</span>
                            </Link>
                            <Link href="#0">
                              {/* <span> 1 ETH = $1343.21</span> */}
                            </Link>
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="bitcoin-item">
                            <Link href="#0" className="icon-wrap">
                              <span className="icon">
                                <img
                                  src="/img/table/details/thether.png"
                                  alt="icon"
                                />
                              </span>
                              <span>TETHER</span>
                            </Link>
                            <Link href="#0">
                              {/* <span> 1 USDT = $1.00</span> */}
                            </Link>
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="bitcoin-item">
                            <Link href="#0" className="icon-wrap">
                              <span className="icon">
                                <img
                                  src="/img/table/details/litecoin.png"
                                  alt="icon"
                                />
                              </span>
                              <span>Litecoin</span>
                            </Link>
                            <Link href="#0">
                              {/* <span> 1 LTC = $53.76</span> */}
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="tab-pane fade" id="wallet3" role="tabpanel">
                    <div className="description-table">
                      <table>
                        <tbody>
                          <tr>
                            <th>Amount</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th>Action</th>
                          </tr>
                          <tr className="tb1">
                            <td>
                              <span className="text1">-$620</span>
                            </td>
                            <td>
                              04:02 PM
                              <span>10 Mar 2023</span>
                            </td>
                            <td>In Progress</td>
                            <td>
                              <span className="text1">Withdraw</span>
                            </td>
                          </tr>
                          <tr className="tb2">
                            <td>
                              <span className="text1">-$420</span>
                            </td>
                            <td>
                              05:02 PM
                              <span>10 Mar 2023</span>
                            </td>
                            <td>Completed</td>
                            <td>
                              <span className="text1">Deposit</span>
                            </td>
                          </tr>
                          <tr className="tb1">
                            <td>
                              <span className="text1">-$220</span>
                            </td>
                            <td>
                              11:2 PM
                              <span>10 Mar 2023</span>
                            </td>
                            <td>Pending</td>
                            <td>
                              <span className="text1">Withdraw</span>
                            </td>
                          </tr>
                          <tr className="tb2">
                            <td>
                              <span className="text1">-$320</span>
                            </td>
                            <td>
                              09:45 PM
                              <span>10 Mar 2023</span>
                            </td>
                            <td>Completed</td>
                            <td>
                              <span className="text1">Deposit</span>
                            </td>
                          </tr>
                          <tr className="tb1">
                            <td>
                              <span className="text1">-$920</span>
                            </td>
                            <td>
                              07:20 PM
                              <span>10 Mar 2023</span>
                            </td>
                            <td>Pending</td>
                            <td>
                              <span className="text1">Withdraw</span>
                            </td>
                          </tr>
                          <tr className="tb1">
                            <td>
                              <span className="text1">-$920</span>
                            </td>
                            <td>
                              03:53 PM
                              <span>10 Mar 2023</span>
                            </td>
                            <td>Cancelled</td>
                            <td>
                              <span className="text1">Rédrait</span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="tab-pane fade" id="profile5" role="tabpanel">
              <div className="varification">
                <div className="varification-head">
                  <h4>Verification</h4>
                  <p>
                    Pour des raisons de sécurité et de conformité, veuillez
                    vérifier votre identité en téléchargeant un document
                    officiel. Cette étape est essentielle pour accéder
                    pleinement à nos services.
                  </p>
                </div>
                <form action="#0">
                  <span className="title">Information Personnel</span>
                  <div className="row mb-4 g-3">
                    <div className="col-xxl-2 col-xl-4">
                      <div className="form-grp">
                        <input type="text" placeholder="Genre" />
                        <i className="fas fa-user"></i>
                      </div>
                    </div>
                    <div className="col-xxl-5 col-xl-4">
                      <div className="form-grp">
                        <input type="text" placeholder="Prénom" />
                        <i className="fas fa-user"></i>
                      </div>
                    </div>
                    <div className="col-xxl-5 col-xl-4">
                      <div className="form-grp">
                        <input type="text" placeholder="Nom" />
                        <i className="fas fa-user"></i>
                      </div>
                    </div>
                  </div>
                  <span className="title">Date de naissance</span>
                  <div className="year-wrap mb-4">
                    <div className="row">
                      <div className="col-xxl-5 col-xl-12">
                        <div className="date-wrap">
                          <div className="items">
                            <select name="year" id="year-select2my">
                              <option value="">Année</option>
                              {annees}
                            </select>
                            <span className="icon">
                              <i className="fas fa-thumbtack"></i>
                            </span>
                          </div>
                          <div className="items">
                            <select name="year" id="year-select2">
                              <option value="1">Mois</option>
                              <option value="1">Janvier</option>
                              <option value="1">Février</option>
                              <option value="1">Mars</option>
                              <option value="1">Avril</option>
                              <option value="1">Mai</option>
                              <option value="1">Juin</option>
                              <option value="1">Juillet</option>
                              <option value="1">Août</option>
                              <option value="1">Septembre</option>
                              <option value="1">Octobre</option>
                              <option value="1">Novembre</option>
                              <option value="1">Décembre</option>
                            </select>
                            <span className="icon">
                              <i className="fas fa-thumbtack"></i>
                            </span>
                          </div>
                          <div className="items">
                            <select name="year" id="year-select3">
                              <option value="1">Jour</option>
                              <option value="1">1</option>
                              <option value="1">2</option>
                              <option value="1">3</option>
                              <option value="1">4</option>
                              <option value="1">5</option>
                              <option value="1">6</option>
                              <option value="1">7</option>
                              <option value="1">8</option>
                              <option value="1">9</option>
                              <option value="1">10</option>
                              <option value="1">11</option>
                              <option value="1">12</option>
                              <option value="1">13</option>
                              <option value="1">14</option>
                              <option value="1">15</option>
                              <option value="1">16</option>
                              <option value="1">17</option>
                              <option value="1">18</option>
                              <option value="1">19</option>
                              <option value="1">20</option>
                              <option value="1">21</option>
                              <option value="1">22</option>
                              <option value="1">23</option>
                              <option value="1">24</option>
                              <option value="1">25</option>
                              <option value="1">26</option>
                              <option value="1">28</option>
                              <option value="1">29</option>
                              <option value="1">30</option>
                              <option value="1">31</option>
                            </select>
                            <span className="icon">
                              <i className="fas fa-thumbtack"></i>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <span className="title">Address</span>
                  <div className="row g-3">
                    <div className="col-lg-6">
                      <div className="form-grp form-grp-two">
                        <input type="text" placeholder="Address" />
                        <i className="fas fa-thumbtack"></i>
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="form-grp form-grp-two">
                        <input
                          type="text"
                          placeholder="Address (Additional information)"
                        />
                        <i className="fas fa-thumbtack"></i>
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="form-grp form-grp-two">
                        <input type="text" placeholder="ZIP / Postal Code" />
                        <i className="fas fa-thumbtack"></i>
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="form-grp form-grp-two">
                        <input type="text" placeholder="City" />
                        <i className="fas fa-thumbtack"></i>
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="form-grp form-grp-two">
                        <input type="text" placeholder="State or Province" />
                        <i className="fas fa-thumbtack"></i>
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="date-wrap">
                        <div className="items items2 w-100">
                          <select name="year" id="year-select">
                            <option value="1">Pays de Naissance</option>
                            <option value="1">Côte d'ivoire</option>
                          </select>
                          <span className="icon">
                            <i className="fas fa-thumbtack"></i>
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="col-xxl-6 col-xl-12">
                      <div className="form-grp form-label">
                        <label
                          className="form-check-label d-flex align-items-center"
                          htmlFor="coun"
                        >
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            id="coun"
                            checked
                          />
                          Je vérifie que le document soumis est exact.
                        </label>
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="form-grp">
                        <button type="submit" className="cmn--btn">
                          <span>Envoyer Mes Informations</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
              <div className="row justify-content-between"></div>
            </div>
          </div>
        </div>
      </div>
      {/* <!--profile--> */}

      {/* <!--Sponsor Section--> */}
      <Sponsor />
    </>
  );
};

export default profile;
