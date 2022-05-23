import { useState } from "react";
import consumers from "../../core/consumer/";
import { useSocket } from "../utils/socket.context";



async function consumerReducer(consumerState, action, socketState) {
    try {
        const {consumer,consumerAction,variables} = action
        const variablesPlusSocket = {...variables,socket:socketState}
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