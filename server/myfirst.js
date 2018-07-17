

const express =  require('express'),
	  server=express();
server.set('port', process.env.PORT || 8080);


//get possible cities
server.get('/place', function(req, res){
	var city =encodeURIComponent( req.query.city);
	console.log(city)
	var request = require('request'),
		url="https://api.sygictravelapi.com/1.0/zh/places/list?query="+city
		key="XnT9mWOXGB423MCTUDOXq8qtIobvaT9V2IhAklCl";
	const waitApi = new Promise(function(resolve,reject){request(
	    {
	        url : url,
	        headers : {
	            "x-api-key" : key
	        }
	    },
	    function (error, response, body) {
	        // Do more stuff with 'body' here
			var res = JSON.parse(body)
			console.log(res.data.places)
			//console.log('location:',res.data.places[0].location)
			loc=res.data.places
			//console.log(loc)
			if (error) return reject(error);
			resolve(loc)
	
			
		}		
	);
	});
	waitApi.then((data)=>res.send(data) )
	


});


//get cover image
server.get('/media', function(req, res){
	var id = req.query.id;
	var request = require('request'),
		url="https://api.sygictravelapi.com/1.0/zh/places/"+id+"/media"
		key="XnT9mWOXGB423MCTUDOXq8qtIobvaT9V2IhAklCl";
	const waitApi = new Promise(function(resolve,reject){request(
	    {
	        url : url,
	        headers : {
	            "x-api-key" : key
	        }
	    },
	    function (error, response, body) {
	        // Do more stuff with 'body' here
			var res = JSON.parse(body)
			console.log(res.data)
			//console.log('location:',res.data.places[0].location)
			
			//console.log(loc)
			if (error) return reject(error);
			if(res.data){
				resolve(res.data.media)
			}
			else{
				resolve([])
			}
			
	
			
		}		
	);
	});
	waitApi.then((data)=>res.send(data) )
	


});


//get top sightseeings
server.get('/city', function(req, res){
	var id =encodeURIComponent( req.query.id);
	var type=encodeURIComponent( req.query.type);
	console.log(id)
	var request = require('request'),
		url="https://api.sygictravelapi.com/1.0/zh/places/list?parents="+id+'&levels=poi&categories='+type+'&limit=100'
		key="XnT9mWOXGB423MCTUDOXq8qtIobvaT9V2IhAklCl";
	const waitApi = new Promise(function(resolve,reject){request(
	    {
	        url : url,
	        headers : {
	            "x-api-key" : key
	        }
	    },
	    function (error, response, body) {
	        // Do more stuff with 'body' here
			var res = JSON.parse(body)
			console.log(res.data)
			//console.log('location:',res.data.places[0].location)
			loc=res.data
			//console.log(loc)
			if (error) return reject(error);
			resolve(loc)
	
			
		}		
	);
	});
	waitApi.then((data)=>res.send(data) )
	


});




server.listen(8080, ()=>{
	console.log('Express server started at port 3000');
  });
