import React from 'react'
import {Route,Switch} from "react-router";
import {Main,SignUp,SignIn} from './templete'
import Auth from "./Auth";
const Router = () => {

    return(
        <Switch>
                <Route exact path={"/signup"} component={SignUp} />
                <Route exact path={"/signin"} component={SignIn} />
                <Auth>
                    <Route exact path={"(/)?"} component={Main} />
                </Auth>
        </Switch>
    )


}

export default Router