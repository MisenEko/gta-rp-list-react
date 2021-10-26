import React, {useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {getOauthKey} from '../redux/reducers/TwitchKey'
import { getStreamData } from '../redux/reducers/TwitchData'

export default function TwitchMain() {


    const oAuthKey = useSelector(state => ({
        ...state.TwitchKey
       
    }))

    const streamData = useSelector(state => ({
        ...state.TwitchData
    }))

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getOauthKey())        
    }, [])

    useEffect(() => {
        dispatch(getStreamData(oAuthKey.oAuthKey))
    }, [oAuthKey.oAuthKey])

    

    return (
        <div>
            <h1>{oAuthKey.oAuthKey}</h1>
        </div>
    )
}
