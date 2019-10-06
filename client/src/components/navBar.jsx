import React, {Component} from 'react';
import { Link, withRouter } from 'react-router-dom';

class NavBar extends Component {
    logOut = (e) => {
        e.preventDefault();
        localStorage.removeItem('userToken');
        localStorage.removeItem('id');
        localStorage.removeItem('username');
        localStorage.removeItem('email');
        localStorage.removeItem('dateRange');
        this.props.history.push('/');
    }

    render() {
        const{ username } = this.props.user;
        const loginRegisterLink =  (
            <React.Fragment>
                <li className="nav-item">
                    <Link className="nav-link" to="/">
                        <i className="icon-home"></i> Menu Główne
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/login" className="nav-link">
                        Login
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/register" className="nav-link">
                        Register
                    </Link>
                </li>
            </React.Fragment>);

        const userLink = (
            <React.Fragment>
                <li className="nav-item">
                    <Link className="nav-link" to="/addIncome"><i className="icon-money"></i> Dodaj przychód</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/addExpence"><i className="icon-basket"></i> Dodaj wydatek</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/balanceViewer"><i className="icon-chart-pie"></i> Przeglądaj bilans</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/settings"><i className="icon-cog-alt"></i> Ustawienia</Link>
                </li>
                <li className="nav-item">
                    <a onClick={this.logOut} className="nav-link" href="#"><i className="icon-logout"></i> Wyloguj się</a>
                </li>
            </React.Fragment>
        );

        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
                <div className="container">
                    <div className="menu navbar-brand"><p style={{ marginBottom: 0 }}>{localStorage.userToken && `Witaj ${username}`}</p></div>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
    
                    <div className="collapse navbar-collapse justify-content-center menu" id="navbarSupportedContent">
                        <ul className="nav navbar-nav">
                            {localStorage.userToken ? userLink : loginRegisterLink}
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}

export default withRouter(NavBar);