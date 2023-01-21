// Write your code here
import './index.css'

const AppointmentItem = props => {
  const {eachAppointment, staredList} = props
  const {id, title, date, isStared} = eachAppointment

  const clickingStar = () => {
    staredList(id)
  }

  const isStar = isStared
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  return (
    <li className="item-container">
      <div className="head-star">
        <p className="item-head">{title}</p>
        <button
          type="button"
          className="star-button"
          data-testid="star"
          onClick={clickingStar}
        >
          <img src={isStar} alt="star" className="star-img" />
        </button>
      </div>
      <p className="item-date">{date}</p>
    </li>
  )
}

export default AppointmentItem
