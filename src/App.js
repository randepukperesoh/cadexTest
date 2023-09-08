import { useState, useEffect } from 'react';
import './App.css';
import MyCanvas from './components/MyCanvas/MyCanvas';

function App() {

  const [numberSegments , setNumberSegments] = useState(6);
  const [radius , setRadius] = useState(4);
  const [height , setHeight] = useState(5);
  const [arrPeaks, setArrPeaks] = useState(false);
  
  useEffect(()=>{
    console.log(`http://localhost:3001/triangulation?radius=${radius}&numberSegments=${numberSegments}`)
    fetch(`http://localhost:3001/triangulation?radius=${radius}&numberSegments=${numberSegments}`)
    .then(data => data.json())
    .then(data => setArrPeaks(data))
  },[numberSegments,radius,height])

  return (
    <div className="App">
      {arrPeaks ? <MyCanvas height={height} arrPeaks={arrPeaks} /> : null}
      <div className='optionsMenu'>
        <div><div>количество делений</div><input onChange={(e) => setNumberSegments(Number(e.target.value))} type='range' min={3} max={64} defaultValue={16}/></div>
        <div><div>радиус</div><input onChange={(e) => setRadius(Number(e.target.value))} type='range' min={1} max={20} defaultValue={4}/></div>
        <div><div>высота</div><input onChange={(e) => setHeight(Number(e.target.value))} type='range' min={1} max={20} defaultValue={5}/></div>
      </div>
    </div>
  );
}

export default App;
