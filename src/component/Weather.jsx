import React, { useState } from 'react';
import axios from 'axios'

const Weather = () => {
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");
    const [icon,setIcon]=useState("");
    const [temp,setTemp]=useState("")
    const [min,setTempMin]=useState("")
    const [max,setTempMax]=useState("");
   const [desc,setDesc]=useState("");
   const [date,setDate]=useState("")
   const [showAllComponent,setShow]=useState(false);


    const getWeatherData = async (city, country) => {

        await axios({
            method: 'GET',
            url: `https://api.openweathermap.org/data/2.5/weather?q=${city},${country} &appid=8321c4576cc0bd027756fc9e4efa0746`
        }).then((res) => { console.log(res.data) 
      setIcon(res.data.weather[0].icon);
      var tempurature=res.data.main.temp;
      var mintemp=res.data.main.temp_min;
      var maxtemp=res.data.main.temp_max;
      var descc=res.data.weather[0].description;



     const kelvin= 273.15 ;
var celsius=Math.floor(tempurature - kelvin);
var minn=Math.floor(mintemp- kelvin);
var maxx=Math.floor(maxtemp - kelvin);
setTemp(celsius);
setTempMin(minn);
setTempMax(maxx);
setDesc(descc)

var today=new Date();
var todayDate=today.toLocaleDateString();
setDate(todayDate);
setShow(true);

        }).catch((err) => { console.log(err) })
    }



    return (
        <div className="container" style={{color: "white"}} >
    <h1  style={{padding:"25px"}}>Weather App </h1>
    <div className="row">

        <div className="col-sm-4">
            <input type="text" placeholer="City Name"  style={{margin:"5px"}}className="form-control input-sm" onChange={(e) => setCity(e.target.value)} name="city"></input>
        </div>

        <div className="col-sm-4">
            <input type="text"  style={{margin:"5px"}}  placeholer="Country Name"  className="form-control input-sm" onChange={(e) => setCountry(e.target.value)} name="country"></input>

        </div>

        <div className="col-sm-4">
            <button className="btn btn-primary input-sm"  style={{margin:"5px"}} onClick={() => getWeatherData(city, country)}>Get Data</button></div></div>
                
            {showAllComponent ? (
                
                <div className="container col-sm-6 " style={{backgroundColor:"rgba(0, 0, 0, 0.404)" , borderRadius:"25px" , marginTop:"15px"}}>
                    <h1  style={{marginTop:"10px"}}>{city},{country} </h1>
                    <img src={`http://openweathermap.org/img/wn/${icon}@2x.png`} alt=""/>
                    <h3>{temp}°C</h3>
                    <div className="flex" style={{display:"flex", flexDirection:"row" ,justifyContent:"space-evenly"}} >
                        <h3 >Min <span style={{padding:"10px",display:"block"}}>{min}</span></h3>
                        <h3>Max <span style={{padding:"10px" ,display:"block"}}>{max}</span></h3>

                    </div>
                    <h4>{desc}</h4>
                    <h5 style={{padding:"7px"}}>{date}</h5>
                    




                </div>) : null } </div> )
}



export default Weather;