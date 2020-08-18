const path =require('path')
const express = require('express');
const hbs = require('hbs')
const geocode = require('./utills/geocode');
const forecast = require('./utills/forecast');

// console.log(__dirname)
// console.log(path.join(__dirname,'../public'))

//define path for express configurtation
const app = express()
const publicDirectortpath = path.join(__dirname,'../public')
const viewspath = path.join(__dirname,'../templates/views')
const partialpath = path.join(__dirname,'../templates/partial')

//setup handlebar engine and view location
app.set('view engine', 'hbs')
app.set('views',viewspath) 
hbs.registerPartials(partialpath)

//setup static directory to server
app.use(express.static(publicDirectortpath ))

// app.get('',(req, res)=>{
//     res.send('Hello express!')

// })

app.get('', (req,res) =>{
    res.render('index', {
        title: 'Weather',
        name:'Yash Naware'
    })
})

app.get('/about',(req,res)=>{
    res.render('about', {
        title: 'About Me',
        name:'Yash Naware'
    })
})

app.get('/help',(req,res)=>{
    res.render('help', {
        helptext: 'may I Help You ',
        title:'Help',
        name:'Yash Naware'
    })
})


app.get('/weather',(req, res)=>{
    if(!req.query.address){
        return res.send({
            
            error:'You must provide a search item'

        })
    }
    geocode(req.query.address, (error, { latitude , longitude ,location } = {}) => {
        if(error){
            return res.send({error})
        }
        forecast(latitude,longitude,(error,forecastData) =>{
            if(error){
                return res.send({error})
            }
            res.send({
                forecast:forecastData,
                location,
                address:req.query.address
            })
        })
    })
})


app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            
            error:'You must provide a search item'

        })    
        
    }
    console.log(req.query.search)
    res.send({
        products:[]
    })
})

app.get('/help/',(req, res)=>{
    res.send('Help article not found')

})

app.get('*',(req, res)=>{
    res.render('404', {
        title:'404',
        name:'Yash Naware',
        errorMessage:'page not found'
    })

})
//app.com
//app.com/help
//app.com/about

app.listen(3000,()=>{ //listen is used to start the server
    console.log('server is up on port 3000')
})

