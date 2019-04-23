import { has, set, get, isString, capitalize, isArray, cloneDeep, isFunction, isObject, isUndefined, merge } from './lodash'
import { EventEmitter } from 'events'
import { format } from 'date-fns'

import { checkSchema } from './checkSchema'
import * as common from './common'
import * as constants from './constants'
import * as strings from './strings'
import * as enums from './enums'
import * as types from './types'

import {
  IComponent, IComponentList, IChildrenMember, ISchema, ISchemaDesign, ISchemaList, ISchemaErrorList, IStylesObj,
  IValidationErrorList, IComponentEventParams,
  IProcessSchemaParams, ISchemaCallback,
  IComponentCallback, IComponentTextInput, IComponentSubschema, ISubschemaArrayProps,
  IComponentExpansionPanel,
} from './types'

import * as errstrings from './str_err'

interface InputRefItem {
  comp: IComponent,
  inputRef: any,
}

export default class SchemaManager extends EventEmitter {

  public static getComponents(schema: ISchema | ISchemaDesign, withSubSchema?: boolean): IComponentList {
    const list: IComponentList = []

    const componentCallback: IComponentCallback = p => {
      if (p.comp) { list.push(p.comp) }
    }

    const options = { processSubSchemas: withSubSchema }
    SchemaManager.processSchema({ componentCallback, schema, options })
    return list
  }

  public static getDataComponents(schema: ISchema): IComponentList {
    if (!schema.components) {
      return []
    }
    return Object.keys(schema.components).map(c => schema.components[c]).filter(c => common.checkIsDataComponent(c))
  }

  public static processSchema(params: IProcessSchemaParams): void {
    const { schemaCallback, componentCallback, schema, options, parentSchema, parentComp, parentCompKey } = params
    if (schemaCallback) { schemaCallback({ schema, parentComp, parentSchema, parentCompKey, options }) }
    if (options.done) { return }
    if (has(schema, 'components')) {
      Object.keys(schema.components).forEach(key => {
        if (options.done) { return }
        const comp = schema.components[key]
        if (componentCallback) { componentCallback({ schema, key, comp, parentComp, options }) }
        if (comp.type === enums.Component.subschema) {
          const sub = comp.schema
          if (sub && isObject(sub) && options.processSubSchemas) {
            SchemaManager.processSchema({ schemaCallback, componentCallback, schema: sub, options, parentComp: comp, parentSchema: schema, parentCompKey: key })
          }
        }
      })
    }
  }

  public static hasSubschema(schema: ISchema | ISchemaDesign): boolean {
    let res: boolean = false
    const options = { done: false }
    const componentCallback: IComponentCallback = p => {
      if (p.comp && p.comp.type === enums.Component.subschema && p.comp.schemaName) {
        options.done = true
        res = true
      }
    }
    SchemaManager.processSchema({ componentCallback, schema, options: { processSubSchemas: false } })
    return res
  }

  public schema!: ISchema
  public origSchema!: ISchemaDesign

  public schemaList: ISchemaList = []

  public validationErrors: IValidationErrorList = []

  public selection: IComponentList = []

  private errors: ISchemaErrorList = []
  private actionButtons: IComponentList = []
  private inputRefs: InputRefItem[] = []

  private previousValues: any
  private _dataStateChanged: boolean = false // when values changes once, stays to true

  public get dataStateChanged(): boolean {
    return this._dataStateChanged
  }
  public set dataStateChanged(value: boolean) {
    if (this._dataStateChanged !== value) {
      this._dataStateChanged = value

      this.actionButtons.forEach(e => e.props.disabled = !value)
      this.renderComponents(this.actionButtons)
    }
  }

