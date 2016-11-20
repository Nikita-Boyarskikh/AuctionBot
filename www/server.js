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
        	var result = req.on('end',function()
        	{
			try {var POST = querystring.parse(body);} catch(e) {
				console.log("Can't parce this POST: "+body);
				return 1;
			}
			var id = url_parts.query.q.id;
			switch(data.method) {
				case "getLotInfo":
                	try {
                		require("./methods/getLotInfo");
                		console.log("Called getLotInfo with params(id='"+id+"', lot='"+lot+"')");
                	} catch(e) {
                		console.log("getLotInfo with params(id='"+id+"', lot='"+lot+"') is failed!");
                		res.end({"text":"Извините, не удалось получить информацию об этом лоте, попробуйте позже :("});
                	}
					break;
                case "showLots":
                	try {
                		require("./methods/showLots");
                		console.log("Called showLots with params(id='"+id+"')");
                	} catch(e) {
                		console.log("showLots with params(id='"+id+"') is failed!");
                		res.end({"text":"Извините, не удалось показать ваши лоты, попробуйте позже :("});
                	}
                    break;
                case "showBids":
                	try {
                		require("./methods/showBids");
                		console.log("Called showBids with params(id='"+id+"')");
                	} catch(e) {
                		console.log("showBids with params(id='"+id+"') is failed!");
                		res.end({"text":"Извините, не удалось показать ваши выигрышные ставки, попробуйте позже :("});
                	}
                    break;
                case "makeBid":
                	try {
                		require("./methods/makeBid");
                		console.log("Called makeBid with params(id='"+id+"', lot='"+lot+"', price='"+price+"')");
                	} catch(e) {
                		console.log("makeBid with params(id='"+id+"', lot='"+lot+"', price='"+price+"') is failed!");
                		res.end({"text":"Извините, не удалось сделать ставку, попробуйте позже :("});
                	}
                    break;
                case "createLot":
                	try {
                		require("./methods/createLot");
                		console.log("Called createLot with params(id='"+id+"', lot='"+name+"', description='"+description+"', price='"+price+"', start='"+start+"', end='"+end+"')");
                	} catch(e) {
                		console.log("createLot with params(id='"+id+"', lot='"+name+"', description='"+description+"', price='"+price+"', start='"+start+"', end='"+end+"') is failed!");
                		res.end({"text":"Извините, не удалось добавить новый лот, попробуйте позже :("});
                	}
                    break;
				default:
					console.log("Wrong method!");
					return 1;
			}
			return 0;
        	});
		if(result != 0)
		{
			res.end("Извините, что-то пошло не так...");
		}
	}
	else
	{
		console.log("Unkown method (expected POST)!");
		res.end("Неизвестный метод передачи данных (ожидается POST)!");
	}
	return 0;
}

http.createServer(accept).listen(81);
console.log("Server start and listening 0.0.0.0:81");
