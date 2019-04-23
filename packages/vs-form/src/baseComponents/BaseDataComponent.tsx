import * as React from 'react'

import * as types from '../schemaManager/types'
import { ItemProps, ItemDataState } from '../common/propTypes'
import { isUndefined } from '../schemaManager/lodash'

export default class VsBaseDataComponent extends React.Component<ItemProps, ItemDataState> {
  constructor(props: ItemProps) {
    super(props)
    this.state = {
      value: this.props.schemaManager.getSchemaValue(this.props.comp, this.props.arrayId),
      error: this.errorsToString(this.props.schemaManager.getValueErrorsComp(this.props.comp, this.props.arrayId)),
    }
  }
  public render() {
    const { state, updateValue, getSchemaValue, setError } = this
    return this.props.children({ state, updateValue, getSchemaValue, setError, ...this.props })
  }

  public updateValue = (value: any, schemaValue?: any): void => {
    this.setState({ value })
    const _schemaValue = !isUndefined(schemaValue) ? schemaValue : value
    this.updateSchemaValue(_schemaValue)
  }

  public getSchemaValue = (): any => {
    this.props.schemaManager.getSchemaValue(this.props.comp, this.props.arrayId)
  }

  public updateSchemaValue = (value: any): void => {
    this.props.schemaManager.updateSchemaValue(this.props.comp, value, this.props.arrayId)
    const error = this.errorsToString(this.props.schemaManager.getValueErrorsComp(this.props.comp, this.props.arrayId))
    this.setError(error)
  }

  public errorsToString = (errors: types.IValidationErrorList): string => {
    return errors.map(e => e.error).join('\n')
  }

  public setError = (error: string) => {
    this.setState({ error })
  }
}
