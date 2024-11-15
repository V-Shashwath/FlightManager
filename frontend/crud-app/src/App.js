import './App.css';
import {useState} from 'react';
import FlightTable from './FlightTable';

function App() {
  const [userName, setUserName] =  useState();

  const myStyle = {
    backgroundImage: 'url(flight2.jpg)',
    backgroundSize: "cover",
    height: '200vh'
  }
  function DisplayImage({Filename}){
    return (
      <div>
        <img src={Filename} height="600px" width="1300px" />
      </div>
    );
  }
  function displayName(){
    alert("Entered name is : "+userName);
  }
  return (

    <div style={myStyle}>
      <FlightTable/>
    </div>
  )
}

export default App 

