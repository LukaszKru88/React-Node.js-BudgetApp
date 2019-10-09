import React from 'react';
import { withRouter } from 'react-router-dom';
import Form from './formsComponents/form';
import Joi from 'joi-browser';
import Input from './formsComponents/input';
import {login} from '../utils/UserFunctions';

class Login extends Form {
    state = {
        data: {
            email: "",
            password: ""
        },
        errors: {},
    }

    schema = {
        email: Joi.string().email().max(50).required().label('Email'),
        password: Joi.string().required().label('Password'),
    }

    doSubmit = async() => {
        const callback = await login(this.state.data);

        if(callback.data.error){
            const errors = {...this.state.errors};
            errors.serverError = callback.data.error;
            this.setState({errors});
        }
        else {
            //this.props.login();
            window.location = '/balanceViewer';
        }
    }

    render() {
        const { email, password } = this.state.data;
        const { errors } = this.state;
        return (
            <div className="row">
                <div className="col-3"></div>
                <div className="col-6">
                    <h1 className="text-uppercase text-center m-2">Logowanie</h1>
                    {errors.serverError && <div className="alert alert-danger">{errors.serverError}</div>}
                    <form onSubmit={this.handleSubmit}>
                        <Input name="email" value={email} type="email" label="Email" onChange={this.handleChange} errors={errors} />
                        <Input name="password" value={password} type="password" label="Hasło" onChange={this.handleChange} errors={errors} />
                        {this.renderButtonGroup("Login", "Powrót", "/")}
                    </form>
                </div>
                <div className="col-3"></div>
            </div>
        );
    }
}

export default withRouter(Login);