// Write your code here
import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import {format} from 'date-fns'
import AppointmentItem from '../AppointmentItem'
import './index.css'

class Appointments extends Component {
  state = {appointmentsList: [], titleInput: '', dateInput: '', isStar: false}

  onTitleChange = event => {
    this.setState({titleInput: event.target.value})
  }

  onDateChange = event => {
    this.setState({dateInput: event.target.value})
  }

  staredList = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(eachAppointment => {
        if (eachAppointment.id === id) {
          return {...eachAppointment, isStared: !eachAppointment.isStared}
        }
        return eachAppointment
      }),
    }))
  }

  onAddButtonClicks = () => {
    const {titleInput, dateInput} = this.state

    const formatedDate = dateInput
      ? format(new Date(dateInput), 'dd MMMM yyyy, EEEE')
      : ''

    const newAppointment = {
      id: uuidv4(),
      title: titleInput,
      date: formatedDate,
      isStared: false,
    }

    this.setState(prevState => ({
      appointmentsList: [...prevState.appointmentsList, newAppointment],
      titleInput: '',
      dateInput: '',
    }))
  }

  staredItems = () => {
    this.setState(prevState => ({isStar: !prevState.isStar}))
  }

  render() {
    const {appointmentsList, titleInput, dateInput, isStar} = this.state

    const staredItemsList = isStar
      ? appointmentsList.filter(each => {
          if (each.isStared === true) {
            return each
          }
          return null
        })
      : appointmentsList

    return (
      <div className="a-container">
        <div className="a-inner-container">
          <div className="inner-to_inner">
            <div>
              <h1 className="a-heading">Add Appointment</h1>
              <div className="flexing">
                <label htmlFor="title" className="head">
                  TITLE
                </label>
                <input
                  type="text"
                  id="title"
                  className="input"
                  placeholder="Title"
                  value={titleInput}
                  onChange={this.onTitleChange}
                />
              </div>
              <div className="flexing">
                <label htmlFor="date" className="head">
                  DATE
                </label>
                <input
                  type="date"
                  id="date"
                  className="input"
                  value={dateInput}
                  onChange={this.onDateChange}
                />
              </div>
              <button
                type="button"
                className="button"
                onClick={this.onAddButtonClicks}
              >
                Add
              </button>
            </div>
            <div className="img">
              <img
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png "
                alt="appointments"
                className="image"
              />
            </div>
          </div>
          <hr className="hr" />
          <div className="a-bottom-container">
            <h1 className="a-heading2">Appointments</h1>
            <button type="button" className="stared" onClick={this.staredItems}>
              Starred
            </button>
          </div>
          <ul className="a-cards-container">
            {staredItemsList.map(eachAppointment => (
              <AppointmentItem
                eachAppointment={eachAppointment}
                key={eachAppointment.id}
                staredList={this.staredList}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments
