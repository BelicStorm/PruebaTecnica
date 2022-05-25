import { useState } from "react";
import consumers from "../../core/consumer/";
import { useSocket } from "../utils/socket.context";


/* Reducer encargado de llamar a los consumers del core y gestionar las respuestas para capturar errores */
async function consumerReducer(consumerState, action, socketState) {
    try {
        const {consumer,consumerAction,variables} = action
        const variablesPlusSocket = {...variables}
        /* ejemplo:                    testConsumer.findByName({name:"name"}) */
        const result = await consumers[consumer][consumerAction](variablesPlusSocket)
        if (result.errors?.length > 0) {
            console.log(result.errors);
        }
        return {...consumerState, result:result}
    } catch (error) {
        console.error(error)
        return consumerState
    }
}

/* Hook encargado de gestionar las llamadas y resultados al consumer reducer */
function useConsumerReducer() {
    const [consumerResult, setResult] = useState(null);
    const {state} = useSocket()
    async function consume(action) {
      const nextState = await consumerReducer(consumerResult, action, state);
      setResult(nextState);
    }
  
    return [consumerResult, consume];
}


export default useConsumerReducer