import React from 'react';
import { shallow } from "enzyme";
import Thermostat from './thermostat.js'

it("renders without crashing", () => {
  shallow(<Thermostat />);
});