  constructor(schema: ISchema | ISchemaDesign | string, subSchemaList?: ISchemaList) {
    super()
    // setMaxListeners unlimited, onRenderComponent has more than 11 listeners
    this.setMaxListeners(0)
    this.schemaList = subSchemaList ? subSchemaList : []

    const s: ISchema | ISchemaDesign | undefined = this.getSchemaFromList(schema)
    if (s) {
      // clone - do not modify the original schema
      this.schema = cloneDeep(s) as ISchema
      if (!has(this.schema, 'values')) {
        this.schema.values = {}
      }
      if (!has(this.schema, 'name') || this.schema.name === '') {
        const date = new Date()
        this.schema.name = 'schema_' + format(date, constants.htmlDateFormat) + 'T' + format(date, constants.htmlTimeFormatWithSeconds)
      }
      if (!this.schema.label) {
        this.schema.label = this.schema.name
      }
      if (!has(this.schema, 'validationMethod')) {
        this.schema.validationMethod = enums.ValidationMethod.validateOnChange
      }
      const o = this.getSchemaFromList(this.schema.name)
      if (o) {
        this.origSchema = cloneDeep(o)
      } else {
        this.origSchema = cloneDeep(this.schema)
      }

      this.addRootKey()
      this.init()

      this.callSchemaEvent('onCreated')

    } else {
      this.errors.push({ errcode: errstrings.ErrorCode.schemaNotFound })
    }
  }

  public render(callback?: () => void) {
    this.renderComponent(this.schema.components.root, callback)
  }

  public renderComponent(component: IComponent, callback?: () => void) {
    this.emit(enums.SchemaEventType.onRenderComponent, component, callback, this)
  }

  public renderComponents(components: IComponentList, callback?: () => void) {
    components.forEach(c => this.renderComponent(c, callback))
  }

  public focusComponent(component: IComponent, makeComponentVisible: boolean = true) {
    if (makeComponentVisible) { this.makeComponentVisible(component) }
    setTimeout(() => {
      this.emit(enums.SchemaEventType.onFocusComponent, component, this)
    }, 200)
  }

  public makeComponentVisible(comp: IComponent) {
    let parent = this.getParentComponent(comp)
    let doRender = false
    while (parent && parent.id !== 'root') {
      if (parent.type === enums.Component.expansionpanel && !parent.expanded) {
        this.changeExpanded(parent, true, false)
        doRender = true
      } else if (parent.type === enums.Component.tab) {
        const tab: string = parent.node!
        parent = this.getParentComponent(parent as IComponent)
        if (parent && parent.type === enums.Component.tabs) {
          const ind = parent.tabs.indexOf(tab)
          if (ind > -1 && parent.activeTab !== ind) {
            this.changeActiveTab(parent, ind, false)
            doRender = true
          }
        }
      }
      parent = this.getParentComponent(parent as IComponent)
    }
    if (doRender) {
      this.render()
    }

  }

  public getParentComponent(comp: IComponent): IComponent | undefined {
    let id = comp.id
    // root of subschema
    let node: string = comp.node!
    if (comp.node === 'root' && this.componentIsInSubschema(comp)) {
      const lastInd = id!.lastIndexOf('.')
      id = id!.substring(0, lastInd)
      const c = this.getComponentById(id)
      node = c ? c.node! : ''
    }
    const schema: ISchema | undefined = this.getSchemaFromComponentId(id!)
    if (schema && node) {
      const components = Object.keys(schema.components).map(c => schema.components[c])
      let p: IComponentList = components.filter(c => has(c, 'children') && (c as types.IComponentPanel).children.indexOf(node) > -1)
      if (p.length === 0) {
        p = components.filter(c => has(c, 'tabs') && (c as types.IComponentTabs).tabs.indexOf(node) > -1)
      }

      if (p.length > 0) { return p[0] }
    }
    return undefined
  }

  public addInputRef(comp: IComponent, inputRef: any) {
    this.inputRefs.unshift({ comp, inputRef })
  }

  public getInputRef(comp: IComponent): any {
    const ref = this.inputRefs.find(item => item.comp === comp)
    if (ref) { return ref.inputRef }
    return undefined
  }

  public clearInputRefList() {
    this.inputRefs = []
  }

  public submit(): boolean {
    this.validateValuesSchema()
    if (this.validationErrors.length === 0) {
      this.removeSubschemaArrayIds()
      this.previousValues = cloneDeep(this.schema.values)
      this.callSchemaEvent('onSubmit')
      this.dataStateChanged = false
      this.render()
      return true
    } else {
      this.render()
      return false
    }
  }

  public cancelValues(): void {
    this.schema.values = cloneDeep(this.previousValues)
    this.callSchemaEvent('onCancelValues')
    this.dataStateChanged = false
    this.render()
  }

