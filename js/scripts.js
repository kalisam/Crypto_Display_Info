// $(document).ready(function () {
//     var uuid = "Qwsogvtv82FCd";
//     const yearly = "1y";
//     const monthly = "30d";
//     const weekly = "7d";
//     const daily = "24h";
//     var time = "24h";
//     var baseUrl = "https://api.coinranking.com/v2/coin/" + uuid + "?timePeriod=" + daily;
//     var proxyUrl = "https://cors-anywhere.herokuapp.com/";
//     var apiKey = "coinrankingc0b595008db85657a50d4082f20ff1ab68d03f2b78445fb8"


//     getCoinData(1);
//     $('input[type=radio][name=options]').change(function () {
//         if (this.value == 1) {
//             time = daily;
//             dropDownCondition();
//             alert("1");
//         } else if (this.value == 2) {
//             time = weekly;
//             dropDownCondition();
//             alert("2");
//         } else if (this.value == 3) {
//             time = monthly;
//             dropDownCondition();
//             alert("3");
//         } else if (this.value == 4) {
//             time = yearly;
//             dropDownCondition();
//             alert("4");
//         }
//     });
//     function dropDownCondition() {
//         $('#cryptoList').change(function () {
//             var selectedValue = parseInt($(this).val());
//             //Depend on Value i.e. 0 or 1 respective function gets called. 
//             switch (selectedValue) {
//                 case 0:
//                     handlerFunctionA();
//                     break;
//                 case 1:
//                     handlerFunctionB();
//                     break;
//                 case 2:
//                     handlerFunctionC();
//                 //etc... 
//                 default:
//                     alert("catch default");
//                     break;
//             }
//         });
//     }
//     function getCoinData(first) {
//         alert("do some stuff");
//         fetch(`${proxyUrl}${baseUrl}`, {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'X-My-Custom-Header': `${apiKey}`,
//                 'Access-Control-Allow-Origin': "*"
//             }
//         })
//             .then((response) => {
//                 if (response.ok) {
//                     response.json().then((json) => {
//                         if (first == 1) {
//                             handlerFunctionA(json.data);
//                         }
//                         else {
//                             dropDownCondition();
//                         }
//                     })
//                 }
//             })
//     }
//     function handlerFunctionA(data) {
//         console.log(data);
//         let coinsData = data.coin;
//         (function () {
//             'use strict'
//             feather.replace()

//             // Graphs
//             var ctx = document.getElementById('myChart')
//             // eslint-disable-next-line no-unused-vars
//             var myChart = new Chart(ctx, {
//                 type: 'line',
//                 data: {
//                     labels: [
//                         'Sunday',
//                         'Monday',
//                         'Tuesday',
//                         'Wednesday',
//                         'Thursday',
//                         'Friday',
//                         'Saturday'
//                     ],
//                     datasets: [{
//                         data: coinsData.sparkline,
//                         lineTension: 0,
//                         backgroundColor: 'transparent',
//                         borderColor: coinsData.color,
//                         borderWidth: 4,
//                         pointBackgroundColor: coinsData.color,
//                     },
//                     ]
//                 },
//                 options: {
//                     scales: {
//                         yAxes: [{
//                             ticks: {
//                                 beginAtZero: false
//                             }
//                         }]
//                     },
//                     legend: {
//                         display: false
//                     }
//                 }
//             })
//         })()
//     }
//     function handlerFunctionB(data) {
//         alert("Do some other stuff");
//     }
//     function handlerFunctionC(data) {
//         alert("Do a third... stuff?");
//     }


$(document).ready(function () {
    const bitcoin = "Qwsogvtv82FCd"
    const etherium = "razxDUgYGNAdQ"
    const litecoin = "D7B1x_ks7WhV5"
    var uuid = "Qwsogvtv82FCd";
    const yearly = "1y";
    const monthly = "30d";
    const weekly = "7d";
    const daily = "24h";
    var time = "24h";
    var currencyName = "Bitcoin"
    getCoinData(uuid, time);
    $('input:radio[name=options]').on("click", function () {
        if (time != $("input[name=options]:checked").val()) {
            time = $("input[name=options]:checked").val();
            console.log(time);
            getCoinData(uuid, time);
        }

    })
    $('#cryptoList').change(function () {
        var selectedValueCurrency = parseInt($(this).val());
        //Depends on Value 0-2 respective function gets called. 
        switch (selectedValueCurrency) {
            case 0:
                console.log("radio btc success");
                $("#currency").text("Bitcoin");
                uuid = bitcoin;
                getCoinData(uuid, time);
                break;
            case 1:
                console.log("radio eth success");
                $("#currency").text("Etherium");
                uuid = etherium;
                getCoinData(uuid, time);
                break;
            case 2:
                console.log("radio ltc success");
                $("#currency").text("Litecoin");
                uuid = litecoin;
                getCoinData(uuid, time);
        }
    });

    function getCoinData(currency, timeframe) {
        console.log("getCoinData Success");

        var baseUrl = "https://api.coinranking.com/v2/coin/" + currency + "?timePeriod=" + timeframe;
        var proxyUrl = "https://cors-anywhere.herokuapp.com/";
        var apiKey = "coinrankingc0b595008db85657a50d4082f20ff1ab68d03f2b78445fb8"
        fetch(`${proxyUrl}${baseUrl}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-My-Custom-Header': `${apiKey}`,
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
    }
    function handlerFunctionA(data) {
        console.log(data);
        let coinsData = data.coin;
        (function () {
            // This doesn't work (below)
            // if (typeof myChart !== "undefined") {
            //     console.log("destroying old chart.");
            //     myChart.destroy();
            // }
            myChart.destory();
            // Graphs
            var ctx = document.getElementById('myChart')
            // eslint-disable-next-line no-unused-vars
            var myChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
                    datasets: [{
                        data: coinsData.sparkline,
                        label: "Bitcoin",
                        lineTension: 0,
                        backgroundColor: 'transparent',
                        borderColor: coinsData.color,
                        borderWidth: 4,
                        pointBackgroundColor: coinsData.color,
                    },
                    ]
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

// })