import * as React from 'react'
// import Divider from '@material-ui/core/Divider'
// import green from '@material-ui/core/colors/green'
// import blue from '@material-ui/core/colors/green'
import JssProvider from 'react-jss/lib/JssProvider'
import { createGenerateClassName, createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'

import { VsForm, types, SchemaManager } from '@vs-form/vs-form/'
import {IconButton, VsToolbar, VsText} from '@vs-form/vs-general'
import { testSchemaList, schemaListCategories } from './test/schemas/testSchemaList'

import Sidebar from './Sidebar'
import JSView from './JSView'

const generateClassName = createGenerateClassName({
  productionPrefix: 'c',
})

const theme = (darkTheme: boolean) => createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    type: darkTheme ? 'dark' : 'light',
    // primary: green,
    // secondary: blue
  }
})

enum ContentView {
  form,
  schema,
  values
}

export interface IAppState {
  schemaManager: SchemaManager,
  curView: ContentView,
  darkTheme: boolean
}

class App extends React.Component<{}, IAppState> {
  constructor(props: any) {
    super(props)

    this.state = {
      schemaManager: new SchemaManager(schemaListCategories[0].list[0]),
      curView: ContentView.form,
      darkTheme: false
    }
  }

  public render() {
    return (
        <JssProvider generateClassName={generateClassName}>
          <MuiThemeProvider theme={theme(this.state.darkTheme)}>
            <VsToolbar
              sidebar={{ comp: <Sidebar schemaListCategories={schemaListCategories} onSchemaClick={this.clickSchema} selectedSchema={this.state.schemaManager && this.state.schemaManager.schema.name} /> }}
              toolbarMenu={this.ToolbarMenu()}>{this.formComp()}
            </VsToolbar>
          </MuiThemeProvider>
        </JssProvider>
    )
  }

  public clickSchema = (schema: types.ISchema) => {
    const schemaManager = new SchemaManager(schema, testSchemaList)
    this.setState({ schemaManager })
  }

  public changeView = (curView: ContentView) => () => {
    this.setState({ curView })
  }

  public switchTheme = () => {
    this.setState({ darkTheme: !this.state.darkTheme })
  }

  public ToolbarMenu = () => (
    <React.Fragment>
      <VsText text='Showcase' variant='h6' color='inherit' />
      {this.state.schemaManager && this.state.schemaManager.schema && <VsText text={this.state.schemaManager.schema.name} color='inherit' style={{ marginLeft: 10 }} />}
      {/* <Divider variant="inset" /> */}
      <IconButton icon='code-equal' color='inherit' tooltip='Form' onClick={this.changeView(ContentView.form)} />
      <IconButton icon='code-tags' color='inherit' tooltip='Schema' onClick={this.changeView(ContentView.schema)} />
      <IconButton icon='code-braces' color='inherit' tooltip='Values' onClick={this.changeView(ContentView.values)} />
      <div style={{ flexGrow: 1 }} />
      <IconButton icon='invert-colors' color='inherit' tooltip='apply Theme' onClick={this.switchTheme} />
    </React.Fragment>
  )

  public formComp = () => {
    if (this.state.curView === ContentView.form) {
      return (
        <VsForm schemaManager={this.state.schemaManager} />
      )
    } else if (this.state.curView === ContentView.schema) {
      // const schema = cloneDeep(this.state.schemaManager.schema)
      // SchemaManagerDesigner.deleteTempProps(schema)
      return <JSView jsObj={this.state.schemaManager.origSchema} />
    } else if (this.state.curView === ContentView.values) {
      return <JSView jsObj={this.state.schemaManager.schema.values} />
    } else {
      return null
    }
  }

}

export default App
