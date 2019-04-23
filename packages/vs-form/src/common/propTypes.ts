import * as types from '../schemaManager/types'
import SchemaManager from '../schemaManager/schemaManager'
import { ButtonProps } from '@material-ui/core/Button'
import { IconButtonProps } from '@material-ui/core/IconButton'

export interface IFormProps {
  schemaManager: SchemaManager,
  node?: string,
  designMode?: boolean,
}

export interface ItemProps extends IFormProps {
  node: string,
  comp: types.IComponent,
  schema: types.ISchema,
  value?: any,
  onChange?: any,
  showLabel?: boolean,
  children?: any,
  arrayId?: any,
  renderItems?: any,
  styles?: types.IStylesObj,
  classes?: any,
}

export interface ItemBaseProps extends ItemProps {
  ReactComp: any
}

export interface ItemDataProps extends ItemProps {
  state: ItemDataState,
  updateValue: (value: any, schemaValue?: any) => void,
  getSchemaValue: () => any,
  setError: (error: string) => void,
}

export interface ItemButtonProps {
  schemaManager: SchemaManager,
  comp: types.IComponent,
  buttonProps: ButtonProps | IconButtonProps,
  IconProps: any,
  classes: any,
  btnClick?: any,
  children?: any,
  designMode?: boolean,
}

export interface ItemDataState {
  value: any,
  error: string
}
