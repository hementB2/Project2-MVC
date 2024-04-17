
const router = require('express').Router();
const userRoutes = require('./userRoutes');
const projectRoutes = require('./projectRoutes');


//how to access the routes for making changes to the data for e.g user routes are accessed by userRoutes.js
router.use('/users', userRoutes);
router.use('/projects', projectRoutes);

module.exports = router;
