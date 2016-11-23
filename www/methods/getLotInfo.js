var querystring = require("querystring");
module.exports = function(pool, id, json, result) {
var lot = json.lot;
pool.query('SELECT owner_id, description, price, start_time, end_time, winner_id FROM lots WHERE name='+"'"+lot+"';", function (err, info) {
        if(err)
        {
                console.log(err);
                result.end (querystring.stringify({"text":err}));
                return;
        }
	var today = new Date();
	var start = new Date(Math.round(info.rows[0].start_time/1000));
	var end = new Date(Math.round(info.rows[0].end_time/1000));
	var started = (info.rows[0].start_time<=(new Date().getTime())) && (info.rows[0].end_time>(new Date().getTime()))? "Идут торги" : "Торги начнутся в "+start;
	result.end(querystring.stringify({"text":"Лот:\n"+lot+"\n"+started+"\nОписание:\n"+info.rows[0].description+"\nВладелец лота:\n"+info.rows[0].owner_id+"\nТекущая цена:"+info.rows[0].price+" ("+info.rows[0].winner_id+")\nНачало торгов: "+start+"\nКонец торгов :"+end}));
});
}
