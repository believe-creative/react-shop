import React from 'react';
import { shallow } from 'enzyme';

import UserBlock from './userblock';
describe("UserBlock", () => {
  it("should render my UserBlock", () => {
    const wrapper = shallow(<UserBlock />);
    expect(wrapper).toMatchSnapshot();
  });
});