  public componentIsInSubschema(comp: IComponent): boolean {
    return comp.id!.indexOf('.') > -1
  }

  public getSchemaFromComponentId(id: string): ISchema | undefined {
    if (!id) { return this.schema }
    const lastInd = id.lastIndexOf('.')
    if (lastInd === -1) {
      return this.schema
    } else {
      const subId = id.substring(0, lastInd)
      const p = subId.replace(/\./g, '.schema.components.')
      const comp = get(this.schema.components, p) as types.IComponentSubschema
      if (comp) {
        return comp.schema
      }
    }
  }

  public getOrigSchemaFromComponentId(id: string): ISchemaDesign | undefined {
    const lastInd = id.lastIndexOf('.')
    if (lastInd === -1) {
      return this.origSchema
    } else {
      let schema: ISchemaDesign | undefined
      const subId = id.substring(0, lastInd)
      const p = subId.replace(/\./g, '.schema.components.')
      const comp = get(this.schema.components, p) as types.IComponentSubschema
      if (comp) {
        schema = this.getSchemaFromList(comp.schemaName)
      }
      return schema
    }
  }

  public getComponentById(id: string): IComponent | undefined {
    const ind = id.indexOf('.')
    if (ind === -1) {
      return this.schema.components[id]
    } else {
      const p = id.replace(/\./g, '.schema.components.')
      return get(this.schema.components, p)
    }
  }

  public getOrigComponentById(id: string): IComponent | undefined {
    const schema = this.getOrigSchemaFromComponentId(id)
    if (schema) {
      const lastInd = id.lastIndexOf('.')
      const node = lastInd === -1 ? id : id.substring(lastInd + 1)
      return schema.components[node]
    }
  }

  public getComponentByFieldPath(fieldPath: string): IComponent | null {
    let comp = null
    const componentCallback: IComponentCallback = p => {
      const cd = common.checkIsDataComponent(p.comp)
      if (cd && cd.data.fieldPath === fieldPath) {
        p.options.done = true
        comp = p.comp
      }
    }
    const options = { processSubSchemas: true }
    SchemaManager.processSchema({ componentCallback, schema: this.schema, options })
    return comp
  }

  public getComponentEventParams(component: IComponent): IComponentEventParams {
    const schema: ISchema = this.getSchemaFromComponentId(component.id!) || this.schema
    return { schemaManager: this, schema, component }

  }

  public clearValueErrors() {
    return this.validationErrors = []
  }

  public changeSelection(components: IComponent | IComponentList, multiselect: boolean): void {
    this.emit(enums.SchemaEventType.onSelectionChangeStarted, components, multiselect, this)
  }

  public get getErrors(): ISchemaErrorList {
    return this.errors && this.errors.filter(el => el.type === 'error')
  }

  public get getWarnings(): ISchemaErrorList {
    return this.errors && this.errors.filter(el => el.type !== 'error')
  }

  public get getAllErrors(): ISchemaErrorList {
    return this.errors
  }

  public filterErrors(errcode: errstrings.ErrorCode) {
    return this.errors && this.errors.filter(e => e.errcode === errcode)
  }

  public printErrors() {
    return JSON.stringify(this.errors, null, 2)
  }

  public printValueErrors() {
    return JSON.stringify(this.validationErrors.map(e => ({ error: e.error, comp: e.comp.id, field: common.checkIsDataComponent(e.comp)!.data!.fieldPath, arrayId: e.arrayId })), null, 2)
  }

  public printValues() {
    return JSON.stringify(this.schema.values, null, 2)
  }

  public clearValueErrorsComp(comp: IComponent) {
    this.validationErrors = this.validationErrors.filter(e => e.comp.id !== comp.id)
  }

  public getValueErrorsComps(...comp: IComponent[]): IValidationErrorList {
    return this.validationErrors.filter(e => comp.indexOf(e.comp) > -1)
  }

  public getValueErrorsComp(comp: IComponent, arrayId?: any): IValidationErrorList {
    arrayId = arrayId || 0
    return this.validationErrors.filter(e => e.comp === comp && e.arrayId === arrayId)
  }

  public getValueErrorsForTest(): any[] {
    return this.validationErrors.map(e => ({ field: common.checkIsDataComponent(e.comp)!.data.fieldPath, msg: e.error }))

  }

