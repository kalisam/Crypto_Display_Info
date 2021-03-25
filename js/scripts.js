
$(document).ready(function () {
    const bitcoin = "Qwsogvtv82FCd";
    const ethereum = "razxDUgYGNAdQ";
    const litecoin = "D7B1x_ks7WhV5";
	const holotoken = "iEHCPwcxoIH8e";
    let uuid = "Qwsogvtv82FCd";
    const yearly = "1y";
    const monthly = "30d";
    const weekly = "7d";
    const daily = "24h";
	const coinRankingApiKey = "INSERT COINRANKING API KEY HERE";
    let time = "24h";
    let currencyName = "Bitcoin";
    //getCoinData(uuid, time);
	
    $('input:radio[name=options]').on("click", function () {
        if (time != $("input[name=options]:checked").val()) {
				time = $("input[name=options]:checked").val();
            console.log(time);
        }
	})
		
	/* $('input:radio[name=dataOptions]').on("click", function () {
		if (functionName != $("input[name=dataOptions]:checked").val()) {
				functionName = $("input[name=dataOptions]:checked").val();
			console.log(functionName);
		}
	}) */
	
    $('#cryptoList').change(function () {
        var selectedValueCurrency = parseInt($(this).val());
        
        switch (selectedValueCurrency) {
            case 0:
                console.log("radio btc call");
                $("#currency").text("Bitcoin");
                uuid = bitcoin;
                break;
            case 1:
                console.log("radio eth call");
                $("#currency").text("Ethereum");
                uuid = ethereum;
                break;
            case 2:
                console.log("radio ltc call");
                $("#currency").text("Litecoin");
                uuid = litecoin;
                break;
			case 3:
				console.log("radio hot call");
				$("#currency").text("Holotoken");
                uuid = holotoken;
                break;
        }
    });

	$('#getData').on("click" , function() {
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
	
    function getCoinData(currency, timeframe) {
        console.log("getCoinData called");

        var baseUrl = "https://api.coinranking.com/v2/coin/" + currency + "?timePeriod=" + timeframe;
        var proxyUrl = "https://cors.bridged.cc/";
        fetch(proxyUrl + baseUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-My-Custom-Header': coinRankingApiKey,
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
                'X-My-Custom-Header': coinRankingApiKey,
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
		//update text on page
		$("#coin-img").attr("src" , coinsData.iconUrl);
		$("#current-price").text('$' + coinsData.price);
        (function () {
            
            // Graphs
            var ctx = document.getElementById('myChart')
            // eslint-disable-next-line no-unused-vars
            if(window.myCharts !== undefined){
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
	function handlerFunctionB(data) {
        console.log(data);
        let coinsData = data;
		var prices = [coinsData.history.length];
		var timestamps = [coinsData.history.length];
		var x;
		// Don't update text on page
		//$("#coin-img").attr("src" , coinsData.iconUrl);
		//$("#current-price").text('$' + coinsData.price);
		//for each history price push timestamp converted from milliseconds to an array and push price at corresponding entry
		for (x in coinsData.history) {
			prices[x] = coinsData.history[x].price;
			timestamps[x] = coinsData.history[x].timestamp;
		}		
		console.log(prices);
		console.log(timestamps);
		 
         (function () {
            
            // Graphs
            var ctx = document.getElementById('myChart')
            // eslint-disable-next-line no-unused-vars
            if(window.myCharts !== undefined){
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
        } )()
    }
})