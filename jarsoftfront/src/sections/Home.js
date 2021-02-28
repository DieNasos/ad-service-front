import {Component} from "react";

export default class Home extends Component {
    render() {
        return(
            <div>
                <h1 style={{left: 125, top: 100, position: 'absolute'}}>
                    Welcome to advertising service home page!
                </h1>
                <h3 style={{left: 125, top: 170, position: 'absolute'}}>
                    Select a section on the navigation bar.
                </h3>
            </div>
        );
    }
}