import { TextFieldProps, StandardTextFieldProps } from '@material-ui/core/TextField'

import { RadioGroupProps } from '@material-ui/core/RadioGroup'
import { RadioProps } from '@material-ui/core/Radio'

import { CheckboxProps } from '@material-ui/core/Checkbox'
import { SwitchProps } from '@material-ui/core/Switch'
import { ExpansionPanelProps } from '@material-ui/core/ExpansionPanel'
import { ExpansionPanelSummaryProps } from '@material-ui/core/ExpansionPanelSummary'
import { ExpansionPanelDetailsProps } from '@material-ui/core/ExpansionPanelDetails'

import { TabsProps } from '@material-ui/core/Tabs'
import { AppBarProps } from '@material-ui/core/AppBar'
import { TabProps } from '@material-ui/core/Tab'
import { PaperProps } from '@material-ui/core/Paper'
import { TypographyProps } from '@material-ui/core/Typography'
import { DividerProps } from '@material-ui/core/Divider'
import { CardMediaProps } from '@material-ui/core/CardMedia'
import { ButtonProps } from '@material-ui/core/Button'
import { IconButtonProps } from '@material-ui/core/IconButton'
import { IconProps } from '@material-ui/core/Icon'
import { SvgIconProps } from '@material-ui/core/SvgIcon'
import { FormControlProps } from '@material-ui/core/FormControl'
import { FormHelperTextProps } from '@material-ui/core/FormHelperText'
import { FormLabelProps } from '@material-ui/core/FormLabel'
import { FormControlLabelProps } from '@material-ui/core/FormControlLabel'
import { FormGroupProps } from '@material-ui/core/FormGroup'
import { CardProps } from '@material-ui/core/Card'
import { CardHeaderProps } from '@material-ui/core/CardHeader'
import { CardContentProps } from '@material-ui/core/CardContent'
import { GridProps } from '@material-ui/core/Grid'
import { SliderProps } from '@material-ui/lab/Slider'
import { SpeedDialActionProps } from '@material-ui/lab/SpeedDialAction'
import { SpeedDialProps } from '@material-ui/lab/SpeedDial'
import { TooltipProps } from '@material-ui/core/Tooltip'

import { NumberFormatProps } from 'react-number-format'
import { MaskedInputProps } from 'react-text-mask'

import SchemaManager from './schemaManager'
import * as enums from './enums'
import * as errs from './str_err'

// reflect commonProps in validschema.ts
export interface ICommonProps {
  id?: string,
  node?: string,
  disabled?: boolean,
  gridItem?: GridProps,
  styles?: IStylesObj,
  dense?: boolean,
  hidden?: boolean,
  tooltip?: string | IStringFunction,
  tooltipProps?: ITooltipProps,
  iconComp?: any,
}

export interface ISchema {
  name: string,
  node: string,
  validationMethod: enums.ValidationMethod,
  hideValidationErrorPanel?: boolean,
  label: string,
  values: IObj,
  components: IComponents,
  styles?: IStylesObj,
  disabled?: boolean,
  onCreated?: ISchemaEvent,
  onDidMount?: ISchemaEvent,
  onWillUnmount?: ISchemaEvent,
  onChange?: IDataEvent,
  onSubmit?: ISchemaEvent,
  onCancelValues?: ISchemaEvent,
  validate?: IValidationEvent,
  [key: string]: any,
}

export interface ISchemaDesign extends Partial<ISchema> {
  components: IComponents,
}

export interface ICommonDataProps {
  field: string,
  dataType: enums.DataType,
  fieldPath?: string,
  default?: any,
  onBeforeChange?: IDataEvent,
  onChange?: IDataEvent,
  validations?: IComponentDataValidation,
  modifiers?: IComponentDataModifier,
}

export interface ICommonContainerProps extends ICommonLabelOptionalProps {
  children: IChildrenMember,
  gridContainer?: GridProps,
}

export interface ICommonInputFieldProps {
  placeholder?: string | IStringFunction,
  hint?: string | IStringFunction,
  prefix?: string | string[],  // string = text, array = components
  suffix?: string | string[],
}

export interface ICommonLabelProps {
  label: string | IStringFunction,
}

export interface ICommonLabelOptionalProps {
  label?: string | IStringFunction,
}

export interface ICommonButtonProps {
  action?: enums.ButtonAction
  onClick?: IComponentEvent,
}

