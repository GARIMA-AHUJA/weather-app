// Importing the 'request' package for making HTTP requests
const request = require('request')

// Defining the geocode function that will take an address and a callback function as parameters
const geocode = (address, callback) => {

    // Constructing the URL for the geocoding API using the provided address  
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoidXNyYXkwNyIsImEiOiJjbDNiNzZ1dTYwN3h1M2VtdmZtaHNoczY3In0.XzIn-ni1UWcVntIqkPLbzg' 
    
    // Making a HTTP request to the geocoding API
    request({ url, json: true }, (error, { body }) => {
        
        // If there is an error in the request, callback function is called with an error message and undefined data
        if (error) {
            callback('Unable to connect to location services', undefined) 
        }  
        
        // If the response does not contain any features, callback function is called with an error message and undefined data  
        else if (body.features.length === 0) { 
            callback('Unable to find Location ' + body.query, undefined)  
        } 
        
        // If the response contains geocoding data, it is formatted and the callback function is called with the data  
        else{  
            const data = body.features  

            callback(undefined, {  
                lat: data[0].center[1],  
                long: data[0].center[0],  
                location: data[0].place_name  
            })  
        }  

    })  
}

// Exporting the geocode function so it can be used in other modules
module.exports = geocode
