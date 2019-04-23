import * as React from 'react'
import * as ReactDOM from 'react-dom'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import '@mdi/font/css/materialdesignicons.min.css'

import * as selext from '@vs-form/vs-react-select'
import * as dateext from '@vs-form/vs-ui-pickers'
import * as lab from '@vs-form/vs-lab'
import * as mask from '@vs-form/vs-text-mask'
import * as numfmt from '@vs-form/vs-number-format'

selext.register()
dateext.register()
lab.registerSlider()
lab.registerSpeedDial()
mask.register()
numfmt.register()

ReactDOM.render(
  <App />,
  document.getElementById('root') as HTMLElement
)
registerServiceWorker()
