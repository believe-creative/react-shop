import React from 'react';
import { shallow } from 'enzyme';

import ProductDetails from './productdetails';
describe("Login", () => {
  it("should render my ProductDetails", () => {
    const wrapper = shallow(<ProductDetails />);
    expect(wrapper).toMatchSnapshot();
  });
});
