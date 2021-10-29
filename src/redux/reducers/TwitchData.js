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

export const getStreamData = (oAuthKey) => dispatch => {

    fetch('https://api.twitch.tv/helix/streams?game_id=32982&first=100&language=fr',{
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
    })


    
}
