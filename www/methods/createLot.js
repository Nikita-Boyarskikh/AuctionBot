var querystring = require("querystring");
function addUser(poll, id, other)
{
	if(other===undefined) other = 'NULL';
	pool.query('INSERT INTO users ("telegram_id", "other_information(feature)")  VALUES ('+id+', '+other+')', function (err, res)
	{
        if(err)
        {
                console.log("Can't create new user with telegram id='"+id+"'");
       		return;
        }
	});
	return;
}

module.exports = function(pool, id, json, result) {
var name = json.lot;
var description = json.discription;
var price = json.price;
var start = new Data(json.start);
var end = new Data(json.end);
start = Math.round(start.getTime());
end = Math.round(end.getTime());

pool.query('SELECT COUNT(*) FROM users WHERE telegram_id='+id+')', function (err, res)
{
        if(err)
        {
                console.log(err);
                result.end (querystring.stringify({"text":err}));
                return 0;
        }
        if(res) console.log("User "+id+"authorized");
        else
        {
        	addUser(id);
        	console.log("Added new user with telegram id='"+id+"'");
        }
        
		pool.query('INSERT INTO lots ("owner_id", "description", "price", "start", "end, "winnet_id") VALUES ('+id+', 'name', '+description+', '+price+', '+start+', '+end+', '+id+')', function (err, res) {
	        if(err)
	        {
                console.log(err);
                result.end (querystring.stringify({"text":err}));
                return;
	        }
			result.end(querystring.stringify({"text":"Ваш лот "+name+" успешно добавлен"}));
		});
});
}
