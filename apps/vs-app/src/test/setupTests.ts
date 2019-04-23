import * as enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

Object.defineProperty(window, 'matchMedia', {
  value: jest.fn(() => ({ matches: true }))
})

enzyme.configure({ adapter: new Adapter() })
