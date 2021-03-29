$(document).ready(function () {
    //object holding coins and corresponding uuid
    const coins = {
        "Bitcoin": "Qwsogvtv82FCd",
        "Ethereum": "razxDUgYGNAdQ",
        "Litecoin": "D7B1x_ks7WhV5",
        "Holotoken": "iEHCPwcxoIH8e"
    };
    let uuid = "Qwsogvtv82FCd";
    const yearly = "1y";
    const monthly = "30d";
    const weekly = "7d";
    const daily = "24h";
    const coinRankingApiKey = "INSERT API KEY";
    let time = "24h";


    let numLength = function (n) {
        //console.log("" + n + ":" + String(n).length);
        //convert to string and get string length; COUNTS . in numlength
        return (("" + n).length);
    }

    $('input[name=timeFrameOption]').on("click", function () {
        if (time != $("input[name=timeFrameOption]:checked").val()) {
            time = $("input[name=timeFrameOption]:checked").val();
            console.log(time);
        }
    })

    //populate crypto dropdown selection list with all coins in coins           
    for (item in coins) {
        //console.log(item);
        //console.log(`<option value="${item}"> ${item} </option>`);
        $('#cryptoList').append(`<option value="${item}"> ${item} </option>`);
    }

    //whenever cryptolist changes update selected currency text and uuid
    $('#cryptoList').change(function () {
        var selectedCurrency = $(this).val();
        $("#currency").text(selectedCurrency);
        console.log(coins[selectedCurrency]);
        uuid = coins[selectedCurrency];
        console.log("uuid is set to " + uuid);
    });

    //get data button is clicked, either get coin info or get coin history
    //TODO just call both at once with a single graph function
    $('#getData').on("click", function () {
        console.log("getData btn clicked");
        console.log($('input:radio[name=data-Options]:checked').val());
        //if dataOptions radio value is history getCoinHistory(uuid, time)
        if ($('input:radio[name=data-Options]:checked').val() == "History") {
            getCoinHistory(uuid, time);
        } else {
            //else if dataOptions radio value is info getCoinData(uuid,time)
            if ($('input:radio[name=data-Options]:checked').val() == "Info") {
                getCoinData(uuid, time);
            }
        }
    })
    //TODO integrate these four functions better; maybe just one function api caller; but howto format graph data depending on which fn
    function getCoinData(currency, timeframe) {
        console.log("getCoinData called");

        var baseUrl = "https://api.coinranking.com/v2/coin/" + currency + "?timePeriod=" + timeframe;
        var proxyUrl = "https://cors.bridged.cc/";
        fetch(proxyUrl + baseUrl, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': coinRankingApiKey,
                    'Access-Control-Allow-Origin': "*"
                }
            })
            .then((response) => {
                if (response.ok) {
                    response.json().then((json) => {
                        console.log("getCoinDataResponse Success");
                        handlerFunctionA(json.data);
                    })
                }
            })
        console.log("getCoinData Success");
    }

    function getCoinHistory(currency, timeframe) {
        console.log("getCoinHistory Called");

        var baseUrl = "https://api.coinranking.com/v2/coin/" + currency + "/history/?timePeriod=" + timeframe;
        var proxyUrl = "https://cors.bridged.cc/";
        fetch(proxyUrl + baseUrl, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': coinRankingApiKey,
                    'Access-Control-Allow-Origin': "*"
                }
            })
            .then((response) => {
                if (response.ok) {
                    response.json().then((json) => {
                        console.log("getCoinHistoryResponse Success");
                        handlerFunctionB(json.data);
                    })
                }
            })
        console.log("getCoinHistory Success");

    }

    function handlerFunctionA(data) {
        console.log(data);
        let coinsData = data.coin;
        //update img and text on page
        $("#coin-img").attr("src", coinsData.iconUrl);
        $("#current-price").text('$' + coinsData.price);

        //TODO Make drawgraph a single function
        (function () {

            // Graphs
            var ctx = document.getElementById('myChart')
            
            //if there is an old chart delete it

            if (window.myCharts !== undefined) {
                window.myCharts.destroy();
                console.log("destroying old chart")
            }
            window.myCharts = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
                    datasets: [{
                        data: coinsData.sparkline,
                        label: coinsData.name,
                        lineTension: 0,
                        backgroundColor: 'transparent',
                        borderColor: coinsData.color,
                        borderWidth: 4,
                        pointBackgroundColor: coinsData.color,
                    }, ]
                },
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: false
                            }
                        }]
                    },
                    legend: {
                        display: false
                    }
                }
            })
        })()
    }

    function handlerFunctionB(data) {
        console.log(data);
        let coinsData = data;
        var prices = [coinsData.history.length];
        var timestamps = [coinsData.history.length];
        var x;
        // Don't update text on page
        //$("#coin-img").attr("src" , coinsData.iconUrl);
        //$("#current-price").text('$' + coinsData.price);

        //for each history price:
        // price at corresponding entry with length cut to a quarter of its length added to an array
        // timestamp at each entry converted from milliseconds to array; getdatahistory returns date in SECONDS not ms, so tack on 000
        
        for (x in coinsData.history) {
            prices[x] = (parseFloat(coinsData.history[x].price)).toFixed(numLength(coinsData.history[x].price) / 4);
            //console.log(`${coinsData.history[x].timestamp}000`);
            timestamps[x] = new Date(parseInt(`${coinsData.history[x].timestamp}000`));
        }
        console.log(prices);
        console.log(timestamps);
        
        //TODO Make drawgraph a single function
        (function () {

            // Graphs
            var ctx = document.getElementById('myChart')
            // eslint-disable-next-line no-unused-vars

            //if there is an old chart delete it
            if (window.myCharts !== undefined) {
                window.myCharts.destroy();
                console.log("destroying old chart")
            }
            window.myCharts = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: timestamps,
                    datasets: [{
                        data: prices,
                        label: coinsData.name,
                        lineTension: 0,
                        backgroundColor: 'transparent',
                        borderColor: coinsData.color,
                        borderWidth: 4,
                        pointBackgroundColor: coinsData.color,
                    }, ]
                },
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: false
                            }
                        }]
                    },
                    legend: {
                        display: false
                    }
                }
            })
        })()
    }
})