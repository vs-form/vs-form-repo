import { ISchemaDesign, Component, DataType } from '@vs-form/vs-form'

const schema: ISchemaDesign = {
  name: 'checklistboxes',
  label: 'Checklistboxes',
  components: {
    root: {
      type: Component.panel,
      children: ['checklistboxString', 'checklistboxInt', 'checklistboxWithIcon', 'checklistboxWithItemIcons'],
    },
    checklistboxString: {
      type: Component.checklistbox,
      data: {
        field: 'clb1',
        dataType: DataType.arrayString,
        items: [{ value: '1', text: 'first' }, { value: '2', text: 'second' }],
        default: ['1']
      },
      label: 'Checklistbox with string values',
    },
    checklistboxInt: {
      type: Component.checklistbox,
      data: {
        field: 'clb2',
        dataType: DataType.arrayNumber,
        items: [{ value: 1, text: 'first' }, { value: 2, text: 'second' }],
        default: [1, 2]
      },
      rowDisplay: true,
      label: 'Checklistbox with number values (row Display)',
    },
    checklistboxWithIcon: {
      type: Component.checklistbox,
      data: {
        field: 'clb3',
        dataType: DataType.arrayNumber,
        items: [{ value: 1, text: 'first' }, { value: 2, text: 'second' }],
      },
      label: 'Checklistbox with action Icons',
      actionIcon: 'account',
      onActionClick: p => {
        alert(`Item "${p.item.text}" clicked`)
      }
    },
    tractorIcon: {
      type: Component.icon,
      icon: 'tractor',
    },
    iconSVG: {
      type: Component.icon,
      svg: 'M21,16V14L13,9V3.5A1.5,1.5 0 0,0 11.5,2A1.5,1.5 0 0,0 10,3.5V9L2,14V16L10,13.5V19L8,20.5V22L11.5,21L15,22V20.5L13,19V13.5L21,16Z',
    },
    checklistboxWithItemIcons: {
      type: Component.checklistbox,
      data: {
        field: 'clb4',
        dataType: DataType.arrayNumber,
        items: [{ value: 1, text: 'first', actionIcon: ['tractorIcon'] }, { value: 2, text: 'second', actionIcon: 'battery-10' }, { value: 3, text: 'standard Icon' }, { value: 4, text: 'SVG Icon', actionIcon: ['iconSVG'] }],
      },
      label: 'Checklistbox with individual action Icons',
      actionIcon: 'account',
      onActionClick: p => {
        alert(`Item "${p.item.text}" clicked`)
      }
    },

  }
}

export default schema
