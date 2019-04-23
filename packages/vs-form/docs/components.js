import React, {useState} from 'react'

import {SchemaManager, VsForm, cloneDeep, isArray, common, Component} from '@vs-form/vs-form'
import {convertObjToText} from '@vs-form/vs-general'
import {openSandbox} from './sandbox'
import * as jsSchema from './schemas/js'
import * as jsStr from './schemas/jsStr'
import * as tsStr from './schemas/tsStr'
import Highlight from 'react-highlight'
import adressCrud, {adressRecords} from './schemas/js/addressCRUD'
import address from './schemas/js/address'

import './api.scss'
import './androidstudio.scss'
import './collapsible.scss'
import './mdi/materialdesignicons.scss'

import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import SvgIcon from '@material-ui/core/SvgIcon'
import Tooltip from '@material-ui/core/Tooltip'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText';

const codeBrackets = "M14.6,16.6L19.2,12L14.6,7.4L16,6L22,12L16,18L14.6,16.6M9.4,16.6L4.8,12L9.4,7.4L8,6L2,12L8,18L9.4,16.6Z"
const codepen = "M15.09,12L12,14.08V14.09L8.91,12L12,9.92V9.92L15.09,12M12,2C11.84,2 11.68,2.06 11.53,2.15L2.5,8.11C2.27,8.22 2.09,8.43 2,8.67V14.92C2,15.33 2,15.33 2.15,15.53L11.53,21.86C11.67,21.96 11.84,22 12,22C12.16,22 12.33,21.95 12.47,21.85L21.85,15.5C22,15.33 22,15.33 22,14.92V8.67C21.91,8.42 21.73,8.22 21.5,8.1L12.47,2.15C12.32,2.05 12.16,2 12,2M16.58,13L19.59,15.04L12.83,19.6V15.53L16.58,13M19.69,8.9L16.58,11L12.83,8.47V4.38L19.69,8.9M20.33,10.47V13.53L18.07,12L20.33,10.47M7.42,13L11.17,15.54V19.6L4.41,15.04L7.42,13M4.31,8.9L11.17,4.39V8.5L7.42,11L4.31,8.9M3.67,10.5L5.93,12L3.67,13.54V10.5Z"
const plus = 'M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z'
const del = 'M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z'
const pencil = 'M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z'

const modeJs = 1
const modeTs = 2
const modeValues = 3

const styleBorderButton = {
  margin: 10,
  padding: 5,
  backgroundColor: 'WhiteSmoke'
}

const styleBorderForm = {
  border: '1px solid',
  margin: 10,
  padding: 10,
  borderColor: 'lightGray'
}

const styleBorderFormTable = {
  display: 'flex',
  ...styleBorderForm
}

const Form = React.memo(({schemaName, subschemaName, mdi}) => {
  const [showCode, setShowCode] = useState(false);
  const [mode, setMode] = useState(modeJs);
  const [code, setCode] = useState('');
  const [schemaManager, setSchemaManager] = useState(undefined);
  const subschemastring = subschemaName ? jsStr[subschemaName] : undefined
  if(!schemaManager) {
    const schema = jsSchema[schemaName]
    const subArray = subschemaName ? [jsSchema[subschemaName]] : []
    const sm = new SchemaManager(schema, subArray)
    setSchemaManager(sm)
    setCode(jsStr[schemaName])
  }

  const changeMode = (m) => () => {
    if(m === modeValues) {
      setCode(convertObjToText(schemaManager.schema.values))
    } else if(m === modeJs) {
      setCode(jsStr[schemaName])
    } else if(m === modeTs) {
      setCode(tsStr[schemaName])
    }
    setMode(m)
  }

  return (
    <div>
      <div style={styleBorderButton}>
        <IcnButton svg={codeBrackets} onClick={() => setShowCode(!showCode)} tooltip={showCode ? "Hide Code" : "Show Code"} />
        <IcnButton svg={codepen} onClick={() => openSandbox(jsStr[schemaName], subschemastring, mdi)} tooltip="Edit in CodeSandbox" />
        {showCode &&
          <div>
            <Button color={mode === modeJs ? "primary" : "inherit"} onClick={changeMode(modeJs)}>Javascript</Button>
            <Button color={mode === modeTs ? "primary" : "inherit"} onClick={changeMode(modeTs)}>Typescript</Button>
            <Button color={mode === modeValues ? "primary" : "inherit"} onClick={changeMode(modeValues)}>Values</Button>
            <Highlight language="javascript">{code}</Highlight>
          </div>
        }
      </div>
      <div style={styleBorderForm}>
        <VsForm schemaManager={schemaManager} />
      </div>
    </div>
  )
})

export default Form

