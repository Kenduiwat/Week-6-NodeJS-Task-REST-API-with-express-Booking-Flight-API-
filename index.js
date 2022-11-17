const express = require("express");
const { json } = require("express");
const { Flights }  =require("./models/Flight");
//const flights = require("./controllers/flightController");
//const models = require("./models/Flight");
//const routes = require("./routes/flightRoute");

const app = express();

app.use(json());

//uncomment this to use controller and routes
//app.use("/", routes);

//just some random tinkering to make sure id is unique
const idNum = []
//create flights
app.post('/api/flights', async (req, res) => {
  try{
    const {title, time, price, date} = await req.body
    const newFlight = {
      id: idNum.length,
      title: title,
      time: time,
      price: price,
      date: date
  }
  Flights.push(newFlight);
  idNum.push(idNum.length)
  res.status(200).json({
    message: "flight booked successfully",
    flight: newFlight
  })
} catch (err){
  res.status(500).json({
    message: err.message
  })
}


})
//get all flights
app.get('/api/flights', async  (req, res) =>{
  try{
    const flights = Flights;
    res.status(200).json({
      message:"Here are all the flights",
      flights: flights
    })
  } catch(err) {
    res.status(500).json({
      message: err.message
    })
  }
})
//get single flight by id
app.get('/api/flights/:id', async (req, res) => {
  try {
    let id = req.params.id;
    const flight = await Flights.find((flight) => {
      return flight.id === parseInt(id)
    })
    if (flight){
      res.status(200).json({
        message: "Flight info",
        flight: flight
      })
    }else {
      res.status(500).json({
        message: "Flight not found"
      })
    }
  }catch(err) {
    res.status(500).json({
      message: err.message
    })
  }
})
//update flight by id
app.put('/api/flights/:id', async (req, res) => {
  try {
    let id = req.params.id;

    const flight = await Flights.find((flight) => {
      return flight.id === parseInt(id)
    })
    if (flight){
      const { title, time, price, date} = await req.body;
      flight.title = title
      flight.time = time
      flight.price = price
      flight.date = date
      res.status(200).json({
        message: "Flight updated",
        flight: flight
      })
    }else {
      res.status(500).json({
        message: "Flight not found"
      })
    }
  }catch(err) {
    res.status(500).json({
      message: err.message
    })
  }
})
//delete flight
app.delete('/api/flights/:id', async (req, res) => {
  try {
    let id = req.params.id;
    const flight = await Flights.find((flight) => {
      return flight.id === parseInt(id)
    })
    if (flight){
      Flights.splice(Flights.indexOf(flight), 1)
      res.status(200).json({
        message: "Flight deleted",
        // flight: flight
      })
    }else {
      res.status(500).json({
        message: "Flight not found"
      })
    }
  }catch(err) {
    res.status(500).json({
      message: err.message
    })
  }
})
//get all flights
app.get('/', async  (req, res) =>{
  try{
    res.status(200).json({
      message:"Here are all the api call",
      api: "/api/flights"
    })
  } catch(err) {
    res.status(500).json({
      message: err.message
    })
  }
})

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
