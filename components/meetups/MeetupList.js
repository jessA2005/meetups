import MeetupItem from './MeetupItem';
import classes from './MeetupList.module.css';
function MeetupList(props) {

  return (
    <ul className={`${classes.list} grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4`}>
      {props.meetups.map((meetup) => (
        <MeetupItem
          key={meetup._id}
          _id={meetup._id}
          image={meetup.image}
          title={meetup.title}
          address={meetup.address}
        />
      ))}
    </ul>
  );
}

export default MeetupList;
