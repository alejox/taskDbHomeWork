const { app } = require('./app');
const { db } = require('./utils/database.util');

//models

//utils

db.authenticate()
  .then(() => console.log('db authenticate'))
  .catch((err) => console.log(err));

db.sync()
  .then(() => console.log('db sync'))
  .catch((err) => console.log(err));

app.listen(4000, () => {
  console.log('express running');
});
