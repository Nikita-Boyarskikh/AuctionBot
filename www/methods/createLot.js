var name = url_parts.query.q.lot;
var description = url_parts.query.q.discription;
var price = url_parts.query.q.price;
var start = new Data(url_parts.query.q.start);
var end = new Data(url_parts.query.q.end);
start = Math.round(start.getTime());
end = Math.round(end.getTime());

function addUser(id, other='NULL')
{
	pool.query('INSERT INTO users VALUES ('+id+', '+other+')', function (err, res)
	{
        if(err)
        {
                console.log("Can't create new user with telegram id='"+id+"'");
        		return;
        }
	}
	return;
}

pool.query('SELECT COUNT(*) FROM users WHERE telegram_id='+id+')', function (err, res)
{
        if(err)
        {
                console.log(err);
                string = err;
                res.end ({"text":string});
                return 0;
        }
        if(res) console.log("User "+id+"authorized");
        else
        {
        	addUser(id);
        	console.log("Added new user with telegram id='"+id+"'");
        }
        
		pool.query('INSERT INTO lots VALUES ('+id+', '+description+', '+price+', '+start+', '+end+', '+')', function (err, res) {
	        if(err)
	        {
                console.log(err);
                string = err;
                res.end ({"text":string});
                return;
	        }
			res.end({"text":"Ваш лот '"+name+"' успешно добавлен"});
		});
});
