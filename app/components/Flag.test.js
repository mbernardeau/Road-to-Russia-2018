import React from 'react';
import renderer from 'react-test-renderer';

import Flag from './Flag';

describe('components/Flag', () => {
  jest.mock('assets/flags/ru.svg', () => 'mock_image');

  it('renders correctly', () => {
    const tree = renderer.create(
      <Flag country="ru" />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('should pass className and style to underlying component', () => {
    const tree = renderer.create(
      <Flag country="ru" style={{ marginTop: 4 }} className="test-image" />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
