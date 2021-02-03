import React, {Component} from 'react'
import {updateTimer, switchTimer, clearTimer} from "../../actions/";
import {connect} from 'react-redux'


class Stopwatch extends Component {
    state = {}

     constructor(props) {
         super(props);
         this.props.clearTimer()
     }

    clocktimer = '';
    startDate = new Date();

    ms = 0;
    s = 0;
    m = 0;
    h = 0;
    base = 60;


    componentDidMount() {
    }


    Time() {
        let {ms, s, m, h, base, clocktimer} = this;
        let renderedTime;

        const currentDate = new Date();
        const time = new Date(currentDate.getTime() - this.startDate.getTime());
        ms = time.getMilliseconds();
        s = time.getSeconds();
        m = time.getMinutes();
        h = time.getHours()-3;
        console.log(`${h}:${m}:${s}.${ms}`);

        renderedTime = `${h}:${m}:${s}.${ms}`
        this.props.updateTimer(renderedTime);
        this.clocktimer = setTimeout("this.Time", 100);

    }

    startTime = () => {
        if (this.props.isStopwatchActive) {
            this.props.switchTimer();

        } else {
            this.startDate = new Date()
            this.props.switchTimer();
            this.Time();
        }
    }

    clearTime = () => {
        clearTimeout(this.clocktimer);
        this.props.switchTimer();
        this.props.clearTimer();
    }

    render() {
        const {currentTime} = this.props;

        return (
            <div className='stopwatch'>
                <form className='stopwatch__form'>
                    <input className='stopwatch__input' value={currentTime}/>
                </form>
                <div className="stopwatch__button__wrapper">
                    <button className='stopwatch__button-clear' onClick={() => {
                        this.clearTime()
                    }}>clear
                    </button>
                    <button className='stopwatch__button-start' onClick={() => {
                        this.startTime()
                    }}>start\stop
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
