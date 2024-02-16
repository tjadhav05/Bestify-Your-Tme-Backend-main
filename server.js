const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken")
const userRoute = require("./routes/user.route");
const questionLogRoute = require("./routes/question.route");
const favouriateRouter = require("./routes/fav.route");
const scoreRouter = require("./routes/score.route");
const imageRouter = require("./routes/image.route");
const db = require("./models");
db.sequelize.sync();

// Init express
const app = express();

// enabling cors for http://localhost:4200 requests by using cors middleware
var corsOptions = {
  origin: "http://localhost:4200"
};

app.use(cors(corsOptions));

// parse requests of content-type: application/json
// parses incoming requests with JSON payloads
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

//JWT Routers checking  Adding Middleware for accesgin userID from Token
function getUserId(request, response, next) {
  if (request.url === '/api/user/login'
    || request.url === '/api/user/register'
    || request.url === '/api/user/forgotPassword/otp'
    || request.url === '/api/user/forgotPassword/reset') {
    next()
  } else {
    try {
      const token = request.headers['token']
      const data = jwt.verify(token, '1234566sdffdfgfdg')
      request.userId = data['id']
      next()
    } catch (ex) {
      response.status(401)
      response.send({ status: 'error', error: 'protected api' })
    }
  }
}

app.use(getUserId);

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to application." });
});

//User routes
app.use("/api/user", userRoute)

//Question Routes
app.use("/api/question", questionLogRoute)

//Favourite Routes
app.use("/api/fav", favouriateRouter)

//Score routes
app.use("/api/score", scoreRouter)

//Image Routes
app.use("/api/image", imageRouter)

//set port, listen for requests
const PORT = process.env.PORT || 8080;

//port is listening to port 8080
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});