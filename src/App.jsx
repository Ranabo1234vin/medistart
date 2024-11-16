import { createBrowserRouter,RouterProvider } from "react-router-dom"
import Home from './Home';
import Details from "./Details";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import medi from './assets/medi.png'
import { useState,useEffect } from "react";
function App() {
  const [Latlng,setLatLng]=useState({})
  const router=createBrowserRouter([
    {
      path:'/',
      element:<Home Latlng={Latlng}/>
    },
    {
      path:'/details/:id',
      element:<Details Latlng={Latlng}/>
    }
  ])
  useEffect(()=>{
    if('geolocation' in navigator){
    navigator.geolocation.getCurrentPosition((position)=>{
    setLatLng({
    lat:position.coords.latitude,
    lng:position.coords.longitude
    })
    })
    }
  },[])
 return (
  <div style={{overflowX:'hidden'}}>
    <Navbar className="bg-body-tertiary" style={{borderBottom:"2px solid black"}}>
           <Container>
             <Navbar.Brand href="http://localhost:5173/">
               <img
                 alt=""
                 src={medi}
                 width="35"
                 height="35"
                 className="d-inline-block align-top"
               />{' '}
               MedStart
             </Navbar.Brand>
           </Container>
         </Navbar>
  <RouterProvider router={router}/>
  </div>
 )
}

export default App
