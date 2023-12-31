const mysql = require('mysql2'); 
const inquirer = require('inquirer');

// creating a connection to the mysql db 
const connection = mysql.createConnection({
    host: '127.0.0.1', 
    port: 3306,
    user: 'root',
    database: 'employee_db'
});

// connecting to db
connection.connect((err) => {
    if (err) throw err; 
    console.log('Connected to MySQL Database');
});

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
            inquirer
              .prompt([
                {
                  type: 'input',
                  name: 'firstName',
                  message: "Enter the employee's first name:",
                },
                {
                  type: 'input',
                  name: 'lastName',
                  message: "Enter the employee's last name:",
                },
                {
                  type: 'input',
                  name: 'roleId',
                  message: "Enter the employee's role ID:",
                },
                {
                  type: 'input',
                  name: 'managerId',
                  message: "Enter the employee's manager ID (if applicable, or leave empty):",
                },
              ])
              .then((employee) => {
                addEmployee(employee.firstName, employee.lastName, employee.roleId, employee.managerId).then(() => {
                  console.log('Employee added successfully!');
                  start();
                });
              });
            break;
      
          case 'Update an employee role':
            inquirer
            .prompt([
              {
                type: 'input',
                name: 'employeeId',
                message: "Enter the employee's ID you want to update:",
              },
              {
                type: 'input',
                name: 'newRoleId',
                message: 'Enter the new role ID for the employee:',
              },
            ])
            .then((employeeUpdate) => {
              updateEmployeeRole(employeeUpdate.employeeId, employeeUpdate.newRoleId).then(() => {
                console.log('Employee role updated successfully!');
                start();
              });
            });
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

   