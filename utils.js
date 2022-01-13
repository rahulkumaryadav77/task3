const express = require("express");
const axios = require("axios");
const bitbnsApi = require("bitbns");

const {
    sequelize,
    crypto
} = require("./models");

const bbns = new bitbnsApi({
    apiKey: "A9F07A9EC65E4C56B13083FF93CE5FA6",
    apiSecretKey: "36F918C6888CAC945DC134287C6C4998",
});

module.exports = {
    wazirx: async () => {
        try {
            const wrx = await axios.get("https://api.wazirx.com/api/v2/tickers");
            let wrxArr = [],
                newCoin;
            Object.keys(wrx.data).forEach((key) => {
                // console.log(key)
                if (
                    key == "btcinr" ||
                    key == "ethinr" ||
                    key == "usdtinr" ||
                    key == "xrpinr" ||
                    key == "trxinr" ||
                    key == "dashinr" ||
                    key == "zecinr" ||
                    key == "xeminr" ||
                    key == "wininr" ||
                    key == "bttinr" ||
                    key == "wrxinr" ||
                    key == "iostinr"
                ) {
                    wrxArr.push(wrx.data[key]);
                }
            });
            for (let coin of wrxArr) {
                newCoin = await crypto.create({
                    coin: coin.name.replace("/INR", ""),
                    name: "WazirX",
                    last_trade_price: coin.last,
                    buy: coin.buy,
                    sell: coin.sell,
                });
            }
            const data = await crypto.findAll({
                where: {
                    name: "WazirX"
                },
                order: [
                    ["createdAt", "DESC"]
                ],
                limit: 12,
            });
            return data;
        } catch (err) {
            return err;
        }
    },
    cdx: async () => {
        try {
            const cdx = await axios.get("https://api.coindcx.com/exchange/ticker");
            let newCoin;
            for (let coin of cdx.data) {
                if (
                    coin.market == "BTCINR" ||
                    coin.market == "ETHINR" ||
                    coin.market == "USDTINR" ||
                    coin.market == "XRPINR" ||
                    coin.market == "TRXINR" ||
                    coin.market == "DASHINR" ||
                    coin.market == "ZECINR" ||
                    coin.market == "XEMINR" ||
                    coin.market == "WININR" ||
                    coin.market == "BTTINR" ||
                    coin.market == "WRXINR" ||
                    coin.market == "IOSTINR"
                ) {
                    newCoin = await crypto.create({
                        coin: coin.market.replace("INR", ""),
                        name: "CDX",
                        last_trade_price: coin.last_price,
                        buy: coin.ask,
                        sell: coin.bid,
                    });
                }
            }
            const data = await crypto.findAll({
                where: {
                    name: "CDX"
                },
                order: [
                    ["createdAt", "DESC"]
                ],
                limit: 12,
            });
            return data;
        } catch (err) {
            return err;
        }
    },
    /*buyucoin: async() => {
          try {
              const buyucoin = await axios.get("https://api.buyucoin.com/ticker/v1.0/liveData");
              let newCoin;
              for (let coin of buyucoin.data) {
                  if (
                      coin.marketName == "INR-BTC" ||
                      coin.marketName == "INR-ETH" ||
                      coin.marketName == "INR-USDT" ||
                      coin.marketName == "INR-XRP" ||
                      coin.marketName == "INR-TRX" ||
                      coin.marketName == "INR-DASH" ||
                      coin.marketName == "INR-ZEC" ||
                      coin.marketName == "INR-XEM" ||
                      coin.marketName == "INR-WIN" ||
                      coin.marketName == "INR-BTT" ||
                      coin.marketName == "INR-WRX" ||
                      coin.marketName == "INR-IOST"
                    ) {
                        newCoin = await crypto.create({
                          coin: coin.marketName.replace('INR-', '').append('/INR'),
                          name: "BUYUCOIN",
                          last_trade_price: coin.LTRate,
                          buy: coin.LBRate,
                          sell: coin.LSRate,
                        });
                    }
              }
              console.log(newCoin)
              const data = await crypto.findAll({
                  where: {name: 'BUYUCOIN'},
                  order: [
                      ['createdAt', 'DESC']
                  ],
                  limit: 12
              });
              return data;
          } catch(err) {
              return err;
          }
      },*/
    zeb: async () => {
        try {
            const zebcoin = await axios.get("https://www.zebapi.com/pro/v1/market/");
            let newCoin;
            for (let coin of zebcoin.data) {
                if (
                    coin.pair == "BTC-INR" ||
                    coin.pair == "ETH-INR" ||
                    coin.pair == "USDT-INR" ||
                    coin.pair == "XRP-INR" ||
                    coin.pair == "TRX-INR" ||
                    coin.pair == "DASH-INR" ||
                    coin.pair == "ZEC-INR" ||
                    coin.pair == "XEM-INR" ||
                    coin.pair == "WIN-INR" ||
                    coin.pair == "BTT-INR" ||
                    coin.pair == "WRX-INR" ||
                    coin.pair == "IOST-INR"
                ) {
                    newCoin = await crypto.create({
                        coin: coin.pair.replace("-INR", ""),
                        name: "ZEBPAY",
                        last_trade_price: coin.market,
                        buy: coin.buy,
                        sell: coin.sell,
                    });
                }
            }
            const data = await crypto.findAll({
                where: {
                    name: "ZEBPAY"
                },
                order: [
                    ["createdAt", "DESC"]
                ],
                limit: 12,
            });
            return data;
        } catch (err) {
            return err;
        }
    },
    bitbns: async () => {
        try {
            bbns.fetchTickers(async(err, bitbns) => {
                if(err) {
                    return err;
                }
                // console.log(bitbns)
                let bitbnsArr = [],
                newCoin;
                Object.keys(bitbns).forEach((key) => {
                    // console.log(key)
                    if (
                        key == "BTC" ||
                        key == "ETH" ||
                        key == "USDT" ||
                        key == "XRP" ||
                        key == "TRX" ||
                        key == "DASH" ||
                        key == "ZEC" ||
                        key == "XEM" ||
                        key == "WIN" ||
                        key == "BTT" ||
                        key == "WRX" ||
                        key == "IOST"
                    ) {
                        bitbnsArr.push({coin: key, ...bitbns[key]});
                    }
                });
                for (let coin of bitbnsArr) {
                    newCoin = await crypto.create({
                        coin,
                        name: "BitBns",
                        last_trade_price: coin.last_traded_price,
                        buy: coin.highest_buy_bid,
                        sell: coin.lowest_sell_bid,
                    });
                }
                // console.log(newCoin);
            });
            const data = await crypto.findAll({
                where: {
                    name: "BitBns"
                },
                order: [
                    ["createdAt", "DESC"]
                ],
                limit: 12,
            });
            return data;
        } catch (err) {
            return err;
        }
    }
};