  // add an id (unique id) and node (just key) to the main schema object and sub-schemas
  // and for all components
  // add emtpy props {} for all components
  // set other initial properties
  public updateSchemaIds(): void {
    if (!this.schema.components) {
      return
    }
    const schemaCallback: ISchemaCallback = p => {
      if (p.parentComp && p.parentSchema) {
        if (p.parentSchema.id && p.parentSchema.id !== '') {
          p.schema.id = p.parentSchema.id + '.' + p.parentCompKey
        } else {
          p.schema.id = p.parentCompKey
        }
      }
    }

    const componentCallback: IComponentCallback = p => {
      const { key, comp, parentComp } = p
      if (comp) {
        comp.id = p.schema.id ? p.schema.id + '.' + key : key
        const cd = common.checkIsDataComponent(comp)
        if (cd) {
          const cdp = common.checkIsDataComponent(parentComp)
          if (cdp) {
            cd.data.fieldPath = cdp.data.fieldPath + '.' + cd.data.field
          } else {
            cd.data.fieldPath = cd.data.field
          }
        }
        comp.node = key
        if (!comp.props) {
          comp.props = {}
        }
      }
    }

    const options = { processSubSchemas: true }
    SchemaManager.processSchema({ schemaCallback, componentCallback, schema: this.schema, options })
  }

  // public initValues(values: IObj): void {
  //   this.schema.values = cloneDeep(values)
  //   this.dataStateChanged = false
  // }

  public resetValidationErrors(): void {
    this.validationErrors = []
  }

  public resetSchemaValues(omitComponents?: IComponentList): void {
    const componentCallback: IComponentCallback = p => {
      const { comp } = p
      const init = (omitComponents && omitComponents.indexOf(comp) > -1) ? false : comp ? true : false
      if (init) { this.initSchemaValue(comp, true) }
    }
    const options = { processSubSchemas: true }
    SchemaManager.processSchema({ componentCallback, schema: this.schema, options })
  }

  public bindEventsThis(): void {
    const componentCallback: IComponentCallback = p => {
      if (p.comp) {
        const compParams = this.getComponentEventParams(p.comp)
        if (p.comp.props) {
          const objP = (props: any) => Object.keys(props).filter(key => isFunction(props[key])).forEach(key => { props[key] = props[key].bind(compParams) })
          objP(p.comp.props)
          Object.keys(p.comp.props).filter(key => isObject(p.comp.props[key])).forEach(key => objP(p.comp.props[key]))
        }
      }
    }
    const options = { processSubSchemas: true }
    SchemaManager.processSchema({ componentCallback, schema: this.schema, options })
  }

  public validateValuesSchema(): boolean {
    this.validationErrors = []

    const schemaCallback: ISchemaCallback = p => {
      if (p.schema.validate) {
        const schema = p.schema as ISchema
        const validationError = p.schema.validate({ schemaManager: this, schema })
        if (isObject(validationError) && validationError.error !== '') {
          this.validationErrors.push(validationError)
        }
      }

      this.validationErrors = this.validationErrors.concat()
    }

    const componentCallback: IComponentCallback = p => {
      const cd = common.checkIsDataComponent(p.comp)
      if (cd) {
        if (p.parentComp && p.parentComp.type === enums.Component.subschema && p.parentComp.data && p.parentComp.data.dataType === enums.DataType.array) {
          // do nothing
        } else {
          this.validationErrors = this.validationErrors.concat(this.validateValueComp(p.comp, this.getSchemaValue(p.comp)))
        }
      }
    }
    const options = { processSubSchemas: true }
    // this.callSchemaEvent('onCreated')

    SchemaManager.processSchema({ schemaCallback, componentCallback, schema: this.schema, options })
    return this.validationErrors.length === 0
  }

