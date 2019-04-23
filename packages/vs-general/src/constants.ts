export const shortcuts = {
  showPi: 'alt+p',
  showStructure: 'alt+r',
  showSchemaManage: 'alt+m',
  showAddComponent: 'alt+i',
  delComponent: 'alt+del',
  saveComponent: 'alt+s',
}

const _shortCutToString: any = () => {
  const c = {}
  Object.keys(shortcuts).forEach(key => {
    c[key] = ' [' + shortcuts[key] + ']'
  })
  return c
}

export const shortCutToString = _shortCutToString()
