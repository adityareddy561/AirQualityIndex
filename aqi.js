var request = require('request')
var telegram=require('telegram-bot-api')
var api = new telegram({
        token: '961031760:AAHa4WOFymCjzzOPApHlIJZIjbBUMZDx538',
        updates: {
          enabled: true
          }
    
});
api.on('message',function(mes){
  console.log(mes)
  if(mes.text.toString().toLowerCase()=="hi" || mes.text.toString().toLowerCase()=="hello")
    {
        api.sendMessage({
            chat_id: mes.chat.id,
            text: 'Hello!! Welcome to AirSense, '+mes.from.first_name+'.'
        });
    }
  else if (mes.text.toString().toLowerCase()=="\start"){
    api.sendMessage({
            chat_id: mes.chat.id,
            text: 'Welcome to Air-Quality Index bot \nEnter a place name.'
        });
  }
  else if(mes.text.toString().toLowerCase()=="bye")
    {
        api.sendMessage({
            chat_id: mes.chat.id,
            text: 'Hope to see you around again , Bye'
        });
    }
    else{
      var location = mes.text
      var key = 'AIzaSyARQySxubEs__UG8deSPrERiCwAiFHt4GM'
    request('https://maps.googleapis.com/maps/api/geocode/json?address='+location+'&key='+key, { 
      json: true 
    }, (err, res, body) => {
        if (err) { 
           console.log(err); 
        }
        var address=body.results[0].formatted_address
        console.log(body.results[0].formatted_address);
        var lat=body.results[0].geometry.location.lat
        var lng=body.results[0].geometry.location.lng
        console.log(lat,lng)
        request("https://api.breezometer.com/air-quality/v2/current-conditions?lat="+lat+"&lon="+lng+"&key=99db6c3bc52249dd9169f02f239c3a87", function (error, response, body){
              if(err){
                console.log(err)
              }
              else{
              
                var b=JSON.parse(body)
                console.log(b)
                var aqi=b.data.indexes.baqi.aqi_display
               var cat=b.data.indexes.baqi.category
                var dom=b.data.indexes.baqi.dominant_pollutant
                console.log(aqi,cat,dom)
                api.sendMessage({
                  chat_id: mes.chat.id,
                  text: "The Air-quality Index of "+address +": "+aqi+" \n Category : "+cat+" \n Dominant-pollutant is : "+dom

                })

              }

        })
    });      
    }
});
