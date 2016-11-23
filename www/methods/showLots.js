var querystring = require("querystring");
module.exports = function(pool, id, json, result) {
if(json===undefined){};
pool.query('SELECT name, start_time, end_time FROM lots WHERE owner_id='+id, function (err, res) {
        if(err)
        {
                console.log(err);
                result.end (querystring.stringify({"text":err}));
                return;
        }
	for (var k=0; k<res.rowCount; k++)
	{
        	res.rows[k].start_time=new Date(res.rows[k].start_time);
	        res.rows[k].end_time=new Date(res.rows[k].end_time);
	}
	var string = "Список Ваших лотов на настоящий момент:\n";
	for (var k=0; k<res.rowCount; k++)
	{
		string += res.rows[k].name+" ("+( (res.rows[k].start_time<=Math.round(new Date().getTime()/1000))&&(res.rows[k].end_time>Math.round(new Date().getTime()/1000)) ? "Идут торги" : ( (res.rows[k].start_time>Math.round(new Date().getTime()/1000)) ? "Торги ещё не начались" : "Торги закончены" ) )+")\n";
	}
	console.log(string);
	result.end (querystring.stringify({"text":string}));
});
}
