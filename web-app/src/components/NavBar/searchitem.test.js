import React from 'react';
import { shallow } from 'enzyme';

import SearchItem from './searchitem';
describe("SearchItem", () => {
  it("should render my SearchItem", () => {
    const wrapper = shallow(<SearchItem />);
    expect(wrapper).toMatchSnapshot();
  });
});
