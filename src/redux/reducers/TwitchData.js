const INITIAL_STATE = {
    streamData : [],
    filteredData : []
}

function TwitchData (state = INITIAL_STATE, action){

    switch(action.type){
        case 'TWITCHDATA' : {
            return {
                ...state,
                streamData: action.payload
            }
        }

        case 'FILTEREDDATA' : {
            const newArr = action.payload;           
            return {
                ...state,
                filteredData: newArr
            }
        }
    }

    return state;
}

export default TwitchData;

export const getStreamData = (oAuthKey, counter = 3, cursor, data =[]) => dispatch => {

   /*fetch('https://api.twitch.tv/helix/streams?game_id=32982&first=100&language=fr',{
        "method": "GET",
        "headers": {"Client-ID": 'bgbezb2vov7jc4twxauhw3yh30ubbx',
                    "Authorization": "Bearer "+oAuthKey},
    })
    .then(response => response.json())
    .then(data => {
        dispatch({
            type: 'TWITCHDATA',
            payload: data.data
        })
    })*/

        /*  while (counter !== 0) {
              const request = new Request('https://api.twitch.tv/helix/streams?game_id=32982&first=100&language=fr' + (cursor ? '&after=' + cursor : ''), { 
                method: 'GET' ,
                headers: {
                  'Client-ID': 'bgbezb2vov7jc4twxauhw3yh30ubbx',
                  'Authorization': `Bearer ${oAuthKey}`
                  }
                });

                console.log(request)
          
                return fetch(request)
                        .then((response) => response.json())
                        .then((responseJson) => { 
                            if (counter === 1) {
                                console.log(counter); 
                                return data;
                            }
                            data.push(...responseJson.data);
                            console.log('pas le if')
                            console.log(data)

                        return getStreamData(oAuthKey, --counter, responseJson.pagination.cursor, data);
              });
            }*/
          
    


    
}

export const getAllStreams = (oAuthKey, cursor, data = [], counter = 15) => dispatch => {
    
    while (counter !== 0) {

        const request = new Request('https://api.twitch.tv/helix/streams?game_id=32982&first=100&language=fr' + (cursor ? '&after=' + cursor : ''), { 
            method: 'GET' ,
            headers: {
            'Client-ID': 'bgbezb2vov7jc4twxauhw3yh30ubbx',
            'Authorization': `Bearer ${oAuthKey}`,
            'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
            }
            });
  
        return fetch(request)
        .then((response) => response.json())
        .then((responseJson) => { 
                if (!responseJson.pagination.cursor){
                    counter = 0; 
                    dispatch({
                        type: 'TWITCHDATA',
                        payload: data
                    })
                } else {                        
                        data.push(...responseJson.data);
                        dispatch(getAllStreams(oAuthKey, responseJson.pagination.cursor, data, --counter));
                    }
            });
    }
  }
