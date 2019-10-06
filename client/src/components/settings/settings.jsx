import React, { Component } from 'react';
import CategoriesButtonGroup from './settingsComponents/categoriesButtonGroup';

class Settings extends Component {
    render() {
        const { incomeCategories } = this.props.incomes;
        const { expenceCategories, paymentMethods } = this.props.expences
        return (
            <React.Fragment>
                <CategoriesButtonGroup
                    onSettingsChange={this.props.onSettingsChange}
                    categories={incomeCategories}
                    categoriesType="incomeCategories"
                    label="Kategorie Przychodów" />
                <CategoriesButtonGroup
                    onSettingsChange={this.props.onSettingsChange}
                    categories={expenceCategories}
                    categoriesType="expenceCategories"
                    label="Kategorie Wydatków" />
                <CategoriesButtonGroup
                    onSettingsChange={this.props.onSettingsChange}
                    categories={paymentMethods}
                    categoriesType="paymentMethods"
                    label="Kategorie Sposobów Płatności" />
            </React.Fragment>
        );
    }
}

export default Settings;