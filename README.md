Redity
========

Redity es una herramienta que ayuda a separar la lógica de la interfaz.

```
npm install redity
```

[Leer mas de la documentación](https://github.com/Aventura-Tech/redity/tree/master/docs)


### Models

Los modelos serán los iniciales y los encargados de manejar toda tu lógica.
Creemos un directorio donde ubicaremos nuestros modelos.

```js
// src/models/MyModel.js
export default redity => {
  redity.init = initial => {
    // Init states
    initial.states = {
      message: 'Hello word'
    }
    
    initial.dispatchers = {
      changeMessage: null
    }
  }
  
  // Listener
  redity.onListen = (payload, states, header) => {
    if(header.actions.changeMessage){
      states.message(payload)
    }
  }
  
  return redity
}
```

Su propiedad `onListen` será el escuchador de las acciones generados por los dispatchers que se ejecuten en la interfaz.
`payload`, será el dato que enviemos por el dispatch.
`states`, un objeto de métodos de estados que nos ayudará a cambiar su valor. Los estados son conectados al interfaz.
`header` será en encargado de ofrecerte muchas herramientas de todo el sistema, como las acciones.

### Register

Será el encargado de registar todos los modelos que desees crear.
Crea un archivo register en la raíz de tu app eh importa tu modelo y registralo asignandole un identificador

```js
// src/register.js
import Redity from 'redity'

import MyModel from './models/MyModel.js'
Redity.register('myModel', MyModel)
```
Importalo a tu app
```js
// src/app.js
import './register'
// ...
```

> Puedes registrar varios o reusar el componente.

### Connect

Será el encargado de conectar tu componente con el modelo, la conexión pasará todos los estados y acciones que hayas inicializado en el Modelo.

```jsx
import React from 'react'
import { connect } from 'redity'

function MyComponent({message, changeMessage}){
  return (
    <div>
      <p>{ message }</p>
      <button onClick={() => changeMessage('This is working :D')} >Click me! :D</button>
    </div>
  )
}

const mapStateToProps = states => ({
  message: states.messsage
})

const mapDispatchToProps = dispatch => ({
  changeMessage: dispatch.changeMessage
})

export default connect('myModel', mapStateToProps, mapDispatchToProps)(MyComponent)

```

Y listo.

Si generamos un click en el botom que creamos, mandará una acción al modelo que lo capturará el __listener__ donde ahí tu podras manejar la lógica.

## Documentación

* [Models](https://github.com/Aventura-Tech/redity/blob/master/docs/2.%20Models.md)
* [States](https://github.com/ertrii/redity/blob/master/docs/3.%20States.md)
* [Dispatcher](https://github.com/Aventura-Tech/redity/blob/master/docs/4.%20Dispatcher.md)
* [Blockcode](https://github.com/Aventura-Tech/redity/blob/master/docs/5.%20Blockcode.md)
* [Testing](https://github.com/Aventura-Tech/redity/blob/master/docs/6.%20Testing.md)
* [Question](https://github.com/Aventura-Tech/redity/blob/master/docs/7.%20Question.md)


## Snippets

Te será de mucha ayuda para agilizar el trabajo, solo cópialo en las opciones de snippets en `javascript.json` y `javascriptreact.json`

```json
  "Redity Main": {
    "prefix": "redity:index",
    "body": [
      "import init from './init'",
      "import listen from './listen'",
      "import fail from './fail'",
      "",
      "export default redity => {",
      "\tredity.init = init",
      "",
      "\tredity.onListen = listen",
      "\tredity.onFail = fail",
      "",
      "\treturn redity",
      "}",
      ""
    ]
  },

  "Redity init": {
    "prefix": "redity:init",
    "body": [
      "export default (initial, settings) => {",      
      "\tinitial.states = {",
      "\t\t$1",
      "\t}",
      "",
      "\tinitial.dispatchers = {",
      "\t\t$2",      
      "\t}",
      "}"
    ]
  },

  "Redity onListen": {
    "prefix": "redity:listen",
    "body": [
      "export default async (payload, states, header) => {",
      "\tconst { $1 } = header.actions",
      "\tconst { block, show } = header.blockcode",
      "\tshow()",
      "",
      "\tif ($2) {",
      "\t\t$3",
      "\t}",
      "",
      "}",
      ""
    ]
  },

  "Redity onFail": {
    "prefix": "redity:fail",
    "body": [
      "export default async (catchErr, states, header) => {",
      "\tconst { $1 } = header.actions",
      "\tconst { num } = header.blockcode",
      "",
      "\tif ($2 && num === 1) {",
      "\t\t$3",
      "\t}",
      "",
      "}",
      ""
    ]
  },

  "Redity connect component": {
    "prefix": "redity:connect",
    "body": [
      "const mapStateToProps = states => ({",
      "\t$3: state.$3",
      "})",
      "",
      "const mapDispatchToProps = dispatch => ({",
      "\t$4: dispatch.$4",
      "",
      "export default connect('$1', mapStateToProps, mapDispatchToProps)($2)",
      ""
    ],
    "description": "Conexion del Modelo de Redity al Componente, requiere importar su método connect"
  }
```
