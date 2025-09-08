import classes from './MainNavigation.module.css';
import Link from 'next/link';
import LogoStatic from '../../assets/LogoStatic';
import CollapsedNav from './CollapsedNav'
import { useEffect, useState } from 'react';
function MainNavigation() {
  const [width, setWidth] = useState();
useEffect (() => {
  setWidth(window.innerWidth)
  window.addEventListener('resize', () => {
    setWidth(window.innerWidth)
  })
  return () => window.removeEventListener('resize', () => {
    setWidth(window.innerWidth)
  }, [])
})
  return (
    <div className="bg-[#E9E3DF] z-100">
    <header className={classes.header}>
      <div className={classes.logo}>
        <LogoStatic width={50} height={50} />
      </div>
      <div className='flex flex-col'>
      {width >= 600 ? (
<nav>
        <ul className='flex items-baseline'>
          <li>
            <Link href='/'>All Meetups</Link>
          </li>
          <li>
            <Link href='/new-meetup'>Add New Meetup</Link>
          </li>
        </ul>
      </nav>
      ): <CollapsedNav/>}
      </div>
      
    </header>
    </div>
  );
}

export default MainNavigation;
