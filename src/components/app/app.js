import React from 'react';
import StopWatch from '../stopwatch/stopwatch'
const App = () => {

    return (<>
        <header className='header'>
            <ul className='header__menu'>
                <li>
                    <a href='#'>GitHub</a>
                </li>
                <li>
                    <a href='#'>Portfolio</a>
                </li>
                <li>
                    <a href='#'>Instagram</a>
                </li>
            </ul>
            <div className="header__developer">by Hamster726</div>
        </header>
        <section className='container mainPage'>

            <h1 className='title'>Stopwatch</h1>
            <StopWatch/>
        </section>
    </>)

}

export default App
