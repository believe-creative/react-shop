import React from 'react';
import { shallow } from 'enzyme';

import Category from './category';
describe("Single Category", () => {
  it("should render all Category", () => {
    const wrapper = shallow(<Category />);
    expect(wrapper).toMatchSnapshot();
  });
});
