
import {socketProductor} from "../productor/index"
import {SocketQueryModel} from "../model/queries/"

const SocketConsumer = {
    socketConnect:() =>{
        return new Promise(async (resolve,reject)=>{
             try {
                 console.log("SocketConnect", SocketQueryModel.CONNECT );
                 await socketProductor[SocketQueryModel.CONNECT]()
                 resolve("ok")
             } catch (error) {
                 resolve({error:true, errorMsg:error})
             }
        })
     
     },
     socketDisconnect:() =>{
        return new Promise(async (resolve,reject)=>{
             try {
                 await socketProductor[SocketQueryModel.DISCONNECT]()
                 resolve("ok")
             } catch (error) {
                 resolve({error:true, errorMsg:error})
             }
        })
     
     },
}


export default SocketConsumer