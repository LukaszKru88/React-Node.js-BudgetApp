import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import PrivateRoute from './components/privateRoute'
import IncomeForm from './components/forms/incomeForm';
import ExpenceForm from './components/forms/expenceForm';
import BalanceViewer from './components/balance/balanceViewer';
import Settings from './components/settings/settings'
import Header from './components/header';
import Footer from './components/footer';
import NavBar from './components/navBar';
import Login from './components/forms/login';
import Register from './components/forms/register';
import jwt_decode from 'jwt-decode';
import { getBalance, editBalance, deleteBalance } from './components/utils/BalanceFunctions';
import { addIncome } from './components/utils/IncomeFunctions';
import { addExpence } from './components/utils/ExpenceFunctions';
import { addCategory, editCategory } from './components/utils/SettingFunctions';
import { getDate } from './components/utils/date';

class App extends Component {
  state = {
    user: {
      id: null,
      username: '',
      email: ''
    },
    incomes: {
      data: [],
      incomeCategories: [],
    },
    expences: {
      data: [],
      expenceCategories: [],
      paymentMethods: []
    }
  }
  
  async componentDidMount(){
    try {
      const jwt = localStorage.getItem('userToken');
      const user = jwt_decode(jwt);
      await this.setState({user}); 
      localStorage.setItem('dateRange', ""); 
      const{ startDate, endDate } = getDate();
      this.getData( startDate, endDate );
    } catch (error) {}
  }

  getData = async(startDate, endDate) => {
    const {user} = this.state;
    const balance = await getBalance(user, startDate, endDate);
    const incomes = {...this.state.incomes};
    const expences = {...this.state.expences};
    incomes.data = balance.data.incomes;
    expences.data = balance.data.expences;
    incomes.incomeCategories = balance.data.incomeCategories;
    expences.expenceCategories = balance.data.expenceCategories;
    expences.paymentMethods = balance.data.paymentMethods;
    this.setState({incomes, expences});
  }

  handleAddIncome = async (data) => {
    const income = await addIncome(this.state.user, data);

    if(income.status === 200){
      alert(`Pomyślnie dodano przychód!`);
      const{ startDate, endDate } = getDate();
      this.getData( startDate, endDate );
    } else {
      alert(`Wystąpił błąd! Status: ${income.status}`);
    }
  }

  handleAddExpence = async (data) => {
    const expence = await addExpence(this.state.user, data);

    if(expence.status === 200){
      alert(`Pomyślnie dodano wydatek!`);
      const{ startDate, endDate } = getDate();
      this.getData( startDate, endDate );
    } else {
      alert(`Wystąpił błąd! Status: ${expence.status}`);
    }
  }

  handleBalanceEdit = async (event, newState, prevState) => {
    event.preventDefault();
    const { formType } = newState;
    const dataState = { ...this.state[formType] };
    const data = [...this.state[formType].data];
    const index = data.indexOf(prevState);
    dataState.data[index] = newState;
    this.setState({ [formType]: dataState });

    await editBalance(this.state.user, newState);
  }

  handleBalanceDelete = async (data, type) => {
    const dataForFiltration = { ...this.state[type] };
    const filteredData = dataForFiltration.data.filter(toDelete => toDelete !== data);
    dataForFiltration.data = filteredData;
    this.setState({ [type]: dataForFiltration });

    await deleteBalance(data, type);
  }

  handleSettingsChange = async (settings) => {
    const { categoriesType, formType, newCategory, oldCategory, transferCategory } = settings
    const subState = this.findCategoriesType(categoriesType);
    const categories = { ...this.state[subState] };
    let dbResponse;

    if (formType === 'add') {
      dbResponse =  await this.handleAdd(settings);

      const id = dbResponse.data[0];
      const category = { id: id, name: newCategory };
      categories[categoriesType].push(category);      
    }
    else if (formType === 'edit') {
      dbResponse =  await this.handleEdit(settings)
      const categoriesName = categories[categoriesType].map(category => category.name);
      const categoryId = categories[categoriesType].filter(category => category.name === oldCategory);
      const id = categoriesName.indexOf(oldCategory)
      categories[categoriesType][id] = { id: categoryId[0].id, name: newCategory };
    }
    else if (formType === 'delete') {
      //categories[categoriesType] = categories[categoriesType].filter(category => category.name !== oldCategory);
      this.handleDelete(settings)
    }
    this.setState({ [subState]: categories });
  }

  findCategoriesType = (categoriesType) => {
    if (categoriesType === 'incomeCategories') return 'incomes'
    else if (categoriesType === 'expenceCategories' || categoriesType === 'paymentMethods') return 'expences'
  }

  getId = (table) => {
    return Math.max(...table.map(element => element.id)) + 1;
  }

  handleAdd = async (settings) => {
    const { newCategory, categoriesType } = settings;
    return await addCategory(this.state.user, newCategory, categoriesType);
  }

  handleEdit = async (settings) => {
    const {newCategory, oldCategory, categoriesType} = settings;
    return await editCategory(this.state.user, newCategory, oldCategory, categoriesType);
  }

  handleDelete = (settings) => {
    console.log("Serwer side work", settings);
  }

  render() {
    const { incomes, expences, user } = this.state;
    return (
      <React.Fragment>
        <Header />
        <NavBar user={user}/>
        <div className="container">
          <Switch>
            <Route path="/login" component={Login}/>
            <Route path="/register" component={Register}/>
            <PrivateRoute path="/addIncome" render={() => <IncomeForm
                addIncome={this.handleAddIncome}
                categories={incomes.incomeCategories}
              />} 
            />
            <PrivateRoute path="/addExpence" render={() => <ExpenceForm
              addExpence={this.handleAddExpence}
              categories={expences.expenceCategories}
              paymentMethods={expences.paymentMethods}
            />} />
            <PrivateRoute path="/balanceViewer"
              render={() => <BalanceViewer 
                  incomes={incomes}
                  expences={expences}
                  getData={this.getData}
                  onBalanceEdit={this.handleBalanceEdit}
                  onBalanceDelete={this.handleBalanceDelete} />}
              />
            <PrivateRoute path="/settings"
              render={() => <Settings
                incomes={incomes}
                expences={expences}
                onSettingsChange={this.handleSettingsChange}
              />} />
          </Switch>
        </div>
        <Footer />
      </React.Fragment>
    );
  }
}

export default App;