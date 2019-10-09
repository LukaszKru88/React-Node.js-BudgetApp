import React, { Component } from 'react';

class Input extends Component {
    render() {
        const { name, type, value, label, onChange, errors = {} } = this.props
        const error = errors[name];
        return (
            <div className="form-group">
                <label className="text-center" htmlFor={name}>{label}</label>
                <input className="form-control"
                    id={name}
                    type={type}
                    value={value}
                    name={name}
                    step={type === "number" ? "0.01" : ''}
                    onChange={onChange}
                />
                {error && <div className="alert alert-danger">{error}</div>}
            </div>
        );
    }
}

export default Input;