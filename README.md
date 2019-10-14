Redity
======

Redity es una herramienta que ayuda a separar la lógica de la interfaz, basadose en modelos. El interfaz tiene interación con el modelo gracias a las acciones que puede generar y que es respondido en sus estados.

Redity fue pensado para tener control de las interfaces conectadas y de sus estados creando un ecosistema de recibe orden y despacha.

Instalación
```
npm install redity
```

Creemos un directorio donde ubicaremos nuestros modelos.

```js
// src/models/MyModel.js
export default redity => {
  redity.init = initial => {
    // Init states
    initial.states = {
      message: 'Hello word'
    }
    
    initial.actions = {
      changeMessage: 'This is a action example for message state'
    }
  }
  
  // Listener
  redity.onListen = (res, header, states) => {
    if(header.events.changeMessage){
      states.message(res)
    }
  }
  
  return redity
}
```

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

Conecta a tu componente.

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

export default connect('myModel')(MyComponent)

```

Y listo.

### Models

Los modelos serán los iniciales y los encargados de manejar toda tu lógica.

### Register

Será el encargado de registar todos los modelos que desees crear.

### Connect

Será el encargado de conectar tu componente con el modelo, la conexión pasará todos los estados y acciones que hayas inicializado en el Modelo.