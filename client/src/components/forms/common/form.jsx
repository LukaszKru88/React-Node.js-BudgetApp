import React, { Component } from 'react';
import Joi from 'joi-browser';

class Form extends Component {
    state = {
        data: {},
        errors: {}
    };

    validate = () => {
        const options = { abortEarly: false };
        const { error } = Joi.validate(this.state.data, this.schema, options);

        if (!error) return null;
        const errors = {};
        error.details.map(detail => (errors[detail.path] = detail.message));

        return errors;
    }

    validateProperty = ({ name, value }) => {
        const property = { [name]: value };
        const propertySchema = { [name]: this.schema[name] };
        const { error } = Joi.validate(property, propertySchema);
        return error ? error.details[0].message : null;
    }

    handleSubmit = e => {
        e.preventDefault();

        const errors = this.validate();
        this.setState({ errors: errors || {} });
        if (errors) return;

        this.doSubmit();
    }

    handleChange = ({ currentTarget: input }) => {
        const errors = { ...this.state.errors };
        const errorMessage = this.validateProperty(input);
        if (errorMessage) errors[input.name] = errorMessage;
        else delete errors[input.name];

        const data = { ...this.state.data };
        data[input.name] = input.value;

        this.setState({ data, errors });
    }

    renderButtonGroup(label1, label2, path) {
        const classes = "btn text-uppercase m-2 btn-block "
        return (
            <div className="row">
                <div className="col-6">
                    <button
                        disabled={this.validate()}
                        className={classes + "btn-success float-left"}>{label1}
                    </button>
                </div>
                <div className="col-6">
                    <button
                        onClick={() => this.props.history.push(path)}
                        className={classes + "btn-primary float-right"}>{label2}
                    </button>
                </div>
            </div>);
    }
}

export default Form;
