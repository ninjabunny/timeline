import React, { Component } from "react";
import "./App.css";
import { data } from './data'

class App extends Component {
  constructor(){
    super()
    let years = []
    data.forEach(item => {
      years.push(item.year)
    })
    years.sort()
    this.state = {
      data,
      onBoard: [
        { year: years[0] - 1, event: 'Genesis' },
        { year: years[years.length - 1] - ((years[years.length - 1] - years[0]) / 2), event: 'The Center of Time' },
        { year: years[years.length - 1], event: 'The Apocalypse' },
      ],
      hold: {},
    }
  }
  componentWillMount(){
    this.moveEventToHold()
  }

  moveEventToHold(e) {
    const { data } = this.state
    let rand = Math.floor((Math.random() * data.length))
    let tempData = data.slice()
    const hold = tempData[rand]
    tempData.splice(rand, 1)
    this.setState({
      data: tempData,
      hold,
    })
    
  }
  
  skip(){
    const { hold } = this.state
    alert(hold.year + ' ' + hold.event)
    this.moveEventToHold()
  }

  moveHoldToBoard(){
    const { hold, onBoard } = this.state
    let boardTemp = onBoard.slice()
    boardTemp = boardTemp.map(item => {
      item.previousAnswer = false
      return item
    })
    boardTemp.push({...hold, previousAnswer: true})
    this.setState({
      onBoard: boardTemp.sort((obj1, obj2) => obj1['year'] - obj2['year']),
      hold: {},
    })
    this.moveEventToHold()
  }

  render() {
    const { onBoard, hold } = this.state
    return (
      <div className="App">
        <h2>????: {hold.event}</h2><button onClick={this.skip.bind(this)}>Skip</button>
        <ol onClick={this.moveHoldToBoard.bind(this)}>
          {onBoard.map((item, index) => <li className={item.previousAnswer ? 'green' : ''} key={index}>{item.year}: {item.event}</li>)}
        </ol>
      </div>
    )
  }
}

export default App;
