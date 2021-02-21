import React,{useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {Header} from '../component/Header'
import {EditPositionMap,PositionMap} from '../component/PositionMap/index'
import {updateMapSize,fetchCards} from '../reducks/pMap/operations'
const Main = () => {
  console.log('Main再レンダリング')
  const dispatch = useDispatch()

  useEffect(() => {//ポジショニングマップを作成する要素の縦幅と横幅を取得しstoreに保存。ドラッグ可能領域の制御に使う。
    const target = document.getElementById('map')

    dispatch(updateMapSize(target.clientWidth,target.clientHeight))
  },[dispatch])

  useEffect(() => {//Cardsをさーばーから毎回フェッチ。この処理はMainに書いたほうが良いかも
    dispatch(fetchCards())
    console.log('カードフェッチ')
},[dispatch])

    return(
        <>
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

      </>
    
    )
}

export default Main