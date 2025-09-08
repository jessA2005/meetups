import Link from 'next/link';
// import classes from './MainNavigation.module.css';

import LogoStatic from '../../assets/LogoStatic';
import { RiMenuFold3Line } from "react-icons/ri";
import { RiMenuUnfold3Line } from "react-icons/ri";
import { useState } from 'react';

function CollapsedNav() {
const [collapse , setCollapse] = useState(true);

  return (
    <div className="flex flex-col w-full pb-5">

      <nav className='flex p-0 mt-4'>
            <li className='hover:cursor-pointer mr-4 list-none'  onClick={() => setCollapse(!collapse)}>
                {collapse? <RiMenuFold3Line size={32} color="#FF7A30"/>: <RiMenuUnfold3Line size={32} color="#FF7A30"/>}
            </li>

            <div className={`absolute top-full right-0 bg-[#E9E3DF]  p-4 transition ease-in-out  w-[50%] ${collapse ? 'translate-x-full' : 'translate-x-0'} z-10 drop-shadow-sm`}>
                <ul className='mt-0 mb-0 flex flex-col py-4 px-0 items-baseline justify-items-center space-y-4 container overflow-none'>
                <li>
            <Link href='/'>All Meetups</Link>
          </li>
          <li>
            <Link href='/new-meetup'>Add New Meetup</Link>
          </li>
          
          </ul>
            </div>


      </nav>
      </div>
 
  );
}

export default CollapsedNav;
