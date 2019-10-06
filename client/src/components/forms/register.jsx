import React from 'react';
import { withRouter } from 'react-router-dom';
import Form from './common/form';
import Joi from 'joi-browser';
import Input from './common/input';
import { register } from '../utils/UserFunctions';

class Register extends Form {
    state = {
        data: {
            username: "",
            email: "",
            password: ""
        },
        errors: {},
    }

    schema = {
        username: Joi.string().min(4).max(50).required().label('UserName'),
        email: Joi.string().email().max(50).required().label('Email'),
        password: Joi.string().required().label('Password'),
    }

    doSubmit = async() => {
            const callback = await register(this.state.data);
            if(callback.data.error){
                const errors = {...this.state.errors};
                errors.serverError = callback.data.error;
                this.setState({errors});   
            }            
            else {
                this.props.history.push('/login');
            }
    }

    render() {
        const { username, email, password } = this.state.data;
        const { errors } = this.state;
        return (
            <div className="row">
                <div className="col-3"></div>
                <div className="col-6">
                    <h1 className="text-uppercase text-center m-2">Rejestracja</h1>
                    {errors.serverError && <div className="alert alert-danger">{errors.serverError}</div>}
                    <form onSubmit={this.handleSubmit}>
                        <Input name="username" value={username} type="text" label="Nazwa użytkownika" onChange={this.handleChange} errors={errors} />
                        <Input name="email" value={email} type="email" label="Email" onChange={this.handleChange} errors={errors} />
                        <Input name="password" value={password} type="password" label="Hasło" onChange={this.handleChange} errors={errors} />
                        {this.renderButtonGroup("Rejestracja", "Powrót", "/")}
                    </form>
                </div>
                <div className="col-3"></div>
            </div>
        );
    }
}

export default withRouter(Register);