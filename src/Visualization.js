    
import React from "react";
import Modal from 'react-awesome-modal';
import P5Wrapper from 'react-p5-wrapper';
import sketch from './SortingSketch';

class SortingModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = ({
      inputString: '',
      values: [],
      error: '',
      isDisabled: false
    });
  }
  handleChange = (e) => {
    const v = e.target.value;
    const inputRegex = /^[0-9 ]+$/;
    if(v !== "") {
    if(inputRegex.test(v))
    this.setState({
      inputString: v,
      error: '', 
    })
    else{
      this.setState({
        error: 'Error: Please enter numbers only!'
      })
    }}
    else{
      this.setState({
        inputString: ""
      })
    }
  }
  handleSorting = () => {
    if(!this.state.inputString){
      this.setState({
        error: 'Error: Please enter numbers to sort'
      })
    }
    else
    {
    const str = this.state.inputString.replace(/\s{2,}/g,' ').trim();
    const val = Array.from(str.split(' ')).map(item => Number(item));
    this.setState({
      values: val,
      isDisabled: true
    })}
  }
  handleReset = () => {
    this.setState({
      inputString: '',
      values: [],
      error: '',
      isDisabled: false
    })
  }
  render() {
    return (
      <div className="App">
        <Modal visible width="800" height="600" effect="fadeInUp" >
            <div>
              <h1 style={{marginLeft: '80px'}}>QuickSort Algorithm Visualization in React</h1>
              <br />
              {/* <br /> */}
                <div style={{marginLeft: '40px'}}>Enter Numbers:
                  <input style={{marginLeft: '20px', width: '400px', height:'30px'}}
                          placeholder="Enter space separated numbers..."
                          value={this.state.inputString} onChange={this.handleChange}
                          disabled={this.state.isDisabled}>
                  </input>
                  <button style={{  backgroundColor:" #0DB2EB", 
                                    border: 'none',
                                    borderRadius: '150px',
                                    color: 'white',
                                    textAlign: 'center',
                                    textDecoration: 'none',
                                    display: 'inline-block',
                                    fontSize: '16px',
                                    marginLeft:'20px',
                                    cursor: 'pointer',
                                    padding: '12px 18px'}}
                                    onClick={this.handleSorting}> 
                                    
                  Sort           
                  </button>
                  <button style={{  backgroundColor:" #F1180A", 
                                    border: 'none',
                                    borderRadius: '150px',
                                    color: 'white',
                                    textAlign: 'center',
                                    textDecoration: 'none',
                                    display: 'inline-block',
                                    fontSize: '16px',
                                    marginLeft:'20px',
                                    cursor: 'pointer',
                                    padding: '12px 18px'}}
                                    onClick={this.handleReset}>  
                  Reset           
                  </button>
                </div>
                <div style={{marginLeft: '170px'}}>e.g. : 25 10 100 4 78 96 24</div>
                <div style={{marginLeft: '170px', color: 'red'}}>{this.state.error}</div>
              <br />
              <P5Wrapper sketch={sketch(this.state.values)} color="white" ></P5Wrapper>
            </div>
        </Modal>
      </div>
    );
  }
}

export default SortingModal;