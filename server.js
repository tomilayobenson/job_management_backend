const express = require('express');
const cors = require('cors')
const jobsRouter = require('./routes/jobs')
const app = express();
const port = 8080;

//use cors middleware
const corsOptions = {
    origin: '*',
    methods:['GET','POST','PUT','DELETE']
}
app.use(cors(corsOptions))

//parse JSON bodies
app.use(express.json());
app.use('/jobs',jobsRouter)

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
