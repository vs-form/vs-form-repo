import { ISchemaDesign, Component } from '@vs-form/vs-form'

import * as styles from '../../styles'

const schema: ISchemaDesign = {
  name: 'subIcons',
  components: {
    root: {
      type: Component.panel,
      children: ['divider1', 'text1', 'icon1', 'icon2', 'icon3', 'icon4', 'icon5',
      'divider2', 'text2', 'icon10', 'icon11', 'icon12', 'icon13', 'icon14',
      'divider31', 'text31', 'icon31', 'icon32', 'icon33', 'icon34', 'icon35'],
    },
    divider1: {
      type: Component.divider
    },
    text1: {
      type: Component.text,
      text: 'Icons:',
      gridItem: {
        xs: 'auto'
      },
      props: {
        className: 'textpad'
      },
      styles: styles.textpad
    },
    icon1: {
      type: Component.icon,
      icon: 'battery-charging-wireless',
      gridItem: {
        xs: 'auto'
      },
    },
    icon2: {
      type: Component.icon,
      icon: 'audio-video',
      gridItem: {
        xs: 'auto'
      },
    },
    icon3: {
      type: Component.icon,
      icon: 'badminton',
      gridItem: {
        xs: 'auto'
      },
    },
    icon4: {
      type: Component.icon,
      icon: 'bed-empty',
      gridItem: {
        xs: 'auto'
      },
    },
    icon5: {
      type: Component.icon,
      icon: 'brain',
      gridItem: {
        xs: 'auto'
      },
    },
    divider2: {
      type: Component.divider
    },
    text2: {
      type: Component.text,
      text: 'Icons with effects:',
      gridItem: {
        xs: 'auto'
      },
      props: {
        className: 'textpad'
      },
      styles: styles.textpad
    },
    icon10: {
      type: Component.icon,
      icon: 'battery-charging-wireless',
      gridItem: {
        xs: 'auto'
      },
      props: {
        className: 'mdi-rotate-45'
      }
    },
    icon11: {
      type: Component.icon,
      icon: 'audio-video',
      gridItem: {
        xs: 'auto'
      },
      props: {
        className: 'mdi-flip-h'
      }
    },
    icon12: {
      type: Component.icon,
      icon: 'audio-video',
      gridItem: {
        xs: 'auto'
      },
      props: {
        className: 'mdi-flip-v'
      }
    },
    icon13: {
      type: Component.icon,
      icon: 'loading',
      gridItem: {
        xs: 'auto'
      },
      props: {
        className: 'mdi-spin'
      }
    },
    icon14: {
      type: Component.icon,
      icon: 'audio-video',
      gridItem: {
        xs: 'auto'
      },
      props: {
        className: 'mdi-spin'
      }
    },
    divider31: {
      type: Component.divider
    },
    text31: {
      type: Component.text,
      text: 'Icons-Sizes',
      gridItem: {
        xs: 'auto'
      },
    },
    icon31: {
      type: Component.icon,
      icon: 'battery-charging-wireless',
      gridItem: {
        xs: 'auto'
      },
      props: {
        className: 'small'
      },
      styles: styles.iconSizes
    },
    icon32: {
      type: Component.icon,
      icon: 'audio-video',
      gridItem: {
        xs: 'auto'
      },
      props: {
        className: 'normal'
      },
      styles: styles.iconSizes
    },
    icon33: {
      type: Component.icon,
      icon: 'badminton',
      gridItem: {
        xs: 'auto'
      },
      props: {
        className: 'big'
      },
      styles: styles.iconSizes
    },
    icon34: {
      type: Component.icon,
      icon: 'bed-empty',
      gridItem: {
        xs: 'auto'
      },
      props: {
        className: 'bigger'
      },
      styles: styles.iconSizes
    },
    icon35: {
      type: Component.icon,
      icon: 'brain',
      gridItem: {
        xs: 'auto'
      },
      props: {
        className: 'biggest'
      },
      styles: styles.iconSizes
    },

  }
}

export default schema
