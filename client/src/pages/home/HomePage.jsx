import * as React from "react";
import NavBar from "../../components/navbar/NavBar";
import "./home_style.css";
import { LocalConvenienceStoreOutlined, Subtitles } from "@mui/icons-material";
import CurrencyBalance from "../../components/currency_balance/CurrencyBalance";
import axios from "axios";

import {BACKEND_URL} from "../../constants.js"
// import {config} from "dotenv";
// config();

const HomePage = () => {
  const username = localStorage.getItem("username");
  const token = localStorage.getItem("token");

  const [balances, setBalances] = React.useState([]);
  const symbols = {
    ARS: ["$", "🇦🇷"],
    CLP: ["$", "🇨🇱"],
    EUR: ["€", "🇪🇺"],
    TRY: ["₺", "🇹🇷"],
    USD: ["$", "🇺🇸"],
    GBP: ["£", "🇬🇧"],
  };

  React.useEffect(() => {
    const getBalances = async () => {
      try {
        const res = await axios.get(BACKEND_URL+`/users/balance`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const unsorted_balances = res.data.msg.map((balance) => {
          return [balance.currency, balance.amount];
        });

        setBalances(unsorted_balances.sort((a, b) => b[1] - a[1]));
      } catch (e) {
        console.log(e);
      }
    };

    getBalances();
  }, []);

  return (
    <>
      <div style={{ display: "flex", direction: "column" }}>
        <NavBar active="Home" />
        <div style={{ marginTop: 30, width: "100%" }}>
          <h1 className="page-title">Hi, {username}!</h1>
          <h1 className="page-subtitle">Your balance is</h1>
          <div
            style={{
              display: "flex",
              gap: "30px",
              flexWrap: "wrap",
              marginLeft: 70,
              marginRight: 70,
              marginTop: 50,
            }}
          >
            {balances.map((balance) => {
              return (
                <CurrencyBalance
                  key={balance[0]}
                  currency={balance[0]}
                  symbol={symbols[balance[0]][0]}
                  flag={symbols[balance[0]][1]}
                  balance={balance[1]}
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;

{
  /* <CurrencyBalance currency="GBP" symbol="£" flag="🇬🇧" balance={GBPbalance} />; */
}
