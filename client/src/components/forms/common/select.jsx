import React from 'react';

const Select = props => {
    const { name, label, value, categories, onChange, required, errors = {} } = props;
    const error = errors[name];
    return (
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <select className="form-control"
                id={name}
                name={name}
                onChange={onChange}
                required={required}
                value={value}
            >
                <option value=''></option>
                {categories.map(category => (<option key={category.id} value={category.name}>{category.name.toUpperCase()}</option>))}
            </select>
            {error && <div className="alert alert-danger">{error}</div>}
        </div>
    );
}

export default Select;