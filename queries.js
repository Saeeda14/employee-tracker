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