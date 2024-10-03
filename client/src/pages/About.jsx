import React from 'react';
import aboutGIF from '../assets/aboutGIF.gif'

function About() {
  return (
    <div style={{ display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      color: 'rgb(0,71,115)', }}>

      <img 
        src={aboutGIF} 
        alt="About GIF" 
        style={{ width: '300px', height: 'auto', margin: '20px 0' }} 
      />

    <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>About ReviewMate</h1>
      <p style={{ textAlign: 'center' }}>We are 6 students who created ReviewMate as part of our Soen341 project. <br></br> ReviewMate lets students better grade each other and teachers better organize student groups.</p>
    </div>
  );
}

export default About;