export interface ICommonDataPropsInput extends ICommonDataProps {
  dataType: enums.DataType.string,
}

export interface ICommonDataPropsDate extends ICommonDataProps {
  dataType: enums.DataType.date,
}

export interface ICommonDataPropsNumber extends ICommonDataProps {
  dataType: enums.DataType.number,
}

export interface ICommonDataPropsNumberFormat extends ICommonDataProps {
  dataType: enums.DataType.number | enums.DataType.integer,
}

export interface ICommonDataPropsInteger extends ICommonDataProps {
  dataType: enums.DataType.integer,
}

export interface ICommonDataPropsBool extends ICommonDataProps {
  dataType: enums.DataType.boolean,
}

export interface ICommonDataPropsSelect extends ICommonDataProps {
  dataType: enums.DataType.string | enums.DataType.number | enums.DataType.integer | enums.DataType.arrayString | enums.DataType.arrayNumber | enums.DataType.arrayInteger,
  items: ISelectItemList | ISelectItemListFunction | string[],
}

export interface ICommonDataPropsRadioGroup extends ICommonDataProps {
  dataType: enums.DataType.string | enums.DataType.number
  items: ISelectItemList | ISelectItemListFunction | string[],
}

export interface ICommonDataPropChecklistbox extends ICommonDataProps {
  dataType: enums.DataType.arrayString | enums.DataType.arrayNumber,
  items: IChecklistboxItemList,
}

export interface ICommonDataPropsSubschema extends ICommonDataProps {
  dataType: enums.DataType.object | enums.DataType.array,
}

// Components
// **********

// data-fields
export interface IComponentTextInput extends ICommonProps, ICommonInputFieldProps, ICommonLabelProps {
  type: enums.Component.textinput,
  data: ICommonDataPropsInput,
  props?: TextFieldProps
}

export interface IComponentMaskInput extends ICommonProps, ICommonInputFieldProps, ICommonLabelProps {
  type: enums.Component.maskinput,
  data: ICommonDataPropsInput,
  maskProps?: MaskedInputProps,
  props?: TextFieldProps
}

export interface IComponentNumber extends ICommonProps, ICommonInputFieldProps, ICommonLabelProps {
  type: enums.Component.number,
  data: ICommonDataPropsNumber,
  props?: TextFieldProps
}

export interface IComponentInteger extends ICommonProps, ICommonInputFieldProps, ICommonLabelProps {
  type: enums.Component.integer,
  data: ICommonDataPropsInteger,
  props?: TextFieldProps
}

export interface IComponentSlider extends ICommonProps, ICommonInputFieldProps, ICommonLabelProps {
  type: enums.Component.slider,
  data: ICommonDataPropsNumber,
  props?: ISliderProps
}

export interface IComponentNumberFormat extends ICommonProps, ICommonInputFieldProps, ICommonLabelProps {
  type: enums.Component.numberformat,
  data: ICommonDataPropsNumberFormat,
  numberFormatProps: NumberFormatProps
  props?: TextFieldProps
}

export interface IComponentDate extends ICommonProps, ICommonInputFieldProps, ICommonLabelProps {
  type: enums.Component.date | enums.Component.datetime | enums.Component.time,
  data: ICommonDataPropsDate
  props?: TextFieldProps
}

export interface IComponentDateExt extends ICommonProps, ICommonInputFieldProps, ICommonLabelProps {
  type: enums.Component.dateext,
  data: ICommonDataPropsDate
  props?: IDateExtProps
}

export interface IComponentSelect extends ICommonProps, ICommonInputFieldProps, ICommonLabelProps {
  type: enums.Component.select,
  data: ICommonDataPropsSelect,
  autocomplete?: boolean
  props?: TextFieldProps
}

export interface IComponentSelectExt extends ICommonProps, ICommonInputFieldProps, ICommonLabelProps {
  type: enums.Component.selectext,
  data: ICommonDataPropsSelect,
  props?: ISelectExtProps
}

export interface IComponentRadioGroup extends ICommonProps, ICommonLabelProps {
  type: enums.Component.radiogroup,
  data: ICommonDataPropsRadioGroup,
  props?: IRadioGroupProps
}

export interface IComponentChecklistbox extends ICommonProps, ICommonLabelProps {
  type: enums.Component.checklistbox,
  data: ICommonDataPropChecklistbox,
  rowDisplay?: boolean,
  actionIcon?: IIcon, // icon for action
  onActionClick?: IDataItemEvent,
  props?: IChecklistBoxProps
}

