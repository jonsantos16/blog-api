const express = require('express');
const morgan = require('morgan');

const {BlogPosts} = require('./models');
const app = express();

const blogRouter = require('./blogRouter');
app.use('/blog-posts', blogRouter);


app.use(morgan('common'));

app.listen(process.env.PORT || 8080, () => {
    console.log(`Your app is listening on port ${process.env.PORT || 8080}`);
  });

