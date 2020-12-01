const express = require("express");
const mongoose = require('mongoose');
const config = require('config');
const authRouter = require('./routes/auth.routes')

const app = express();
const PORT = config.get('serverPort');

app.use(express.json());
app.use('/auth', authRouter);


const start = async () => {
    try {
        await mongoose.connect(config.get('dbUrl'),  { useUnifiedTopology: true, useNewUrlParser: true  });
        app.listen(PORT, console.log('Server started on port', PORT));
        
        // app.get('auth', function (req, res) {
        //     res.send('<h1>hello world</h1>')
        //   })
    } catch (e) {
        console.log('start ERRORS ->', e);
    }
}

start();