export interface IComponentCheckbox extends ICommonProps, ICommonLabelProps {
  type: enums.Component.checkbox,
  data: ICommonDataPropsBool,
  props?: ICheckboxProps
}

export interface IComponentSwitch extends ICommonProps, ICommonLabelProps {
  type: enums.Component.switch,
  data: ICommonDataPropsBool,
  props?: ISwitchProps
}

export interface IComponentSubschema extends ICommonProps, ICommonLabelOptionalProps {
  type: enums.Component.subschema,
  schemaName: string,
  schema?: ISchema,
  data: ICommonDataPropsSubschema,
  keyField?: string,
  columnSettings?: IDataTableColumnSettings,
  rowsPerPage?: number,
  hidePagination?: boolean
  props?: IObj
}

// Containers
export interface IComponentForm extends ICommonProps, ICommonContainerProps {
  type: enums.Component.form,
  props?: IPanelProps
}

export interface IComponentPanel extends ICommonProps, ICommonContainerProps {
  type: enums.Component.panel,
  props?: IPanelProps
}

export interface IComponentTab extends ICommonProps, ICommonContainerProps {
  type: enums.Component.tab,
  icon?: IIcon,
  props?: IPanelProps
}

export interface IComponentCard extends ICommonProps, ICommonContainerProps {
  type: enums.Component.card,
  subheader?: string,
  icon?: IIcon,
  props?: ICardProps
}

export interface IComponentExpansionPanel extends ICommonProps, ICommonContainerProps {
  type: enums.Component.expansionpanel,
  expanded?: boolean,
  onBeforeChange?: IExpPanelBeforeChangeEvent,
  onChange?: IExpPanelChangedEvent,
  props?: IExpansionPanelProps
}

export interface IComponentTabs extends ICommonProps, ICommonLabelOptionalProps {
  type: enums.Component.tabs,
  tabs: string[],
  activeTab?: number,
  onBeforeChange?: ITabBeforeChangeEvent,
  onChange?: ITabChangedEvent,
  props?: ITabsProps,
}

// static
export interface IComponentText extends ICommonProps {
  text: string | IStringFunction,
  type: enums.Component.text,
  props?: TypographyProps
}

export interface IComponentButton extends ICommonProps, ICommonButtonProps, ICommonLabelOptionalProps {
  type: enums.Component.button,
  icon?: IIcon,
  iconRight?: boolean,
  props?: IButtonProps,
}

export interface IComponentIconButton extends ICommonProps, ICommonButtonProps {
  icon: IIcon,
  type: enums.Component.iconbutton,
  props?: IIconButtonProps,
}

export interface IComponentSpeediDial extends ICommonProps, ICommonButtonProps {
  type: enums.Component.speeddial,
  actions: ISpeedDialActionList,
  props?: ISpeedDialProps,
}

export interface IComponentIcon extends ICommonProps {
  type: enums.Component.icon,
  icon?: string,
  svg?: string,
  component?: any,
  props?: IconProps | SvgIconProps,
}

export interface IComponentDivider extends ICommonProps {
  type: enums.Component.divider,
  props?: DividerProps
}

export interface IComponentMediaStatic extends ICommonProps {
  type: enums.Component.mediastatic,
  props?: CardMediaProps
}

export interface IComponentCustom extends ICommonProps {
  type: enums.Component.custom,
  name: string,
  [key: string]: any,
}

export type IComponent =
  IComponentForm | IComponentPanel | IComponentTab | IComponentCard | IComponentExpansionPanel | IComponentTabs | IComponentTextInput | IComponentMaskInput |
  IComponentSelect | IComponentSelectExt | IComponentRadioGroup | IComponentChecklistbox | IComponentNumber | IComponentInteger | IComponentSlider | IComponentNumberFormat | IComponentCheckbox | IComponentSwitch |
  IComponentDate | IComponentDateExt | IComponentSubschema |
  IComponentText | IComponentButton | IComponentIconButton | IComponentSpeediDial | IComponentIcon | IComponentDivider | IComponentMediaStatic | IComponentCustom

export interface IComponentList extends Array<IComponent> { }

export type IStringFunction = (params: IComponentEventParams) => string
export type ISelectItemListFunction = (params: IComponentEventParams) => ISelectItemList | string[]

