import { ISchemaDesign, Component, DataType } from '@vs-form/vs-form'

const limit = (val: string, max: string) => {
  if (val.length === 1 && val[0] > max[0]) {
    val = '0' + val
  }

  if (val.length === 2) {
    if (Number(val) === 0) {
      val = '01'

      // this can happen when user paste number
    } else if (val > max) {
      val = max
    }
  }

  return val
}

const cardExpiry = (val: string) => {
  const month = limit(val.substring(0, 2), '12')
  const year = val.substring(2, 4)

  return month + (year.length ? '/' + year : '')
}

const schema: ISchemaDesign = {
  name: 'numbers',
  label: 'Numbers',
  components: {
    root: {
      type: Component.panel,
      children: ['cardnumbers', 'numFormatcard'],
    },
    cardnumbers: {
      type: Component.card,
      label: 'Numbers',
      children: ['number1', 'number2', 'integer1', 'integer2', 'slider1', 'slider2']
    },
    number1: {
      type: Component.number,
      data: {
        field: 'number1',
        dataType: DataType.number
      },
      label: 'number1',
      gridItem: { md: 3 },
    },
    number2: {
      type: Component.number,
      data: {
        field: 'number2',
        dataType: DataType.number,
        default: 10
      },
      label: 'number2',
      hint: 'number with default value',
      gridItem: { md: 3 },
    },
    integer1: {
      type: Component.integer,
      data: {
        field: 'integer1',
        dataType: DataType.integer,
        default: 85
      },
      label: 'Integer',
      hint: 'integer with default value',
      gridItem: { md: 3 },

    },
    integer2: {
      type: Component.integer,
      data: {
        field: 'integer2',
        dataType: DataType.integer,
        validations: {
          min: 0
        }
      },
      label: 'Integer2',
      hint: 'integer with no negative numbers allowed',
      gridItem: { md: 3 },
    },
    slider1: {
      type: Component.slider,
      data: {
        field: 'slider1',
        default: 1,
        dataType: DataType.number,
        validations: {
          min: 1,
          max: 50,
          step: 1
        }
      },
      label: 'slider',
      hint: 'slider with int value',
      gridItem: { md: 6 },
    },
    slider2: {
      type: Component.slider,
      data: {
        field: 'slider2',
        default: 1,
        dataType: DataType.number,
        validations: {
          min: 0,
          max: 100,
          step: 0.1
        }
      },
      label: 'slider',
      hint: 'slider with float value',
      gridItem: { md: 6 },
    },
    numFormatcard: {
      type: Component.card,
      label: 'Formatted Input',
      children: ['numberformat1', 'numberformat2', 'creditcard', 'cardExpiry']
    },
    numberformat1: {
      type: Component.numberformat,
      data: {
        field: 'numberformat1',
        dataType: DataType.number,
        default: 1234.55
      },
      numberFormatProps: {
        thousandSeparator: ',',
        decimalSeparator: '.',
        decimalScale: 2,
        fixedDecimalScale: true,
        prefix: '$ ',
      },
      label: 'currency1',
      hint: 'currency format for $'
    },
    numberformat2: {
      type: Component.numberformat,
      data: {
        field: 'numberformat2',
        dataType: DataType.number,
        default: 1234.55
      },
      numberFormatProps: {
        thousandSeparator: '\'',
        decimalSeparator: '.',
        decimalScale: 2,
        fixedDecimalScale: true,
        prefix: 'CHF ',
      },
      label: 'currency2',
      hint: 'currency format for swiss francs'
    },
    creditcard: {
      type: Component.numberformat,
      data: {
        field: 'creditcard',
        dataType: DataType.integer,
      },
      numberFormatProps: {
        format: '#### #### #### ####',
        mask: '_'
      },
      label: 'creditcard',
    },
    cardExpiry: {
      type: Component.numberformat,
      data: {
        field: 'cardExpiry',
        dataType: DataType.integer,
      },
      numberFormatProps: {
        format(val: string) {
          return cardExpiry(val)
        },
      },
      label: 'creditcard expiry date',
      hint: 'custom function for format'
    },

  }
}

export default schema