export const TableForm = React.memo(() => {
  const [curSel, setCurSel] = useState(-1);
  const [editMode, setEditMode] = useState(false);
  const [addMode, setAddMode] = useState(false);
  const [schemaManager, setSchemaManager] = useState(undefined);
  const createSchemaManager = (disabled, rec) => {
    const schema = adressCrud(onOk, onCancel)
    schema.disabled = disabled
    const sm = new SchemaManager(schema, [address])
    if(rec) {
      sm.schema.values.address = rec
    }
    setSchemaManager(sm)
  }

  if(!schemaManager) {
    createSchemaManager(true)
  }

  const listItemClick = (id) => () => {
    if(!editMode) {
      const rec = getRecord(id)
      if(rec) {
        schemaManager.schema.values.address = rec
        schemaManager.render()
        setCurSel(id)
      }
    }
  }

  const getRecord = (id) => {
    const rec = adressRecords.find((r) => {
      if(r.id === id) {return r}
    })
    if(rec) {
      const a = cloneDeep(rec)
      const dt = new Date(rec.birthdate)
      a.birthdate = dt
      return a
    }
    return undefined
  }

  const updateRecord = (rec) => {
    const ind = adressRecords.findIndex(r => r.id === rec.id)
    if(ind > -1) {
      adressRecords[ind] = rec
    }
  }

  const addRecord = () => {
    if(editMode) {return }
    createSchemaManager(false)
    setAddMode(true)
  }

  const editRecord = () => {
    if(addMode) {return }
    if(curSel > -1) {
      createSchemaManager(false, schemaManager.schema.values.address)
      const rec = getRecord(curSel)
      if(rec) {
        schemaManager.schema.values.address = rec
        schemaManager.render()
        setEditMode(true)
      }

    }
  }

  const deleteRecord = () => {
    if(curSel > -1) {
      const ind = adressRecords.findIndex((r) => r.id === curSel)
      if(ind > -1) {
        adressRecords.splice(ind, 1)
        setEditMode(false)
        if(adressRecords.length > 0) {
          setCurSel(adressRecords[0].id)
          createSchemaManager(true, adressRecords[0])
        } else {
          setCurSel(-1)
        }
      }

    }
  }

  const onOk = (values) => {
    const rec = values.address
    rec.birthdate = common.dateToString(rec.birthdate, Component.date, false)
    if(editMode) {
      rec.id = curSel
      updateRecord(rec)
      setEditMode(false)
    } else if(addMode) {
      const nums = adressRecords.map((r) => r.id)
      const max = Math.max(...nums)
      rec.id = max + 1
      adressRecords.push(rec)
      setAddMode(false)
    }
    createSchemaManager(true, rec)
  }

  const onCancel = () => {
    const rec = getRecord(curSel)
    setEditMode(false)
    createSchemaManager(true, rec)
  }

  const Table = () => {
    return (
      <List component="nav">
        {
          adressRecords.map(r => <ListItem key={r.id} button onClick={listItemClick(r.id)} selected={r.id === curSel}><ListItemText primary={r.name} /> </ListItem>)
        }
      </List>
    )
  }

  return (
    <div>
      <div style={styleBorderFormTable}>
        <div style={{width: 500}}>
          <IcnButton onClick={editRecord} svg={pencil} tooltip="edit Record" disabled={curSel === -1} />
          <IcnButton onClick={addRecord} svg={plus} tooltip="add Record" />
          <IcnButton onClick={deleteRecord} svg={del} tooltip="delete Record" disabled={curSel === -1} />
          <Table />
        </div>
        <VsForm schemaManager={schemaManager} />
      </div>
    </div >
  )
})


const IcnButton = React.memo(({svg, onClick, tooltip, disabled}) => {
  return (
    <IconButton color="primary" onClick={onClick} disabled={disabled}>
      <Tooltip title={tooltip}>
        <SvgIcon>
          <path d={svg} />
        </SvgIcon>
      </Tooltip>
    </IconButton>
  )
})

export const Link = ({link, text, sameTab}) => <a target={sameTab ? "" : "_blank"} href={link} style={{textDecoration: 'none', color: '#0B5FFF'}}>{text}</a>


export const ExtendLink = ({link, noExt}) => <span style={{fontSize: 14}}>{noExt ? '' : 'extends '}<Link link={'/docs-9-3-types/#' + link} text={link} sameTab /></span>

