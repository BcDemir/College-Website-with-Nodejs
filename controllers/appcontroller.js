var mongoose = require('mongoose'), User = mongoose.model('User');

module.exports = {
    RegisterUser: async function(req,res){
        console.log("inside controller function");
        var newUser = req.body;
        newUser={
            "username" : req.body.username,
            "email" : req.body.email,
            "password":req.body.password
        }
        console.log(newUser);
        // const result = await myColl.insertOne(doc);

        // User.insertOne(newUser,function(err,result){
        //     console.log("inside create function");
        //     if(err) throw err;
        //     // can redirect to success page
        //     // can check if the user exist if so direct to relogin
        //     res.redirect('../Index.html');
        // });
        try {
            User.create(newUser);
          } catch (error) {
            console.error(error);
            // Expected output: ReferenceError: nonExistentFunction is not defined
            // (Note: the exact output may be browser-dependent)
          }

        res.redirect('/');

    }
}