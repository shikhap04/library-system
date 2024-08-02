const express = require('express');
const cors = require('cors');

const ResourceCommands = require('./Command/ResourcesCommands');
const EmployeeCommands = require('./Command/UserCommands');
const AccountCommands = require('./Command/AccountCommands');
const EventCommands = require('./Command/EventCommands');
const moment = require('moment');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());


app.get('/employees/all', async (req, res) => {
  try {
    const AllEmployees = await EmployeeCommands.getAllUsers();
    res.status(200).attachmentjson(AllEmployees);
    console.log("trying to fetch employees")
  } catch (error) {
    console.log('ISSUE IN APP.GET')
    res.status(500).json({ error: 'Failed to fetch employees' });
  }
});




app.get('/resources/all', async (req, res) => {
  try {
    const AllResources = await ResourceCommands.getAllResources();
    res.status(200).json(AllResources);
    //console.log('Resources: ', resources);
    //console.log('trying to fetch resources')
  } catch (error) {
    console.log('issues with sending');
    res.status(500).json({ error: 'Failed to fetch resources' });
  }
});

app.post('/resources/search', async (req, res) => {
  const {field, query} = req.body;
  try {
    console.log('server check search', field, typeof(field), query, typeof(query));
    const filteredResources = await ResourceCommands.getResource(field, query);
    res.status(201).json(filteredResources);
  }
  catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to fetch resources' });
  }
});

app.post('/resources/add', async(req, res) => {
  const newResource = req.body;
  console.log(newResource);
  try {
    const resourcedAdded = await ResourceCommands.addResource(newResource);
    if (resourcedAdded) {
      res.sendStatus(201);
    }
    else {
      res.status(401).json({error: 'error in adding try'});
    }

  } catch (error) {
    console.log('error in server adding', error);
    res.status(500).json({error: 'failed to add in server'});
  }
});

app.put('/resources/update/:resource_id', async (req, res) => {
  const { resource_id } = req.params;
  const updatedInfo = req.body;
  console.log('id:', resource_id, typeof(resource_id));
  console.log('updated info', updatedInfo);
  try {
    const updatedResource = await ResourceCommands.updateResource(resource_id, updatedInfo);
    if (updatedResource) {
      res.sendStatus(200);
    } else {
      res.status(401).json({error: 'failed in try of server'});
    }
  } catch (error) {
    console.log('error in server', error);
    res.status(500).json({error: 'error in server'})
  }
});

app.delete('/resources/delete/:resource_id', async (req, res) => {
  const { resource_id } = req.params;
  console.log('id:', resource_id, typeof(resource_id));
  try {
    const deletedResource = await ResourceCommands.deleteResource(resource_id);
    if (deletedResource) {
      res.sendStatus(200);
    } else {
      res.status(401).json({error: 'failed in try of server'});
    }
  } catch (error) {
    console.log('error in server', error);
    res.status(500).json({error: 'error in server'})
  }
});



app.post('/login/validate', async (req, res) => {
  const {username, password} = req.body;
  try {
    const validAccount = await AccountCommands.validateAccount(username, password);
    if (validAccount) {
      console.log(validAccount)
      res.status(200).json(validAccount);
      console.log('success log in sent in server!')
    } else {
      res.status(401).json({error: 'Wrong username or password! in server'});
      console.log('incorrect log in in server!')
    }
  }
  catch (error) {
    console.log('error in server', error);
    res.status(500).json({ error: 'Failed to login. Check server' });
  }
});


app.post('/login/createAccount', async (req, res) => {
  const {username, password, accountLevel} = req.body;
  try {
    const accountAdded = await AccountCommands.createAccount( username, password, accountLevel);
    if (accountAdded) {
      //console.log(accountAdded)
      res.status(200).json({accountAdded});
      console.log('success new account sent in server!')
    } else {
      res.status(409).json({error: 'failed to create account. user with same username already exists'});
      console.log('incorrect new account in server!')
    }
  } catch (error) {
    console.log('error in server:', error);
    res.status(500).json({ error: 'Failed to create account. Check server' });
  }
});

