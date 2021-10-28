import React, {useState, useEffect, useRef} from 'react'
import TwitchThumbNail from './TwitchThumbNail'
import { useSelector, useDispatch } from 'react-redux'
import {getOauthKey} from '../redux/reducers/TwitchKey'
import { getStreamData } from '../redux/reducers/TwitchData'


export default function TwitchMain() {

    const dispatch = useDispatch()

    const {oAuthKey,refresh} = useSelector(state => ({
        ...state.TwitchKey       
    }))

    const {streamData} = useSelector(state => ({
        ...state.TwitchData
    }))

    useEffect(() => {
        dispatch(getOauthKey())      
    }, [])



    useEffect(() => {
        if(refresh){
            dispatch(getStreamData(oAuthKey.access_token))
        }
        
    }, [oAuthKey.access_token]) 

    if(streamData.data){streamData.data.map( item => {
        console.log(item)
    })}

    return (
        <div>
            <TwitchThumbNail />
        </div>
    )
}
