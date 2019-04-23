export const openSandbox = async (schemaStr, subSchemaStr, mdi) => {
  const html = mdi ?
`<link href="https://cdnjs.cloudflare.com/ajax/libs/MaterialDesign-Webfont/3.5.95/css/materialdesignicons.css" rel="stylesheet">
'<div id="root"></div>'
`
    : '<div id="root"></div>';
  const code = `import React from 'react';
import ReactDOM from 'react-dom';
import {SchemaManager, VsForm} from '@vs-form/vs-form';
import schema from './schema';
${subSchemaStr ? "import address from './address';" : ''}

${subSchemaStr ? "const schemaManager = new SchemaManager(schema, [address])" : "const schemaManager = new SchemaManager(schema)"}
const element = (
  <div style={{margin: 10}}>
    <VsForm schemaManager={schemaManager} />
  </div>
);

ReactDOM.render(
  element,
  document.getElementById('root')
);`;

  const files = {
    "package.json": {
      content: {
        dependencies: {
          "react": "latest",
          "react-dom": "latest",
          "@vs-form/vs-form": "latest",
          "@material-ui/core": "latest",
        }
      }
    },
    "schema.js": {
      content: schemaStr
    },
    "index.js": {
      content: code
    },
    "index.html": {
      content: html
    }
  }
  if(subSchemaStr) {
    files["address.js"] = {
      content: subSchemaStr
    }
  }
  const response = await fetch("https://codesandbox.io/api/v1/sandboxes/define?json=1", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      files,
    })
  })
  const json = await response.json()
  var win = window.open('https://codesandbox.io/s/' + json.sandbox_id, '_blank');
  if(win) {
    win.focus();
  } else {
    //Browser has blocked it
    alert('Please allow popups for this website');
  }
  // console.log(json)
}