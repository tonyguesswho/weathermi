const yargs=require('yargs');
const axios=require('axios');
const argv=yargs
    .options({
        a:{
            demand:true,
            alias:'address',
            describe:'address to fetch weather',
            string:true
        }

    }).help().alias('help,h').argv;

    var encodedAddress=encodeURIComponent(argv.address);
    axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`).then((response)=>{
        if(response.data.status==='ZERO_RESULTS'){
            throw new Error('unable to find address');
        }
        console.log(response.data);
        var lat=response.data.results[0].geometry.location.lat;
        var lng=response.data.results[0].geometry.location.lng;
        return axios.get(`https://api.darksky.net/forecast/8b55ee59bd39aff44cc9a79e6b7115ae/${lat},${lng}?units=si`)

    }).then((response)=>{
        var temperature=response.data.currently.temperature;
        var apparentTemperature=response.data.currently.apparentTemperature;
        console.log(`its is ${temperature} but it feels like ${apparentTemperature}`);
    }).catch((e)=>{
        if(e.code='ENOTFOUND'){
            console.log('unable to connect to server');
        }else{
            console.log(e.mesage)
        }
    })
