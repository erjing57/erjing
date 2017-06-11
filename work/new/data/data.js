var Mock =require("mockjs");
module.exports=[
	{
		route:'/index',
		handle:function(req,res,next,url){
			var Random = Mock.Random;
			Random.integer();
			Random.string('lower',4);
			Random.date("yyy-MM-dd");
			var datas = Mock.mock({
				"menuList|6":[{
					"menuNav":'@string("lower",4)',
					"menuNavContent|1-5":[{
						'url':'index.html',
						'name':'@string("lower",4)',
						'id':"@integer(0,10)"
					}]

				}]
			});
			res.writeHead(200,{
				"Content-type":"application/json;charset=UTF-8",
	      	 	"Access-Control-Allow-Origin":"*"
			});
			 res.write(JSON.stringify(datas))
	      	 res.end();
		}

	}

]
