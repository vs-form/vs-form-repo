import * as React from 'react'
import SelectExt from './SelectExt'

import { BaseDataComponent, ItemProps, ItemDataProps, types } from '@vs-form/vs-form'
import { common } from '@vs-form/vs-form'

export default class VsSelectExt extends React.Component<ItemProps> {
  private get comp(): types.IComponentSelectExt { return this.props.comp as types.IComponentSelectExt }
  // private SelectProps: types.ISelectExtProps = {}
  private inputRef: any

  constructor(props: ItemProps) {
    super(props)
    this.initProps()
    this.inputRef = React.createRef()
    props.schemaManager.addInputRef(props.comp, this.inputRef)
  }

  public render() {
    return (
      <BaseDataComponent {...this.props}>
        {this.renderComp}
      </BaseDataComponent>
    )
  }

  public renderComp = (dataProps: ItemDataProps) => {
    return (
      <SelectExt
        isMulti={common.dataTypeIsArray(this.comp.data.dataType)}
        label={this.comp.label as string}
        value={dataProps.state.value}
        onChange={this.changeValue(dataProps)}
        items={this.comp.data.items as types.ISelectItemList}
        placeholder=""
        inputRef={this.inputRef}
      />
    )
  }

  private changeValue = (dataProps: ItemDataProps) => (value: any) => {
    dataProps.updateValue(value)
  }

  private initProps() {
    // todo
    // this.SelectProps = this.comp.props!
    // this.SelectProps.placeholder = ''
    // this.SelectProps.isMulti = common.dataTypeIsArray(this.comp.data.dataType)

  }

}
