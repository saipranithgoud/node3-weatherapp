const express= require('express')
const path = require('path')
const hbs= require('hbs')
const geocode= require('./utils/geocode')
const forecast= require('./utils/forecast')

const app= express()
const port=process.env.PORT || 3000
//Define paths
const publicpath=path.join(__dirname,'../public')
const viewspath=path.join(__dirname,'../templates/views')
const partialpath= path.join(__dirname, '../templates/partials')

//set the paths
app.set('view engine', 'hbs')
app.set('views', viewspath)
hbs.registerPartials(partialpath)

//set static paths
app.use(express.static(publicpath))

app.get('',(req,res)=>{
    res.render('index', {
        title: 'weather app',
        name: 'Praneeth'

    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error: 'Enter address'
        })
    }
    else{
    geocode(req.query.address,(error, {latitude,longitude,location}={})=>{
        if(error){
           return res.send({error})
        }
        forecast(latitude, longitude, (error, forecastdata) => {
            if(error){
                return res.send({error})
            }
            res.send({
                forecast: forecastdata,
                address: location
        
            })
          })
    })
    
}
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About me Page',
        name: 'Praneeth'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title: 'help page',
        name: 'Praneeth'
        
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title: 'Praneeth',
        Errormessage: 'Page not found'
    })
})
app.get('/help/*',(req,res)=>{
    res.render('404',{
        title: '404',
        name: 'Praneeth',
        Errormessage: 'Help article not found'
  
    })
})

app.listen(port,()=>{
    console.log('server is up on port 3000')
})