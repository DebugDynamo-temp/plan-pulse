import Board from "../components/Board";
import { TaskProvider } from "../components/TaskContext";
import { useOutletContext } from "react-router-dom";

function Kanban(){
    const currentBoard  = useOutletContext();

    return (
        <>
            <section>
                <TaskProvider>
                    <Board board={currentBoard} />
                </TaskProvider>
            </section>
        </>
    )
}

export default Kanban;