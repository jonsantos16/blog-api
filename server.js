const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const {BlogPosts} = require('./models');
const jsonParser = bodyParser.json();
const app = express();

app.use(morgan('common'));

BlogPosts.create('Coolness & Technology', 'Tech people like Santos are naturally pretty cool.', 'Angel Fong');
BlogPosts.create('Importance of Drinking Water', 'About 591mL', 'Jonathan Santos');

app.get('/blog-posts', (req, res) => {
    res.json(BlogPosts.get())
});

app.listen(process.env.PORT || 8080, () => {
    console.log(`Your app is listening on port ${process.env.PORT || 8080}`);
  });
