import { useRef, useEffect, useState,useCallback} from 'react'
import {useSelector} from 'react-redux'
import {getMapSize, getUnsetRefCurrent} from '../reducks/pMap/selectors'
import interact from 'interactjs'
/*
react-hooks/exhaustive-deps（ESLint）にenable関数の実行とクリーンアップにdisable関数を渡しているuseEffectの依存配列に、enable関数を渡して、
enable関数をuseCallbackで包むように推奨された。
以上の対応をすると次は前回useEffectの暴走した際（する前）の変な警告が出るようになった。
【Assignments to the 'x,y,width,height' variable from inside React Hook useCallback will be lost after each render. To preserve the value over time, store it in a useRef Hook and keep the mutable value in the '.current' property. Otherwise, you can move this variable directly inside useCallback】
今のところ問題無いパフォーマンスだが、またuseEffectが暴走したら処置を戻すこと。
*/

const initPosition = {
    width: 100,
    height: 100,
    x: 0,
    y: 0
  }
export const useInteractJS = (position = initPosition,unsetRefCurrent) => {
  const selector = useSelector(state => state)
  //ドラッグ可能領域のサイズをstoreのsizeから取得
  const mapSize = getMapSize(selector);
  const mapWidth = mapSize.width
  const mapHeight = mapSize.height
  //削除された要素のrefを取得しunset()に備える
  
  //console.log('unsetref',unsetRefCurrent)

  const [_position, setPosition] = useState({
    ...initPosition,
    ...position
  })

  const interactRef = useRef(null)
  let {x, y, width, height} = _position
  const enable = useCallback(() => {
    interact(interactRef.current)
      .draggable({
        inertia: false
      })
      .on('dragmove', event => {
        console.log('到達３')
        x += event.dx
        y += event.dy
        if(x < 0) x = 0
        if(y < 0) y = 0
        if(x + width > mapWidth)x = mapWidth - width - 3
        if(y + height > mapHeight) y = mapHeight - height - 3
        setPosition({
          width,
          height,
          x,
          y
        })
      })
      .resizable({
        edges: { left: true, right: true, bottom: true, top: true },
        preserveAspectRatio: false,
        inertia: false
      })
      .on('resizemove', event => {
        width = event.rect.width
        height = event.rect.height
        x += event.deltaRect.left
        y += event.deltaRect.top
        if(x < 0) x = 0
        if(y < 0) y = 0
        if(y + height > mapHeight) height = mapHeight - y
        if(x + width > mapWidth) width = mapWidth - x
        setPosition({
          x,
          y,
          width,
          height
        })
      })

  },[])

  const disable = () => {
    if(!interactRef.current) return//カードを削除した時、ここにnullが渡されてエラーが出るからreturnしてる
    //console.log('inin',interactRef.current)
    console.log('通った')
    //interact(interactRef.current).unset();
  }

  useEffect(() => {
    enable()
    return disable
  },[enable])

  return {
    ref:interactRef,
    position: _position,
    disable:() => {
      console.log('削除')
      interact(interactRef.current).unset()
    },
    style: {
      transform: `translate3D(${_position.x}px, ${_position.y}px, 0)`,
      width:`${_position.width}px`,
      height:`${_position.height}px`,
      position: 'absolute',
      touchAction:'none',
      boxSizing: 'border-box'
    },

  };

}