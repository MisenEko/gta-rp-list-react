const INITIAL_STATE = {
    oAuthKey : [],
    refresh : false
}

function TwitchKey (state = INITIAL_STATE, action){

    switch(action.type){
        case 'LOADING' : {
            return {
                ...state,
                oAuthKey: action.payload, 
                refresh: true
            }
        }
    }

    return state;
}

export default TwitchKey;

export const getOauthKey = () => dispatch => {
    fetch(`https://id.twitch.tv/oauth2/token?client_id=bgbezb2vov7jc4twxauhw3yh30ubbx&client_secret=${process.env.REACT_APP_API_KEY}&grant_type=client_credentials`,{
        "method": "POST"
    })
    .then(response => response.json())
    .then(data => {        
        dispatch({
            type: 'LOADING',
            payload: data
        })
        
    })

    
}


