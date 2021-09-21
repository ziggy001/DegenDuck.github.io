let wsForSol = new WebSocket("wss://ftx.com/ws/");

let xhReq = new XMLHttpRequest();
xhReq.open(
  "GET",
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=cope%2Csolfarm%2Csolrise-finance&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=24h",
  false
);
xhReq.send(null);
let data = JSON.parse(xhReq.responseText);

let priceOfSol = document.getElementById("price");
let lastPriceOfSol = null;

var msg = {
  op: "subscribe",
  channel: "ticker",
  market: "SOL/USD",
};

wsForSol.onopen = (event) => {
  wsForSol.send(JSON.stringify(msg));
};

wsForSol.onmessage = (event) => {
  let object = JSON.parse(event.data);
  let price = parseFloat(object.data.last).toFixed(2);

  priceOfSol.innerText = "$ " + price;

  priceOfSol.style.color =
    !lastPriceOfSol || lastPriceOfSol === price
      ? "rgb(177, 174, 174)"
      : price > lastPriceOfSol
      ? "green"
      : "rgb(158, 6, 6)";

  lastPriceOfSol = price;
};

// FOR COPE

let wsForCope = new WebSocket("wss://ftx.com/ws/");
let copePrice = document.getElementById("copePrice");
let lastPriceOfCope = null;
let copePriceInSol = document.getElementById("copePriceInSol");
let cope24h_high = document.getElementById("cope24h-high");
let cope24h_low = document.getElementById("cope24h-low");
let cope24h_change = document.getElementById("cope24h-change");

var msgCope = {
  op: "subscribe",
  channel: "ticker",
  market: "COPE/USD",
};

wsForCope.onopen = (event) => {
  wsForCope.send(JSON.stringify(msgCope));
};

wsForCope.onmessage = (event) => {
  let copeObject = JSON.parse(event.data);
  let PriceOfCope = parseFloat(copeObject.data.last).toFixed(3);
  copePrice.innerText = "$ " + PriceOfCope;

  copePrice.style.color =
    !lastPriceOfCope || lastPriceOfCope === PriceOfCope
      ? "rgb(177, 174, 174)"
      : PriceOfCope > lastPriceOfCope
      ? "green"
      : "rgb(158, 6, 6)";

  lastPriceOfCope = PriceOfCope;
  PriceOfCopeInSol = parseFloat(lastPriceOfCope / lastPriceOfSol).toFixed(4);
  copePriceInSol.innerText = "  ◎ " + PriceOfCopeInSol;

  let cope_24h_high = parseFloat(data[0].high_24h / lastPriceOfSol).toFixed(4);
  cope24h_high.innerText = "  ◎ " + cope_24h_high;

  let cope_24h_low = parseFloat(data[0].low_24h / lastPriceOfSol).toFixed(4);
  cope24h_low.innerText = "  ◎ " + cope_24h_low;

  let cope_24h_change = data[0].price_change_percentage_24h;
  cope24h_change.innerText = cope_24h_change.toFixed(2) + " %";
  cope24h_change.style.color = cope_24h_change < 0 ? "rgb(158, 6, 6)" : "green";
};

//For solrise finance

let wsForSlrs = new WebSocket("wss://ftx.com/ws/");
let slrsPrice = document.getElementById("slrsPrice");
let lastPriceOfSlrs = null;
let slrsPriceInSol = document.getElementById("slrsPriceInSol");
let slrs24h_high = document.getElementById("slrs24h-high");
let slrs24h_low = document.getElementById("slrs24h-low");
let slrs24h_change = document.getElementById("slrs24h-change");

var msgSlrs = {
  op: "subscribe",
  channel: "ticker",
  market: "SLRS/USD",
};

wsForSlrs.onopen = (event) => {
  wsForSlrs.send(JSON.stringify(msgSlrs));
};

wsForSlrs.onmessage = (event) => {
  let slrsObject = JSON.parse(event.data);
  let PriceOfSlrs = parseFloat(slrsObject.data.last).toFixed(3);
  slrsPrice.innerText = "$ " + PriceOfSlrs;

  slrsPrice.style.color =
    !lastPriceOfSlrs || lastPriceOfSlrs === PriceOfSlrs
      ? "rgb(177, 174, 174)"
      : PriceOfSlrs > lastPriceOfSlrs
      ? "green"
      : "rgb(158, 6, 6)";

  lastPriceOfSlrs = PriceOfSlrs;
  PriceOfSlrsInSol = parseFloat(lastPriceOfSlrs / lastPriceOfSol).toFixed(4);
  slrsPriceInSol.innerText = "  ◎ " + PriceOfSlrsInSol;

  let slrs_24h_high = parseFloat(data[1].high_24h / lastPriceOfSol).toFixed(4);
  slrs24h_high.innerText = "  ◎ " + slrs_24h_high;

  let slrs_24h_low = parseFloat(data[1].low_24h / lastPriceOfSol).toFixed(4);
  slrs24h_low.innerText = "  ◎ " + slrs_24h_low;

  let slrs_24h_change = data[1].price_change_percentage_24h;
  slrs24h_change.innerText = slrs_24h_change.toFixed(2) + " %";
  slrs24h_change.style.color = slrs_24h_change < 0 ? "rgb(158, 6, 6)" : "green";
};

//For solFarm

let wsForTulip = new WebSocket("wss://ftx.com/ws/");
let TulipPrice = document.getElementById("tulipPrice");
let lastPriceOfTulip = null;
let TulipPriceInSol = document.getElementById("tulipPriceInSol");
let Tulip24h_high = document.getElementById("tulip24h-high");
let Tulip24h_low = document.getElementById("tulip24h-low");
let Tulip24h_change = document.getElementById("tulip24h-change");

var msgTulip = {
  op: "subscribe",
  channel: "ticker",
  market: "TULIP/USD",
};

wsForTulip.onopen = (event) => {
  wsForTulip.send(JSON.stringify(msgTulip));
};

wsForTulip.onmessage = (event) => {
  let TulipObject = JSON.parse(event.data);
  let PriceOfTulip = parseFloat(TulipObject.data.last).toFixed(3);
  TulipPrice.innerText = "$ " + PriceOfTulip;

  TulipPrice.style.color =
    !lastPriceOfTulip || lastPriceOfTulip === PriceOfTulip
      ? "rgb(177, 174, 174)"
      : PriceOfTulip > lastPriceOfTulip
      ? "green"
      : "rgb(158, 6, 6)";

  lastPriceOfTulip = PriceOfTulip;
  PriceOfTulipInSol = parseFloat(lastPriceOfTulip / lastPriceOfSol).toFixed(4);
  TulipPriceInSol.innerText = "  ◎ " + PriceOfTulipInSol;

  let Tulip_24h_high = parseFloat(data[2].high_24h / lastPriceOfSol).toFixed(4);
  Tulip24h_high.innerText = "  ◎ " + Tulip_24h_high;

  let Tulip_24h_low = parseFloat(data[2].low_24h / lastPriceOfSol).toFixed(4);
  Tulip24h_low.innerText = "  ◎ " + Tulip_24h_low;

  let Tulip_24h_change = data[2].price_change_percentage_24h;
  Tulip24h_change.innerText = Tulip_24h_change.toFixed(2) + " %";
  Tulip24h_change.style.color =
    Tulip_24h_change < 0 ? "rgb(158, 6, 6)" : "green";
};
