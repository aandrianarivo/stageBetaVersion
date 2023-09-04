import {FaBell} from 'react-icons/fa';
import PropTypes from "prop-types";

function Notifications({count}) {
  return (
    <div className='notification-icon'>
        <FaBell/>
        {count >0 && <span className='notification-count'>{count}</span>}
    </div>
  )
}
Notifications.propTypes={
    count:PropTypes.number.isRequired
}


export default Notifications