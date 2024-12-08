import { Button } from '@mui/material';
import '../index.scss';
import { useStopwatch } from 'react-timer-hook';

function Timer({ timeSpent=0 }){
	const offset = new Date();
	offset.setSeconds(offset.getSeconds() + timeSpent);
	const {
		totalSeconds,
		seconds,
		minutes,
		hours,
		days,
		isRunning,
		start,
		pause
	} = useStopwatch({ offsetTimestamp: offset });

    function toggleTimer(){
        if(isRunning){
            pause();
        } else {
            start();
        }
    }

    return (
        <div>
            <span>{days}</span>:<span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
            <footer>
                <Button variant='contained' onClick={toggleTimer}>{ isRunning ? "Stop Timer" : "Start Timer" }</Button>
            </footer>
        </div>
    )
}

export default Timer; 
