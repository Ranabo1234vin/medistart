import React, { useState,useEffect } from "react";
import { useLocation } from "react-router-dom";
import {Row,Col} from 'react-bootstrap'
import axios from "axios";
function Details({Latlng})
{
    const Location=useLocation();
    const [user,setUser]=useState('');
    const {formatted,lat,lon,city,state,name}=Location.state;
    const [Directions,setDirections]=useState([]);
    useEffect(()=>{
        if(Object.keys(Latlng).length > 0)
        {
         const geoApi=`https://api.geoapify.com/v1/geocode/reverse?lat=${Latlng.lat}&lon=${Latlng.lng}&format=json&apiKey=1db39863a0c04f89ac972f6006e7f0ca`
          axios.get(geoApi).then(res=>{
            setUser(res.data.results[0].formatted)
            console.log(Latlng);
              
            })    
    }
    },[Latlng])
    useEffect(()=>{
        if(Object.keys(Latlng).length > 0)
        {
         const geoApi=`https://api.geoapify.com/v1/routing?waypoints=${Latlng.lat},${Latlng.lng}|${lat},${lon}&mode=drive&apiKey=1db39863a0c04f89ac972f6006e7f0ca`
          axios.get(geoApi).then(res=>{
            setDirections(res.data.features[0].properties.legs[0].steps)
              
            })    
    }
    },[Latlng])
    return(

        <div style={{padding:'40px'}}>
        <Row>
            <Col>
            <div style={{border:'2px solid black',padding:'25px',borderRadius:'10px'}}>
            <div style={{padding:'25px',borderBottom:'2px solid black'}}>
            <h5>{name}</h5>
            </div> 
             <div style={{padding:'25px',borderBottom:'2px solid black'}}>
                <h6>User Latitude:{Latlng.lat}</h6>
                <h6>user Longitude:{Latlng.lng}</h6>
                <h6>User Formatted Address:{user}</h6>
                </div> 
            <div style={{padding:"25px",borderBottom:'2px solid black'}}>
                <h6>Hospital Latitude:{lat}</h6>
                <h6>Hospital Longitude:{lon}</h6>
                <h6>Hospital Formatted Address:{formatted}</h6>    
            </div>
            <div style={{padding:'25px',borderBottom:'2px solid black'}}>
             <h6>Hospital Website:</h6>
             <h6>Hospital Email:</h6>
             <h6>State:{state}</h6>
              <h6>City:{city}</h6>
            </div>
            </div>
            </Col>
            <Col>
            <div style={{border:'2px solid black',padding:'25px',borderRadius:'10px'}}>
            <h5>Directions to Hospital</h5>
            {
                Directions.map((Dir,index)=>{
                    return(
                        <div key={index}>
                       <li>{Dir.instruction.text}</li>
                        </div>
                    )
                })
            }
            </div>
            </Col>
        </Row>
        </div>
    )
}
export default Details;