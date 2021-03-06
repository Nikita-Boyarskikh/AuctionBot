var http = require("http");
var url = require("url");
var querystring = require("querystring");
var fs = require("fs");
var Pool = require('pg').Pool;

try{ 
var usr='postgres';
var pswd='qwerty';
var hst='localhost';
var db='postgres';
var maxnum = 1;
var idl=1000;
var pool = new Pool({
  user: usr,
  password: pswd,
  host: hst,
  database: db,
  max: maxnum, // max number of clients in pool
  idleTimeoutMillis: idl, // close & remove clients which have been idle > 1 second
});
console.log("Сonnected to database with params: user='"+usr+"', password='"+pswd+"', host='"+hst+"', database='"+db+"'");
} catch(e) {
	console.log("Can't connect to database with params: user='"+usr+"', password='"+pswd+"', host='"+hst+"', database='"+db+"'");
}

function accept (req, res)
{
	res.writeHead(200,
	{
		"Content-Type": "text/plain",
		"Cache-Control": "no-cache"
	});
	var url_parts = url.parse(req.url, true);
	if (req.method == "POST")
	{
		console.log("Get new POST request");
		var body="";
		req.on('data', function (data)
        {
        	body +=data;
        });
        try {
    	    req.on('end',function()
	    {
		try {
			var json = JSON.parse(querystring.parse(body).q);
		} catch(e) {
			console.log("Can't parce this POST: "+querystring.parse(body).q);
			return 1;
		}
		var id = json.id;
		switch(json.method) {
		case "getLotInfo":
                	try {
                		require("./methods/getLotInfo")(pool, id, json, res);
                		console.log("Called getLotInfo with params(id='"+id+"', lot='"+json.lot+"')");
                	} catch(e) {
                		console.log("getLotInfo with params(id='"+id+"', lot='"+json.lot+"') is failed with error("+e+")");
                		res.end(querystring.stringify('{"text":"Извините, не удалось получить информацию об этом лоте, попробуйте позже :("}'));
                	}
					break;
                case "showLots":
                	try {
                		require("./methods/showLots")(pool, id, json, res);
                		console.log("Called showLots with params(id='"+id+"')");
                	} catch(e) {
                		console.log("showLots with params(id='"+id+"') is failed with error("+e+")");
                		res.end(querystring.stringify('"text":"Извините, не удалось показать ваши лоты, попробуйте позже :("}'));
                	}
                    break;
                case "showBids":
                	try {
                		require("./methods/showBids")(pool, id, json, res);
                		console.log("Called showBids with params(id='"+id+"')");
                	} catch(e) {
                		console.log("showBids with params(id='"+id+"') is failed with error("+e+")");
                		res.end(querystring.stringify('{"text":"Извините, не удалось показать ваши выигрышные ставки, попробуйте позже :("}'));
                	}
                    break;
                case "makeBid":
                	try {
                		require("./methods/makeBid")(pool, id, json, res);
                		console.log("Called makeBid with params(id='"+id+"', lot='"+json.lot+"', price='"+json.price+"')");
                	} catch(e) {
                		console.log("makeBid with params(id='"+id+"', lot='"+json.lot+"', price='"+json.price+"') is failed with error("+e+")");
                		res.end(querystring.stringify('{"text":"Извините, не удалось сделать ставку, попробуйте позже :("}'));
                	}
                    break;
                case "createLot":
                	try {
                		require("./methods/createLot")(pool, id, json, res);
                		console.log("Called createLot with params(id='"+id+"', lot='"+json.name+"', description='"+json.description+"', price='"+json.price+"', start='"+json.start+"', end='"+json.end+"')");
                	} catch(e) {
                		console.log("createLot with params(id='"+id+"', lot='"+json.name+"', description='"+json.description+"', price='"+json.price+"', start='"+json.start+"', end='"+json.end+"') is failed with error("+e+")");
                		res.end(querystring.stringify('{"text":"Извините, не удалось добавить новый лот, попробуйте позже :("}'));
                	}
			break;
			default:
				console.log("Wrong method: "+json.method);
				throw "Wrong method";
			}
        	});
		} catch (e)
		{
			res.end(querystring.stringify('{"text":"Извините, что-то пошло не так... ("+e+")"}'));
		}
	}
	else
	{
		console.log("Unkown method (expected POST)!");
		res.end(querystring.stringify('{"test":"Неизвестный метод передачи данных (ожидается POST)!"}'));
	}
	return 0;
}

console.log("Server start and listening 0.0.0.0:8888");
http.createServer(accept).listen(8888);
