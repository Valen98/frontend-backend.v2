import React from 'react'
import  {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import AboutView from '../view/AboutView'
import ContactView from '../view/ContactView'
import HomeView from '../view/HomeView'
import ProfileView from '../view/ProfileView'
function Routing(props) {
    return (
        <Router>
            {props.children}
            <Switch>
                <Route exact path="/Profile" component={ProfileView}/>
                <Route exact path="/About" component={AboutView}/>
                <Route exact path="/Contact" component={ContactView}/>
                <Route component={HomeView}/>
            </Switch>
        </Router>
    )
}

export default Routing
