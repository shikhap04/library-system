const express = require('express');
const cors = require('cors');

const ResourceCommands = require('./Command/ResourcesCommands');
const EmployeeCommands = require('./Command/UserCommands');
const AccountCommands = require('./Command/AccountCommands');
const EventCommands = require('./Command/EventCommands');
const EventRSVPCommands = require('./Command/EventRSVPCommands');
const moment = require('moment');
const CheckoutCommands = require('./Command/CheckoutCommands');

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
  const formattedStart = moment(newEvent.startTime).format('YYYY-MM-DD HH:mm:ss');
  const formattedEnd = moment(newEvent.endTime).format('YYYY-MM-DD HH:mm:ss');

  newEvent.startTime = formattedStart;
  newEvent.endTime = formattedEnd;
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


app.post('/calendar/RSVP/add', async (req, res) => {
  const RSVP = req.body;
  
  console.log(RSVP);
  try {
    const RSVPAdded = await EventRSVPCommands.addRSVP(RSVP);
    if (RSVPAdded) {
      res.sendStatus(201);
    }
    else {
      console.log('rsvp already exists')
      res.status(401).json({error: 'RSVP exists'});
    }

  } catch (error) {
    console.log('error in server adding rsvp', error);
    res.status(500).json({error: 'failed to add rsvp in server'});
  }

});

app.post('/calendar/RSVP/delete', async(req, res) => {
  const RSVP = req.body;

  console.log(RSVP);
  try {
    const RSVPdeleted = await EventRSVPCommands.deleteRSVP(RSVP);
    if (RSVPdeleted) {
      res.sendStatus(200);
    } else {
      res.send(401).json({error: 'error in try of server'})
    }
  } catch(error) {
    console.log('error in server deleting rsvp', error);
    res.status(500).json(error);
  }
})

app.post('/calendar/RSVP/check', async(req, res) => {
  const {event_id, user_id} = req.body;

  try {
    const RSVPExists = await EventRSVPCommands.checkRSVP(event_id, user_id);
    if (RSVPExists) {
      res.status(201).json(RSVPExists[0]);
    }
    else {
      console.log('rsvp exists');
      res.status(401).json({error: 'rsvp exists'});
    }
  } catch (error) {
    console.log('error in server check rsvp', error);
    res.status(500).json({error: 'failed to check rsvp in server'});
  }
})

app.post('/resources/checkout', async(req, res) => {
  console.log('attempting checkout');
  const {userid, resourceid} = req.body;
  try {
    const resourceCheckedOut = await CheckoutCommands.checkOut(userid, resourceid);
    if (resourceCheckedOut) {
      res.status(200).json({resourceCheckedOut});
      console.log('successful checkout in server!')
    } else {
      res.status(409).json({error: 'failed to checkout. no availability'});
      console.log('no available resources to checkout')
    } 
  } catch(error) {
    console.log('error in server:', error);
    res.status(500).json({error: 'Failed to checkout. Check server'});
  }
})

app.post('/resources/return', async(req, res) => {
  const {userid, resourceid} = req.body;
  try {
    const resourceReturned = await CheckoutCommands.returnResource(userid, resourceid);
    if (resourceReturned) {
      res.status(200).json({resourceCheckedOut});
      console.log('successful return in server!')
    } else {
      res.status(409).json({error: 'failed to return. at total copies'});
      console.log('invalid return')
    } 
  } catch(error) {
    console.log('error in server:', error);
    res.status(500).json({error: 'Failed to return. Check server'});
  }
})

app.post('/account/checkouts', async (req, res) => {
  const {userid} = req.body;
  try {
    const UserCheckouts = await CheckoutCommands.getCheckedOutbyUser(userid);
    res.status(200).json(UserCheckouts);
  } catch (error) {
    console.log('issues with sending');
    res.status(500).json({ error: 'Failed to fetch resources' });
  }
});

app.get('/employee/checkouts', async(req, res) => {
  try {
    const AllCheckouts = await CheckoutCommands.getAllUnapprovedCheckouts();
    res.status(200).json(AllCheckouts);
  } catch (error) {
    console.log('issues with sending');
    res.status(500).json({ error: 'Failed to fetch checkouts' });
  }
})

app.get('/employee/returns', async(req, res) => {
  try {
    const AllReturns = await CheckoutCommands.getAllUnapprovedReturns();
    res.status(200).json(AllReturns);
  } catch (error) {
    console.log('issues with sending');
    res.status(500).json({ error: 'Failed to fetch returns' });
  }
})

