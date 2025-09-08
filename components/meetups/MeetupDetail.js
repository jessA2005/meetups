import { useState } from 'react';
import classes from './MeetupDetail.module.css';
import { IoLocationSharp } from "react-icons/io5";
import { MdDescription } from "react-icons/md";
import { MdExpandMore } from "react-icons/md";
function MeetupDetail(props) {
  const [collapse , setCollapse] = useState(true)
  return (
    <section className={classes.detail}>
      <div className='h-[50vh] rounded-2xl shadow-xl overflow-hidden my-10 mx-0 px-0 w-full'>
      <img
        src={props.image}
        alt={props.title}
        className='w-full h-full object-cover object-center'
      />
      </div>
      <h1 className='uppercase font-bold text-4xl mb-6'>{props.title}</h1>
      <div className='flex md:flex-row flex-col justify-center items-center'>
      <div className='flex flex-col md:mr-10 items-center mb-6 bg-white px-10 py-5 rounded-xl transition hover:drop-shadow-md hover:cursor-pointer'>
        <IoLocationSharp size={100} color="#FF7A30" />
      <address className='font-bold text-3xl not-italic py-2 '>{props.address}</address>
      </div>
      <div className='flex flex-col w-full items-center justify-center mb-6 bg-white px-10 py-5 rounded-xl transition hover:drop-shadow hover:cursor-pointer'>
        <MdDescription size={100} color="#FF7A30" />
      <div>
      


      <div className='flex flex-col items-center'>
      <div className='flex flex-row '>
        <h3 className='font-bold text-3xl not-italic py-2'>description</h3>
        <MdExpandMore size={50} color="#FF7A30" className={`hover:cursor-pointer ${collapse ? 'rotate-0': 'rotate-180'}  transition-transform duration-100`} onClick={() => setCollapse(!collapse)}/>
          
          </div>
          {!collapse && <p>{props.description}</p>}
          </div>

      </div>
      </div>
      
      </div>
    </section>
  );
}

export default MeetupDetail;