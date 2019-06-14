import React from 'react';
import { shallow } from 'enzyme';

import SiteFooter from './footer';
describe("SiteFooter", () => {
  it("should render my SiteFooter", () => {
    const wrapper = shallow(<SiteFooter />);
  });
});
