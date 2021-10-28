import React, {useState, useEffect, useRef} from 'react'
import './twitchmain.css'
import TwitchThumbNail from './TwitchThumbNail'
import { useSelector, useDispatch } from 'react-redux'
import {getOauthKey} from '../redux/reducers/TwitchKey'
import { getStreamData } from '../redux/reducers/TwitchData'
import {v4 as uuidv4} from 'uuid'


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

    if(streamData.data){
        console.log(streamData.data)
    }

    return (
        <>            
                <div className="thumbnail-content">
                    {streamData.data && streamData.data.map( item => {
                    return (
                        <TwitchThumbNail key ={uuidv4()}>                            
                            <img  src={`https://static-cdn.jtvnw.net/previews-ttv/live_user_${item.user_login}-440x248.jpg`} />
                            <div>{item.title}</div>
                        </TwitchThumbNail>
                    )
                    })}
                </div> 
            
        </>
    )
}
