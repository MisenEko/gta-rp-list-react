import React, {useEffect} from 'react'
import './twitchmain.css'
import TwitchThumbNail from './TwitchThumbNail'
import TwitchFilter from './TwitchFilter'
import { useSelector, useDispatch } from 'react-redux'
import {getOauthKey} from '../redux/reducers/TwitchKey'
import {getAllStreams} from '../redux/reducers/TwitchData'
import {refreshInterval} from '../redux/reducers/TwitchDataRefresh'
import {v4 as uuidv4} from 'uuid'


export default function TwitchMain() {

    const dispatch = useDispatch()

    const {oAuthKey,refresh} = useSelector(state => ({
        ...state.TwitchKey       
    }))

    const {streamData, filteredData, checkData, refreshData} = useSelector(state => ({
        ...state.TwitchData
    }))

    const {streamDataRefresh, serveurList} = useSelector(state => ({
        ...state.TwitchDataRefresh
    }))

    useEffect(() => {
        dispatch(getOauthKey())      
    }, [])

    let sentServeurList = [...serveurList]
    console.log(serveurList)
    console.log(sentServeurList)
   

    useEffect(() => {
        
        if(refresh){
            
            dispatch(getAllStreams(oAuthKey.access_token)) 
            //dispatch(refreshInterval(oAuthKey.access_token))       
            
        }
        
    }, [oAuthKey.access_token])   
  


    return (
        <>            
            {/** filter button */}
           
            {streamData.length>0 ? <TwitchFilter
                gtaData={streamData}
                twitchKey = {oAuthKey.access_token}
                streamList = {sentServeurList}
                /> : <div></div>}


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

            </div> : 
            
            <div className="animation-box"><div className="lds-roller">Chargement en cours<div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div>}


            
        </>
    )
}
