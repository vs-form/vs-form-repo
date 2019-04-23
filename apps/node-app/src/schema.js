const {Component, DataType, ValidationMethod} = require('@vs-form/vs-form');
const axios = require('axios');

const schema = {
  validationMethod: ValidationMethod.validateOnSubmit,
  components: {
    root: {
      type: Component.form,
      children: ['text1', 'text2', 'btnOk'],
    },
    text1: {
      type: Component.textinput,
      data: {
        field: 'text1',
        dataType: DataType.string,
        validations: {
          required: true,
        }
      },
      props: {
        required: true
      },
      gridItem: {
        md: 3
      },
      label: 'Text1',
    },
    text2: {
      type: Component.textinput,
      data: {
        field: 'text2',
        dataType: DataType.string,
        validations: {
          min: 3,
          max: 6,
        }
      },
      gridItem: {
        md: 3
      },
      hint: 'minimal length 3 maximal 6',
      label: 'Text2',
    },
    btnOk: {
      type: Component.button,
      label: 'Ok',
      tooltip: 'validate values on the server',
      onClick(p) {
        axios.post('http://localhost:4000/validate', p.schema.values)
      },
      gridItem: {
        md: 2
      },
    },
  }
};
exports.default = schema;