export type ISchemaEvent = (params: ISchemaEventParams) => void

export type IComponentEvent = (params: IComponentEventParams) => void
export type ITabBeforeChangeEvent = (params: ITabBeforeChangeParams) => void
export type ITabChangedEvent = (params: ITabChangedParams) => void
export type IExpPanelBeforeChangeEvent = (params: IExpPanelBeforeChangeParams) => void
export type IExpPanelChangedEvent = (params: IExpPanelChangedParams) => void

export type IDataEvent = (params: IDataEventParams) => void
export type IDataItemEvent = (params: ISchemaEventItemParams) => void
export type IDataValidationEvent = (params: IDataEventParams) => string
export type IDataValidationRequiredEvent = (params: IDataEventParams) => boolean
export type IValidationEvent = (params: ISchemaEventParams) => IValidationError | undefined// validate auf Schema
export type IChildrenMember = string[]
export type IIcon = string | string[] // string = material-design icon, array = component

export interface IComponentDataValidation {
  required?: boolean | IDataValidationRequiredEvent,
  allowedValues?: any[],
  min?: number,
  max?: number,
  step?: number,
  regex?: any,
  validate?: IDataValidationEvent,
}

export interface IComponentDataModifier {
  trim?: boolean,
  toLowerCase?: boolean,
  toUpperCase?: boolean,
  capitalize?: boolean,
}

export interface IStylesObj {
  [key: string]: IObj,
}

export interface IObj {
  [key: string]: any,
}

export interface IDataTableColumnSetting {
  compId: string,
  autowidth?: boolean,
  width?: number,
  widthUnit?: string,
  alignRight?: boolean,
  sortable?: boolean,
  sortDirection?: enums.SortDirection, // if by default sorted
}

export interface IDataTableColumnSettings extends Array<IDataTableColumnSetting> { }

export interface ISelectItem {
  value: string | number,
  text: string,
}

export interface IChecklistboxItem extends ISelectItem {
  actionIcon?: IIcon // icon for action
}

export interface ISpeedDialAction {
  id?: string | number,
  icon: string,
  tooltip: string,
  onClick?: IComponentEvent
}

export interface ISpeedDialActionList extends Array<ISpeedDialAction> { }

export interface ISelectItemList extends Array<ISelectItem> { }

export interface IChecklistboxItemList extends Array<IChecklistboxItem> { }

export interface IComponents {
  root: IComponent,
  [key: string]: IComponent,
}

export interface IComponentIndex {
  node: IComponent,
  index: number
}

export interface ISchemaEventParams {
  schemaManager: SchemaManager,
  schema: ISchema,
}

export interface IComponentEventParams extends ISchemaEventParams {
  component: IComponent,
}

export interface IDataEventParams extends IComponentEventParams {
  value: any
}

export interface ISchemaEventItemParams extends IDataEventParams {
  item: ISelectItem
}

export interface ITabChangedParams extends IComponentEventParams {
  newTab: number,
}

export interface ITabBeforeChangeParams extends ITabChangedParams {
  canChange: boolean
}

export interface IExpPanelChangedParams extends IComponentEventParams {
  expanded: boolean,
}

export interface IExpPanelBeforeChangeParams extends IExpPanelChangedParams {
  canChange: boolean
}

export interface IProcessSchemaParamsBase {
  schema: ISchema | ISchemaDesign,
  parentComp?: IComponent,
  options: { done?: boolean, processSubSchemas?: boolean },
}

export interface IProcessSchemaParams extends IProcessSchemaParamsBase {
  parentSchema?: ISchema | ISchemaDesign,
  parentCompKey?: string,
  schemaCallback?: ISchemaCallback,
  componentCallback?: IComponentCallback,
}

export interface IProcessSchemaParamsComponent extends IProcessSchemaParamsBase {
  comp: IComponent,
  key?: string,
}

export interface IProcessSchemaParamsSchema extends IProcessSchemaParamsBase {
  parentSchema?: ISchema | ISchemaDesign,
  parentCompKey?: string
  key?: string,
}

export type ISchemaCallback = (p: IProcessSchemaParamsSchema) => void
export type IComponentCallback = (p: IProcessSchemaParamsComponent) => void

export interface ISchemaList extends Array<ISchemaDesign> { }

