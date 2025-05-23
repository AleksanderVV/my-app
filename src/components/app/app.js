import { Component } from 'react';

import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../employees-list/employees-list';
import EmployeesAddForm from '../employees-add-form/employees-add-form';

import './app.scss';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        { name: 'Ivan',
          surname: 'Ivanov',
          salary: 1000,
          increase: true,
          rise: true,
          id: 1
        },
        { name: 'Alex',
          surname: 'Smith',
          salary: 2000,
          increase: false,
          rise: false,
          id: 2
        },
        { name: 'Andrey',
          surname: 'Semenov',
          salary: 2500,
          increase: false,
          rise: false,
          id: 3
        },
        { name: 'dfdf',
          surname: 'dfdf',
          salary: 2500,
          increase: false,
          rise: false,
          id: 4
        }
      ],
      term: '',
      filter: 'all'
    }
    this.maxId = 4;
  }

  deleteItem = (id) => {
    this.setState(({data}) => {
      return {
        data: data.filter(i => i.id !== id)
      }
       
    })
  }

  addItem = (name, salary) => {
    const newItem = {
      name,
      salary,
      increase: false,
      rise: false,
      id: this.maxId++
    }

    this.setState(({data}) => {
      const newArr = [...data,newItem];

      return {
        data: newArr
      }
    })
  }

  onToggleProp = (id, prop) => {
    this.setState(({data}) => ({
      data: data.map(item => {
        if (item.id === id ) return {...item, [prop]: !item[prop]}
        
        return item;
      })
    }))
  }

  searchEmp = (items, term) => {
    if (term.length === 0) { return items }

    return items.filter(item => {
      return item.name.indexOf(term) > -1 || item.surname.indexOf(term) > -1
    })
  }

  onUpdateSearch = (term) => {
    this.setState({term});
  }

  filterPost = (items, filter) => {
    switch (filter) {
      case 'rise':
        return items.filter(item => item.rise);
      case 'moreThen2000':
        return items.filter(item => item.salary > 2000);
      default:
        return items
    }
  }

  onFilterSelect = (filter) => {
    this.setState({filter});
  }

  render() {
    const {data, term, filter} = this.state;
    const employees = data.length;
    const increases = data.filter(item => item.increase).length;
    const visibleData = this.filterPost(this.searchEmp(data, term), filter);

    return (
      <div className="app">
          <AppInfo 
            employees={employees}
            increases={increases}/>
  
          <div className="search-panel">
              <SearchPanel
                onUpdateSearch={this.onUpdateSearch}/>
              <AppFilter
                filter={filter}
                onFilterSelect={this.onFilterSelect}/>
          </div>
          
          <EmployeesList 
            data={visibleData}
            onDelete={this.deleteItem}
            onToggleProp={this.onToggleProp}/>
          <EmployeesAddForm 
            onAdd={this.addItem}/>
      </div>
    );
  }
}

export default App;
