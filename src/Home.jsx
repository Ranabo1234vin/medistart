import React from 'react';
import axios from 'axios';
import { useState,useEffect } from 'react';
import './App.css'
import { useNavigate } from 'react-router-dom';

export default function Home({Latlng})
{
const [hospitals,setHospitals]=useState([]);
const Navigation=useNavigate();
  useEffect(()=>{
    if(Object.keys(Latlng).length > 0)
    {
        
      const geoApi=`https://api.geoapify.com/v2/places?categories=healthcare.hospital&filter=rect:${Latlng.lng},${Latlng.lat},78.48691661148189,17.33061465088658&limit=20&apiKey=6f0ef43426544b30839a2f13b85011ed`
      axios.get(geoApi).then(res=>{
        setHospitals(res.data.features)
        console.log(res.data.features)
        console.log(Latlng);
      })
}
},[Latlng])


    return (
        <div>
        <div style={{padding:'25px',display:'flex',flexWrap:'wrap'}}>
        {
                   hospitals.map((hospital,index)=>{
                    return(
                       <div onClick={()=>{
                        Navigation(`/details/${index}`,{state:hospital.properties})
                       }} key={index} style={{margin:'10px',padding:'50px',width:'460px',border:'1px solid black',borderRadius:'10px'}}>
                         <div style={{borderBottom:'3px solid black',marginBottom:'5px'}}>
                          <div style={{marginBottom:'5px',width:"450px"}}> 
                           {hospital.properties.name}
                          </div>
                           </div>
                           {hospital.properties.address_line2}
                           <div>
                             <div style={{marginTop:'10px'}}>
                               {hospital.properties.city},{hospital.properties.state},{hospital.properties.country}
                               </div>
                             
                             </div>
                         </div>  
                    )   
                   })
                   }
   
        </div>
       </div>
     )  
}