app.delete('/login/delete', async (req, res) => {
  const userDelete = req.body.userDelete;
  console.log('delete in server :', userDelete, typeof(userDelete));
  try {
    const deletedAccount = await AccountCommands.deleteAccount(userDelete);
    if (deletedAccount) {
      res.sendStatus(200);
      console.log('deleted successfully')
    } else {
      res.status(401).json({error: 'failed in try of server delete'});
    }
  } catch (error) {
    console.log('error in server', error);
    res.status(500).json({error: 'error in server'})
  }
});


app.post('/calendar/events', async (req, res) => {
  const { isAdmin } = req.body;
  try {
    const allEvents = await EventCommands.getAllEvents(isAdmin);
    res.status(200).json(allEvents);
  } catch (error) {
    console.log('error in server getting events', error)
    res.status(500).json({error: 'error in server'})
  }
});

app.post('/calendar/event/ID', async(req, res) => {
  const {event_id} = req.body;
  try {
    const event = await EventCommands.getEvent(event_id);
    res.status(200).json(event);
  } catch (error) {
    console.log('error in server getting event with ',event_id, error)
    res.status(500).json({error: 'error in server'})
  }
});

app.post('/calendar/event/add', async(req, res) => {
  const newEvent = req.body;
  console.log(newEvent);
  try {
    const eventAdded = await EventCommands.addEvent(newEvent);
    if (eventAdded) {
      res.sendStatus(201);
    }
    else {
      res.status(401).json({error: 'error in adding try'});
    }

  } catch (error) {
    console.log('error in server adding', error);
    res.status(500).json({error: 'failed to add in server'});
  }
});

app.put('/calendar/event/update/:event_id', async (req, res) => {
  const { event_id } = req.params;
  const updatedInfo = req.body;
  console.log('id:', event_id, typeof(event_id));
  console.log('updated info', updatedInfo);

  const formattedStart = moment(updatedInfo.startTime).format('YYYY-MM-DD HH:mm:ss');
  const formattedEnd = moment(updatedInfo.endTime).format('YYYY-MM-DD HH:mm:ss');

  updatedInfo.startTime = formattedStart;
  updatedInfo.endTime = formattedEnd;
  console.log('approved: ', updatedInfo.approved);
  try {
    const updatedEvent = await EventCommands.updateEvent(event_id, updatedInfo);
    if (updatedEvent) {
      res.sendStatus(200);
    } else {
      res.status(401).json({error: 'failed in try of server'});
    }
  } catch (error) {
    console.log('error in server', error);
    res.status(500).json({error: 'error in server'})
  }
});

app.delete('/calendar/event/delete/:event_id', async (req, res) => {
  const { event_id } = req.params;
  console.log('id:', event_id, typeof(event_id));
  try {
    const deletedEvent = await EventCommands.deleteEvent(event_id);
    if (deletedEvent) {
      res.sendStatus(200);
    } else {
      res.status(401).json({error: 'failed in try of server'});
    }
  } catch (error) {
    console.log('error in server', error);
    res.status(500).json({error: 'error in server'})
  }
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});




//https://zapier.com/blog/how-to-connect-database-mysql/
// const config = require('./config')
// const mysql = require('mysql2');
// const express = require('express');
// const application = express();
// const port = 3000;

// const express = require('express');
// const application = express();
// const port = 3000;

// // create a new MySQL connection
// const connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: 'password',
//   database: 'librarysystem'
// });
// // connect to the MySQL database
// connection.connect((error)=>{
//   if(error){
//     console.error('Error connecting to MySQL database:', error);
//   }else{
//     console.log('Connected to MySQL database!');
//   }
// });

// const newEmployee = {user_id : 1, user_name: 'employee1', pass_word: 'pass1'};
// connection.query('SELECT user_id, user_name, pass_word accountLevel FROM username_password', function (err, result, fields) {
//   if (err) {
//   console.error('Error inserting data:', err);
//   return;
//   }
//   application.get('/', (req, res) => {
//     res.send(result)
//    })
//  });


//  application.listen(port, () => {
//   console.log('example app listening on port ${port}')
//  })

 
// // close the MySQL connection
// connection.end();