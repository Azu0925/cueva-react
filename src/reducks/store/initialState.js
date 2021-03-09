const initialState = {

    user:{
        isSignedIn:false,
        user_id:"",
        user_name:"",
        user_address:"",
        belongTeamInfo:[],
        invitedList:[],
        invitedNum:0
    },
    team:{
        team_id:"",
        team_name:"",
        team_description:"",
        member:[],
        map_info:[],
    },

    pMap:{
        map_id:"",
        map_name:"",
        map_description:"",
        axis:{
            vaHigh:"",
            vaLow:"",
            haHigh:"",
            haLow:"",
        },
        size:{},
        unsetRefCurrent:""
    },
    cards:{
        cards:[],
        selectedCardId:"",
    },

    requestError:false,

    webSocketAPI:""

}

export default initialState