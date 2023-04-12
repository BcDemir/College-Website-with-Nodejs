var mongoose = require('mongoose'), User = mongoose.model('User'), Subject = mongoose.model('Subject');
var fs = require('fs');

module.exports = {
    GetAll: async function(req,res){
      console.log('all the movie list:');
      const result = await Subject.find({});
      res.render('programselection.ejs', {allsubjects:result});
    },
    GetAllStudents: async function(req,res){
      console.log('all the movie list:');
      const result = await User.find({});
      res.render('studentdetails.ejs', {allusers:result});
    },
    GetByCourse: async function(req,res){
      const search_course = req.body.coursename;
      console.log(search_course);

      const result = await User.find({"coursename":search_course});
      res.render('studentdetails.ejs', {allusers:result});
    },
    RegisterUser: async function(req,res){
        console.log("inside controller function");
        var newUser = req.body;

        var counter = fs.readFileSync('../counter.txt', 'utf8');
        console.log("first counter "+counter);

        // note to self, can be improved by adding a line for automated student number
        // and isStudent boolean so tutors can login differently
        newStudent={
            "username" : newUser.username,
            "fullname" : newUser.fullname,
            "contact" : newUser.contact,
            "email" : newUser.email,
            "password" : newUser.password,
            "studentno" : counter + "s"
        }
        console.log(newStudent);

        counter++;
        console.log("second counter "+counter);
        var writefile = counter.toString();

        fs.writeFile("../counter.txt", writefile, 'utf8', function (err) {
          if (err) throw err;
          console.log('Saved!'+writefile);
        });

        try {
            User.create(newStudent);
          } catch (error) {
            console.error(error);
            // Expected output: ReferenceError: nonExistentFunction is not defined
            // (Note: the exact output may be browser-dependent)
          }

          res.setHeader('Content-type', 'text/html');
          res.write(newUser.username+" registered successfully! <a href='/getallstudents'>Click here to see student database</a>");
          res.end();

    },
    RegisterCourse: async function(req,res){
      console.log("inside controller function");
      var newCourse = req.body;

      newCourse={
          "coursename" : req.body.coursename,
          "coursesection" : req.body.coursesection,
          "coursetime" :req.body.coursetime,
          "coursefee" :req.body.coursefee
      }
      console.log(newCourse);

      try {
        Subject.create(newCourse);
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
          "username":req.body.username,
          "password":req.body.password
      }

      const query = { "username": req.body.username };
      const getStudent = await User.findOne(query);

      if(getStudent != null){
        if(req.body.password==getStudent.password){
          // can send the username data to ejs from here then can use it to update
          res.setHeader('Content-type', 'text/html');
          res.write("Login successfull! <a href='/getallstudents'>Click here</a>");
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
    ViewStudentSubjects: async function(req,res){
      console.log("inside view function");
      const {username} = req.body;
      User.find({username}, function(err, results){
          if(err) throw err;
          res.render('/views/studentdetails.ejs', {allsubjects:results});
      });
    },
    GetStudentInfo: async function(req,res){
      console.log(req.body.coursename);
      const course_name_fr_register = req.body.coursename;
      res.render('updatestd.ejs',{coursename:course_name_fr_register});
    },
    UpdateStudentInfo: async function(req,res){
      // This is an update method. It updates student's coursename info
      // using the data from the ejs file
      const username_name_fr_register = req.body.username;
      const course_name_fr_register = req.body.coursename;

      const filter = { username: username_name_fr_register };

      const updateDoc = {
        $set: {coursename: course_name_fr_register},
      };

      const getStudent = await User.updateOne(filter,updateDoc);

      // End register successfully
      res.setHeader('Content-type', 'text/html');
      res.write("You are registered to "+ course_name_fr_register +". Congrats! <a href='/'>Click here</a>");
      res.end();
    },
    StudentToBeChanged: async function(req,res){
      // This method sends the old user info to edit page so it can be used to update user details
      const username_to__be_changed = req.body.username;
      res.render('edit.ejs',{old_user:username_to__be_changed});
    },
    EditStudentInfo: async function(req,res){
      // This is an update method. It updates student's details
      // using the data from the edit ejs file
      const new_student_data = req.body;
      const old_user = new_student_data.old_user;

      const query = { "username": old_user };
      const old_student = await User.findOne(query);

      var counter = fs.readFileSync('../counter.txt', 'utf8');

      const filter = { username: old_user };
      console.log(old_user);

      // new students info
      const updateDoc = {
        $set: {"username" : new_student_data.username,
              "fullname" : new_student_data.fullname,
              "contact" : new_student_data.contact,
              "email" : new_student_data.email,
              "password" : new_student_data.password,
              "coursename" : old_student.coursename,
              "studentno" : counter + "s"
              }
    };

      counter++;
      console.log("second counter "+counter);
      var writefile = counter.toString();

      fs.writeFile("../counter.txt", writefile, 'utf8', function (err) {
        if (err) throw err;
        console.log('Saved!'+writefile);
      });

      const getStudent = await User.updateOne(filter,updateDoc);

      // End register successfully
      res.setHeader('Content-type', 'text/html');
      res.write("Student "+ old_user +" info is updated. Congrats! <a href='/'>Click here</a>");
      res.end();
    },
    DeleteStudent: async function(req,res){
      // This method delete the student from the database
      const student_to_delete = req.body;
      
      const query = { username: student_to_delete.usernameToDelete };
      const result = await User.deleteOne(query);

      if (result.deletedCount === 1) {

        res.setHeader('Content-type', 'text/html');
        res.write(student_to_delete.usernameToDelete + "'s info is deleted from the database. <a href='/'>Click here</a>");
        res.end();

      } else {

        res.setHeader('Content-type', 'text/html');
        res.write("User not found in the database <a href='/'>To home page</a>");
        res.end();

      }

    }


}