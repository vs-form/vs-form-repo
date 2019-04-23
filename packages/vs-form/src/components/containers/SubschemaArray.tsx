import Checkbox from '@material-ui/core/Checkbox'
import Divider from '@material-ui/core/Divider'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'
import TableSortLabel from '@material-ui/core/TableSortLabel'
import Toolbar from '@material-ui/core/Toolbar'
import { cloneDeep, get, } from '../../schemaManager/lodash'
import * as React from 'react'
import * as types from '../../schemaManager/types'
import * as enums from '../../schemaManager/enums'
import * as constants from '../../schemaManager/constants'
import * as common from '../../schemaManager/common'
import SchemaManager from '../../schemaManager/schemaManager'

import * as strings from '../../common/strings'
import IconButton from '../../common/IconButton'
import Text from '../../common/Text'
import Item from '../../baseComponents/Item'
import { ItemProps } from '../../common/propTypes'
import * as svg from '../../common/svgIcons'

export enum SortDirection {
  asc = 'asc',
  desc = 'desc',
}

export interface ISubschemaArrayState {
  columnSettings: types.IDataTableColumnSettings,
  showForm: boolean,
  order: SortDirection,
  orderBy: types.IComponent | null,
  selected: number[],
  data: object[],
  page: number,
  rowsPerPage: number,
  errors: types.IValidationErrorList,
}

export default class SubSchemaArray extends React.Component<ItemProps, ISubschemaArrayState> {
  private insertMode: boolean = false
  private oldData: any = {}
  private dataComponents: types.IComponentList = []

  constructor(props: ItemProps) {
    super(props)
    this.dataComponents = SchemaManager.getDataComponents(this.props.schema)
    const comp = this.props.comp as types.IComponentSubschema

    const data = this.props.schemaManager.initSubschemaArrayRecords(this.props.comp)
    this.state = {
      columnSettings: this.getDefaultColumnSettings(),
      showForm: false,
      order: SortDirection.asc,
      orderBy: null,
      selected: [],
      data,
      page: 0,
      rowsPerPage: comp.rowsPerPage || 5,
      errors: this.props.schemaManager.validateValueComp(this.props.comp, data),
    }
  }

  public render() {
    const { classes, ...other } = this.props
    return (
      <Paper style={{ width: '100%', overflowX: 'auto' }}>
        {this.Toolbar()}
        {this.state.showForm
          ? <Item
            {...other}
            schema={this.props.schema}
            node="root"
            comp={this.props.schema.components.root}
            arrayId={this.state.selected[0]}
          />
          : <React.Fragment>
            <Table>
              {this.Head()}
              <TableBody>
                {this.Body()}
                {this.EmptyRows()}
              </TableBody>
            </Table>
            {this.Pagination()}
          </React.Fragment>
        }
      </Paper>
    )
  }

