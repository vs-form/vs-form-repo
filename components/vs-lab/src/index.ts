import VsSlider, { styles } from './Slider'
import VsSpeedDial, { styles as stylesSpeedDial } from './SpeedDial'
import { registerComponent, enums } from '@vs-form/vs-form'

// tslint:disable-next-line:no-empty
const registerSlider = () => registerComponent(enums.Component.slider, VsSlider, styles)
const registerSpeedDial = () => registerComponent(enums.Component.speeddial, VsSpeedDial, stylesSpeedDial)

export { registerSlider, registerSpeedDial }
