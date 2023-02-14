import Button from 'react-bootstrap/Button';
import Popover from 'react-bootstrap/Popover';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import { useRef, useEffect, useState } from 'react';
import { useSpring, animated } from '@react-spring/web';

function computePos(pos, center) {
  if (pos > center) return (center % 4) / 2
  if (pos < 5) return (center % 4) / 2
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
  const { mouseX, mouseY, center, triggerEnd, test } = props;
  const [current, setCurrent] = useState({ x: mouseX, y: mouseY })
  const [position, api] = useSpring(() => ({
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
      console.log("timer set")
      return triggerEnd()
    }, 5000)
    return () => clearTimeout(timer)
  }, [triggerEnd])
  const body = useRef(document.querySelector("body"))
  return (
    <>
      <animated.div id="animated-btn" style={position}>
        <OverlayTrigger delay={{ show: 400, hide: 300 }} trigger="focus" placement="right" overlay={popover}>
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