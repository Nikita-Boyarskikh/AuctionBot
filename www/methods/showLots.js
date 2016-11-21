pool.query('SELECT name, start_time, end_time FROM lots WHERE owner_id='+id, function (err, res) {
        if(err)
        {
                console.log(err);
                string = err;
                res.end (querystring.stringify('{"text":string}'));
                return;
        }
	for (var k=0; k<res.rows.length; k++)
	{
        	res.rows[k].start_time=new Date(res.rows[k].start_time);
	        res.rows[k].end_time=new Date(res.rows[k].end_time);
	}
	var string = "Список Ваших лотов на настоящий момент:\n";
	for (var k=0; k<results.length; k++)
	{
       		string += res.rows[k].name+" ("+( (res.rows[k].start_time<=Math.round(getTime()/1000))&&(res.rows[k].end_time>Math.round(getTime()/1000)) ? "Идут торги" : ( (res.rows[k].start_time>Math.round(getTime()/1000)) ? "Торги ещё не начались" : "Торги закончены" ) )+"\n";
	}
	res.end (querystring.stringify('{"text":string}'));
});
