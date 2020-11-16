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
import {PUBLIC_URL} from "../constants";

class App extends Component {
    render(){
        return (
            <div>
                <Router>
                    <Header />
                    <div>

                        <Container className="p-4">
                            <Switch>
                                <Route path={`${PUBLIC_URL}about`}>
                                    <About />
                                </Route>
                                <Route path={`${PUBLIC_URL}contact`}>
                                    <Contact />
                                </Route>
                                <Route path={`${PUBLIC_URL}boards/create`}>
                                    <BoardCreate />
                                </Route>
                                <Route path={`${PUBLIC_URL}boards`}>
                                    <BoardList />
                                </Route>

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
