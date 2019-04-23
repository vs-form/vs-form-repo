import * as React from 'react'
import Slider, { SliderProps as MuiSliderProps } from '@material-ui/lab/Slider'
import { BaseFormControl, ItemProps, ItemDataProps, types } from '@vs-form/vs-form'

export const styles = {
  sliderMargin: {
    marginTop: '20px'
  }
}

export default class VsSlider extends React.Component<ItemProps> {
  private get comp(): types.IComponentSlider { return this.props.comp as types.IComponentSlider }
  private SliderProps: MuiSliderProps = {}

  constructor(props: ItemProps) {
    super(props)
    this.initProps()
  }

  public render() {
    return (
      <BaseFormControl showLabel={true} {...this.props}>
        {this.renderComp}
      </BaseFormControl>
    )
  }

  public renderComp = (dataProps: ItemDataProps) => {
    return (
      <React.Fragment>
        <Slider value={dataProps.state.value || this.SliderProps.min} onChange={this.changeValue(dataProps)} {...this.SliderProps} />
      </React.Fragment>
    )
  }

  public changeValue = (dataProps: ItemDataProps) => (_evt: React.ChangeEvent<{}>, val: number) => {
    dataProps.updateValue(val)
  }

  private initProps = () => {

    const { FormControlProps, FormHelperTextProps, FormLabelProps, ...SliderProps } = this.comp.props!
    if (SliderProps) { this.SliderProps = SliderProps }
    this.SliderProps.className = this.props.classes.sliderMargin + ' ' + this.SliderProps.className

    let min = 0
    let max = 100
    let step = 1
    const v = this.comp.data.validations
    if (v) {
      min = v.min || 0
      max = v.max || 100
      step = v.step || 1
    }

    this.SliderProps.min = min
    this.SliderProps.max = max
    this.SliderProps.step = step

  }
}
