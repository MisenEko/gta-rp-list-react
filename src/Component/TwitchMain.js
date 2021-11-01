import React, {useState, useEffect, useRef} from 'react'
import './twitchmain.css'
import TwitchThumbNail from './TwitchThumbNail'
import TwitchFilter from './TwitchFilter'
import { useSelector, useDispatch } from 'react-redux'
import {getOauthKey} from '../redux/reducers/TwitchKey'
import {getAllStreams} from '../redux/reducers/TwitchData'
import {v4 as uuidv4} from 'uuid'


export default function TwitchMain() {

    const dispatch = useDispatch()

    const {oAuthKey,refresh} = useSelector(state => ({
        ...state.TwitchKey       
    }))

    const {streamData, filteredData, checkData} = useSelector(state => ({
        ...state.TwitchData
    }))

    useEffect(() => {
        dispatch(getOauthKey())      
    }, [])

    useEffect(() => {

        if(refresh){
            dispatch(getAllStreams(oAuthKey.access_token))
        }
        
    }, [oAuthKey.access_token]) 


    /** setinterval test, it's not what I expect */
    /*useEffect(() => {
        if(refresh){
            const interval = setInterval(() => {            
                    dispatch(getAllStreams(oAuthKey.access_token))            
                }, 10000)
            }      
              
    }, [oAuthKey.access_token]) */

   /* const thunkA = () => async (dispatch, getState) => {
        const test = await dispatch(getOauthKey())
        console.log(test)
 
    }

    const thunkB = (key) =>(dispatch, getState) => {
        dispatch(getAllStreams(key))
        console.log('ici2')
       
    }

    const chainMyActions = () => {
        console.log('ici3') 
        const response = dispatch(thunkA());
          
        /*  response.then((data) => {
            dispatch(thunkB(data.access_token))
          })
        }
      



    useEffect(() => {
        chainMyActions()
    }, [])*/


    return (
        <>            
            {/** filter button */}
            <TwitchFilter
                gtaData={streamData}
                twitchKey = {oAuthKey.access_token}
            /> 

            {/** thumbnails body */}
            <div className="thumbnail">
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
                                    <div>{item.title}</div>
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
                </div>


            
        </>
    )
}
