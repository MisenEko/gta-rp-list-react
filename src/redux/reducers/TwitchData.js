const INITIAL_STATE = {
    streamData : ''
}

function TwitchData (state = INITIAL_STATE, action){

    switch(action.type){
        case 'LOADING' : {
            return {
                ...state,
                streamData: action.payload
            }
        }
    }

    return state;
}

export default TwitchData;

export const getStreamData = (oAuthKey) => dispatch => {

    console.log('ici '+ oAuthKey)
    fetch('https://api.twitch.tv/helix/search/categories?query=grant',{
        "method": "GET",
        "headers": {"Client-ID": 'bgbezb2vov7jc4twxauhw3yh30ubbx',
                    "Authorization": "Bearer "+oAuthKey},
    })
    .then(response => response.json())
    .then(data => {
        console.log(data)
        
        /*dispatch({
            type: 'LOADING',
            payload: data.access_token
        })*/
    })


    
}
