-- departments
INSERT INTO department (name) VALUES
  ('HR'),
  ('Engineering'),
  ('Sales');mysql -u your_mysql_username -p your_database_name < seeds.sql


-- roles
INSERT INTO role (title, salary, department_id) VALUES
  ('HR Manager', 60000.00, 1),
  ('Software Engineer', 80000.00, 2),
  ('Sales Representative', 50000.00, 3);

-- employees
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
  ('John', 'Doe', 1, NULL),
  ('Jane', 'Smith', 2, 1),
  ('Bob', 'Johnson', 3, 1);
