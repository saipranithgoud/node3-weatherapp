const request = require('request')
const geocode=(address, callback) => {
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1Ijoic2FpcHJhbml0aGdvdWQiLCJhIjoiY2tjM2cxOHRnMTF6YzJzbGsyODgzbmdjYSJ9.To70qWL08vX0DZ1-VNUifA&limit=1'
    request({url, json: true}, (error,{body}={})=>{
        if(error){
            callback('Unable to connect to location services', undefined)
        } else if (body.features.length ===0){
            callback('unable to find the location. Try another search', undefined)
        }
        else{
            callback(undefined,{
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}



module.exports= geocode
