import React from 'react';
import { shallow } from 'enzyme';

import ProductList from './productlist';
describe("ProductList", () => {
  it("should render my ProductList", () => {
    const wrapper = shallow(<ProductList />);
    expect(wrapper).toMatchSnapshot();
  });
});
