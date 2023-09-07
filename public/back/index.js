import express from "express";

const PORT = process.env.PORT || 3001;
const app = express();

app.listen(PORT, () => console.log(`server started on port ${PORT}`));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
app.get('/triangulation', (req, res) => {
    const radius = req.query.radius;
    const numberSegments = req.query.numberSegments;
    let grad = 360 / numberSegments;
    let arrPeaks = [];

    for (let i = 0; i < 360; i += grad) {
        let radians = i * Math.PI / 180;
        arrPeaks.push({
          x: 0 + radius * Math.cos(radians),
          y: 0 + radius * Math.sin(radians),
          z: 0
        });
  }
  res.send(arrPeaks)
})