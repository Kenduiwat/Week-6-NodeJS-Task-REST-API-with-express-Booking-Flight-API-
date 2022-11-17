
const {Flights} = require('../models/Flight');

// create flight
exports.createFlight = async (req, res) => {
  try{
    const {title, time, price, date} = await req.body
    const newFlight = {
      id: Flights.length,
      title: title,
      time: time,
      price: price,
      date: date
  }
  Flights.push(newFlight);
  res.status(200).json({
    message: "flight booked successfully",
    flight: newFlight
  })
} catch (err){
  res.status(500).json({
    message: err.message
  })
}
}
// get all Flight
exports.getFlights = async  (req, res) =>{
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
}
//get single Flight
exports.getFlight = async (req, res) => {
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
}
//some random meaningless middleware
exports.continue = async (req, res, next){
  console.log('LeRoi coded this');
  next();
}
//update single user by id
exports.updateFlight = async (req, res) => {
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
}
//delete flight
exports.deleteFlight = async (req, res) => {
  try {
    let id = req.params.id;
    const flight = await Flights.find((flight) => {
      return flight.id === parseInt(id)
    })
    if (flight){
      Flights.splice(FLights.indexOf(flight), 1)
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
}
