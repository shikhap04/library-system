# library-system

## Set Up Instructions
This project was completed using a Windows system.

### Code Set Up
First install Node.js and npm from [here](https://nodejs.org/en/download/package-manager)

Download code needed from [GitHub](https://github.com/shikhap04/library-system)

Then run the following command in project directory to install
```
npm install
```

### Database Set Up
Download MySQL from [here](https://dev.mysql.com/downloads/installer/)

***When creating database ensure that the username is "root" and password is "password"***

Run the following commands to set up database in MySQL Workbench

```
DROP DATABASE IF EXISTS `librarysystem`;
CREATE DATABASE `librarysystem`;
USE `librarysystem`;
```

### Accounts table
***The first admininstrator account will be inserted below, username: ``user`` and pasword is ``password1``

```
CREATE TABLE accounts (
	user_id varchar(36),
    user_name varchar(50) NOT NULL,
    pass_word varchar(72) NOT NULL, # will use hashing once accounts are created through front end
    accountLevel INT NOT NULL, # 1 is member, 2 is employee, 3 is admin
    PRIMARY KEY (user_ID) # each user is identified by their unique ID
);
INSERT INTO accounts VALUES('a55bd81e-64dc-41c7-abd8-c9891dbd30d5', 'user1', '$2b$10$i.NMbbyA8xPyUS9ZdCP4TeMd4/l6StjB.sGPUmbeENtWSPmKUWNE.', 3);
```

### Resources table
```
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
```

### Checkout table
```
CREATE TABLE checkouts
(
	user_id varchar(255) NOT NULL,		
    resource_id INT NOT NULL,
    checkout_date DATE NOT NULL,
    due_date DATE NOT NULL,
    user_has_book BOOLEAN NOT NULL
);
```

### Events table
```
CREATE TABLE events
(
    event_id INT NOT NULL,
    event_name VARCHAR(100) NOT NULL,
    event_desc VARCHAR(1000),
    startTime DATETIME NOT NULL,
    endTime DATETIME NOT NULL,
    approved BOOL NOT NULL,
    spotsTotal INT NOT NULL,
    spotsLeft INT NOT NULL,
    PRIMARY KEY (event_id) # each event is identified by their unique ID
);

```

### Event RSVP table
```
CREATE TABLE eventRSVP (
	event_id INT NOT NULL,
    user_id varchar(36),
    numSpots INT NOT NULL
);
```


## Running Code
Go to parent directory of the program and run commnad to concurrently run backend and front end
```
npm run dev
```

If this does not work use command ``npm start`` to start the front-end and command ``npm server`` to run backend

Go to [Local Host](http://localhost:3000/) to visit website


## References
[Events Calendar](https://www.npmjs.com/package/react-big-calendar)
[Connecting Database](https://zapier.com/blog/how-to-connect-database-mysql/)
[Using Express and Node Tutorial](https://www.youtube.com/watch?v=Uh2JCSUjA_E)
