const fetch = require('node-fetch');
const urlBitmex =
  'https://www.bitmex.com/api/v1/orderBook/L2?symbol=XBT&depth=10';
const urlBitfinex =
  'https://api.bitfinex.com/v1/book/btcusd?limit_bids=10&limit_asks=10';
let lowestAskPrice = 0;
let lowestSellPrice = 0;

async function requestBitfinex(url) {
  try {
    const req = await fetch(`${url}`);
    const response = await req.json().then((res) => {
      for (let i = 0; i < res.asks.length; i++) {
        if (res.asks[i].price < lowestAskPrice || lowestAskPrice == 0) {
          lowestAskPrice = res.asks[i].price;
        }
    }
    console.log("lowest ask price for Bitfinex " +lowestAskPrice);
    });
  } catch (err) {
    console.log(err);
  }
}
async function requestBitmex(url) {
  try {
    const req = await fetch(`${url}`);
    const response = await req.json().then((res) => {
      for (let i = 0; i < res.length; i++) {
        if (
          (res[i].side == 'Sell' && res[i].price < lowestSellPrice) ||
          lowestSellPrice == 0
        ) {
          lowestSellPrice = res[i].price;
        }
      }
    });
    console.log("lowest sell price for Bitmex "+lowestSellPrice);
    
  } catch (err) {
    console.log(err);
  }
}

requestBitfinex(urlBitfinex); //bid et ask
requestBitmex(urlBitmex); //sell et buy
