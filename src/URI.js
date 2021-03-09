const URI = class{
    constructor(){
        this.USER = 'http://localhost:80/cueva/src/user_info/'
        this.TEAM = 'http://localhost:80/cueva/src/team_info/'
        this.MAP = 'http://localhost:80/cueva/src/map_info/'
        this.CARD = 'http://localhost:80/cueva/src/card_info/'
    }

    get getUSER(){
        return this.USER
    }

    get getTEAM(){
        return this.TEAM
    }

    get getMAP(){
        return this.MAP
    }

    get getCARD(){
        return this.CARD
    }


}

export default URI