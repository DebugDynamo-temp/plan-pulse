import { Button } from '@mui/material';
import '../index.scss';
import { useStopwatch } from 'react-timer-hook';
import { updateTaskTime } from '../services/task';

function Timer({ taskId, updateTimeSpent }){
	const {
		totalSeconds,
		seconds,
		minutes,
		hours,
		days,
		isRunning,
		start,
        pause,
        reset,
	} = useStopwatch();

    async function toggleTimer(){
        if(isRunning){
            pause();
            let res = await updateTaskTime(taskId, Math.floor(totalSeconds / 60));
            if(!res.success){
                alert("Error updating time");
            } else {
                updateTimeSpent(Math.floor(totalSeconds / 60));
            }
        } else {
            reset();
            start();
        }
    }

    return (
        <div id="timer">
            <div>
                <span>{days}:</span>
                <span>{hours}:</span>
                <span>{minutes}:</span>
                <span>{seconds}</span>
            </div>
            <footer>
                <Button role='button' data-testid='timer-toggle' variant='contained' onClick={toggleTimer}>{ isRunning ? "Stop Timer" : "Start Timer" }</Button>
            </footer>
        </div>
    )
}

export default Timer; 
