export enum Component {
  // containers
  card = 'card',
  panel = 'panel',
  tabs = 'tabs',
  tab = 'tab',
  expansionpanel = 'expansionpanel',
  form = 'form',
  subschema = 'subschema',
  // fields
  textinput = 'textinput',
  maskinput = 'maskinput',
  select = 'select',
  selectext = 'selectext',
  integer = 'integer',
  number = 'number',
  numberformat = 'numberformat',
  date = 'date',
  dateext = 'dateext',
  time = 'time',
  datetime = 'datetime',
  radiogroup = 'radiogroup',
  slider = 'slider',
  checkbox = 'checkbox',
  checklistbox = 'checklistbox',
  switch = 'switch',
  // static
  text = 'text',
  button = 'button',
  speeddial = 'speeddial',
  iconbutton = 'iconbutton',
  icon = 'icon',
  divider = 'divider',
  mediastatic = 'mediastatic',
  // table
  dataTable = 'dataTable',
  custom = 'custom'
}

export enum DataType {
  string = 'string',
  number = 'number',
  integer = 'integer',
  boolean = 'boolean',
  date = 'date',
  array = 'array',
  arrayString = 'arrayString',
  arrayNumber = 'arrayNumber',
  arrayInteger = 'arrayInteger',
  arrayObject = 'arrayObject',
  object = 'object',
  function = 'function',
  regex = 'regex',
  any = 'any',
}

export enum ComponentType {
  field = 'field',
  container = 'container',
  subschema = 'subschema',
  static = 'static',
}

export enum InputVariant {
  standard = 'standard',
  outlined = 'outlined',
  filled = 'filled',
}

export enum ValidationMethod {
  validateOnChange = 1,
  validateOnSubmit = 2,
}

export enum InputType {
  button = 'button',
  checkbox = 'checkbox',
  color = 'color',
  date = 'date',
  datetime = 'datetime',
  datetimelocal = 'datetime-local',
  email = 'email',
  file = 'file',
  hidden = 'hidden',
  image = 'image',
  month = 'month',
  number = 'number',
  password = 'password',
  radio = 'radio',
  range = 'range',
  reset = 'reset',
  search = 'search',
  submit = 'submit',
  tel = 'tel',
  text = 'text',
  time = 'time',
  url = 'url',
  week = 'week'
}

export enum ButtonAction {
  none = 'none',
  save = 'save',
  cancel = 'cancel',
}

export enum SchemaEventType {
  onDataChanges = 'onDataChanges',
  onSelectionChangeStarted = 'onSelectionChangeStarted',
  onSelectionChanged = 'onSelectionChanged',
  onBeforeChangeSelection = 'onBeforeChangeSelection',
  onComponentAdded = 'onComponentAdded',
  onComponentDelete = 'onComponentDelete',
  onPropertyUpdated = 'onPropertyUpdated',
  onSchemaPropertyUpdated = 'onSchemaPropertyUpdated',
  onCompileErrorClicked = 'onCompileErrorClicked',
  onRenderComponent = 'onRenderComponent',
  onFocusComponent = 'onFocusComponent',
}

export enum SortDirection {
  none = 'none',
  asc = 'asc',
  desc = 'desc',
}
