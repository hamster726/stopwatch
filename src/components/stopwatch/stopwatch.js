import React, {Component} from 'react'
import {updateTimer, switchTimer, clearTimer} from "../../actions/";
import {connect} from 'react-redux'


class Stopwatch extends Component {

    constructor(props) {
        super(props);
        this.props.clearTimer()
    }

    clocktimer = 0;
    startDate = new Date();
    timeAfterStart = 0;


    componentDidMount() {

    }


    Time = (timeAfterStart = 0) => {
        let ms, s, m, h = 0;
        let renderedTime;

        const restructure = (num) => {

            if (String(num).length > 2) {
                return String(num).slice(0, 2);
            }

            if (String(num).length === 1) {
                return `0${num}`
            }

            return num;
        }

        let time = new Date(new Date().getTime() - this.startDate.getTime());

        time.setTime(time.getTime() + timeAfterStart);

        ms = restructure(time.getMilliseconds());
        s = restructure(time.getSeconds());
        m = restructure(time.getMinutes());
        h = restructure(time.getHours() - 3);


        this.timeAfterStart = time.getTime()

        renderedTime = `${h}:${m}:${s}.${ms}`

        this.props.updateTimer(renderedTime);

        if(this.props.isStopwatchActive) {
            this.clocktimer = setTimeout(() => this.Time(timeAfterStart), 16.6); // 16.6 - 60fps/min
        }
    }

    startTime = () => {
        if (this.props.isStopwatchActive) {
            clearTimeout(this.clocktimer)
            this.props.switchTimer();

        } else {

            this.startDate = new Date()
            this.props.switchTimer();
            setTimeout(() => this.Time(this.timeAfterStart));
        }
    }

    clearTime = () => {
        clearTimeout(this.clocktimer);
        this.props.switchTimer(false);
        this.props.clearTimer();
        this.timeAfterStart = 0;
    }











    render() {
        const {currentTime} = this.props;

        return (
            <div className='stopwatch'>
                <form className='stopwatch__form'>
                    <input className='stopwatch__input' value={currentTime} readOnly/>
                </form>
                <div className="stopwatch__button__wrapper">
                    <button className='stopwatch__button-clear' onClick={() => {
                        this.clearTime()
                    }}>clear
                    </button>
                    <button className='stopwatch__button-start' onClick={() => {
                        this.startTime()
                    }}>{this.props.isStopwatchActive ? 'wait' : 'go!'}
                    </button>
                </div>
            </div>
        )
    }

}


const mapStateToProps = (state) => {
    return {
        clearStopwatch: state.initialStopwatch,
        currentTime: state.stopwatchTime,
        isStopwatchActive: state.isStopwatchActive
    }
};

const mapDispatchToProps = {
    updateTimer,
    switchTimer,
    clearTimer
};

export default connect(mapStateToProps, mapDispatchToProps)(Stopwatch);
