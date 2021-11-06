import React, {useEffect} from 'react'
import './twitchmain.css'
import TwitchThumbNail from './TwitchThumbNail'
import TwitchFilter from './TwitchFilter'
import { useSelector, useDispatch } from 'react-redux'
import {getOauthKey} from '../redux/reducers/TwitchKey'
import {getAllStreams} from '../redux/reducers/TwitchData'
import {refreshInterval} from '../redux/reducers/TwitchDataRefresh'
import useDimension from '../Hooks/useDimension'
import {v4 as uuidv4} from 'uuid'


export default function TwitchMain() {

    const browserWidth = useDimension();

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
            dispatch(refreshInterval(oAuthKey.access_token))
        }
        
    }, [oAuthKey.access_token])   
  
    const urlThumbnail = (user_login) => {
        let url = ''
        if(browserWidth < 680 || window.innerWidth < 680){
            url = `https://static-cdn.jtvnw.net/previews-ttv/live_user_${user_login}-367x207.jpg`
        }else{
            url = `https://static-cdn.jtvnw.net/previews-ttv/live_user_${user_login}-440x248.jpg`
        }
        return url
    }

    return (
        <>            
            {/** filter button */}
           
            {streamData.length>0 ? <TwitchFilter
                gtaData={streamData}
                twitchKey = {oAuthKey.access_token}             
                /> : <div></div>}


            {/** thumbnails body */}
            {streamData.length>0 ? 
                <div className='thumbnail'>
                {filteredData.length > 0 ? filteredData.map( item => {
                        
                    return ( <TwitchThumbNail key ={uuidv4()}>                            
                                    <a  href={`https://www.twitch.tv/${item.user_login}`} target='_blank' ><img alt={item.title} 
                                        src={`https://static-cdn.jtvnw.net/previews-ttv/live_user_${item.user_login}-440x248.jpg`}/>
                                    </a>
                                        
                                    <h3>{item.title}</h3>
                                    <div className="user-content"><div>{item.user_name}</div><div>viewers : {item.viewer_count}</div></div>
                             </TwitchThumbNail>
                            )
                }) 

                : checkData===false 
                ? <h1>Pas de serveur en ligne pour l'instant</h1> 
                : streamData.map( item => {

                    return (  <TwitchThumbNail key ={uuidv4()}>                            
                                    <a  href={`https://www.twitch.tv/${item.user_login}`} target='_blank' ><img alt={item.title} 
                                        src={`https://static-cdn.jtvnw.net/previews-ttv/live_user_${item.user_login}-440x248.jpg`}/>
                                    </a>                                    <h3>{item.title}</h3>
                                    <div className="user-content"><div>{item.user_name}</div><div>viewers : {item.viewer_count}</div></div>
                                </TwitchThumbNail>
                            )
                    })
                } 

            </div> : 
            
            <div className="animation-box"><div className="lds-roller">Chargement en cours<div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div>}


            
        </>
    )
}