const listPoints = [
  {
    title: 'easy to use', content: "One key-point of vs-form is it's ease of use, while still retaining high flexibility. We think this does not contradict a rich feature-set."
  },
  {
    title: 'using material-ui', content: 'vs-form uses one of the most widely used ui-frameworks and hence your forms looks nice by default, even without a lot of CSS-knowledge.'
  },
  {
    title: 'built-in validation and server validation', content: <div>vs-form provides a wide variety of <a href="/docs-3-validation/">validation.</a> <br /><br />  If you use Node.js, you can also validate it on the server with the same code.</div>
  },
  {
    title: 'built in schema-check', content: <div>The built-in <a target="_blank" href="https://json-schema.org/">json-schema</a> like
    error checking (using SchemaManager.checkSchema function) lets you find a wide variety of errors. For example: duplicate fields, invisible components, etc. Using Typescript, Type-Definitions gives you guidance, while composing the schema.
    </div>
  },
  {
    title: 'arbitrary nesting of components', content: <div>Each component in a schema is part of a container (like form, panel, card or tabs) with the top-container 'root' (which is usually the form tag). <br /> <br /> Flat structure: <br /> Despite allowing unlimited nesting of components, the structure of the schema remains flat, since vs-form uses a normalized structure (the children property stores the keys of components).</div>
  },
  {
    title: 'Built-in responsive Grid-System', content: <div>Each component has a gridItem-property, which can define the size of the different viewports. <br /> It uses the <a target="_blank" href="https://material-ui.com/layout/grid/">material-ui layout grid</a>. This makes it easy to arrange your layout, with the least possible code. Containers have an additional gridContainer property.
    </div>
  },
  {
    title: 'Subschema: reuse schemas', content: <div><div>Like React-Components, a schema can be reused as a subschema and will be stored as an object in the values propertery.</div><div>You can even use subschemas as arrays.</div></div>
  },
  {
    title: 'Easier to test', content: <div>The schema contains the components, data-fields and the corresponding methods. You can also hook into react-specific lifcycles. Thus it becomes much easier to code and test, since everything belongs to its place. </div>
  },
  {
    title: 'Dynamic Forms and serialization', content: 'Since a schema is a javascript object, it can be serialized as JSON e.g. in a database. This makes it possible to create dynamic forms.'
  },
  {
    title: 'No lock-in', content: 'You can use vs-form for all your forms or only partially.'
  },
  {
    title: 'Optimised loading', content: 'vs-form has a small footprint. It loads components dynamically on demand, that is only components which are defined in your schema.'
  },
  {
    title: 'Full access to material-ui props', content: 'The schema components contains only the more important properties. However each component can define a props-object, These will be passed directly to the underlying material-ui component.'
  },
]

export const ListPoints = () => {
  return listPoints.map((item, ind) => <Collapsible title={item.title} inputId={ind} >{item.content}</Collapsible>)
}

export const Collapsible = React.memo(({title, inputId, children}) => {
  const id = "collabsible_" + inputId
  return (
    <div className="wrap-collabsible">
      <input id={id} className="toggle" type="checkbox" style={{display: "none"}} />
      <label htmlFor={id} className="lbl-toggle">{title}</label>
      <div className="collapsible-content">
        <div className="content-inner">
          {children}
        </div>
      </div>
    </div>
  )
})

export const ApiHeader = React.memo(({isEvents, children}) => {
  return (
    <table className="api-table">
      <thead>
        <tr>
          <th align="left">Name&nbsp;&nbsp;&nbsp;</th>
          {!isEvents ?
            <React.Fragment>
              <th align="left">Type&nbsp;&nbsp;</th>
              <th align="left">Default&nbsp;&nbsp;</th>
            </React.Fragment>
            :
            <th align="left">Parameter&nbsp;&nbsp;</th>
          }
          <th align="left">Description&nbsp;&nbsp;</th>
        </tr>
      </thead>
      <tbody className="api-table-body">
        {children}
      </tbody>
    </table>
  )
})

const getParamDesc = (parameter) => {
  if(!parameter) {return undefined}
  if(isArray(parameter)) {
    let param = []
    let desc = []
    parameter.forEach((p, ind) => {
      if(ind % 2 === 0) {
        param.push(p)
      } else {
        desc.push(parameter[ind - 1] + ': ' + p)
      }
    })
    return {param: param.join(','), desc: desc.join('\n')}
  } else {
    return {param: parameter, desc: ''}
  }

}

export const ApiProp = React.memo(({name, type, def, parameter, description}) => {
  const [showParamDesc, setShowParamDesc] = useState(false);
  const params = getParamDesc(parameter)

  return (
    <React.Fragment>
      <tr>
        <td align="left"><span className="api-prop">{name}&nbsp;</span></td>
        {params ?
          <td align="left">
            <span className="api-prop api-prop-description">
              {params.param}&nbsp;
            </span>
          </td>
          :
          <React.Fragment>
            <td align="left"><span className="api-prop api-prop-type">{type}&nbsp;</span></td>
            <td align="left"><span className="api-prop api-prop-default">{def}&nbsp;</span></td>
          </React.Fragment>
        }
        <td align="left">
          <span className="api-prop">{description}</span>
          {params && params.desc && showParamDesc && <><br /><span className="api-prop">{params.desc}</span></>}
          {params && params.desc && !showParamDesc && <><br /><a onClick={() => setShowParamDesc(true)} className="api-link">Parameter</a></>}
        </td>
      </tr>
    </React.Fragment >
  )
})
