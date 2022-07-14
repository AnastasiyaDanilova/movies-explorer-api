const router = require('express').Router();
const { getUserInfo, updateProfile } = require('../controllers/userControllers');
const { userPostValidator } = require('../middlewares/validator');

router.get('/me', getUserInfo);

router.patch('/me', userPostValidator, updateProfile);

module.exports = router;
