import React,{useEffect,createContext,useState} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {EditPositionMap,PositionMap} from '../component/PositionMap/index'
import {updateMapSize} from '../reducks/pMap/operations'
import {getMapId} from '../reducks/pMap/selectors'
import {getSelectedCardId} from '../reducks/card/selectors'
import {updateAxisAction} from '../reducks/pMap/actions'
import {deselectCardAction,updateCardAction} from '../reducks/card/actions'
import {updateInvitedNumAction} from '../reducks/user/actions'
import {CreateTeamDialog,RequestErrorDialog} from '../component/UIKit'
import {Header} from '../component/Header'


export const WebSocketContext = createContext()

const Main = () => {
  console.log('Main再レンダリング')
  const dispatch = useDispatch()
  const selector = useSelector(state => state)

  const map_id = getMapId(selector)
  const [wsConnection,setWsConnection] = useState("")
  

  useEffect(() => {//ポジショニングマップを作成する要素の縦幅と横幅を取得しstoreに保存。ドラッグ可能領域の制御に使う。
    const target = document.getElementById('map')
      console.log('targetHidth',target.clientHeight)
      console.log('targetWidth',target.clientWidth)
    dispatch(updateMapSize(target.clientWidth,target.clientHeight))
  },[dispatch])

  useEffect(() => {//Cardsをさーばーから毎回フェッチ。この処理はMainに書いたほうが良いかも{03/01ここにwebSocketだ}
    //socket
    
      /*if(wsConnection !== "") wsConnection.close()
      if(wsConnection.readyState === 1){
        console.log('接続中のため切断')
        wsConnection.close()
      }*/
      const channelInfo = JSON.stringify({
        command:'subscribe',
        channel:map_id
      })

      const connection = new WebSocket('ws://localhost:8080')
      connection.onopen = () => {
        console.log('オープンしました')
        connection.send(channelInfo)
      }

      connection.onmessage = (e) => {
        const res = JSON.parse(e.data);
        console.log('webSocket受信！',res)
        switch(res.event){
          case 'update_map':
            
            const newCards = res.data;
            const selectedCardId = getSelectedCardId(selector)

            for(let i = 0; i < newCards.length; i++){
              if(newCards[i].card_id != selectedCardId){
                dispatch(deselectCardAction())
                break;
              }
            }
            dispatch(updateCardAction(newCards))
            console.log('カード作成完了！')
            break;

          case 'update_parameter':
            const axis = res.data
            dispatch(updateAxisAction(axis))
            break;
          
          case 'information':
            const invitedNum = res.data
            dispatch(updateInvitedNumAction(invitedNum))
            break;

          default:
          break

        }

      }


      setWsConnection(connection)

      return () => {
        //connection.close()
        setWsConnection('')
      }
  
},[map_id])


    return(
        <>
        <WebSocketContext.Provider value={wsConnection}>
          <div id="header">
              <Header />
            </div>
          <div id="main">
              <div id="map">
                <PositionMap />
              </div>
              <div id="editCardArea">
                <EditPositionMap />
              </div>
          </div>
          </WebSocketContext.Provider>
          <CreateTeamDialog />
          <RequestErrorDialog />
      </>
    
    )
}

export default Main
