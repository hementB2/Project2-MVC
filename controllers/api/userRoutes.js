const router = require('express').Router();
const { User } = require('../../models');//to access the User.js 
const multer = require('multer'); // Require Multer library (for uploading a profile image)
const storage = multer.memoryStorage() //
const upload = multer({storage}); // Uploads folder destination


// is verifying if the newly created email and password fulfils requirements set up for the user.
router.post('/', async (req, res) => {
try {
const userData = await User.create(req.body);
req.session.save(() => {
req.session.user_id = userData.id;
req.session.logged_in = true;

res.status(200).json(userData);
});
} catch (err) {
res.status(400).json(err);
}
});


router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});



//will work when the user is logged in 
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

// router.patch to handle requests to update parts
// Patch used instead to update user data partially -> User can now update only user information (text) fields, only upload a profile picture, or update both
// Server to apply just these changes (instead of everything needing to be updated)

// router.patch to handle requests to update parts
// Patch used instead to update user data partially -> User can now update only user information (text) fields, only upload a profile picture, or update both
// Server to apply just those these changes (instead of everything needing to be updated)
router.patch('/:id',  upload.single("picture"), async (req, res) => {
  try {
    let userData;
    if (req.file){
    userData = await User.update({...req.body,  picture: req.file.buffer},{where:{id:req.params.id}});
  } else {
      userData = await User.update(req.body,{where:{id:req.params.id}});
    }
      res.status(200).json(userData);
  } catch (err) {
    console.log(err.message);
    res.status(400).json(err);
  }
});

module.exports = router;
