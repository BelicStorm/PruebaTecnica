#  FrontEnd Provider

  
##  Structure
1. Components
2. Layout
3. Pages
4. Router
5. Utils

### Router
Dentro de la carpeta router encontramos el encargado de enrutar nuestra aplicacion y el artifice de redirigir nuestras peticiones al **Productor**.

 - #### router/router.js
	Se encarga de enrutar nuestra applicación y de restringir el acceso a dichas rutas dependiendo de que rol posea el usuario que quiere acceder.
	Para verificar la información del usuario, el router, usa el  provider de datos que encontraremos en auth.context.js.
	Tipos de rutas:
	- Restringida por falta de autenticacion: 
	``` console
	 <Route exact path='/ruta' element={isLoged(state) ?? <Componente  /> } />
	```
	- Restringida por falta del Rol:
	``` console
	 <Route exact path='/'element={isLoged(state) ?? isAdmin(state) ?? <Componente  /> } />
	```
	- Restringida por una condicion que redirecciona a otra ubicación:	
	``` console
	 <Route exact path='/ruta' element={state.condition ? <Component/> : <Navigate replace  to={`/ruta`}/>} />
	```
 - #### router/consumer.js
	 Este consumer es el encargado de conectar el **Provider** con el **Consumer** ubicado en el Core.
	 Este consumer es dependiente de React pues es un Hook que almacena el estado de las respuestas tras resolverse y porque desde el podemos llamar a una función que llama directamente a los consumidores del Core.
	 Vamos a crear un ejemplo en el que queremos llamar a un endpoint X del backend desde un componente usando este consumer:
	 - #### router/consumer.js
		 ``` console
		 import  {useState}  from  "react";
		import  {TestConsumer}  from  "../../core/consumer";
		import  {useUserData}  from  "../utils/auth.context";
		const ConsumerList = {
			TestConsumer:TestConsumer,
		}
		async function  consumerReducer(state, action, dispatch)  {
			try  {
				const  {consumer,consumerAction,variables} = action
				const result = await  ConsumerList[consumer][consumerAction](variables)
				if (result.errors?.length > 0) {
					dispatch({type:"delete"})
				}
				return  {...state, result:result}
			}  catch (error) {
				console.error(error)
				return  state
			}
		}
		function  useConsumerReducer()  {
			const  [consumerResult, setResult] = useState(null);
				const  {state, dispatch} = useUserData()
				async function  consume(action)  {
					const nextState = await  consumerReducer(consumerResult,  action,  dispatch);
				setResult(nextState);
			}
			return [consumerResult,  consume];
		}
		export  default  useConsumerReducer
		```
	 - #### pages/test.js
		```console
		import { useEffect, useState } from 'react'
		import { useUserData } from '../utils/auth.context'
		import {TestConsumerModel} from "../../core/model/queryModels"
		import useConsumerReducer from '../router/consumer'
		const Test = () => {
		   const {state,dispatch} = useUserData()
		   const [consumerResult, consume] = useConsumerReducer();
		   useEffect(() => {
			     consume({consumer:TestConsumerModel.TEST_CONSUMER,consumerAction:TESTConsumerModel.HELLO_WORLD,variables:state.userName});
		   }, [])
		   return(
		      <>
		        {consumerResult!==null ? consumerResult.result : ""}
		      </>
		   );
		}

		export default Test;
		```
	 
 ### Utils
 La crapeta Utils es la encargada de proveer de acciones que tienden a ser redundantes ya sea la comprobación del rol del usuario actual o el manejo de estos datos. 
 - #### utils/auth.context.js
	 Se encarga de mantener un contexto a nivel de todo React, de los datos vitales del usuario actual.
	 Este Hook/Provider se encarga de manejar los datos del usuario, ya sea obtenerlos, borrarlos o modificarlos.
	 Se usa de la siguiente forma:
	 - Obtener datos
	 ```cosole
	 ...
	 import  {  useUserData  }  from  '../utils/auth.context'
	 ...
	 const  {state} = useUserData()
	 const {username, email} = state
	 ...
	 ```
	 - Modificar datos
	 ```cosole
	 ...
	 import  {  useUserData  }  from  '../utils/auth.context'
	 ...
	 const  {dispatch} = useUserData()
	 dispatch({type:"set",userData:{...data}})
	 ```
	 - Borrar datos
	 ```cosole
	  ...
	 import  {  useUserData  }  from  '../utils/auth.context'
	 ...
	 const  {dispatch} = useUserData()
	  dispatch({type:"delete"})
	 ```
 
 - #### utils/rol.provider.js
	 El rol provider se encarga de cargar componentes dependiendo del rol.
	 - Modo de uso
	  ```cosole
	  ...
	 import  RolProvider  from  "../utils/rol.provider";
	 ...
	 <RolProvider rolToBeEqual="ADMIN"> <Component/> </RolProvider>
	 ```