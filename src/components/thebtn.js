import Button from 'react-bootstrap/Button';
import Popover from 'react-bootstrap/Popover';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import { useEffect, useState } from 'react';
import { useSpring, animated } from '@react-spring/web';

function computePos(pos, center) {
  if (pos > center) return (pos % 8) / 2
  if (pos < 5) return (center % 8) * 2
  if (pos < center && pos > 5) return pos + (center / 2)
}
const popover = (
  <Popover id="popover-basic">
    <Popover.Header as="h3">You are wise, but you have not gained enlightnement</Popover.Header>
    <Popover.Body>
      Keep trying
    </Popover.Body>
  </Popover>
);

const TheBtn = (props) => {
  const { mouseX, mouseY, center, triggerEnd } = props;
  const [current] = useState({ x: mouseX, y: mouseY })
  const [position] = useSpring(() => ({
    from: {
      top: current.y,
      left: current.x
    },
    to: {
      top: computePos(mouseX, center),
      left: computePos(mouseY, center)
    }
  }), [mouseX, mouseY])
  useEffect(() => {
    const timer = setTimeout(() => {
      return triggerEnd()
    }, 10000)
    return () => clearTimeout(timer)
  }, [triggerEnd])
  const [popVis, setPopVis] = useState(null)
  async function hide(){
    setPopVis(true)
    const timer = await setTimeout(() => {
      return setPopVis(false)
    }, 4000)
    return ()=> clearTimeout(timer)
  }
  return (
    <>
      <animated.div id="animated-btn" style={position}>
        <OverlayTrigger placement="bottom" onToggle={()=>{hide()}} show={popVis} delay={{ show: 400, hide: 300 }} trigger="click" overlay={popover}>
          <Button
            variant="primary"
            size="lg"
          >Click to Gain Enlightenment</Button>
        </OverlayTrigger>
      </animated.div>
    </>
  )
}
export default TheBtn;