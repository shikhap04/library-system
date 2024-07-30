# library-system

## Set Up Instructions
This project was completed using a Windows system.

### Code Set Up
First install Node.js and npm from [here]()

Download code needed from [GitHub]()

Then run the following command in project directory to install
```
npm install
```

### Database Set Up
Download MySQL from [here]()
***When creating database ensure that the username is "root" and password is "password"***

Run the following commands to set up database in MySQL Workbench

DROP DATABASE IF EXISTS `librarysystem`;
CREATE DATABASE `librarysystem`;
USE `librarysystem`;

# Accounts table
CREATE TABLE accounts (
	user_id varchar(36),
    user_name varchar(50) NOT NULL,
    pass_word varchar(72) NOT NULL, # will use hashing once accounts are created through front end
    accountLevel INT NOT NULL, # 1 is member, 2 is employee, 3 is admin
    PRIMARY KEY (user_ID) # each user is identified by their unique ID
);

# Resources table
CREATE TABLE resources
(
	resource_id INT NOT NULL,
    resource_name VARCHAR(100) NOT NULL,
    author VARCHAR(50),
    location VARCHAR(100),
    resource_description VARCHAR(1000),
    genre VARCHAR(50),
    total_copies INT NOT NULL,
    copies_available INT NOT NULL,
    resource_version VARCHAR(50), 
    resource_type VARCHAR(50) NOT NULL,
	PRIMARY KEY (resource_id) # each resource is identified by their unique ID
);


# Checkout table
CREATE TABLE checkouts
(
	user_id varchar(255) NOT NULL,		
    resource_id INT NOT NULL,
    checkout_date DATE NOT NULL,
    due_date DATE NOT NULL,
    user_has_book BOOLEAN NOT NULL
);



## Running Code
Go to parent directory of the program and run commnad to concurrently run backend and front end
```
npm run dev
```

If this does not work use command ``npm start`` to start the front-end and command ``npm server`` to run backend

Go to [Local Host](http://localhost:3000/) to visit website


