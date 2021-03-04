import React from 'react';
import "./assets/reset.css";
import "./assets/style.css";
import Router from './Router'

const App = () => {


  return(
    <>
    {/*}
      <div id="header">
        <Header />
      </div>
  {*/}
      <Router />
    </>
  )
}

export default App;

/**
<div id="map">
        <div
          ref={interact.ref}
          style={{
            ...interact.style,
            border: '2px solid #0489B1',
            backgroundColor: '#A9D0F5',
          }}
        />
        {interact.position.x}
      </div>
 */