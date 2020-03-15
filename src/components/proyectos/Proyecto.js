import React, {useContext} from 'react';
import proyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';

const Proyecto = ({proyecto}) => {

    // Obtener el state del proyecto
    const proyectosContext = useContext(proyectoContext);
    const {proyectoActual} = proyectosContext;

    // obtener unas funciones del context de tarea
    const tareasContext = useContext(tareaContext);
    const {obtenerTareas, limpiarTarea} = tareasContext;

    // Funcion para agregar el proyecto actual
    const seleccionarProyecto = id => {
        proyectoActual(id); // Fijar un proyecto actual
        obtenerTareas(id); // Filtrar las tareas cuando se de click
        limpiarTarea(); // Limpia la tarea seleccionada para editar
    }


    return ( 
        <li>
            <button
                type="button"
                className="btn btn-blank"
                onClick={() => seleccionarProyecto(proyecto._id)}
            >{proyecto.nombre}</button>
        </li>
     );
}
 
export default Proyecto;