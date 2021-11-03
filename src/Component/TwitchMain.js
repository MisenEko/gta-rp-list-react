import React, {useState, useEffect, useRef} from 'react'
import './twitchmain.css'
import TwitchThumbNail from './TwitchThumbNail'
import TwitchFilter from './TwitchFilter'
import { useSelector, useDispatch } from 'react-redux'
import {getOauthKey} from '../redux/reducers/TwitchKey'
import {getAllStreams} from '../redux/reducers/TwitchData'
import {getAllStreamRefresh} from '../redux/reducers/TwitchDataRefresh'
import {test} from '../redux/reducers/TwitchDataRefresh'
import {v4 as uuidv4} from 'uuid'


export default function TwitchMain() {

    const dispatch = useDispatch()

    const {oAuthKey,refresh} = useSelector(state => ({
        ...state.TwitchKey       
    }))

    const {streamData, filteredData, checkData} = useSelector(state => ({
        ...state.TwitchData
    }))

    const {streamDataRefresh} = useSelector(state => ({
        ...state.TwitchDataRefresh
    }))

    useEffect(() => {
        dispatch(getOauthKey())      
    }, [])

    useEffect(() => {

        if(refresh){
            dispatch(getAllStreams(oAuthKey.access_token)) 
           // dispatch(test(oAuthKey.access_token))       
            
        }
        
    }, [oAuthKey.access_token]) 

    

 
    return (
        <>            
            {/** filter button */}
            <TwitchFilter
                gtaData={streamData}
                twitchKey = {oAuthKey.access_token}
            /> 

            {/** thumbnails body */}
            {streamData.length>0 ? 
                <div className='thumbnail'>
                {filteredData.length > 0 ? filteredData.map( item => {
                        
                    return ( <TwitchThumbNail key ={uuidv4()}>                            
                                    <a href={`https://www.twitch.tv/${item.user_login}`} target='_blank' ><img alt={item.title} src={`https://static-cdn.jtvnw.net/previews-ttv/live_user_${item.user_login}-440x248.jpg`} /></a>
                                    <h2>{item.title}</h2>
                                    <p>{item.user_name}</p>
                             </TwitchThumbNail>
                            )
                }) 

                : checkData===false 
                ? <h1>Pas de serveur en ligne pour l'instant</h1> 
                : streamData.map( item => {

                    return (  <TwitchThumbNail key ={uuidv4()}>                            
                                    <a href={`https://www.twitch.tv/${item.user_login}`} target='_blank' ><img alt={item.title} src={`https://static-cdn.jtvnw.net/previews-ttv/live_user_${item.user_login}-440x248.jpg`} /></a>
                                    <h2>{item.title}</h2>
                                    <p>{item.user_name}</p>
                                </TwitchThumbNail>
                            )
                    })
                } 
                    {/* (()=> {
                        if(filteredData.length > 0){
                            
                            filteredData.map( item => {
                        
                                return ( <TwitchThumbNail key ={uuidv4()}>                            
                                            <img  src={`https://static-cdn.jtvnw.net/previews-ttv/live_user_${item.user_login}-440x248.jpg`} />
                                            <div>{item.title}</div>
                                         </TwitchThumbNail>
                                        )})

                        } else if (checkData ===  false){
                           <TwitchThumbNail>
                               
                               <h1>Il n'y aucun stream en ligne pour ce serveur</h1>
                           </TwitchThumbNail>
                        } else {
                            streamData.map( item => {
                             
                                return (
                                        <TwitchThumbNail key ={uuidv4()}>                            
                                            <img  src={`https://static-cdn.jtvnw.net/previews-ttv/live_user_${item.user_login}-440x248.jpg`} />
                                            <div>{item.title}</div>
                                        </TwitchThumbNail>
                                        )})
                        }
                    })()*/}
            </div> : 
            
            <div className="animation-box"><div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div>}


            
        </>
    )
}
