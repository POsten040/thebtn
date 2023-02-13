import Button from 'react-bootstrap/Button';
import Popover from 'react-bootstrap/Popover';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import { useState, useEffect } from 'react';
import {useSpring, animated} from '@react-spring/web';

function computePos(pos, center){
  if(pos > center){
    //const r = Math.floor(Math.random() * 4)
    return (center%4)/2
  }
  if(pos < 5) return (center%4)/2
  if(pos < center && pos > 5) return pos+(center/2)
}
const popover = (
  <Popover id="popover-basic">
    <Popover.Header as="h3">You have not gained enlightnement</Popover.Header>
    <Popover.Body>
      Keep trying
    </Popover.Body>
  </Popover>
);
const TheBtn = (props)=>{
  //console.log(props)
  const {mouseX, mouseY, center} = props;
  const [current, setCurrent] = useState({x:mouseX, y:mouseY})
  // useEffect(()=> {
  //   setTimeout(()=>{
  //     console.log("time!")
  //   }, 3000)
  // })
  const [position, api] = useSpring(() => ({
    from: {
      top: current.y,
      left: current.x
    },
    to: {
      top: computePos(mouseX, center),
      left: computePos(mouseY, center)}
  }), [mouseX, mouseY])
  
  //console.log(api)
  return (
    <>
    <animated.div id="animated-btn" style={position}>
    <OverlayTrigger delay="" trigger="focus" placement="right" overlay={popover}>
      <Button
        variant="primary"
        size="lg"
      >X:{mouseX}, Y:{mouseY}</Button>
      </OverlayTrigger>
    </animated.div>
    </>
  )
}
export default TheBtn;