import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './Home.css'
import Navbar from './navcomponent/navbar';
function Home() {

  return (
    <>
      <div className='home-page'>
        <div className='back1'>
          <Navbar isLoginPage={false} />
          <div className='headings'>
            <h1>Look first / Then Leap.</h1>
            <h3 className='h3'>The best trades require research, then commitment.</h3>
            <button className='btn'>Get started for free</button>
            <p className='para'>$0 forever, no credit card needed</p>
          </div>

        </div>
        <div className='back2'>
          <div style={{ width: '75%', margin: 'auto' }}>
            <b style={{ fontSize: '55px', color: 'white', marginLeft: '65px'}}>Where the world does markets</b>
            <br></br>
            <b style={{color: 'grey', fontSize: '27px', fontFamily: 'Trebuchet MS', }}>Join 100 million traders and investors taking the future into their own hands.</b>
          </div>

          <div style={{ width: '850px', margin: 'auto', border: '4px solid white', borderRadius: '10px',
             marginTop: '30px' }}>
            <video width="100%" height="auto" autoPlay loop >
              <source src="viewvideo.webm" />
              Your browser does not support the video tag.
            </video>
          </div>

        </div>
      </div>

    </>
  );
}

export default Home
