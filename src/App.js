import TheBtn from './components/thebtn';
import { useEffect, useState } from 'react';
import { useSpring, animated} from '@react-spring/web';
import './App.css';

const center = computeCenter([window.innerHeight, window.innerWidth])
function computeCenter(windowYX) {
  let r = 0;
  windowYX[1] > windowYX[0] ?
    r = windowYX[0] : r = windowYX[1];
  const center = (r / 2)
  return center;
}
function App() {
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
  function triggerEnd() {
    setButtonOpacity({
      opacity: 0
    })
    setMessageOpacity.start({
      opacity: 1
    })
    setColor.start({
      backgroundColor: "#E9DCE4"
    })
  }
  const [messageOpacity, setMessageOpacity] = useSpring(() => ({
    opacity: 0,
    config: { duration: 7023 }
  }))
  const [buttonOpacity, setButtonOpacity] = useSpring(() => ({
    opacity: 1,
    config: { duration: 5023 }
  }))
  const [color, setColor] = useSpring(() => ({
    backgroundColor: "#dce9e1",
    config: { duration: 7023 }
  }))
  return (
    <div className={`App`}>
      <animated.div className="anim-div" style={color}>
        <animated.div id="message" style={messageOpacity}>
          Enlightened
          <p id="nice">(nice)</p>
        </animated.div>
        <animated.div style={buttonOpacity}>
          <TheBtn
            triggerEnd={triggerEnd}
            center={center}
            mouseX={mousePos['x']}
            mouseY={mousePos['y']} />
        </animated.div>
      </animated.div>
    </div>
  );
}

export default App;
