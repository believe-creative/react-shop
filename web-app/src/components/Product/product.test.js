import React from 'react';
import { shallow } from 'enzyme';

import Product from './product';
describe("Product", () => {
  it("should render my Product", () => {
    const wrapper = shallow(<Product />);
    expect(wrapper).toMatchSnapshot();
  });
});
