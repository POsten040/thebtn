import TheBtn from './components/thebtn';
import { useEffect, useState } from 'react';
import { useSpring, animated} from '@react-spring/web';
import JSConfetti from 'js-confetti';
import './App.css';

const center = computeCenter(window.innerHeight, window.innerWidth)
function computeCenter(height, width) {
  console.log(width, height)
  let r = 0;
  width > height ?
    r = height : r = width;
  const center = (r / 2)
  console.log(center)
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
    const conf = new JSConfetti()
    conf.addConfetti({
      confettiRadius: 6,
      confettiNumber: 500,
      confettiColors: [
        '#ff0a54', '#bae51a', '#e392ce', '#92E3A7', '#fbb1bd', '#f9bec7',
      ],
    })
    setButtonOpacity({
      opacity: 0
    })
    setMessageOpacity.start({
      opacity: 1
    })
    setColor.start({
      backgroundColor: "#b07881"
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
