const mongoose = require('mongoose');
const Poll = require('./models/poll');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const url = require('url');
const querystring = require('querystring');
const PORT = process.env.PORT || 8000;


app.set('view-engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(express.static( '__dirname' ) );
app.use(bodyParser.json());
app.use(express.json());
app.use("/views", express.static(__dirname + './views'));
app.use(express.static('./views'));


app.get('/', async(req, res) => {
  res.render('poll.ejs')
})
app.get("/showpoll", async(req, res) => {
  console.log('TRYING TO GET POLL...')
  console.log('poll request: ' + req.query.poll);
  let poll = req.query.poll;
  pollId = poll;
  const pollSearch = await Poll.findOne({_id: poll});
  console.log('QUERY: ' + pollSearch);
  console.log('TITLE: ' + pollSearch.title)
  res.render("pollView.ejs", {
    title: pollSearch.title,
    description: pollSearch.description,
    options: pollSearch.options,
    votes: pollSearch.votes,
  })
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
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/polls', { useNewUrlParser: true});
const db = mongoose.connection;
db.on('error', (error) => console.error('DB ERROR: ' + error));

db.once('open', () => console.log('Database connected.'));
app.listen(PORT, () => console.log('listening'));
