var fs = require('fs')
var path = require('path');

const writeString = (readDir, writeDir) => {
  fs.readdirSync(readDir).forEach(file => {
    var varName = path.parse(file).name;
    if(varName !== 'index') {
      var contents = fs.readFileSync(path.join(readDir, file), 'utf8');
      var strContent = '`' + contents + '`'
      const str = `
const ${varName} = ${strContent}

export default ${varName}`
      try {
        fs.writeFileSync(path.join(writeDir, varName + '.js'), str)
      } catch (error) {
        console.log(readDir, WriteDir, varName)
      }

      // console.log(str);
    }
  });
}

const writeIndex = (readDir, ext) => {
  var files = []
  var str = ''

  fs.readdirSync(readDir).forEach(file => {
    if(path.parse(file).name !== 'index') {
      files.push(file)
    }
  })
  files.forEach((file) => {
    str = str + "import " + path.parse(file).name + " from './" + path.parse(file).name + "'" + "\r\n"
  })
  str = str + "\r\n" + 'export { ' + "\r\n"
  files.forEach((file) => {
    str = str + "  " + path.parse(file).name + "," + "\r\n"
  })
  str = str + "}"

  fs.writeFileSync(path.join(readDir, 'index' + ext), str)
}

writeString(path.join(__dirname, 'schemas/ts'), path.join(__dirname, 'schemas/tsStr'))
writeString(path.join(__dirname, 'schemas/js'), path.join(__dirname, 'schemas/jsStr'))
writeIndex(path.join(__dirname, 'schemas/js'), '.js')
writeIndex(path.join(__dirname, 'schemas/jsStr'), '.js')
writeIndex(path.join(__dirname, 'schemas/ts'), '.ts')
writeIndex(path.join(__dirname, 'schemas/tsStr'), '.js')