  public validateValueComp(comp: IComponent, value: any, arrayId?: any): IValidationErrorList {
    let errors: IValidationErrorList = []
    arrayId = arrayId || 0
    const addError = (error: string) => errors.push({ error, comp, arrayId: arrayId! })
    const cd = common.checkIsDataComponent(comp)
    if (cd) {
      if (!common.checkType(cd.data.dataType, value)) {
        addError(strings.errorMessagesFields.wrongDataType)
      }
      if (comp.type === enums.Component.subschema && comp.data.dataType === enums.DataType.array) {
        const dc = SchemaManager.getDataComponents(comp.schema!)
        value.forEach((r: any) => {
          dc.forEach(c => {
            const cds = common.checkIsDataComponent(c)
            if (cds) {
              errors = errors.concat(this.validateValueComp(c, r[cds.data.field], r[this.getSubschemaKeyField(comp, true)]))
            }
          })
        })
      }
      const v = cd.data.validations
      if (v) {
        const params = { ...this.getComponentEventParams(comp), value }
        if (v.required) {
          const required = isFunction(v.required) ? v.required(params) : v.required
          if (required && !value) {
            addError((comp as IComponentTextInput).label + strings.errorMessagesFields.required)
          }
        }
        if (v.allowedValues && !v.allowedValues.includes(value)) {
          addError(strings.errorMessagesFields.allowedValues)
        }
        if (!isUndefined(v.min)) {
          if (typeof value === 'number' && value < v.min) {
            addError(strings.errorMessagesFields.minValueNumber + v.min.toString())
          } else if (typeof value === 'string' && value.length < v.min) {
            addError(strings.errorMessagesFields.minValueString + v.min.toString())
          }
        }
        if (!isUndefined(v.max)) {
          if (typeof value === 'number' && value > v.max) {
            addError(strings.errorMessagesFields.maxValueNumber + v.max.toString())
          } else if (typeof value === 'string' && value.length > v.max) {
            addError(strings.errorMessagesFields.maxValueString + v.max.toString())
          }
          // array ?
        }
        // todo regex
        if (!isUndefined(v.regex)) {
          if (!value.match(v.regex)) {
            addError(strings.errorMessagesFields.regexNotMatch)
          }
        }
        if (v.validate) {
          const ret = v.validate(params) // if not returns a string validion is considered ok
          if (isString(ret) && ret !== '') {
            addError(ret)
          }
        }
      }
    }
    return errors
  }

  public getDefaultValue(comp: IComponent): any {
    const cd = common.checkIsDataComponent(comp)
    if (cd) {
      if (has(cd.data, 'default')) {
        if (isFunction(cd.data.default)) {
          return cd.data.default()
        } else {
          return cd.data.default
        }
      } else {
        return common.dataTypeToValue(cd.data.dataType)
      }
    }
  }

  public getSchemaValue(comp: IComponent, arrayId?: any): any {
    const cd = common.checkIsDataComponent(comp)
    if (cd) {
      if (!isUndefined(arrayId)) {
        const res = this.getSubschemaArrayRecord(comp, arrayId)
        return res.arrayRecord[cd.data.field]
      } else {
        return get(this.schema.values, cd.data.fieldPath!)
      }
    }
  }

  public updateValue(field: string, value: any) {
    const comp = this.getComponentByFieldPath(field)
    if (comp) {
      this.updateSchemaValue(comp, value)
    }
  }

  public updateSchemaValue(comp: IComponent, value: any, arrayId?: any) {
    let compParams: types.IComponentEventParams | undefined
    const dataParams = (val: any): types.IDataEventParams => {
      if (!compParams) { compParams = this.getComponentEventParams(comp) }
      return { ...compParams, value: val }
    }
    const cd = common.checkIsDataComponent(comp)
    let renderComponent: boolean = false
    if (cd) {
      const oldVal = this.getSchemaValue(comp)
      if (!isObject(value) && !isArray(value)) {
        if (oldVal === value) { return [] }
      }
      const params = dataParams(value)

      if (cd.data.onBeforeChange) {
        cd.data.onBeforeChange(params)
        if (params.value !== value) {
          value = params.value
          renderComponent = true
        }
      }

      const m = cd.data.modifiers
      if (m) {
        if (typeof value === 'string') {
          if (m.trim) { value = value.trim() }
          if (m.toLowerCase) { value = value.toLowerCase() }
          if (m.toUpperCase) { value = value.toUpperCase() }
          if (m.capitalize) { value = capitalize(value) }
        }
      }

      if (this.schema.validationMethod === enums.ValidationMethod.validateOnChange) {
        this.clearValueErrorsComp(comp)
        const errors = this.validateValueComp(comp, value)
        if (errors.length > 0) {
          this.validationErrors = this.validationErrors.concat(errors)
        }
      }

      if (!isUndefined(arrayId)) {
        const res = this.getSubschemaArrayRecord(comp, arrayId)
        res.arrayRecord[cd.data.field!] = value
        set(this.schema.values!, res.subschemaFieldName, res.arrayValue)
      } else {
        set(this.schema.values!, cd.data.fieldPath!, value)
      }

      this.dataStateChanged = true

      if (renderComponent) {
        this.renderComponent(comp)
      }

      this.emit(enums.SchemaEventType.onDataChanges, comp, this)
      if (cd.data.onChange) {
        cd.data.onChange(dataParams(value))
      }
      if (params.schema.onChange) {
        params.schema.onChange(dataParams(value))
      }

    }
  }

