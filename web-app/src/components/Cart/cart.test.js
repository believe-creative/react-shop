import React from 'react';
import { shallow } from 'enzyme';

import Cart from './cart';
describe("Cart", () => {
  it("should render my Cart", () => {
    const wrapper = shallow(<Cart />);
    expect(wrapper).toMatchSnapshot();
  });
});
