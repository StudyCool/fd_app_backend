const {User} = require('./models');
const express = require ('express');



const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.post('/user', async (req,res,next ) => {
          const createdUser = await User.create(req.body);
          res.send(createdUser);
   });

app.get('/user/:id', async (req,res,next ) => {

  const user = await User.findByPk(req.params.id);
  res.send(user);
});

app.patch('/user/:id', async (req,res,next ) => {

  const [updateRowsCount, rows] = await User.update (req.body, {
    where: {
      id: req.params.id,
    },
    returning: true,
  });
  if (updateRowsCount) {
    return  res.send(rows[0]) ;
  }
  res.status(404).send('Error 404. User not found.');
});

app.delete('/user/:id', async (req,res,next ) => {
  const deletedRowCount = await User.destroy ( {
                                                 where: {
                                                   id: req.params.id,
                                                 }
                                               });
  if (deletedRowCount) {
    return res.send('User has been deleted.');
  }
  res.status(404).send('Error 404. User not found.');
});

app.listen( PORT, () => console.log( `Example app listening on port ${PORT}!` ) );