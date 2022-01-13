const express = require("express");
const axios = require("axios");

const { sequelize, crypto } = require("./models");
const {OP} = require('sequelize');
const { wazirx, cdx ,zeb, buyucoin, bitbns} = require('./utils');
// const bitbns = new bitbnsApi();

// const {Coin} = require('./models/coin');

const app = express();
app.use(express.json());

// const bitbnsApi = require('bitbns');

// setInterval(() => {console.log("this is the third message")}, 1000);

app.get("/", async (req, res) => {
  
  
  try {
      setInterval(async() => {
      const wrxData = await wazirx();
      const cdxData = await cdx();
      const zebData = await zeb();
      const bitbnsData = await bitbns();
      // const buyucoinData = await buyucoin();
      // console.log(buyucoinData)
      res.send({wazirx: wrxData, cdx: cdxData, zeb: zebData, bitbns: bitbnsData});
    }, 60000);
  } catch (err) {
    console.log("error", err);
    res.send(err);
  }
});

app.post('/coins', async(req, res) => {
    const { coinName } = req.body;
    try {
        const data = await crypto.findAll({
            attributes: ['name', 'last_trade_price', 'sell', 'buy'],
            where: { coin: coinName },
            order: [
                ['createdAt', 'DESC']
            ]
        });
        // console.log(data);
        res.send({maindata: data});
    } catch(err) {
        console.log("error", err);
        res.send(err);
    }
});


app.listen(
  {
    port: 9000,
  },  async () => {
    console.log("server started at http://localhost:9000");
    await sequelize.authenticate();
    await sequelize.sync();
    console.log("Database connected");
  }
);

// async function main(){

//   await sequelize.sync()
// }
// main()
//  const cn =  await axios.get('https://api.wazirx.com/api/v2/tickers')
