import React,{useState,useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {Header} from '../component/Header'
import {EditPositionMap,PositionMap} from '../component/PositionMap/index'
import {updateMapSize} from '../reducks/pMap/operations'
import {fetchCards} from '../reducks/card/operations'
import {CreateTeamDialog} from '../component/UIKit'

const Main = () => {
  console.log('Main再レンダリング')
  const dispatch = useDispatch()
  const selector = useSelector(state => state)

  useEffect(() => {//ポジショニングマップを作成する要素の縦幅と横幅を取得しstoreに保存。ドラッグ可能領域の制御に使う。
    const target = document.getElementById('map')

    dispatch(updateMapSize(target.clientWidth,target.clientHeight))
  },[dispatch])

  useEffect(() => {//Cardsをさーばーから毎回フェッチ。この処理はMainに書いたほうが良いかも{03/01ここにwebSocketだ}
    dispatch(fetchCards())
    //socket
    console.log('カードフェッチ')
},[dispatch])

  /*useEffect(() => {
    if(belongTeamInfoLen === 0) setCreateTeamOpen(true)
  },[])*/

    return(
        <>
          <div id="main">
            <div id="map">
              <PositionMap />
            </div>

            <div id="editCardArea">
              <EditPositionMap />
            </div>
          </div>
          <CreateTeamDialog />
      </>
    
    )
}

export default Main
