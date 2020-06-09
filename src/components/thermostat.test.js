import React from 'react';
import { shallow } from "enzyme";
import Thermostat from './thermostat.js'

it("renders without crashing", () => {
  shallow(<Thermostat />);
});

describe('temp up', () => {
  it('when clicked it increases the temperature by 1', () => {
    const wrapper = shallow(<Thermostat />)
    const temperature = <h1 className="temp">21C</h1>
    const button = wrapper.find('#woo')
    button.simulate('click')
    expect(wrapper).toContainReact(temperature)
  })
})
