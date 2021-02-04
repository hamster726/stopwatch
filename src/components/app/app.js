import React from 'react';
import StopWatch from '../stopwatch/stopwatch'
const App = () => {

    return (<>
        <section className='container mainPage'>

            <h1 className='title'>Stopwatch</h1>
            <StopWatch/>
        </section>

        <footer className='footer'>
            <ul className='footer__menu'>
                <li>
                    <a href='https://github.com/hamster726' target='_blank' rel='noreferrer'>GitHub</a>
                </li>
                <li>
                    <a href='https://yesha.com.ua/' target='_blank' rel='noreferrer'>Portfolio</a>
                </li>
                <li>
                    <a href='https://www.instagram.com/hamster726/' target='_blank' rel='noreferrer'>Instagram</a>
                </li>
            </ul>
            <div className="footer__developer">by Hamster726</div>
        </footer>
    </>)

}

export default App
