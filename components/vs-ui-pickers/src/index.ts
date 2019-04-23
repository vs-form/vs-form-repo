import DateExt from './DateExt'
import { registerComponent, enums } from '@vs-form/vs-form'

const register = () => registerComponent(enums.Component.dateext, DateExt)

export { DateExt, register }
