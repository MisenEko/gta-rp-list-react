const INITIAL_STATE = {
    streamDataRefresh : []
}

function TwitchDataRefresh (state = INITIAL_STATE, action){

    switch(action.type){
        case 'REFRESHTWITCHDATA' : {

            return {
                ...state,
                streamDataRefresh: action.payload

            }
        }

    }

    return state;
}

export default TwitchDataRefresh;



export const test = (twitchKey) => dispatch => {    
   setInterval(()=> {dispatch(getAllStreamsRefresh(twitchKey))}, 10000)
}


const getAllStreamsRefresh = (twitchKey, cursor, data = [], counter = 15) => dispatch => {

        while (counter !== 0) {
            
            const request = new Request('https://api.twitch.tv/helix/streams?game_id=32982&first=100&language=fr' + (cursor ? '&after=' + cursor : ''), { 
                method: 'GET' ,
                headers: {
                    'Client-ID': 'bgbezb2vov7jc4twxauhw3yh30ubbx',
                    'Authorization': `Bearer ${twitchKey}`
                    
                }
            });
            
            return fetch(request)
            .then((response) => response.json())
            .then((responseJson) => { 
                
                if (!responseJson.pagination.cursor){
                    counter = 0; 
                    console.log('ici')
                    dispatch({
                        type: 'REFRESHTWITCHDATA',
                        payload: data                                               
                    })
                } else {                        
                    data.push(...responseJson.data);
                    dispatch(getAllStreamsRefresh(twitchKey, responseJson.pagination.cursor, data, --counter));
                }
            })
        }
        
   
  }
