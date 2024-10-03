import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../employees-list/employees-list';
import EmployeesAddForm from '../employees-add-form/employees-add-form';

import './app.css';

function App() {

  const data = [
    { name: 'Ivan',
      surname: 'Ivanov',
      salary: 1000,
      increase: true
    },
    { name: 'Alex',
      surname: 'Smith',
      salary: 2000,
      increase: false
    },
    { name: 'Andrey',
      surname: 'Semenov',
      salary: 2500,
      increase: true
    }
  ];

  return (
    <div className="app">
        <AppInfo />

        <div className="search-panel">
            <SearchPanel/>
            <AppFilter/>
        </div>
        
        <EmployeesList data={data}/>
        <EmployeesAddForm/>
    </div>
  );
}

export default App;
