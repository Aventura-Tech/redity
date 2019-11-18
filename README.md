Get Started
========

Redity es una herramienta que ayuda a separar la lógica de la interfaz, basadose en modelos. El interfaz tiene interación con el modelo gracias a las acciones que puede generar y que es respondido en sus estados.

Redity fue pensado para tener control de las interfaces conectadas y de sus estados creando un ecosistema de recibir orden y despachar.

Instalación
```
npm install redity
```

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
  redity.onListen = (payload, header, states) => {
    if(header.actions.changeMessage){
      states.message(res)
    }
  }
  
  return redity
}
```

Su propiedad `onListen` será el escuchador de las acciones generados por los dispatchers que se ejecuten en la interfaz.
`payload`, será el dato que enviemos por el dispatch
`header` será en encargado de ofrecerte muchas herramientas de todo el sistema, como las acciones.
`states`, un objeto de métodos de estados que nos ayudará a cambiar su valor. Los estados son conectados al interfaz.

### Register

Será el encargado de registar todos los modelos que desees crear.
Crea un archivo register en la raíz de tu app eh importa tu modelo y registralo asignandole un identificador

```js
// src/register.js
import Redity from 'redity'

import MyModel from './models/example.model.js'
Redity.register('myModel', MyModel)
```
Importalo a tu app
```js
// src/app.js
import './register'
// ...
```

Puedes registrar varios o reusar el componente.

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

#### Algunas configuraciones de Redity

* __dev[Boolean]__, Al activar modo desarrollo se muestra ayuda visual en consola, pero en modo Producción esto no será necesario. por defecto es `true`

```js
// register.js
Redity.config.dev = false
```

## Documentación

* [Models]()
* [States]()
* [Dispatcher]()
* [Blockcode]()
* [Question]()


## Snippets

Te será de mucha ayuda para agilizar el trabajo, solo cópialo en las opciones de snippets en `javascript.json` y `javascriptreact.json`

```json
  "Redity Main": {
    "prefix": "redity:index",
    "body": [
      "import initial from './initial'",
      "import listener from './listener'",
      "import fail from './fail'",
      "",
      "export default redity => {",
      "\tredity.init = initial",
      "",
      "\tredity.onListen = listener",
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