  public getSubschemaKeyField(comp: IComponent, getDefaultField?: boolean): string {
    const s = comp as IComponentSubschema
    if (s.keyField) {
      return s.keyField
    } else if (getDefaultField) {
      return constants.arrayKeyField
    } else {
      return ''
    }
  }

  public initSubschemaArrayRecords(comp: IComponent): any {
    // init records with incremental id
    let arr = this.getSchemaValue(comp)
    if (!arr || !isArray(arr)) {
      arr = []
    }
    const keyField = this.getSubschemaKeyField(comp)
    if (!keyField) {
      let h: number = 0
      arr.forEach((r: any) => {
        h++
        r[this.getSubschemaKeyField(comp, true)] = h
      })
    }
    return arr
  }

  public insertSubschemaArrayRecord(comp: IComponent, dataComponents?: IComponentList): any {
    if (!dataComponents) {
      dataComponents = SchemaManager.getDataComponents((comp as IComponentSubschema).schema!)
    }
    let arr = this.getSchemaValue(comp)
    if (!arr) {
      arr = []
    }
    // arr = cloneDeep(arr)
    const r: object = {}
    let h: number = 0
    if (arr.length > 0) {
      h = arr[arr.length - 1][this.getSubschemaKeyField(comp, true)]
    }
    h++
    r[this.getSubschemaKeyField(comp, true)] = h
    dataComponents.forEach((c: any) => {
      r[c.data.field] = this.getDefaultValue(c)
    })
    arr.push(r)
    this.updateSchemaValue(comp, arr)
    return arr

  }

  public getValue(field: string): any {
    return get(this.schema.values, field)
  }

  public changeExpanded(comp: IComponentExpansionPanel, expanded: boolean, designMode: boolean): void {
    comp.expanded = expanded
    if (designMode) {
      const schema = this.getOrigSchemaFromComponentId(comp.id!)
      const orig = schema ? schema.components[comp.node!] as IComponentExpansionPanel : undefined
      if (orig) {
        orig.expanded = expanded
      }
      const propertyUpdate = {
        comp, prop: 'expanded', value: expanded
      }

      this.emit(enums.SchemaEventType.onPropertyUpdated, propertyUpdate, this)
    }
  }

  public changeActiveTab(comp: types.IComponentTabs, activeTab: number, designMode: boolean): void {
    comp.activeTab = activeTab
    if (designMode) {
      const propertyUpdate = {
        comp, prop: 'activeTab', value: activeTab
      }
      this.emit(enums.SchemaEventType.onPropertyUpdated, propertyUpdate, this)
    }
  }

  public resolvePropertyFunctions(component: IComponent): void {
    const params = this.getComponentEventParams(component)
    const schema = this.getOrigSchemaFromComponentId(component.id!)
    const orig = schema ? schema.components[component.node!] as IComponentExpansionPanel : undefined
    if (orig) {
      const props = ['label', 'hint', 'tooltip', 'placeholder', 'text', 'data.items']
      props.forEach(prop => {
        const propValue = get(orig, prop)
        if (propValue && isFunction(propValue)) {
          set(component, prop, propValue(params))
        }
      })
    }
  }

  public getChildrenComponents(schema: ISchema, key: string): IComponentList {
    // todo give back only valid children
    if (!schema || !schema.components || !schema.components[key]) {
      console.error('getChildrenComponents: key not found', key)
      return []
    }
    const comp = common.checkIsParentComponent(schema.components[key])
    if (!comp || comp.hidden || !isArray(comp.children)) { return [] }
    const list: types.IComponentList = comp.children.filter((k: string) => {
      const c = schema.components[k]
      return (c && !c.hidden)
    }).map((k: string) => schema.components[k])
    return list
  }

