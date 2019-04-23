# Form Generator

Documentation available at ...



## What is vs-form

vs-form is a React component to easily build Web forms with the help of a schema, using material-ui.

## Why use vs-form

vs-form radically improves your poductivity and gives a lot of advantages, which we listed below.


## Installation

`npm install @vs-form/vs-form  @material-ui/core`

or

`yarn add @vs-form/vs-form @material-ui/core`

## Basic Usage (Example)

    import React from "react";
    import ReactDOM from "react-dom";

    // import SchemaManager, VsForm and some enums
    import { SchemaManager, VsForm, Component, DataType, enums} from "@vs-form/vs-form";

    // define the
    const schema = {
      values: {
        text1: "Hello"
      },
      components: {
        root: {
          type: Component.form,
          children: ["text1", "btnOk"]
        },
        text1: {
          type: Component.textinput,
          data: {
            field: "text1",
            dataType: DataType.string
          },
          label: "Text1"
        },
        btnOk: {
          type: Component.button,
          disabled: false,
          action: enums.ButtonAction.save,
          gridItem: {
            md: 2
          }
        }
      }
    };

    const schemaManager = new SchemaManager(schema);

    ReactDOM.render(
      <VsForm schemaManager={schemaManager} />,
      document.getElementById("root")
    );




