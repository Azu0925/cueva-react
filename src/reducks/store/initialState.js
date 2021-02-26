const initialState = {

    
    user:{
        isSignIn:false,
        userId:"",
        userName:"",
        userRmail:"",
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
    },
    team:{
        teamId:"",
        hostId:"",
        teamName:"",
        teamDetail:"",
        member:[],
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
        hostId:"",
        mapName:"",
        mapDetail:"",
        axis:{
            vaHigh:"",
            vaLow:"",
            haHigh:"",
            haLow:"",
        },
        size:{},
        cards:[],
        selectedCardId:"",
        unsetRefCurrent:""
    }

}

export default initialState