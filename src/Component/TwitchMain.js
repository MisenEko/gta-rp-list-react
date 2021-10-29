import React, {useState, useEffect, useRef} from 'react'
import './twitchmain.css'
import TwitchThumbNail from './TwitchThumbNail'
import TwitchFilter from './TwitchFilter'
import { useSelector, useDispatch } from 'react-redux'
import {getOauthKey} from '../redux/reducers/TwitchKey'
import { getStreamData } from '../redux/reducers/TwitchData'
import {v4 as uuidv4} from 'uuid'


export default function TwitchMain() {

    const dispatch = useDispatch()

    const {oAuthKey,refresh} = useSelector(state => ({
        ...state.TwitchKey       
    }))

    const {streamData, filteredData} = useSelector(state => ({
        ...state.TwitchData
    }))

    useEffect(() => {
        dispatch(getOauthKey())      
    }, [])

    console.log("en dessous fileteredata")
    console.log(filteredData)


    console.log("en dessous streamdata")
    console.log(streamData)

    useEffect(() => {
        if(refresh){
            dispatch(getStreamData(oAuthKey.access_token))
        }
        
    }, [oAuthKey.access_token]) 


    return (
        <>            
                <div className="filter-content">
                    <TwitchFilter
                        gtaData={streamData}
                        twitchKey = {oAuthKey.access_token}
                    />
                </div>

                {/*<div className="thumbnail-content">
                    {streamData && streamData.map( item => {
                    return (
                        <TwitchThumbNail key ={uuidv4()}>                            
                            <img  src={`https://static-cdn.jtvnw.net/previews-ttv/live_user_${item.user_login}-440x248.jpg`} />
                            <div>{item.title}</div>
                        </TwitchThumbNail>
                    )
                    })}
                </div>*/}

                <div className="thumbnail-content">
                    {filteredData.length > 1 ? filteredData.map( item => {{console.log(item.user_login)}

                                            <TwitchThumbNail key ={uuidv4()}>                            
                                                <img  src={`https://static-cdn.jtvnw.net/previews-ttv/live_user_${item.user_login}-440x248.jpg`} />
                                                <div>{item.title}</div>
                                             </TwitchThumbNail>
                    }) : streamData.map( item => {
                        return (
                            <TwitchThumbNail key ={uuidv4()}>                            
                                <img  src={`https://static-cdn.jtvnw.net/previews-ttv/live_user_${item.user_login}-440x248.jpg`} />
                                <div>{item.title}</div>
                            </TwitchThumbNail>
                        )
                        }) } 
                    </div>



            
        </>
    )
}
