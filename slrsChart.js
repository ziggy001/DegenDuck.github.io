var chart = LightweightCharts.createChart(document.getElementById("tvchart"), {
  width: 1435,
  height: 821,
  layout: {
    backgroundColor: "#000",
    textColor: "rgba(255, 255, 255, 0.9)",
  },
  grid: {
    vertLines: {
      color: "#000",
    },
    horzLines: {
      color: "#000",
    },
  },
  crosshair: {
    mode: LightweightCharts.CrosshairMode.Normal,
  },
  rightPriceScale: {
    borderColor: "rgba(197, 203, 206, 0.8)",
  },
  timeScale: {
    borderColor: "rgba(197, 203, 206, 0.8)",
  },
});

var candleSeries = chart.addCandlestickSeries({
  upColor: "#26A69A",
  downColor: "#F05250",
  borderDownColor: "#F05250",
  borderUpColor: "#26A69A",
  wickDownColor: "#F05250",
  wickUpColor: "#26A69A",
});

candleSeries.applyOptions({
  priceFormat: {
    precision: 5,
    minMove: 0.00001,
  },
});

let xhReq = new XMLHttpRequest();
xhReq.open(
  "GET",
  "https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd",
  false
);
xhReq.send(null);
let solDetails = JSON.parse(xhReq.responseText);
solPrice = solDetails.solana.usd;

fetch(
  "https://ftx.com/api/markets/SLRS/USD/candles?resolution=86400&limit=5000"
)
  .then((res) => res.json())
  .then((data) => {
    const cdata = data.result.map((d) => {
      return {
        time: d.time / 1000,
        open: parseFloat(d.open / solPrice),
        high: parseFloat(d.high / solPrice),
        low: parseFloat(d.low / solPrice),
        close: parseFloat(d.close / solPrice),
      };
    });
    candleSeries.setData(cdata);
    console.log(cdata);
  })
  .catch((err) => console.log(err));
