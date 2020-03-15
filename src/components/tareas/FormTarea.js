import React, {useContext, useState, useEffect} from 'react';
import proyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';

const FormTarea = () => {

    // Extraer si un proyecto esta activo
    const proyectosContext = useContext(proyectoContext);
    const {proyecto} = proyectosContext; 

    // obtener varias cosas del context de tarea
    const tareasContext = useContext(tareaContext);
    const {tareaSeleccionada, errorTarea, agregarTarea, validarTarea, obtenerTareas, actualizarTarea, limpiarTarea} = tareasContext;

    // Effect que detecta si hay una tarea seleccionada
    useEffect(() => {
        if (tareaSeleccionada !== null) {
            guardarTarea(tareaSeleccionada);
        } else {
            guardarTarea({
                nombre: ''
            })
        }
    }, [tareaSeleccionada]);


    // State del formulario
    const [tarea, guardarTarea] = useState({
        nombre: ''
    })

    // extraer el nombre del proyecto
    const {nombre} = tarea;

    // Si no hay proyecto seleccionado
    if (!proyecto) return null;
    
    // Array destructuring para extraer el proyecoto actual
    const [proyectoActual] = proyecto;

    // Leer los valores del formulario
    const handleChange = e => {
        guardarTarea({
            ...tarea,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = async e => {
        e.preventDefault();

        // validar
        if(nombre.trim() === '') {
            validarTarea();
            return;
        }

        // Revisa si es edicion o nueva tarea
        if (tareaSeleccionada === null) {
            // agregar la nueva tarea al state de tareas
            tarea.proyecto = proyectoActual._id;
            await agregarTarea(tarea);
        } else {
            // actualizar tarea existente
            await actualizarTarea(tarea);

            // elimina tareaSeleccionada del state
            limpiarTarea();
        }

        // Obtener y filtrar las tareas del proyecto actual
        await obtenerTareas(proyectoActual._id);

        // reiniciar el form
        guardarTarea({
            nombre: ''
        })
    }

    return ( 
        <div className="formulario">
            <form
                onSubmit={onSubmit}
            >
                <div className="contenedor-input">
                    <input
                        type="text"
                        className="input-text"
                        placeholder="Nombre Tarea..."
                        name="nombre"
                        value={nombre}
                        onChange={handleChange}
                    />
                </div>

                <div className="contenedor-input">
                    <input
                        type="submit"
                        className="btn btn-primario btn-submit btn-block"
                        value={tareaSeleccionada ? "Editar Tarea" : "Agregar Tarea"}
                    />
                </div>
            </form>

            {errorTarea ? <p className="mensaje error">El nombre de la tarea es obligatorio</p> : null}
        </div>
     );
}
 
export default FormTarea;