export interface IValidationError {
  error: string,
  comp: IComponent,
  arrayId: any
}
export interface IValidationErrorList extends Array<IValidationError> { }

export type IValidatorSchema = (schemaManager: SchemaManager) => ISchemaError | string

export interface IValidatorSchemaList extends Array<IValidatorSchema> { }

export type IValidatorComponent = (validSchema: IObj, component: IComponent, schema: ISchema | ISchemaDesign) => ISchemaError | string

export interface IValidatorComponentList extends Array<IValidatorComponent> { }

export interface ICounter {
  count: number,
  max: number,
}

export interface ISortableProps {
  className?: string,
  onChange: any,
  options: any,
  children?: any
}

export interface ISubschemaArrayProps {
  subschemaFieldName: string,
  arrayValue: object[],
  arrayRecord: object,
}

export interface IAddComponentType {
  componentType: enums.ComponentType,
  component: enums.Component,
  id: string,
  label: string,
  field: string,
  dataType: enums.DataType,
  subschema: string,
  text: string,
}

export enum SchemaErrorType {
  error = 'error',
  warning = 'warning',
}

export interface ISchemaError {
  errcode: errs.ErrorCode,
  schemaName?: string,
  msg?: string,
  key?: string,
  prop?: string,
  addOn?: string,
  type?: SchemaErrorType,
  itemNo?: string,
}

export interface ISchemaErrorList extends Array<ISchemaError> { }

export interface IBaseFormControlProps {
  FormControlProps?: FormControlProps,
  FormLabelProps?: FormLabelProps,
  FormHelperTextProps?: FormHelperTextProps
}

export interface ISliderProps extends SliderProps, IBaseFormControlProps { }

export interface ISwitchProps extends SwitchProps, IBaseFormControlProps {
  FormControlLabelProps?: Partial<FormControlLabelProps>,
}

export interface IChecklistBoxProps extends FormGroupProps, IBaseFormControlProps {
  FormControlLabelProps?: Partial<FormControlLabelProps>,
  CheckboxProps?: CheckboxProps,
  IconButtonProps?: IconButtonProps
}

export interface ISelectExtProps extends ICommonProps, ICommonLabelOptionalProps {
  isMulti?: boolean,
  placeholder?: string,
  label?: string,
  isSearchable?: boolean,
  style?: any,
  autofocus?: boolean,
  clases?: any,
  TextFieldProps?: TextFieldProps,
  inputRef?: any,
  [key: string]: any,
}

export interface IDateExtProps extends StandardTextFieldProps {
  type: enums.Component,
  [key: string]: any,
}

export interface IRadioGroupProps extends RadioGroupProps, IBaseFormControlProps {
  FormControlLabelProps?: Partial<FormControlLabelProps>,
  RadioProps?: RadioProps
}

export interface IExpansionPanelProps extends ExpansionPanelProps {
  ExpansionPanelSummaryProps?: ExpansionPanelSummaryProps,
  ExpansionPanelDetailsProps?: ExpansionPanelDetailsProps
  TypographyProps?: TypographyProps
  IconProps?: IconProps
}

export interface ITabsProps extends PaperProps {
  AppBarProps?: AppBarProps,
  TabsProps?: TabsProps,
  TabProps?: TabProps,
  IconProps?: IconProps
}

export interface ICardProps extends CardProps {
  CardHeaderProps?: CardHeaderProps,
  CardContentProps?: CardContentProps,
  HeaderTypographyProps?: TypographyProps,
  SubHeaderTypographyProps?: TypographyProps,
}

export interface IButtonProps extends ButtonProps {
  LabelProps?: TypographyProps,
  IconProps?: IconProps
}

export interface ICheckboxProps extends CheckboxProps, IBaseFormControlProps {
  FormControlLabelProps?: Partial<FormControlLabelProps>,
}

export interface ISwitchProps extends SwitchProps, IBaseFormControlProps {
  FormControlLabelProps?: Partial<FormControlLabelProps>,
}

export interface IPanelProps {
  className?: string,
  style?: object,
  HeaderTypographyProps?: TypographyProps
}

export interface IIconButtonProps extends IconButtonProps {
  IconProps?: IconProps
}

export interface ISpeedDialProps extends Partial<SpeedDialProps> {
  SpeedDialActionProps?: SpeedDialActionProps
}

export interface ITooltipProps extends Partial<TooltipProps> {
}
