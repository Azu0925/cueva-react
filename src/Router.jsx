import React from 'react'
import {Route,Switch} from "react-router";
import Main from './Main'
import Auth from "./Auth";
const Router = () => {

    return(
        <Switch>
            <Route exact path={"/"} component={Main} />
            <Auth>
                <Route exact path={"/order/history"} component={OrderHistory} />
            </Auth>
        </Switch>
    )

}

export default Router