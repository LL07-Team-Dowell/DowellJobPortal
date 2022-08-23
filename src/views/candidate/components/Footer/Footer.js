import * as React from 'react';
import { RiSendPlaneLine } from 'react-icons/ri';
import { AiOutlineHome } from 'react-icons/ai';
import { BiUser } from 'react-icons/bi';
import './Footer.css';
import { Link } from 'react-router-dom';
import { useRef } from 'react';
import { useEffect } from 'react';


export default function SimpleBottomNavigation() {
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);

  useEffect(() => {

    if ((!ref1.current) || (!ref2.current) ||(!ref3.current)) return;

    if ((window.location.href.split("#")[1] === "/jobs")){
      ref1.current.classList.add("footer__Link__Active");
      ref1.current.firstChild.classList.add("footer__Link__Active");
      return
    }

    [ref1, ref2, ref3].forEach(link => {
      if ( link.current.href.includes(window.location.href.split("#")[1]) || window.location.href.split("#")[1].split("/").length >= 2 && window.location.href.split("#")[1].split("/")[1] === link.current.href.split("#")[1].split("/")[1] ){
        link.current.classList.add("footer__Link__Active");
        link.current.firstChild.classList.add("footer__Link__Active");
        return;
      }
    })

  }, [])

  return <>
    <div className='candidate__Bottom__Navigation__Container'>
      <ul className='candidate__Navigation__Links'>
        <Link to={'/home'} ref={ref1}>
          <AiOutlineHome />
          <span>Home</span>
        </Link>
        <Link to={'/applied'} ref={ref2}>
          <RiSendPlaneLine />
          <span>Applied</span>
        </Link>
        <Link to={'/user'} ref={ref3}>
          <BiUser />
          <span>User</span>
        </Link>
      </ul>
    </div>
  </>
}
