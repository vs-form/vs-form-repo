import { enums } from '../../index'

export const subschema = {
  name: 'subschema',
  label: 'subschema',
  values: {
    email: 'email@test.com',
  },
  components: {
    root: {
      type: enums.Component.panel,
      children: ['email', 'phone', 'vText', 'slider']
    },
    email: {
      data: {
        field: 'email',
        dataType: 'string',
        validations: {
          required: true,
        },
      },
      hint: 'required',
      type: enums.Component.textinput,
      label: 'Email',
    },
    phone: {
      data: {
        field: 'phone',
        dataType: 'string',
        default() {
          return '01 23'
        }
      },
      gridItem: {
        md: 6
      },
      type: enums.Component.textinput,
      label: 'Telephone',
    },
    slider: {
      type: enums.Component.slider,
      label: 'Slider',
      data: {
        field: 'slider',
        dataType: enums.DataType.number,
        validations: {
          min: 1,
          max: 50
        }
      },
    },
    vText: {
      type: enums.Component.textinput,
      data: {
        field: 'validateText',
        dataType: enums.DataType.string,
        validations: {
          required: true,
          min: 3,
          max: 6
        },
      },
      gridItem: {
        md: 6
      },
      label: 'Text1',
      hint: 'minimal 3 characters, maximal 6, not "zzz"'
    }
  }
}

export const subLevel1 = {
  name: 'subLevel1',
  label: 'subLevel1',
  values: {
    email: 'email@sublevel_1.com',
  },
  components: {
    root: {
      type: enums.Component.panel,
      children: ['email', 'sub']
    },
    email: {
      data: {
        field: 'email',
        dataType: 'string',
      },
      type: enums.Component.textinput,
      label: 'Email',
    },
    sub: {
      data: {
        field: 'sub_level_1',
        dataType: 'object'
      },
      type: enums.Component.subschema,
      schemaName: 'subLevel2',
    },
  }
}

export const subLevel2 = {
  name: 'subLevel2',
  label: 'subLevel2',
  values: {
    email: 'email@sublevel_2.com',
  },
  components: {
    root: {
      type: enums.Component.panel,
      children: ['email']
    },
    email: {
      data: {
        field: 'email',
        dataType: 'string',

      },
      type: enums.Component.textinput,
      label: 'Email',
    }
  }
}

export const subschemaError = {
  name: 'subschemaError',
  values: {
    email: 'email',
  },
  components: {
    root: {
      type: enums.Component.panel,
      children: ['email', 'cardEmpty', 'cardWrongKeys']
    },
    cardEmpty: {
      type: enums.Component.card,
      children: []
    },
    cardWrongKeys: {
      type: enums.Component.card,
      children: ['tubel']
    },
    email: {
      wrongProperty: 1,
      type: enums.Component.textinput,
      data: {
        field: 'email',
        dataType: 'string',
        wrongProperty2: 2,
      },
      label: 'Email',
    },
    vorname: {
      type: enums.Component.textinput,
      data: {
        field: 0,
        dataType: 'tubel',
      },
      gridItem: {
        xs: 500
      },
    }
  }
}
