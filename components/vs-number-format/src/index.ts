import VsNumberFormat from './NumberFormat'
import { registerComponent, enums } from '@vs-form/vs-form'

const register = () => registerComponent(enums.Component.numberformat, VsNumberFormat)

export { VsNumberFormat, register }
