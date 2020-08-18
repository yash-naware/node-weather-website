const request = require('request')

const geocode = (address, callback)=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoieWFzaC1uYXdhcmUiLCJhIjoiY2tja2UwOXNvMXVrbjJ6bngyb2kyYzFrMiJ9.dyt3ZlWGfp5pr2ppF3haXg&limit=1'
    request ({url, json:true },(error , {body}) =>{
    //request ({url:url, json:true },(error , response)
        if(error){
            callback('unable to connect to location services!',undefined)
        }else if(body.features.length===0){ //(response.body.features.length===0)
            callback('unable to find location. Try another search! ',undefined)
         }
         else{
             callback(undefined,{
                latitude: body.features[0].center[1], //response.body.features[0].center[1]
                longitude : body.features[0].center[0],//response.body.features[0].center[0]
                location : body.features[0].place_name //response.body.features[0].place_name
            })
        }

    })
}

module.exports = geocode