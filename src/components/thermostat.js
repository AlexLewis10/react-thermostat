import React, { Component } from 'react'

export class Thermostat extends Component {
  constructor () {
    super()
    this.state = {
      minTemp: 10,
      maxTemp: 25,
      defaultTemp: 20,
      currentTemp: 20,
      powerSavingMode: true,
      maxTempOff: 32,
      locationWeather: null
    }
  }
  
  changeTempUp = () => {
    let newTemp = this.state.currentTemp + 1
    if (this.state.powerSavingMode === true) {
      if (this.state.currentTemp === this.state.maxTemp) {
        return 
      }
      this.setState({currentTemp: newTemp})
    }
    if(this.state.currentTemp === this.state.maxTempOff) {
      return
    }
    this.setState({currentTemp: newTemp})
  }

  changeTempDown = () => {
    let newTemp = this.state.currentTemp -1
    if (this.state.currentTemp === this.state.minTemp) {
      return
    }
    this.setState({currentTemp: newTemp})
  }

  powerSavingModeOn = () => {
    this.setState({powerSavingMode: true, currentTemp: this.state.maxTemp})
    
  }

  powerSavingModeOff = () => {
    this.setState({powerSavingMode: false})
  }

  setToCurrentTemp = () => {
    this.setState({currentTemp: this.state.defaultTemp})
  }
  
  getWeather = () => {
    fetch("../public/weather.json")//()
    .then(response => response.json())
    .then(weather =>
      this.setState({
        locationWeather: weather
      })
    )
  }

  render() {
    return (
      <div>
        <h1 className="temp">{this.state.currentTemp}C</h1>
        <button className="btn" type="button" onClick= {this.changeTempDown}>Temp Down</button>
        <button className="btn" type="button" onClick= {this.changeTempUp}>Temp Up</button>
        <button className="btn" type="button" onClick= {this.powerSavingModeOn}>Power Saving Mode ON</button>
        <button className="btn" type="button" onClick= {this.powerSavingModeOff}>Power Saving OFF</button>
        <button className="btn" type="button" onClick= {this.setToCurrentTemp}>Default Temp</button>
        <button className="btn" type="button" onClick= {this.getWeather}>Get Weather</button>
      </div>
    )
  }
}

export default Thermostat