  public Body = () => {
    const sortedData = this.sortedData()
    return (
      sortedData.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage).map((rec: any) => {
        const id = rec[this.props.schemaManager.getSubschemaKeyField(this.props.comp, true)]
        return (
          <React.Fragment key={id}>
            <TableRow
              hover={true}
              onClick={this.handleSelectClick(id)}
              onDoubleClick={this.handleSelectDoubleClick(id)}
              selected={this.isSelected(id)}
            >
              <TableCell style={this.applyCellStyle(true)}>
                <Checkbox checked={this.isSelected(id)} />
              </TableCell>
              {this.state.columnSettings.map(c => {
                const cd = common.checkIsDataComponent(this.props.schema.components[c.compId])
                if (cd) {
                  // if value is a date
                  let val
                  try {
                    val = rec[cd.data.field].toString()
                  } catch (error) {
                    val = ''
                  }
                  return (
                    <TableCell
                      key={c.compId}
                      component="th"
                      align={get(cd, 'data.dataType') === enums.DataType.number ? 'right' : 'left'}
                      style={this.applyCellStyle(false, c)}
                    >
                      {val}
                    </TableCell>
                  )
                }
              })}
            </TableRow>
            {this.ErrorRow(id)}
          </React.Fragment>
        )
      })
    )
  }

  public getDefaultColumnSettings = () => {
    let columnSettings: types.IDataTableColumnSettings | undefined = (this.props.comp as types.IComponentSubschema).columnSettings
    if (!columnSettings || columnSettings.length === 0) {
      columnSettings = this.dataComponents.map(c => ({ compId: c.node!, alignRight: (c as types.IComponentSelect).data.dataType === enums.DataType.number, autowidth: true, sortable: true, widthUnit: 'px' }))
    }
    return columnSettings as types.IDataTableColumnSettings
  }

  public addRecord = () => {
    const data = this.props.schemaManager.insertSubschemaArrayRecord(this.props.comp, this.dataComponents)
    this.setData(data)
    if (data.length > 0) {

      this.setState({ selected: [data[data.length - 1][this.props.schemaManager.getSubschemaKeyField(this.props.comp, true)]] })
      this.insertMode = true
      this.setState({ showForm: true })
    }
  }

  public editRecord = () => {
    this.insertMode = false
    // const rec = this.state.data.filter((r: any) => r[constants.arrayId] === this.state.selected[0])
    this.oldData = cloneDeep(this.state.data)
    this.setState({ showForm: true })
  }

  public deleteRecords = () => {
    if (this.state.selected.length > 0) {
      const data = this.state.data.filter((r: any) => this.state.selected.indexOf(r[this.props.schemaManager.getSubschemaKeyField(this.props.comp, true)]) === -1)
      this.setData(data)
      this.setState({ selected: [] })
    }
  }

  public cancelEditing = () => {
    if (this.insertMode) {
      this.deleteRecords()
    } else {
      this.setData(this.oldData)
    }
    this.setState({ showForm: false })
  }

  public setData = (data: any) => {
    this.props.schemaManager.updateSchemaValue(this.props.comp, data)
    this.setState({ data })
  }

  public updateValue = (): boolean => {
    // let errors: types.IValidationErrorList = []
    // if (this.props.schemaManager.schema.validationMethod === enums.ValidationMethod.validateOnChange) {
    this.props.schemaManager.updateSchemaValue(this.props.comp, this.state.data)
    const errors = this.props.schemaManager.getValueErrorsComp(this.props.comp, this.props.arrayId)
    this.setState({ errors })
    // }
    return errors.length === 0
  }

  public get numSelected() {
    return this.state.selected.length
  }

  public showTable = () => {
    this.updateValue()
    this.setState({ showForm: false })
  }

  public isSelected = (id: number) => this.state.selected.indexOf(id) !== -1

  public handleSelectClick = (id: number) => () => {
    const { selected } = this.state
    const selectedIndex = selected.indexOf(id)
    let newSelected: number[] = []
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id)
    } else {
      newSelected = selected.filter(i => i !== id)
    }
    this.setState({ selected: newSelected })
  }

  public handleSelectDoubleClick = (index: number) => () => {
    this.setState({ selected: [index] }, () => this.editRecord())
  }

  public handleSelectAllClick = (_event: any, checked: boolean) => {
    if (checked) {
      this.setState({ selected: this.state.data.map((r: any) => r[this.props.schemaManager.getSubschemaKeyField(this.props.comp, true)]) })
    } else {
      this.setState({ selected: [] })
    }
  }

  public handleChangePage = (_event: any, page: number) => {
    this.setState({ page })
  }

  public handleChangeRowsPerPage = (event: any) => {
    this.setState({ rowsPerPage: event.target.value })
  }

  public updateSort = (comp: types.IComponent) => () => {
    let orderBy: types.IComponent | null = comp
    let order = SortDirection.asc
    if (this.state.orderBy === comp) {
      if (this.state.order === SortDirection.asc) {
        order = SortDirection.desc
      } else {
        order = SortDirection.asc
        orderBy = null
      }
    }
    this.setState({ order, orderBy })
  }

  public sortedData = (): object[] => {
    if (this.state.orderBy) {
      const comp = this.state.orderBy
      let dataType: enums.DataType = enums.DataType.string
      const cd = common.checkIsDataComponent(comp)
      if (cd) {
        dataType = get(cd!, 'data.dataType')
        const field = cd!.data.field
        const sortFn = this.state.order === SortDirection.desc
          ? dataType === enums.DataType.number
            ? (a: any, b: any) => (b[field] - a[field])
            : (a: any, b: any) => (a[field] > b[field] ? -1 : a[field] < b[field] ? 1 : 0)
          : dataType === enums.DataType.number
            ? (a: any, b: any) => (a[field] - b[field])
            : (a: any, b: any) => (a[field] < b[field] ? -1 : a[field] > b[field] ? 1 : 0)
        return this.state.data.map(r => r).sort(sortFn)
      } else {
        return []
      }
    } else {
      return this.state.data
    }
  }

  public applyCellStyle = (selectionCell: boolean, setting?: types.IDataTableColumnSetting): object => {
    if (selectionCell) {
      return { width: '30px' }
    } else {
      if (setting) {
        if (!setting.autowidth && setting.width && setting.widthUnit) {
          return { width: setting.width.toString() + setting.widthUnit }
        }
      }
    }
    return {}
  }

  public Toolbar = () => (
    <Toolbar>
      {(this.props.comp as types.IComponentTextInput).label && <Text variant="h6" text={(this.props.comp as types.IComponentTextInput).label as string} />}
      {this.state.showForm ? this.ToolbarForm() : this.ToolbarTable()}
    </Toolbar>
  )
  public ToolbarForm = () => (
    <React.Fragment>
      <Divider variant="inset" />
      <IconButton svg={svg.check} onClick={this.showTable} />
      <IconButton svg={svg.close} onClick={this.cancelEditing} />
    </React.Fragment>
  )

  public ToolbarTable = () => (
    <React.Fragment>
      {!this.props.designMode && <IconButton svg={svg.plus} onClick={this.addRecord} />}
      {!this.props.designMode && this.numSelected === 1 && <IconButton svg={svg.pencil} onClick={this.editRecord} />}
      {!this.props.designMode && this.numSelected > 0 && <IconButton svg={svg.del} style={{ color: 'red' }} onClick={this.deleteRecords} />}
      {!this.props.designMode && this.numSelected > 0 && <Text variant="caption" text={this.numSelected === 1 ? this.numSelected.toString() + strings.form.recordSelected : this.numSelected.toString() + strings.form.recordsSelected} />}
    </React.Fragment>
  )

  public Head = () => (
    <TableHead>
      <TableRow>
        <TableCell style={this.applyCellStyle(true)}>
          {this.state.data.length > 0 ?
            <Checkbox
              indeterminate={this.numSelected > 0 && this.numSelected < this.state.data.length}
              checked={this.numSelected > 0 && this.numSelected === this.state.data.length}
              onChange={this.handleSelectAllClick}
            />
            : null
          }
        </TableCell>
        {this.state.columnSettings.map(c => {
          const comp = this.props.schema.components[c.compId]
          if (comp) {
            return (
              <TableCell
                key={c.compId}
                align={c.alignRight ? 'right' : 'left'}
                style={this.applyCellStyle(false, c)}
              >
                {c.sortable ?
                  <TableSortLabel
                    active={comp === this.state.orderBy}
                    direction={this.state.order}
                    onClick={this.updateSort(comp)}
                  >
                    <Text text={(comp as types.IComponentTextInput).label as string} />
                  </TableSortLabel>
                  :
                  <Text text={(comp as types.IComponentTextInput).label as string} />
                }
              </TableCell>
            )
          }
        })}
      </TableRow>
    </TableHead>
  )

  public Pagination = () => {
    const comp = this.props.comp as types.IComponentSubschema
    if (comp.hidePagination) { return null }
    return (
      <TablePagination
        component="div"
        count={this.state.data.length}
        rowsPerPage={this.state.rowsPerPage}
        page={this.state.page}
        onChangePage={this.handleChangePage}
        onChangeRowsPerPage={this.handleChangeRowsPerPage}
      />
    )
  }

  public EmptyRows = () => {
    const emptyRows: number = this.state.rowsPerPage - Math.min(this.state.rowsPerPage, this.state.data.length - this.state.page * this.state.rowsPerPage)
    if (emptyRows) {
      return (
        <TableRow style={{ height: 49 * emptyRows }}>
          <TableCell colSpan={this.state.columnSettings.length + 1} />
        </TableRow>
      )
    } else {
      return null
    }
  }

  public ErrorRow = (arrayId: number): any => {
    let length = 1
    const cs = (this.props.comp as types.IComponentSubschema).columnSettings
    if (cs) {
      length = cs.length + 1
    }
    const errs = this.state.errors.filter(e => e.arrayId === arrayId)
    if (errs.length > 0) {
      return (
        <TableRow>
          <TableCell colSpan={length}>
            <Text text={errs.map(e => e.error).join('\n')} color="error" variant="caption" />
          </TableCell>
        </TableRow>
      )
    } else {
      return null
    }
  }

}
