
const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url='https://api.openweathermap.org/data/2.5/onecall?lat='+latitude+'&lon='+longitude+'&units=metric&appid=2cb23b8b2647755d755ced5192f365da'

request({ url, json: true }, (error, {body}) => {
//request({ url:url, json: true }, (error, response)
    if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {  //(response.body.error)
            callback('Unable to find location', undefined)
        } else {
            callback(undefined ,'This is currently = ' + body.current.temp + ' °C. Condition of cloud = ' + body.current.clouds+'% .There is = ' +body.current.weather[0].description )
        }
        // const data = JSON.parse(response.body) 
        //  console.log(data)              //both iused in place of json:true
    })
}

module.exports = forecast