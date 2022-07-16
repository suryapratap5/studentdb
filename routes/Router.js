const express = require('express');
const signinController = require('../Controllers/signinController');
const signupController = require('../Controllers/signupController');
const studentController = require('../Controllers/Student/studentController');
const authenticateUser = require('../middlewares/authenticateUser');

const router = express.Router();


router.post('/signup', signupController.signup);

router.post('/signin', signinController.signin);

router.get('/fetchStudents', authenticateUser, studentController.fetchStudent);

router.post('/addStudent', authenticateUser, studentController.addStudent);

router.put('/updateStudent/:id', authenticateUser, studentController.updateStudent);

router.delete('/deleteStudent/:id', authenticateUser, studentController.deleteStudent);



module.exports = router;