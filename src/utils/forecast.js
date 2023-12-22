// Importing the 'request' module for making http calls
const request = require('request')

// Defining the forecast function that takes latitude, longitude and a callback function as parameters
const forecast = (lat, lon, callback) => {
  
  // Checking if latitude and longitude are provided, if not, it will call the callback with an error message
  if (!lat || !lon) {
    callback('Latitude and longitude are required', undefined);
    return;
  }

  // Constructing the URL for the weather API with the provided latitude and longitude
  const url = 'http://api.weatherstack.com/current?access_key=992ae3de7fa0b49d8da463e512fe8a24&query=' + lat + ',' + lon

  // Making a GET request to the weather API
  request({ url, json: true }, (error, response) => {
    
    // If there is an error in making the request, call the callback with an error message
    if (error) {
      callback('Unable to connect to weather services', undefined)
    }
    
    // If the API returns an error, call the callback with an error message
    else if (response && response.body.error) {
      callback('Unable to find Location' + response.body.error, undefined)
    }
    
    // If the API returns a successful response, construct a weather summary and call the callback with the data
    else if (response && response.body.current) {
      const data = response.body.current
      callback(undefined, data.weather_descriptions[0] + '. It is currently ' + data.temperature + ' degrees out. But it feels like ' + data.feelslike + ' degrees. There is a ' + data.precip + '% chance of rain. Humidity: ' + data.humidity + '%')
    }
    
    // If the API returns a response in an unexpected format, call the callback with an error message
    else {
      callback('Unexpected response format', undefined)
    }
  })
}

// Exporting the forecast function as a module to be used in other files
module.exports = forecast
