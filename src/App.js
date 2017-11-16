import React, { Component } from "react";
import "./App.css";

class App extends Component {
  constructor(){
    super()
    let data = [
      { year: 1999, event: 'road to jux' },
      { year: 2000, event: 'birth of time' },
      { year: 2001, event: 'if only she had accepted him' },
      { year: 2002, event: 'The last of the Rich' },
      { year: 2003, event: 'Didnt she like it?' },
    ]
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
        { year: years[years.length - 1] + 1, event: 'The Apocalypse' },
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
      item.selected = false
      return item
    })
    boardTemp.push({...hold, selected: true})
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
          {onBoard.map((item, index) => <li className={item.selected ? 'green' : ''} key={index} onMouseOver={_=>console.log(item.year)}>{item.year}: {item.event}</li>)}
        </ol>
        <button onClick={this.moveHoldToBoard.bind(this)}>Clikc</button>
      </div>
    )
  }
}

export default App;
