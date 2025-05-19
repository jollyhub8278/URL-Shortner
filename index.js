const express = require("express");
const path = require("path");
const urlRoute = require('./routes/url');
const {connectToMongoDB} = require('./connect');

const app = express();
const PORT = 8001;

//routes
const URL = require('./models/url');
const staticRoute = require('./routes/staticRouter');
const userRoute = require('./routes/user');

connectToMongoDB("mongodb://localhost:27017/url-shortner")
.then(()=>console.log("MongoDb connected!"));

app.set("view engine", "ejs");
app.set('views', path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({extended: false }));//we need to use this as we are using form data

//if any request start from these addresses e.g. /url, /user etc then perform that route
app.use("/url", urlRoute);
app.use("/user", userRoute);
app.use("/", staticRoute);


app.get('/:shortId', async (req, res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
        { shortId },
        {
            $push: {
                visitHistory: {
                    timestamp: Date.now(),
                },
            },
        }
    );

    if (!entry) {
        return res.status(404).send("Short URL not found");
    }

    res.redirect(entry.redirectURL);
});


app.listen(PORT, () => console.log(`Server Started at PORT:${PORT}`));