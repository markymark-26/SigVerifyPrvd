import React, { Component } from 'react';
import { SketchPad, TOOL_PENCIL, TOOL_LINE, TOOL_RECTANGLE, TOOL_ELLIPSE } from './../src';
import IO from 'socket.io-client'
import { sha256, sha224 } from 'js-sha256';

const wsClient = IO(`ws://127.0.0.1:12346`);

export default class SketchExample extends Component
{

//look up tailwindcss guide to intergrate with

 saveCanvas() {
    var canvas = document.getElementById("canvas").firstElementChild;
    var ctx = canvas.getContext("2d");
    var data = canvas.toDataURL();
    var hash = sha256(data);
    
  console.log(hash);
    
    console.log('Saved!');
  }
  
  socket = null;

  constructor(props) {
    super(props);

    this.state = {
      tool:TOOL_PENCIL,
      size: 2,
      color: '#000000',
      fill: false,
      fillColor: '#444444',
      items: []
    }
  }

  componentDidMount() {
    wsClient.on('addItem', item => this.setState({items: this.state.items.concat([item])}));
  }

  render() {
    const {size} = this.state;
    return (
      <div>
         <form>
     <p> <label>
    First Name:  <p>  <input type="text" name="First name" /> </p>
  </label></p>
  <p>  <label>
    Last Name:  <p>  <input type="text" name="Last name" /> </p>
  </label></p>
<p><label>
Date:     <p>    <input type="text" name="Date" /> </p>
</label>
</p>
</form>     
        <div style={{float:'left', marginRight:20}} id="canvas">
          <SketchPad
            width={500}
            height={150}
            animate={true}
            size={size}
            onCompleteItem={(i) => wsClient.emit('addItem', i)}            
          />
        </div>
        <div style={{float:'left'}}>         
            <button onClick={()=> {this.saveCanvas()}}>
  Submit Signature
</button>         
        </div>       
      </div>     
    );
  }
}
