import TheBtn from './components/thebtn';

import {useEffect, useState, useMemo} from 'react'; 
import './App.css';

const center = computeCenter([window.innerHeight, window.innerWidth])
function computeCenter(windowYX){
  let r = 0;
  windowYX[1]>windowYX[0]?
  r = windowYX[0]
  :
  r = windowYX[1];
  const center = (r/2)
  //const center = 3.14 * (center**2)
  return center;
}

function App() {
  // let windowSize = useWindowSize();
  const [mousePos, setMousePos] = useState({});
  useEffect(() => {
    const handleMouseMove = (event) => {
      setMousePos({ x: event.clientX, y: event.clientY })
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener(
        'mousemove',
        handleMouseMove
      );
    };
  }, []);

  return (
    <div className="App">
      <TheBtn 
      center={center} 
      mouseX={mousePos['x']} 
      mouseY={mousePos['y']}/>
    </div>
  );
}

export default App;
