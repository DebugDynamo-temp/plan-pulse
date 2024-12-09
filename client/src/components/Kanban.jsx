import Board from "../components/Board";
import { TaskProvider } from "../contexts/TaskContext";
import { useOutletContext } from "react-router-dom";

function Kanban(){
    const currentBoard  = useOutletContext();

    return (
        <>
            <section>
                <TaskProvider>
                    <Board board={currentBoard ? currentBoard : { title: '' }} />
                </TaskProvider>
            </section>
        </>
    )
}

export default Kanban;