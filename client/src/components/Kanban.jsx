import Board from "../components/Board";
import { useOutletContext } from "react-router-dom";

function Kanban(){
    const currentBoard  = useOutletContext();

    return (
        <>
            <section>
                <Board board={currentBoard ? currentBoard : { title: '' }} />
            </section>
        </>
    )
}

export default Kanban;