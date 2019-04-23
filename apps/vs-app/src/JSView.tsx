import * as React from 'react'
import AceEditor from 'react-ace'

// tslint:disable-next-line:no-var-requires
const beautify = require('js-beautify').js

import 'brace/mode/json'
import 'brace/mode/javascript'
import 'brace/theme/textmate'
import 'brace/ext/searchbox'

import { convertObjToText } from '@vs-form/vs-general'

export interface IJsonViewProps {
  jsObj: object,
}

export default class extends React.Component<IJsonViewProps, {}> {
  private editorRef: any

  constructor(props: IJsonViewProps) {
    super(props)
    this.editorRef = React.createRef()
  }

  public initJS = (): string => {
    const s = convertObjToText(this.props.jsObj)
    return beautify(s, { indent_size: 2, space_in_empty_paren: true })
  }

  public findString(s: string) {
    const editor = this.editorRef.current && this.editorRef.current.editor
    if (editor) {
      editor.find(s, {
        wrap: true,
        caseSensitive: true,
        regExp: true,
      })
    }
  }

  public render() {
    return (
      <React.Fragment>
        <AceEditor
          ref={this.editorRef}
          mode='json'
          theme='textmate'
          name='js_edit'
          width='100%'
          height='1000px'
          focus={true}
          fontSize={14}
          showPrintMargin={true}
          showGutter={true}
          highlightActiveLine={true}
          value={this.initJS()}
          readOnly={true} /> :
      </React.Fragment>
    )
  }
}
