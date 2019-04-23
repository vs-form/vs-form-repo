import {css} from 'docz-plugin-css'

export default {
  title: 'vs-form',
  propsParser: false,
  // menu: [
  //   {menu: 'Concepts', name: '1. Basic Examples'},
  //   {menu: 'Concepts', name: '2. Grid System'},
  //   {menu: 'Concepts', name: '6. Icons'},
  //   {menu: 'Concepts', name: '4. Subschemas'},
  // ],
  plugins: [
    css({
      preprocessor: 'sass'
    })
  ]
}