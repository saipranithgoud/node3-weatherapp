const request = require('request')
const forecast=(latitude, longitude, callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=4b3ffd30f789e20b7bceaf6cfb466267&query='+latitude+','+longitude
    request({ url, json: true }, (error,{body}={}) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, 
                'Current temperature is: '+body.current.temperature+
                ' But it feels like: ' +body.current.feelslike
            )
        }
    })
}

module.exports=forecast