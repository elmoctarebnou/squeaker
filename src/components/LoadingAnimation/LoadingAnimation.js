import React from 'react';
import './LoadingAnimation.css';


const loadingAnimation = () => {
    return (
      <div className='loading'>
        <div className='bouncer'>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    )
}

export default loadingAnimation;