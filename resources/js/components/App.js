import React ,{Component} from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import {Button, Container} from 'react-bootstrap';

import Header from "./layouts/Header";
import Footer from "./layouts/Footer";
import Home from "./pages/Home"
import About from "./pages/About"
import Contact from "./pages/Contact";
import BoardList from "./pages/boards/BoardList";
import BoardCreate from "./pages/boards/BoardCreate";
import BoardView from './pages/boards/BoardView';
import {PUBLIC_URL} from "../constants";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import {checkIfAuthenticated} from "../services/AuthService";
import AuthenticatedRoutes from './AuthenticatedRoutes';

class App extends Component {
    state={
        user:{},
        isLoggedIn: false,
    };

    componentDidMount(){
        if(checkIfAuthenticated()){
            console.log("checkIfAuthenticated user data", checkIfAuthenticated());
            this.setState({
                user:checkIfAuthenticated(),
                isLoggedIn:true,
            });
        }
        
    }

    render(){
        return (
            <div>
                <Router>
                    <Header authData={this.state}/>
                    <div>
                        <Container className="p-4">

                            <Switch>
                                <Route path={`${PUBLIC_URL}about`} exat={true} component={About} />

                                <Route path={`${PUBLIC_URL}contact`} exat={true} component={Contact} />

                                <Route path={`${PUBLIC_URL}boards/view/:id`} exat={true} component={BoardView} />

                                {/* <Route path={`${PUBLIC_URL}boards/create`} exat={true} component={BoardCreate} /> */}

                                <AuthenticatedRoutes authed={this.state.isLoggedIn} path={`${PUBLIC_URL}boards/create`} component={BoardCreate} />

                                {/* <AuthenticatedRoutes authed={this.state.isLoggedIn} path={`${PUBLIC_URL}boards`} component={BoardList} /> */}

                                <Route path={`${PUBLIC_URL}boards`} authed={this.state.user} exat={true} component={BoardList} />

                                <Route path={`${PUBLIC_URL}register`} exat={true} component={Register} />

                                <Route path={`${PUBLIC_URL}login`} exat={true} component={Login} />

                                <Route path={`${PUBLIC_URL}`} exat={true} component={Home} />
                            </Switch>

                            <Footer />

                        </Container>


                    </div>

                </Router>
            </div>

        );
    }

}

export default App;

if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}
