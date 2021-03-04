const initialState = {

    user:{
        isSignedIn:false,
        user_id:"",
        user_name:"",
        user_address:"",
        belongTeamsInfo:[],
        belongTeams:[
            {id:"1",name:"testTeam1"},
            {id:"2",name:"testTeam2"},
            {id:"3",name:"testTeam3"},
            {id:"4",name:"testTeam4"},
            {id:"5",name:"testTeam5"},
            {id:"6",name:"testTeam6"},
            {id:"7",name:"testTeam7"},
            {id:"8",name:"testTeam8"},
            {id:"9",name:"testTeam9"},
            {id:"10",name:"testTeam10"},
        ],
        invitedList:[],
        invitedNum:0
    },
    team:{
        team_id:"",
        team_name:"",
        team_description:"",
        member:[],
        map_info:[],
        inTeamPMaps:[
            {id:"1",name:"testMap1"},
            {id:"2",name:"testMap2"},
            {id:"3",name:"testMap3"},
            {id:"4",name:"testMap4"},
            {id:"5",name:"testMap5"},
            {id:"6",name:"testMap6"},
            {id:"7",name:"testMap7"},
            {id:"8",name:"testMap8"},
            {id:"9",name:"testMap9"},
            {id:"10",name:"testMap10"},
        ]
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