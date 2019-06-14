import React from 'react';
import { shallow } from 'enzyme';

import NavBar from './navbar';
describe("NavBar", () => {
  it("should render my NavBar", () => {
    const wrapper = shallow(<NavBar />);
    expect(wrapper).toMatchSnapshot();
  });
});
