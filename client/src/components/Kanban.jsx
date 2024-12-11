import Board from "../components/Board";
import { useOutletContext } from "react-router-dom";

function Kanban(){
    const currentBoard  = useOutletContext();

    return (
        <>
            <section>
                <Board board={currentBoard ? currentBoard : { title: 'No boards yet! Click the + to create one' }} />
            </section>
        </>
    )
}

export default Kanban;