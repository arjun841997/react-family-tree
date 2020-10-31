import React from 'react';
import renderer from 'react-test-renderer';
import store from '../store'
import { Provider } from 'react-redux'

import CreateFamily from '../containers/createFamily'

it('Create Family Snapshot', () => {
  const tree = renderer.create(<Provider store={store}><CreateFamily /></Provider>).toJSON();
  expect(tree).toMatchSnapshot();
});