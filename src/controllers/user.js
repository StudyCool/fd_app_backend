const {User} = require('../models');

const createUser = async (req,res,next ) => {
  const createdUser = await User.create(req.body);
  return res.send(createdUser);
};

const getUserById = async (req,res,next ) => {

  const user = await User.findByPk(req.params.id);
  return res.send(user);
};

const updateUserById = async (req,res,next ) => {

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
};

const deleteUserById =  async (req,res,next ) => {
  const deletedRowCount = await User.destroy ( {
                                                 where: {
                                                   id: req.params.id,
                                                 }
                                               });
  if (deletedRowCount) {
    return res.send('User has been deleted.');
  }
  res.status(404).send('Error 404. User not found.');
};

module.exports = {
  createUser,
  getUserById,
  updateUserById,
  deleteUserById,
};