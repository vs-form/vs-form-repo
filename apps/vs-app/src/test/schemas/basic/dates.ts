import { ISchemaDesign, Component, DataType, types } from '@vs-form/vs-form'

const schema: ISchemaDesign = {
  name: 'dates',
  label: 'Dates',
  components: {
    root: {
      type: Component.panel,
      children: ['panel1'],
    },
    panel1: {
      type: Component.panel,
      children: ['card1', 'card2', 'button'],
    },
    card1: {
      type: Component.card,
      label: 'Regular Date Inputs',
      children: ['date', 'datetime', 'datetimeSeconds', 'time', 'timeseconds'],
    },
    card2: {
      type: Component.card,
      label: 'Extended Date Inputs',
      children: ['textInfo', 'dateExt', 'datetimeExt', 'timeExt', 'timeSecondsExt'],
    },
    date: {
      type: Component.date,
      data: {
        field: 'date',
        dataType: DataType.date,
      },
      gridItem: { md: 6, lg: 4, xl: 3 },
      label: 'Date'
    },
    datetime: {
      type: Component.datetime,
      data: {
        field: 'datetime',
        dataType: DataType.date,
        default() {
          return new Date('2010-11-01T08:10')
        }
      },
      gridItem: { md: 6, lg: 4, xl: 3 },
      label: 'Date & Time'
    },
    datetimeSeconds: {
      type: Component.datetime,
      data: {
        field: 'datetimeSeconds',
        dataType: DataType.date,
      },
      props: {
        inputProps: { step: '1' }
      },
      gridItem: { md: 6, lg: 4, xl: 3 },
      label: 'Date & Time (with Seconds)'
    },
    time: {
      type: Component.time,
      data: {
        field: 'time',
        dataType: DataType.date,
      },
      gridItem: { md: 6, lg: 4, xl: 3 },
      label: 'Time'
    },
    timeseconds: {
      type: Component.time,
      data: {
        field: 'timeSeconds',
        dataType: DataType.date,
        default() {
          return new Date('1900-01-01T07:35:20')
        }
      },
      props: {
        inputProps: { step: '1' }
      },
      gridItem: { md: 6, lg: 4, xl: 3 },
      label: 'Time with seconds'
    },
    textInfo: {
      type: Component.text,
      text: 'these require an additional package'
    },
    dateExt: {
      type: Component.dateext,
      label: 'Date',
      gridItem: { md: 4 },
      data: {
        field: 'dateExt',
        dataType: DataType.date,
        default() { return new Date('2018-12-01') }
      },
    },
    datetimeExt: {
      type: Component.dateext,
      label: 'Date & Time',
      gridItem: { md: 4 },
      data: {
        field: 'datetimeExt',
        dataType: DataType.date,
      },
      props: {
        type: Component.datetime
      }
    },
    timeExt: {
      type: Component.dateext,
      label: 'Time',
      gridItem: { md: 4 },
      data: {
        field: 'timeExt',
        dataType: DataType.date,
      },
      props: {
        type: Component.time
      }
    },
    timeSecondsExt: {
      type: Component.dateext,
      label: 'Time with seconds',
      gridItem: { md: 4 },
      data: {
        field: 'timeSecondsExt',
        dataType: DataType.date,
      },
      props: {
        type: Component.time,
        mask:  [/\d/, /\d/, ':', /\d/, /\d/, ':', /\d/, /\d/],
        format: 'HH:mm:ss'
      }
    },
    button: {
      type: Component.button,
      label: 'Update with current date',
      onClick(p) {
        const date = new Date()
        // tslint:disable-next-line:forin
        for (const k in p.schema.components) {
          const o = p.schema.components[k] as types.IComponentDate
          if (o.data && o.data.dataType === DataType.date) {
            p.schemaManager.updateValue(o.data.field, date)
          }
        }
        p.schemaManager.render()
      }
    },

  }
}

export default schema
