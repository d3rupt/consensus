const mongoose = require('mongoose');
const Poll = require('./models/poll');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(express.static('./views'));


app.set('view-engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());

app.get('/', async(req, res) => {
  res.render('poll.ejs')
})
app.get("/showPoll", (req, res) => {
  res.render('pollView.ejs');
})
let pollId;
app.post("/pollId", (req, res) => {
  pollId = req.body.id;
})
app.get("/pollId", async(req, res) => {
  console.log('pollId: ' + pollId);
  let poll = await Poll.findOne({_id: pollId});
  console.log('POLL: ' + poll);
  res.json(poll);
})


app.get('/list', async(req, res) => {
  res.render('pollList.ejs')
})

app.get('/getlist', async(req, res) => {
  let pollList = await Poll.find();
  console.log(pollList);
  res.json(pollList);
})
app.post('/submitPoll', async(req, res) => {
  let poll = new Poll({
    title: req.body.title,
    description: req.body.description,
    options: req.body.options,
    votes: req.body.votes
  })
  let newPoll = await poll.save();
  res.status('200').send();
})
app.post('/editpoll', async (req, res) => {
  try {
      const updatedPoll = await Poll.findOneAndUpdate(
      {
        _id: pollId
      },
      {
       options: req.body.options,
       votes: req.body.votes
    });
    console.log('Edited poll');
    console.log(updatedPoll);
    res.status(200).send();
  } catch (err) {
    console.log(err);
  }
})
app.post("/delpoll", async (req, res) => {
  try {
    const deletedPoll = await Poll.deleteOne(
      {_id: req.body.id},
      function (err) {
        if(err) console.log(err);
        console.log("Successful deletion");
  })
}
catch (err) {
  console.log(err);
}})
mongoose.connect('mongodb://localhost/polls', { useNewUrlParser: true});
const db = mongoose.connection;
db.on('error', (error) => console.error(error));

db.once('open', () => console.log('Database connected.'));
app.listen(8000, () => console.log('listening'));
