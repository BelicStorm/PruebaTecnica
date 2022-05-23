
import {socketProductor} from "../productor/index"
import {SocketQueryModel} from "../model/queries/"
import {sockets} from "../productor/index"

const SocketConsumer = {
    socketConnect:() =>{
        return new Promise(async (resolve,reject)=>{
             try {
                 console.log("SocketConnect", SocketQueryModel.CONNECT );
                 const result = await socketProductor[SocketQueryModel.CONNECT]()
                 resolve(result)
             } catch (error) {
                 resolve({error:true, errorMsg:error})
             }
        })
     
     },
     socketDisconnect:() =>{
        return new Promise(async (resolve,reject)=>{
             try {
                 await socketProductor[SocketQueryModel.DISCONNECT]()
                 resolve(false)
             } catch (error) {
                 resolve({error:true, errorMsg:error})
             }
        })
     
     },
     findNewNews:({socket,action}) =>{
        return new Promise(async (resolve,reject)=>{
             try {
                await sockets.listener[SocketQueryModel.ON_NEW_ARTICLE](socket,action)
                await sockets.emit[SocketQueryModel.FIND_NEW_NEWS](socket)
                
                /* resolve(false) */
             } catch (error) {
                 resolve({error:true, errorMsg:error})
             }
        })
     
     },
     offNewArticle:({socket,action}) =>{
        return new Promise(async (resolve,reject)=>{
             try {
                sockets.listener[SocketQueryModel.OFF_NEW_ARTICLE](socket,action)
                resolve(false)
             } catch (error) {
                 resolve({error:true, errorMsg:error})
             }
        })
     
     },
}


export default SocketConsumer