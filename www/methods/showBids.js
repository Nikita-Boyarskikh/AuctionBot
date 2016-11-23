var querystring = require("querystring");
module.exports = function(pool, id, json, result) {
if(json===undefined){};
pool.query('SELECT name FROM lots WHERE winner_id='+id, function (err, res) {
	if(err)
	{
		console.log(err);
		result.end (querystring.stringify({"text":err}));
		return;
	}
	var string = "Ваши ставки сейчас выигрывают в следующих лотах:\n";
	for (var i=0; i<res.rowsCount; i++) {
		string += res.rows[i].name+"\n";
	}
	result.end (querystring.stringify({"text":string}));
});
}
