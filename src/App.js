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

  moveEventToHold() {
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

  moveHoldToBoard(){
    const { hold, onBoard } = this.state
    let boardTemp = onBoard.slice()
    boardTemp = boardTemp.map(item => {
      item.previousAnswer = false
      return item
    })
    boardTemp.push({...hold, previousAnswer: true})
    this.setState({
      onBoard: boardTemp.sort(this.keysrt('year')),
      hold: {},
    })
    this.moveEventToHold()
  }

  keysrt(key, desc) {
    return (a,b) => desc ? ~~(a[key] < b[key]) : ~~(a[key] > b[key])
  }

  render() {
    const { onBoard, hold } = this.state
    return (
      <div className="App">
        <h2>????: {hold.event}</h2>
        <ol>
          {onBoard.map((item, index) => <li className={item.previousAnswer ? 'green' : ''} key={index}>{item.year}: {item.event}</li>)}
        </ol>
        <button onClick={this.moveHoldToBoard.bind(this)}>Clikc</button>
        <button onClick={this.moveEventToHold.bind(this)}>Dump</button>
      </div>
    )
  }
}

export default App;
