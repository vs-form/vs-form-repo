import SelectExt, { ISelectExProps } from './SelectExt'
import VsSelectExt from './VsSelectExt'
import { registerComponent, enums } from '@vs-form/vs-form'

const register = () => registerComponent(enums.Component.selectext, VsSelectExt)

export { SelectExt, ISelectExProps, register }