  public getSchemaFromList(schema: ISchema | ISchemaDesign | string): ISchema | ISchemaDesign | undefined {
    if (isObject(schema)) {
      return schema as ISchema
    }

    if (isString(schema) && this.schemaList) {
      const sm = this.schemaList.find(s => {
        return s.name === schema
      })
      if (sm) {
        return sm
      }
    }
    return undefined
  }

  public checkSchema() {
    this.errors = checkSchema(this, false)
  }

  public getComponentsWithNoParent(): IChildrenMember {
    //  all components except root and data-only components
    const comps = Object.keys(this.schema.components).filter(key => {
      return (key !== 'root')
    })
    const children = Object.keys(this.schema.components).reduce((acc: IChildrenMember, key: string) => {
      const comp: IComponent = this.schema.components[key]
      let childs: IChildrenMember = []
      const cp = common.checkIsParentComponent(comp)
      if (cp) {
        childs = cp.children
      }
      if (has(comp, 'tabs')) {
        const pr = get(comp, 'tabs')
        childs = childs.concat(pr)
      }
      if (has(comp, 'prefix')) {
        const pr = get(comp, 'prefix')
        childs = childs.concat(isArray(pr) ? pr : [])
      }
      if (has(comp, 'suffix')) {
        const pr = get(comp, 'suffix')
        childs = childs.concat(isArray(pr) ? pr : [])
      }
      if (has(comp, 'icon')) {
        const pr = get(comp, 'icon')
        childs = childs.concat(isArray(pr) ? pr : [])
      }

      return acc.concat(childs)
    }, [])
    const missing: IChildrenMember = []
    comps.forEach(key => {
      if (children.indexOf(key) === -1) {
        missing.push(key)
      }
    })

    return missing

  }

  public mergeStyles(comp: IComponent, defaultStyle: IStylesObj): IStylesObj | undefined {
    // let res: IStylesObj | undefined
    const styles = []
    if (defaultStyle) {
      styles.push(defaultStyle)
    }
    const schema = this.getSchemaFromComponentId(comp.id!)
    if (this.schema.styles) {
      styles.push(this.schema.styles)
    }
    if (schema && schema.styles && schema !== this.schema) {
      styles.push(schema.styles)
    }
    if (comp.styles) {
      styles.push(comp.styles)
    }
    if (styles.length === 0) { return undefined }
    if (styles.length === 1) { return styles[0] }
    const res = merge({}, ...styles)
    return res

  }

  public init() {
    this.validationErrors = []
    // basic validation
    this.errors = checkSchema(this, true)

    if (this.getErrors.length === 0) {
      this.replaceSubSchemaNames()
      this.updateSchemaIds()
      this.initSchemaValues()
      this.bindEventsThis()
      this.actionButtons = SchemaManager.getComponents(this.schema, true).filter((e: IComponent) => {
        const btn = common.checkIsButtonComponent(e)
        return (btn && btn.action && (btn.action === enums.ButtonAction.save || btn.action === enums.ButtonAction.cancel))
      })
      // convert string arrays to object arrays
      SchemaManager.getComponents(this.schema, true).filter((e: IComponent) => {
        const select = common.checkIsSelectComponent(e)
        return (select && [enums.DataType.string, enums.DataType.arrayString].includes(select.data.dataType) && isArray(select.data.items) && select.data.items.length > 0 && isString(select.data.items[0]))
      }).forEach(s => {
        const select = s as types.IComponentSelect
        const items = (select.data.items as types.ISelectItemList).map(item => {
          if (isString(item)) {
            return { value: item, text: item }
          } else {
            return item
          }
        })
        select.data.items = items
      })

    } else {
      if (process.env.NODE_ENV !== 'test') {
        // tslint:disable-next-line:no-console
        console.log('errors in Schema: ', this.schema.name, this.printErrors())
      }
    }
  }

