import React, { Component } from 'react';
import ModalForm from './modalForm';

class CategoriesButtonGroup extends Component {
    render() {
        const { onSettingsChange, categories, label, categoriesType } = this.props;
        const headerClasses = "col-md-6 offset-md-3 ";
        return (
            <React.Fragment>
                <div className={headerClasses + "tablesHeading"}>{label}</div>
                <div className={headerClasses + "text-center"}>
                    <div className="btn-group btn-group-lg">
                        <ModalForm categoriesType={categoriesType} formType="add" color="primary" title="Add Category" categories={categories} onSubmit={onSettingsChange} />
                        <ModalForm categoriesType={categoriesType} formType="edit" color="success" title="Edit Category" categories={categories} onSubmit={onSettingsChange} />
                        <ModalForm categoriesType={categoriesType} formType="delete" color="danger" title="Delete Category" categories={categories} onSubmit={onSettingsChange} />
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default CategoriesButtonGroup;