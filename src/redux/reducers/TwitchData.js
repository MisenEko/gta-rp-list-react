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

export const getStreamData = (test) => dispatch => {

    let test2 = test
    /*fetch('https://id.twitch.tv/oauth2/token?client_id=bgbezb2vov7jc4twxauhw3yh30ubbx&client_secret=owwpzi87f0jex7m8j7d98y9awdao4z&grant_type=client_credentials',{
        "method": "POST"
    })
    .then(response => response.json())
    .then(data => {
        dispatch({
            type: 'LOADING',
            payload: data.access_token
        })
    })*/

    console.log('ici = '+test)
    
}
