import React,{useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {tokenAuthentication} from './reducks/user/operations'
import {getIsSignedIn} from './reducks/user/selectors'

const Auth = ({children}) => {
    const dispatch = useDispatch()
    const selector = useSelector(state => state)
    const signedIn =  getIsSignedIn(selector)


    useEffect(() => {
        if(!signedIn) dispatch(tokenAuthentication())
    },[dispatch,signedIn])

    if(signedIn){
        return children
    }else{
        return <></>
    }


    
}

export default Auth