app.post('/employee/checkouts/approval', async(req, res) => {
  console.log('attempting checkout approval');
  const {userid, resourceid, checkoutdate} = req.body;
  try {
    const checkoutApproved = await CheckoutCommands.approveCheckout(userid, resourceid, checkoutdate);
    if (checkoutApproved) {
      res.status(200).json({checkoutApproved});
      console.log('successful return in server!')
    } else {
      res.status(409).json({error: 'failed to approve'});
      console.log('invalid return')
    } 
  } catch(error) {
    console.log('error in server:', error);
    res.status(500).json({error: 'Failed to return. Check server'});
  }
})

app.post('/employee/returns/approval', async(req, res) => {
  const {userid, resourceid, checkoutdate} = req.body;
  try {
    const returnApproved = await CheckoutCommands.approveReturn(userid, resourceid, checkoutdate);
    if (returnApproved) {
      res.status(200).json({returnApproved});
      console.log('successful return in server!')
    } else {
      res.status(409).json({error: 'failed to approve'});
      console.log('invalid return')
    } 
  } catch(error) {
    console.log('error in server:', error);
    res.status(500).json({error: 'Failed to return. Check server'});
  }
})

app.post('/resources/checkout', async(req, res) => {
  console.log('attempting checkout');
  const {userid, resourceid} = req.body;
  try {
    const resourceCheckedOut = await CheckoutCommands.checkOut(userid, resourceid);
    if (resourceCheckedOut) {
      res.status(200).json({resourceCheckedOut});
      console.log('successful checkout in server!')
    } else {
      res.status(409).json({error: 'failed to checkout. no availability'});
      console.log('no available resources to checkout')
    } 
  } catch(error) {
    console.log('error in server:', error);
    res.status(500).json({error: 'Failed to checkout. Check server'});
  }
})

app.post('/resources/return', async(req, res) => {
  const {userid, resourceid} = req.body;
  try {
    const resourceReturned = await CheckoutCommands.returnResource(userid, resourceid);
    if (resourceReturned) {
      res.status(200).json({resourceCheckedOut});
      console.log('successful return in server!')
    } else {
      res.status(409).json({error: 'failed to return. at total copies'});
      console.log('invalid return')
    } 
  } catch(error) {
    console.log('error in server:', error);
    res.status(500).json({error: 'Failed to return. Check server'});
  }
})

app.post('/account/checkouts', async (req, res) => {
  const {userid} = req.body;
  try {
    const UserCheckouts = await CheckoutCommands.getCheckedOutbyUser(userid);
    res.status(200).json(UserCheckouts);
  } catch (error) {
    console.log('issues with sending');
    res.status(500).json({ error: 'Failed to fetch resources' });
  }
});

app.get('/employee/checkouts', async(req, res) => {
  try {
    const AllCheckouts = await CheckoutCommands.getAllUnapprovedCheckouts();
    res.status(200).json(AllCheckouts);
  } catch (error) {
    console.log('issues with sending');
    res.status(500).json({ error: 'Failed to fetch checkouts' });
  }
})

app.get('/employee/returns', async(req, res) => {
  try {
    const AllReturns = await CheckoutCommands.getAllUnapprovedReturns();
    res.status(200).json(AllReturns);
  } catch (error) {
    console.log('issues with sending');
    res.status(500).json({ error: 'Failed to fetch returns' });
  }
})

app.post('/employee/checkouts/approval', async(req, res) => {
  console.log('attempting checkout approval');
  const {userid, resourceid, checkoutdate} = req.body;
  try {
    const checkoutApproved = await CheckoutCommands.approveCheckout(userid, resourceid, checkoutdate);
    if (checkoutApproved) {
      res.status(200).json({checkoutApproved});
      console.log('successful return in server!')
    } else {
      res.status(409).json({error: 'failed to approve'});
      console.log('invalid return')
    } 
  } catch(error) {
    console.log('error in server:', error);
    res.status(500).json({error: 'Failed to return. Check server'});
  }
})

app.post('/employee/returns/approval', async(req, res) => {
  const {userid, resourceid, checkoutdate} = req.body;
  try {
    const returnApproved = await CheckoutCommands.approveReturn(userid, resourceid, checkoutdate);
    if (returnApproved) {
      res.status(200).json({returnApproved});
      console.log('successful return in server!')
    } else {
      res.status(409).json({error: 'failed to approve'});
      console.log('invalid return')
    } 
  } catch(error) {
    console.log('error in server:', error);
    res.status(500).json({error: 'Failed to return. Check server'});
  }
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
