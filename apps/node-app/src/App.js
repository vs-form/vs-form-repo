import React, { Component } from 'react';
import {SchemaManager, VsForm} from '@vs-form/vs-form'
const schema = require('./schema').default

const schemaManager = new SchemaManager(schema)

class App extends Component {
  render() {
    return (
      <div style={{margin: 10}}>
      <VsForm schemaManager={schemaManager} />
    </div>
      );
  }
}

export default App;
