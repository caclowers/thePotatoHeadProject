import React from 'react';
import './SubmitPopup.css';

export default ({ style }) => (
  <div id="swalComponent" >
    <img

      src="images/logo.png"
      alt="heart_logo_for_potato_head_project"
    />
    <h2>
      Thank You for requesting
    </h2>
    <h2>
      a Potato Head!
    </h2>
    <div id="emailDiv">
      <h3>
        You will receive a confirmation email shortly
      </h3>
    </div>
    <div id="donateDiv">
      <h3>
        Please consider&nbsp;<a href="https://www.thepotatoheadproject.org/donate" target="_parent"><strong>Donating</strong></a>
      </h3>
      <h3> to The Potato Head Project</h3>
    </div>
    <div id="amazonDiv">
      <h5>You can also Make A Difference by shopping at&nbsp;<a href="https://smile.amazon.com/" target="_parent">AmazonSmile</a></h5><h5> and choosing 'Potato Head Project' as your charity of choice</h5>
    </div>
  </div>
);