  public callSchemaEvent(event: string) {
    const schemaCallback: ISchemaCallback = p => {
      if (has(p.schema, event)) {
        const ev = get(p.schema, event)
        ev({ schemaManager: this, schema: p.schema })
      }
    }

    const options = { processSubSchemas: true }
    SchemaManager.processSchema({ schemaCallback, schema: this.schema, options })
  }

  // private format() {
  //   return common.formatJSON(this.schema)
  // }

  // private getFields(): IComponentList {
  //   return Object.keys(this.schema.components).filter(c => has(this.schema.components[c], 'data')).map(c => this.schema.components[c])
  // }

  private initSchemaValue(comp: IComponent, reset: boolean): void {
    const cd = common.checkIsDataComponent(comp)
    if (cd) {
      const hasSchemaValue = !isUndefined(this.getSchemaValue(comp))
      if (!reset && hasSchemaValue) { return }
      const value = this.getDefaultValue(comp)
      if (common.checkType(cd.data.dataType, value)) {
        set(this.schema.values!, cd.data.fieldPath!, value)
      }
    }
  }

  private initSchemaValues = () => {
    const componentCallback: IComponentCallback = p => {
      if (p.parentComp && p.parentComp.type === enums.Component.subschema && p.parentComp.data && p.parentComp.data.dataType === enums.DataType.array) {
        return
      }
      if (p.comp) {
        this.initSchemaValue(p.comp, false)
      }
    }
    const options = { processSubSchemas: true }
    SchemaManager.processSchema({ componentCallback, schema: this.schema, options })
    this.previousValues = cloneDeep(this.schema.values)
  }

  private replaceSubSchemaNames(): void {
    const componentCallback: IComponentCallback = p => {
      if (p.comp && p.comp.type === enums.Component.subschema && p.comp.schemaName) {
        let s = this.getSchemaFromList(p.comp.schemaName)
        if (s) {
          s = cloneDeep(s)
          p.comp.schema = s as ISchema
        }
      }
    }
    const options = { processSubSchemas: true }
    SchemaManager.processSchema({ componentCallback, schema: this.schema, options })
  }

  // private callSchemaEvent(type: enums.SchemaEventType, comp?: IComponent): void {
  //   this.schemaEvents.forEach((event: ISchemaManagerEvent) => {
  //     if (event.eventType === type && event.func) {
  //       event.func(comp)
  //     }
  //   })
  // }

  private getSubschemaArrayRecord(comp: IComponent, arrayId: any): ISubschemaArrayProps {
    // get value from subschema array
    const cd = common.checkIsDataComponent(comp)
    if (cd) {
      if (cd && cd.data.fieldPath!.indexOf('.') === -1) {
        console.error('Fieldpath in subschema wrong defined: ', comp.node)
      }
      const subschemaFieldName = cd.data.fieldPath!.split('.').slice(0, -1).join('.')
      let arrayValue = get(this.schema.values, subschemaFieldName)
      if (!arrayValue || !isArray(arrayValue)) {
        console.error('Array not found in subschema: ', comp.node)
        arrayValue = []
      }
      let arrayRecord = {}
      arrayRecord = arrayValue.find((r: any) => r[this.getSubschemaKeyField(comp, true)] === arrayId)
      if (!arrayRecord) {
        console.error('Record not found in subschema array: ', comp.node, arrayId)
      }
      return { subschemaFieldName, arrayValue, arrayRecord }
    } else {
      return { subschemaFieldName: '', arrayValue: [], arrayRecord: {} }
    }
  }

  private removeSubschemaArrayIds(): void {
    const componentCallback: IComponentCallback = p => {
      if (p.comp.type === enums.Component.subschema && p.comp.data && p.comp.data.dataType === enums.DataType.array) {
        const arr = this.getSchemaValue(p.comp)
        arr.forEach((r: any) => {
          if (r[constants.arrayKeyField]) {
            delete r[constants.arrayKeyField]
          }
        })
      }
    }
    const options = { processSubSchemas: true }
    SchemaManager.processSchema({ componentCallback, schema: this.schema, options })
    this.previousValues = cloneDeep(this.schema.values)

  }

  private addRootKey(): void {
    if (this.schema.components && isUndefined(this.schema.components.root)) {
      const missing = this.getComponentsWithNoParent()
      this.schema.components.root = {
        type: enums.Component.panel,
        children: missing
      }
    }
  }
}
