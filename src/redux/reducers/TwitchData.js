const INITIAL_STATE = {
    streamData : [],
    filteredData : []

}



function TwitchData (state = INITIAL_STATE, action){ 

    switch(action.type){
        case 'TWITCHDATA' : {          

            return {
                ...state,
                streamData: action.payload,
                refreshData : true
                
            }
        }

        case 'FILTEREDDATA' : {
            /** a little spaghetti code... */
            let isData = true
            let newArr = action.payload;
            {newArr.length === 0 ? isData = false : isData = true}
            if(newArr[0]==='del'){isData = true; newArr=[];}else{isData=false}

            return {
                ...state,
                filteredData: newArr,
                checkData: isData
            }
        }
    }

    return state;
}

export default TwitchData;


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
                })
    }
  }
