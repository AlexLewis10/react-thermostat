import React from 'react'
import { shallow } from 'enzyme'
import Thermostat from './thermostat.js'

it('Renders without crashing', () => {
  shallow(<Thermostat />)
})

describe('Temp up', () => {
  it('when clicked it increases the temperature by 1', () => {
    const wrapper = shallow(<Thermostat />)
    const temperature = <h1 className='temp'>21C</h1>
    const button = wrapper.find('#tempUp')
    button.simulate('click')
    expect(wrapper).toContainReact(temperature)
  })
})

describe('Temp down', () => {
  it('when clicked it decreases the temperature by 1', () => {
    const wrapper = shallow(<Thermostat />)
    const temperature = <h1 className='temp'>19C</h1>
    const button = wrapper.find('#tempDown')
    button.simulate('click')
    expect(wrapper).toContainReact(temperature)
  })
})

describe('Power Saving Mode', () => {
  it('when on it prevents temperature from exceeding 25', () => {
    const wrapper = shallow(<Thermostat />)
    const temperature = <h1 className='temp'>25C</h1>
    const button = wrapper.find('#tempUp')
    for (let i = 0; i < 6; i++) {
      button.simulate('click')
    }
    expect(wrapper).toContainReact(temperature)
  })

  it('when psm is off and temperature is above 25, turning psm on returns the temperature to 25', () => {
    const wrapper = shallow(<Thermostat />)
    const temperature = <h1 className='temp'>25C</h1>
    const psmOnButton = wrapper.find('#psmOn')
    const psmOffButton = wrapper.find('#psmOff')
    const upButton = wrapper.find('#tempUp')
    psmOffButton.simulate('click')
    for (let i = 0; i < 6; i++) {
      upButton.simulate('click')
    }
    psmOnButton.simulate('click')
    expect(wrapper).toContainReact(temperature)
  })

  it('when temperature is below 25, turning power saving mode on does not increase the temperature to 25', () => {
    const wrapper = shallow(<Thermostat />)
    const temperature = <h1 className='temp'>20C</h1>
    const psmOnButton = wrapper.find('#psmOn')
    psmOnButton.simulate('click')
    expect(wrapper).toContainReact(temperature)
  })

  it('when off temperature can exceed 25', () => {
    const wrapper = shallow(<Thermostat />)
    const temperature = <h1 className='temp'>26C</h1>
    const button = wrapper.find('#psmOff')
    const upButton = wrapper.find('#tempUp')
    button.simulate('click')
    for (let i = 0; i < 6; i++) {
      upButton.simulate('click')
    }
    expect(wrapper).toContainReact(temperature)
  })

  it('when off temperature cannot exceed 32', () => {
    const wrapper = shallow(<Thermostat />)
    const temperature = <h1 className='temp'>32C</h1>
    const button = wrapper.find('#psmOff')
    const upButton = wrapper.find('#tempUp')
    button.simulate('click')
    for (let i = 0; i < 13; i++) {
      upButton.simulate('click')
    }
    expect(wrapper).toContainReact(temperature)
  })
})

describe('Minimum temperature', () => {
  it('cannot go lower than 10', () => {
    const wrapper = shallow(<Thermostat />)
    const temperature = <h1 className='temp'>10C</h1>
    const button = wrapper.find('#tempDown')
    for (let i = 0; i < 11; i++) {
      button.simulate('click')
    }
    expect(wrapper).toContainReact(temperature)
  })
})

describe('Default temperature button', () => {
  it('returns the temperature to 20', () => {
    const wrapper = shallow(<Thermostat />)
    const temperature = <h1 className='temp'>20C</h1>
    const defaultButton = wrapper.find('#default')
    const button = wrapper.find('#tempDown')
    for (let i = 0; i < 4; i++) {
      button.simulate('click')
    }
    defaultButton.simulate('click')
    expect(wrapper).toContainReact(temperature)
  })
})

describe('Temp: and Weather', () => {
  it('do not appear before the user has searched for a the weather in a location', () => {
    const wrapper = shallow(<Thermostat />)
    expect(wrapper).not.toContainReact(<p>Temp:  Weather: </p>)
  })
 })
 