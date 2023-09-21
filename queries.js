const connection = require('./config/connection');

// View all departments
function viewAllDepartments() {
  return connection.promise().query('SELECT * FROM department');
}

// View all roles
function viewAllRoles() {
  return connection.promise().query('SELECT * FROM role');
}

// View all employees
function viewAllEmployees() {
  return connection.promise().query('SELECT * FROM employee');
}

// Add a department
function addDepartment(name) {
  return connection.promise().query('INSERT INTO department (name) VALUES (?)', [name]);
}

// Add a role
function addRole(title, salary, departmentId) {
  return connection.promise().query('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)', [title, salary, departmentId]);
}

// Add an employee
function addEmployee(firstName, lastName, roleId, managerId) {
  return connection.promise().query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [firstName, lastName, roleId, managerId]);
}

// Update an employee role
function updateEmployeeRole(employeeId, roleId) {
  return connection.promise().query('UPDATE employee SET role_id = ? WHERE id = ?', [roleId, employeeId]);
}

module.exports = {
  viewAllDepartments,
  viewAllRoles,
  viewAllEmployees,
  addDepartment,
  addRole,
  addEmployee,
  updateEmployeeRole,
};

function start() {
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'action',
          message: 'What would you like to do?',
          choices: [
            'View all departments',
            'View all roles',
            'View all employees',
            'Add a department',
            'Add a role',
            'Add an employee',
            'Update an employee role',
            'Exit',
          ],
        },
      ])
      .then((answer) => {
        switch (answer.action) {
          case 'View all departments':
            viewAllDepartments().then((departments) => {
              console.table(departments[0]);
              start();
            });
            break;
  
          case 'View all roles':
            viewAllRoles().then((roles) => {
              console.table(roles[0]);
              start();
            });
            break;
            case 'View all employees':
                viewAllEmployees().then((employees) => {
                  console.table(employees[0]);
                  start();
                });
                break;
      
              case 'Add a department':
                inquirer
                  .prompt([
                    {
                      type: 'input',
                      name: 'name',
                      message: 'Enter the name of the department:',
                    },
                  ])
                  .then((department) => {
                    addDepartment(department.name).then(() => {
                      console.log('Department added successfully!');
                      start();
                    });
                  });
                break;
      
              case 'Add a role':
                inquirer
                  .prompt([
                    {
                      type: 'input',
                      name: 'title',
                      message: 'Enter the title of the role:',
                    },
                    {
                      type: 'input',
                      name: 'salary',
                      message: 'Enter the salary for the role:',
                    },
                    {
                      type: 'input',
                      name: 'departmentId',
                      message: 'Enter the department ID for the role:',
                    },
                  ])
                  .then((role) => {
                    addRole(role.title, role.salary, role.departmentId).then(() => {
                      console.log('Role added successfully!');
                      start();
                    });
                  });
                break;
      
              case 'Add an employee':
                
                break;
      
              case 'Update an employee role':
                // Prompt for employee and new role information and call updateEmployeeRole function
                break;
      
              case 'Exit':
                console.log('Goodbye!');
                process.exit();
      
              default:
                console.log('Invalid action');
                start();
            }
          });
      }
      
      // Start the application
      start();