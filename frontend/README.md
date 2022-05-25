
#  Frontend
## Spec
 - **React.js** v18
 - **[Prime React](https://www.primefaces.org/primereact/setup/)** v8
 - **socket.io-client** v4.5.1
## Index
- Frontend
	- Install & Run
	- Structure & Usage
		- Core
		- Provider

## Install

	```console
		npm run install
	```
## Run

	```console
		npm run start
	```

## Structure & Usage

### Core

### Provider
1. Router
2. Utils

### Router
Inside the router folder we find the application's router and the device to redirect our requests to the **Productor**.

 - #### router/router.js
	It is responsible for routing our application and connecting to the websocket client of the server.
	To do this, it uses the features of ./utils/socket.context.js as well as ./router/consumer.js.

	
 - #### router/consumer.js
	 The consumer.js is the routing manager beetween the **Provider** and the consumer files in the **Core** 
	 It depends of react because is a Hook that stores the state of the responses and it is used to call directly to the **Core** consumers.
	 Lets create an example that calls an X endpoint from a invented component, using the real consumer:
	
	 - #### router/consumer.js
		 ``` console
		import  {useState}  from  "react";
		import  {TestConsumer}  from  "../../core/consumer";

		const ConsumerList = {
			TestConsumer:TestConsumer,
		}
		async function  consumerReducer(state, action)  {
			try  {
				const  {consumer,consumerAction,variables} = action
				const result = await  ConsumerList[consumer][consumerAction](variables)
				return  {...state, result:result}
			}  catch (error) {
				console.error(error)
				return  state
			}
		}
		function  useConsumerReducer()  {
			const  [consumerResult, setResult] = useState(null);
				async function  consume(action)  {
					const nextState = await  consumerReducer(consumerResult,  action);
				setResult(nextState);
			}
			return [consumerResult,  consume];
		}
		export  default  useConsumerReducer
		```
	 - #### pages/test.js
		```console
		import { useEffect, useState } from 'react'
		import  {useSocket}  from  "../utils/socket.context";
		import {TestConsumerModel} from "../../core/model/queryModels"
		import useConsumerReducer from '../router/consumer'
		const Test = () => {
		   const {state,dispatch} = useSocket()
		   const [consumerResult, consume] = useConsumerReducer();
		    const listener = (data) => {
				if (!data.error) {
					console.log(data.result)
				}else {
					console.log(data);
				}
				
			};
		   	 useEffect(() => {
				if (state.socket) {
					consume({consumer:SOCKET_CONSUMER,consumerAction:TestEmit,variables:{socket:state.socket, action:listener} });
				}
				return () => {
					if (state.socket) {
						consume({consumer:SOCKET_CONSUMER,consumerAction:OFF_Test,variables:{socket:state.socket, action:listener} });
					}
				};
			}, [state.socket]);
		   return(
		      ....
		   );
		}

		export default Test;
		```
	 
### Utils
The utils folder provides the actions that tend to be redundant either the rol check or the managing of the socket context.
 - #### utils/socket.context.js
	Manages the socket context.

	 - Obtain socket
	 ```cosole
	 ...
	 import  {  useSocket  }  from  '../utils/scoket.context'
	 ...
	 const  {state} = useSocket()
	 const {socket} = state
	 ...
	 ```
	 - Set Socket
	 ```cosole
	 ...
	 import  {  useSocket  }  from  '../utils/scoket.context'
	 ...
	 const  {dispatch} = useUserData()
	 dispatch({type:"set",userData:{...data}})
	 ```
	 - Borrar datos
	 ```cosole
	  ...
	 import  {  useSocket  }  from  '../utils/scoket.context'
	 ...
	 const  {dispatch} = useUserData()
	  dispatch({type:"delete"})
	 ```
 



