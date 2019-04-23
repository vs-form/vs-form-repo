const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const SchemaManger = require('@vs-form/vs-form').SchemaManager;
const schema = require('./src/schema').default

const app = express();

app.use(express.static(path.join(__dirname, 'build')));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())

app.post('/validate', function (req, res) {
  schema.values = req.body
  const schemaManger = new SchemaManger(schema)
  if (schemaManger.validateValuesSchema()) {
    console.log('validation ok')
  } else {
    console.log('validation nok')
    console.log(schemaManger.printValueErrors())
  }
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(4000);