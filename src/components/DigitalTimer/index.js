import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      timerLimit: 25 * 60,
      timer: 25 * 60,
      isRunning: false, // Updated to indicate the timer is initially running
    }
  }

  componentDidMount() {
    this.timerInterval = setInterval(() => {
      const {isRunning, timer} = this.state

      if (isRunning && timer > 0) {
        this.setState(prevState => ({
          timer: prevState.timer - 1,
        }))
      } else if (timer === 0) {
        this.setState({
          isRunning: false,
        })
      }
    }, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.timerInterval)
  }

  formatTime = timeInSeconds => {
    const minutes = Math.floor(timeInSeconds / 60)
    const seconds = timeInSeconds % 60
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(
      2,
      '0',
    )}`
  }

  startPauseTimer = () => {
    this.setState(prevState => ({
      isRunning: !prevState.isRunning,
    }))
  }

  resetTimer = () => {
    this.setState({
      isRunning: false,
      timer: 25 * 60,
    })
  }

  incrementTimer = () => {
    const {isRunning} = this.state
    if (isRunning === false) {
      this.setState(prevState => ({
        timerLimit: prevState.timerLimit + 60,
        timer: prevState.timerLimit + 60,
      }))
    }
  }

  decrementTimer = () => {
    const {timerLimit, isRunning} = this.state
    if (timerLimit > 60 && isRunning === false) {
      this.setState(prevState => ({
        timerLimit: prevState.timerLimit - 60,
        timer: Math.min(prevState.timer, prevState.timerLimit - 60),
      }))
    }
  }

  render() {
    const {timer, isRunning, timerLimit} = this.state

    return (
      <div className="background-container">
        <h1 className="app-heading">Digital Timer</h1>
        <div className="container">
          <div className="time-container">
            <div className="in-container">
              <h1 className="showTime">{this.formatTime(timer)}</h1>
              <p className="timeDetails">{isRunning ? 'Running' : 'Paused'}</p>
            </div>
          </div>
          <div className="text-container">
            <div className="top-container">
              <div className="start">
                <button
                  className="btn1"
                  type="button"
                  onClick={this.startPauseTimer}
                >
                  <img
                    src={
                      isRunning
                        ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
                        : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
                    }
                    className="image"
                    alt={isRunning ? 'pause icon' : 'play icon'}
                  />
                  {isRunning ? 'Pause' : 'Start'}
                </button>
              </div>
              <div className="start">
                <button
                  className="btn1"
                  type="button"
                  onClick={this.resetTimer}
                >
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                    className="image"
                    alt="reset icon"
                  />
                </button>
                <p className="label">Reset</p>
              </div>
            </div>
            <p className="limit">Set Timer Limit</p>
            <div className="btn-container">
              <button
                className="btn"
                type="button"
                onClick={this.decrementTimer}
              >
                -
              </button>
              <div className="min-container">
                <p className="minutes">{timerLimit / 60}</p>
              </div>
              <button
                className="btn"
                type="button"
                onClick={this.incrementTimer}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
