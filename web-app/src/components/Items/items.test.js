import React from 'react';
import { shallow } from 'enzyme';

import Items from './items';
describe("Items", () => {
  it("should render my Items", () => {
    const wrapper = shallow(<Items />);
    expect(wrapper).toMatchSnapshot();
  });
});
