const User = require("../models/User");

const router = require("express").Router();

const CryptoJS = require("crypto-js");

router.post("/register", async (req, res) => {
    const newUser = new User({
        name :req.body.name,
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC)
            .toString(),
    });

    try {

        const savedUser = await newUser.save();
        // console.log(savedUser);
        res.status(201).json(savedUser);

    } catch (err) {
        // console.log (err);
        res.status(500).json(err);
    }

});

// login

router.post("/login", async (req, res) => {
    try {
        // console.log("yes1");
        const user = await User.findOne({ username: req.body.username });
        // console.log("yes2");

        if(!user) {return res.status(401).json("wrong credentials!");}
        const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.PASS_SEC);
        const orginalpassword = hashedPassword.toString(CryptoJS.enc.Utf8);
        if(orginalpassword !== req.body.password){ return res.status(401).json("wrong credentials!");}

        const {password, ...others}= user._doc;

        res.status(200).json({...others});

    }
    catch (err) {
        res.status(500).json(err)
    }
});

// get user

router.get("/find/:id", async (req, res) => {
    try {
      const user = await User.findOne({email:req.params.id});
      const { password, ...others } = user._doc;
      res.status(200).json(others);
    } catch (err) {
      res.status(500).json(err);
    }
  });


module.exports = router