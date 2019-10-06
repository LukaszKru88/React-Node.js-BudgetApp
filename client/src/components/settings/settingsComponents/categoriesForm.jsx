import React, { Component } from 'react';
import { Button, Form, FormGroup, FormText, Label, Input } from 'reactstrap';

class CategoriesForm extends Component {
    state = {
        formType: '',
        oldCategory: '',
        newCategory: '',
        transferCategory: '',
        error: '',
        categoriesType: ''
    }

    componentDidMount() {
        const { formType, categoriesType } = this.props;
        this.setState({ formType, categoriesType });
    }

    handleChange = ({ currentTarget: input }) => {
        const { name, value } = input;
        this.setState({ [name]: value });
    }

    formHandleMethod = event => {
        event.preventDefault();
        const error = this.validateSettings(this.state);
        this.setState({ error })
        if (!error) {
            this.props.onSubmit(this.state);
            this.props.toggle();
        }
    }

    validateSettings = ({ formType, oldCategory, newCategory, transferCategory }) => {
        const categoriesName = this.props.categories.map(category => category.name.toLowerCase());
       
        if ((formType === "add" || formType === "edit") && categoriesName.includes(newCategory.toLowerCase()))
            return "Kategoria o podanej nazwie już istnieje."
        if (formType === "edit" && oldCategory === newCategory)
            return "Nazwa edytowanej kategori jest identycza z nową nazwą."
        if (formType === "delete" && oldCategory === transferCategory)
            return "Kategoria usuwana jest identyczna z kategorią wybraną do transferu danych"
    }

    render() {
        const { categories, formType } = this.props;
        const { error } = this.state;
        return (
            <React.Fragment>
                {error && <div className="text-center text-uppercase m-2 text-danger">{error}</div>}
                <Form onSubmit={this.formHandleMethod}>
                    {(formType === "edit" || formType === "delete") &&
                        < FormGroup >
                            <Label for="categories" className="text-uppercase">Select category you wish to {formType}</Label>
                            <Input id="categories" name="oldCategory" type="select" onChange={this.handleChange} required>
                                <option></option>
                                {categories.map(category => (<option key={category.id} value={category.name}>{category.name}</option>))}
                            </Input>
                        </FormGroup>}
                    {(formType === "edit" || formType === "add") &&
                        <FormGroup>
                            <Label for="newCategory" className="text-uppercase">New category</Label>
                            <Input id="newCategory" name="newCategory" type="text" placeholder="Type new category name" onChange={this.handleChange} required />
                        </FormGroup>}
                    {formType === "delete" &&
                        <FormGroup>
                            <Label for="categories" className="text-uppercase">Select category for data transfer</Label>
                            <Input id="categories" name="transferCategory" type="select" onChange={this.handleChange} required>
                                <option></option>
                                {categories.map(category => (<option key={category.id} value={category.name}>{category.name}</option>))}
                            </Input>
                            <FormText color="muted">
                                Po usunięciu kategorii przeniesiemy przychody/wydatki pod powyżej wybraną katwgorię
                        </FormText>
                        </FormGroup>}
                    <Button className="text-uppercase" color={formType === "edit" ? "success" : (formType === "add" ? "primary" : "danger")}>{formType}</Button>
                </Form>
            </React.Fragment>
        );
    }
}

export default CategoriesForm;