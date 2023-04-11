var mongoose = require('mongoose'), User = mongoose.model('User');

module.exports = {
    RegisterUser: async function(req,res){
        console.log("inside controller function");
        var newUser = req.body;

        // note to self, can be improved by adding a line for automated student number
        // and isStudent boolean so tutors can login differently
        newUser={
            "username" : req.body.username,
            "email" : req.body.email,
            "password" :req.body.password
        }
        console.log(newUser);

        try {
            User.create(newUser);
          } catch (error) {
            console.error(error);
            // Expected output: ReferenceError: nonExistentFunction is not defined
            // (Note: the exact output may be browser-dependent)
          }

        res.redirect('/');

    },
    LoginUser: async function(req,res){
      console.log("inside login function");

      var newUser = req.body;

      newUser={
          "username": req.body.username,
          "password":req.body.password
      }

      const query = { "username": req.body.username };
      const getStudent = await User.findOne(query);

      if(getStudent != null){
        if(req.body.password==getStudent.password){
          res.setHeader('Content-type', 'text/html');
          res.write("Login successfull! <a href='/studentdetails'>Click here</a>");
          res.end();
        }
        else{
          res.setHeader('Content-type', 'text/html');
          res.write("Password is wrong Please retry! <a href='/login'>Click here</a>");
          res.end();
        }
      }
      else{
        res.setHeader('Content-type', 'text/html');
        res.write("Student do not exist! Please register <a href='/views/register'>Click here</a>");
        res.end();
      }
      // since this method returns the matched document, not a cursor, print it directly
      console.log(getStudent);

    },
    ViewUser: async function(req,res){
      console.log("inside view function");
      const {username} = req.body;
      User.find({username}, function(err, results){
          if(err) throw err;
          res.render('/views/studentdetails.ejs', {allsubjects:results});
      });
    }
}