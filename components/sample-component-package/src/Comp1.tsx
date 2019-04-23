import * as React from 'react'
import { BaseDataComponent, ItemProps, ItemDataProps, types } from '@vs-form/vs-form'

export default class VsComp1 extends React.Component<ItemProps> {
  public render() {
    return (
      <BaseDataComponent {...this.props}>
        <div>...xxx</div>
      </BaseDataComponent>
    )
  }

}
