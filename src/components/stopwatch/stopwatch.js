import React, {Component} from 'react'
import {updateTimer, switchTimer} from "../../actions/";
import {connect} from 'react-redux'


class Stopwatch extends Component {

    constructor(props) {
        super(props);
        this.initialStopwatch = '00:00:00.00';
        this.props.updateTimer(this.initialStopwatch)
    }

    clocktimer = 0;
    startDate = new Date();
    timeAfterStart = 0;
    delay = 16.6 // ms = 60fps/min

    Timer = (pauseTime) => {
        let ms, s, m, h = 0;
        let renderedTimer;

        const restructure = (num) => {
            if (String(num).length > 2) {
                return String(num).slice(0, 2);
            }

            if (String(num).length === 1) {
                return `0${num}`
            }

            return num;
        }

        const time = new Date(new Date().getTime() - this.startDate.getTime());

        time.setTime(time.getTime() + pauseTime);

        ms = restructure(Math.floor(time.getMilliseconds()/10));
        s  = restructure(time.getSeconds());
        m  = restructure(time.getMinutes());
        h  = restructure(time.getHours() - 3); //default 3 hours

        this.timeAfterStart = time.getTime()

        renderedTimer = `${h}:${m}:${s}.${ms}`
        this.props.updateTimer(renderedTimer);

        if (this.props.isStopwatchActive) {
            this.clocktimer = setTimeout(() => this.Timer(pauseTime), this.delay);
        }
    }

    startCounting = () => {
        if (this.props.isStopwatchActive) {
            clearTimeout(this.clocktimer)
            this.props.switchTimer();
        } else {
            this.startDate = new Date()
            this.props.switchTimer();
            setTimeout(() => this.Timer(this.timeAfterStart));
        }
    }

    clearTime = () => {
        clearTimeout(this.clocktimer);
        this.props.switchTimer(false);
        this.props.updateTimer(this.initialStopwatch);
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
                        this.startCounting()
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
};

export default connect(mapStateToProps, mapDispatchToProps)(Stopwatch);
