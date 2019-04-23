import { ISchemaDesign, Component, DataType } from '@vs-form/vs-form'

import * as styles from '../../styles'

const randomLabels = ['silly', 'fancy', 'funky', 'crazy', 'good']

const randomText = (suff: string): string => {
  return randomLabels[Math.floor(Math.random() * 5)] + ' ' + suff
}

const schema: ISchemaDesign = {
  name: 'other',
  label: 'Other',
  components: {
    root: {
      type: Component.panel,
      children: ['tabs'],
    },
    tabs: {
      type: Component.tabs,
      tabs: ['tab1', 'tab2']
    },
    tab1: {
      type: Component.tab,
      label: 'Media',
      children: ['media', 'media1']
    },
    tab2: {
      type: Component.tab,
      label: 'functional Labels',
      children: ['text1', 'input1', 'button1', 'buttonRefresh']
    },
    text1: {
      type: Component.text,
      text: 'These Components get their labels, hints, tooltips from a function with a random value'
    },
    input1: {
      type: Component.textinput,
      label() { return randomText('label') },
      hint() { return randomText('hint') },
      tooltip() { return randomText('tooltip') },
      data: {
        dataType: DataType.string,
        field: 'input1',
      }
    },
    button1: {
      type: Component.button,
      label() { return randomText('button label') },
      tooltip() { return randomText('button tooltip') },
    },
    buttonRefresh: {
      type: Component.button,
      label: 'Refresh labels',
      onClick: p => p.schemaManager.renderComponents([p.schema.components.tab2])
    },

    media: {
      type: Component.mediastatic,
      props: {
        image: 'https://thumbs.dreamstime.com/z/iguana-lizard-reptile-940676.jpg',
        title: 'Reptile'
      },
      gridItem: {
        md: 'auto'
      },
    },
    media1: {
      type: Component.mediastatic,
      props: {
        className: 'videoSize',
        component: 'iframe',
        src: 'https://www.youtube.com/embed/ZfP19G82_Vg'
      },
      styles: styles.video,
      gridItem: {
        md: 'auto'
      },
    },
  }
}

export default schema
