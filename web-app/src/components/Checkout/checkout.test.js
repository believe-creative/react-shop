import React from 'react';
import { shallow } from 'enzyme';

import Checkout from './checkout';
describe("Checkout", () => {
  it("should render my Checkout", () => {
    const wrapper = shallow(<Checkout />);
    expect(wrapper).toMatchSnapshot();
  });
});
