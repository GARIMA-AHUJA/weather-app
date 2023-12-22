const path = require('path')
const express = require('express')
const hbs = require('hbs')
const request = require('request')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app = express()
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

const port = process.env.PORT || 3000

app.set('view engine', 'hbs')
app.set('views',viewsPath)
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Uttam Sundar Ray'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Uttam Sundar Ray'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.'
    })
})

app.get('/weather', (req, result) => {
    if(!req.query.address){
        return result.send({
            error: "Please give a location to search weather info"
        })
    }
    const place = req.query.address
    geocode(place,(error,{lat,long,location}= {})=>{
        if(error){
            // console.log(error)
            return result.send({
                error: error
            })
        }
        forecast(lat,long,(err,res)=>{
            if(err){
                // console.log(err)
                return result.send({
                    error:err
                })
            }
            result.send({
                location: location,
                weather: res

            })
            // console.log(location,'Weather:')
            // console.log(res)
            // console.log()
        })
    }) 
   
})

app.listen(port, () => {
    console.log('Server is running on port',port)
})
