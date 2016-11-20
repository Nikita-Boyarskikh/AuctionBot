var name = url_parts.query.q.lot;
var price = url_parts.query.q.price;

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
                res.end (querystring.stringify(JSON.stringify({"text":string})));
                return 0;
        }
        if(res) console.log("User "+id+"authorized");
        else
        {
        	addUser(id);
        	console.log("Added new user with telegram id='"+id+"'");
        }
        
		pool.query('SELECT price, start_time, end_time, winner_id FROM lots WHERE name='+name+')', function (err, res) {
	        if(err)
	        {
                console.log(err);
                string = err;
                res.end (querystring.stringify(JSON.stringify({"text":string})));
                return;
	        }
	        if(price < res.rows[0].price)
	        {
	        	console.log("Can't make this Bid: "+price+" < current price("+name+")");
				res.end(querystring.stringify(JSON.stringify({"text":"Ваша ставка не принята: предложите цену, выше текущей - "+res.rows[0].price})));
			}
			else if(Math.round(getTime()/1000) < res.rows[0].start_time)
			{
	        	console.log("Can't make this Bid: auction "+name+" don't start yet");
				res.end(querystring.stringify(JSON.stringify({"text":"Ваша ставка не принята: аукцион "+name+" ещё не начался"})));
			}
			else if(Math.round(getTime()/1000) >= res.rows[0].end_time)
			{
	        	console.log("Can't make this Bid: auction "+name+" already finished");
				res.end(querystring.stringify(JSON.stringify({"text":"Ваша ставка не принята: аукцион "+name+" уже закончился"})));
			}
			else
			{
				//Отправить winner_id оповещение о перебитой ставке, заблокировать деньги на карте id
				res.end(querystring.stringify(JSON.stringify({"text":"Ваша ставка принята, спасибо :)"})));
				console.log("Bid by "+id+" for lot names "+name+" amound of "+price+" successful get");
			}
		});
});
