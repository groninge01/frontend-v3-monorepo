import { render } from '@testing-library/react'

import FrontendHelpers from './frontend-helpers'

describe('FrontendHelpers', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FrontendHelpers />)
    expect(baseElement).toBeTruthy()
  })
})
