import React, {Component} from 'react';
import {connect} from 'react-redux'
import {Menu} from 'antd';
import {Layout, Icon} from 'antd';
import {NavLink} from 'react-router-dom';
import 'antd/dist/antd.css';
import './SiteHeader.css';
import {withRouter} from 'react-router-dom'
import Auth from '../functions/Auth'
import logo from '../assets/logo.png'

const {Header} = Layout;

const mapStateToProps = (state) => {
    return {loggedIn: state.login.loggedIn};
};
const mapDispatchToProps = (dispatch) => {
    return {
        onLoggedOut: () => {
            dispatch({type: 'LOGGED_OUT'})
        },
    }
};


class SiteHeader extends Component {
    handleClick = e => {
        if (e.key === "login") {
            this.props.history.push("/login/")
        } else if (e.key === "logout") {
            Auth.logout();
            this.props.history.push("/")
        }
    };

    render() {
        return (
            <Header className="Header" style={{padding: 0}}>
                <Menu
                    theme="dark"
                    mode="horizontal"
                    style={{lineHeight: '64px'}}
                    selectable={false}
                    className="Menu"
                    onClick={this.handleClick}
                >
                    <Menu.Item style={{float: 'left'}} key="homepage">
                        <NavLink to="/">
                            <img alt="logo" style={{height: "55px"}} src={logo}/>
                        </NavLink>
                    </Menu.Item>

                    {!this.props.loggedIn && (
                        <Menu.Item style={{float: 'right'}} key="login">
                            <Icon type="login"/> Login
                        </Menu.Item>
                    )}
                    {this.props.loggedIn && (
                        <Menu.Item style={{float: 'right'}} key="logout">
                            <Icon type="logout"/> Logout
                        </Menu.Item>
                    )}
                    {!this.props.loggedIn && (
                        <Menu.Item style={{float: 'right'}} key="3">
                            <NavLink to="/register"> <Icon type="form"/>Register </NavLink>
                        </Menu.Item>
                    )}
                    {this.props.loggedIn && (
                        <Menu.Item style={{float: 'right'}} key="4">
                            <NavLink to="/playlists"> Your playlists </NavLink>
                        </Menu.Item>
                    )}
                </Menu>
            </Header>
        );
    }

}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SiteHeader))