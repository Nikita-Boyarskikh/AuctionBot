pool.query('SELECT name FROM lots WHERE winner_id='+id, function (err, res) {
	if(err)
	{
		console.log(err);
		string = err;
		res.end ({"text":string});
		return;
	}
	var string = "Ваши ставки сейчас выигрывают в следующих лотах:\n";
	for (var i=0; i<res.rows.length; i++) {
		string += res.rows[i].name+"\n";
	}
	res.end ({"text":string});
});
