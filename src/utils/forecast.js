const request = require('request')


const forecast = (lat,lon,callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=992ae3de7fa0b49d8da463e512fe8a24&query='+lat+','+lon
    request({url,json:true},(error, {body})=>{
        if (error){
            callback('Unable to connect to weather services',undefined)
        }
        else if(body.error){
            callback('Unable to find Location'+body.error,undefined)
        }
        else{
            const data = body.current
            callback(undefined,data.weather_descriptions[0]+'. It is currently '+data.temperature+' degrees out.But it feels like '+data.feelslike+' degrees. There is a '+data.precip+'% chance of rain. Humidity: '+data.humidity+'%')
    
        }
    })    

}



module.exports=forecast

