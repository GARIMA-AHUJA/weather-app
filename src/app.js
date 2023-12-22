// Importing required modules
const path = require('path')
const express = require('express')
const hbs = require('hbs')
const request = require('request')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

// Initializing express application
const app = express()

// Defining paths for express configurations
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setting up handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setting up the port for the server
const port = process.env.PORT || 3000

// Setting up the view engine and views path
app.set('view engine', 'hbs')
app.set('views', viewsPath)

// Setting up the static directory to serve
app.use(express.static(publicDirectoryPath))

// Route for the home page
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'GARIMA AHUJA'
    })
})

// Route for the about page
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'GARIMA AHUJA'
    })
})

// Route for the help page
app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This Is Some Helpful Text.'
    })
})

// Route for the weather page
app.get('/weather', (req, result) => {
    if(!req.query.address){
        return result.send({
            error: "Please Give A Location To Search Weather Info"
        })
    }
    
    const place = req.query.address
    geocode(place,(error,{lat,long,location} = {})=>{
        if(error){
            return result.send({
                error: error
            })
        }
        
        forecast(lat,long,(err,res)=>{
            if(err){
                return result.send({
                    error:err
                })
            }
            
            result.send({
                location: location,
                weather: res
            })
        })
    })
})

// Starting the server
app.listen(port, () => {
    console.log('Server is running on port',port)
})

// Exporting the app module
module.exports = app;
