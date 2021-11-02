const INITIAL_STATE = {
    streamDataRefresh : []
}

function TwitchDataRefresh (state = INITIAL_STATE, action){

    switch(action.type){
        case 'REFRESHTWITCHDATA' : {

            return {
                ...state,
                streamDataRefresh: action.payload,

            }
        }

        /*case 'FILTEREDDATA' : {
            /** a little spaghetti code... */
         /*   let newArr = action.payload;
            {newArr.length === 0 ? isData = false : isData = true}
            if(newArr[0]==='del'){isData = true; newArr=[];}else{isData=false}

            return {
                ...state,
                filteredData: newArr,
                checkData: isData
            }
        }*/
    }

    return state;
}

export default TwitchDataRefresh;



export const test = (oAuthKey) => dispatch => {
    
   setInterval(()=> {dispatch(getAllStreamsRefresh(oAuthKey))}, 10000)
}


const getAllStreamsRefresh = (oAuthKey, cursor, data = [], counter = 15) => dispatch => {

    console.log('ici')

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
                    console.log(data)
                    dispatch({
                        type: 'REFRESHTWITCHDATA',
                        payload: data
                    })
                } else {                        
                    data.push(...responseJson.data);
                    dispatch(getAllStreamsRefresh(oAuthKey, responseJson.pagination.cursor, data, --counter));
                }
            })
        }
        
   
  }
