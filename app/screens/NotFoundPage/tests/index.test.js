import React from 'react'
import ReactShallowRenderer from 'react-test-renderer/shallow'

import NotFoundPage from '../index'

const renderer = new ReactShallowRenderer()

describe('<NotFoundPage />', () => {
  it('should render the page message', () => {
    const renderedComponent = renderer.render(<NotFoundPage />)
    expect(renderedComponent.props.children).toContain('Page non trouvée')
  })
})
