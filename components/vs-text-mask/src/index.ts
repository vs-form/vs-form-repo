import VsMaskInput from './MaskInput'
import { registerComponent, enums } from '@vs-form/vs-form'

const register = () => registerComponent(enums.Component.maskinput, VsMaskInput)

export { VsMaskInput, register }
