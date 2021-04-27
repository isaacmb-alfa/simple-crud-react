import React, { useState } from 'react';
import { customAlphabet } from 'nanoid';




function App() {
    const nanoid = customAlphabet('1234567890abcdef', 12);

    const [tarea, setTarea] = useState('');
    const [tareas, setTareas] = useState([])
    const [modoEdicion, setModoEdicion] = useState(false);
    const [id, setId] = useState('');
    const [error, setError] = useState(null);

    const handleInputChnage = (e) => {
        setTarea(e.target.value)
    }
    const handleSubmit = (e) => {
        e.preventDefault()

        if (!tarea.trim()) {
            setError('Esrbiba algo por favor...');
            return;
        } else if (tarea.trim().length > 2) {
            setTareas([
                ...tareas,
                {
                    id: nanoid(),
                    nombreTarea: tarea
                }
            ]);
            setTarea('');
            setError(null);
        }
    }
    const handleDelet = (id) => {
        const listaTareas = tareas.filter(tarea => tarea.id !== id)
        setTareas(listaTareas);
    }
    const handleEdit = (item) => {
        setModoEdicion(true);
        setTarea(item.nombreTarea);
        setId(item.id);
    }
    const handleEditTarea = (e) => {
        e.preventDefault()
        if (!tarea.trim()) {
            setError('Esrbiba algo por favor...');
            return;
        } else if (tarea.trim().length > 2) {
            const arrayEdit = tareas.map(item => item.id === id ? { id, nombreTarea: tarea } : item)
            setTareas(arrayEdit);
            setModoEdicion(false);
            setTarea('');
            setId('');
            setError(null);
        }
    }

    return (
        <div className="container mt-5">
            <h1 className="text-center">CRUD Simple</h1>
            <hr />
            <div className="row">
                <div className="col-8">
                    <h4 className="text-center" >Lista de tareas</h4>
                    <ul className="list-group">
                        {

                            tareas.length === 0 ? (
                                <li className="list-group-item">No hay tareas Por realizar</li>
                            ) :
                                (

                                    tareas.map(item => (

                                        <li className="list-group-item d-flex flex-wrap" key={item.id}>
                                            <div className="col-9">
                                                <span className="lead">{item.nombreTarea}</span>
                                            </div>
                                            <div className="col-3 d-flex flex-wrap justify-content-end">
                                                <button
                                                    className="btn btn-danger btn-sm mx-2"
                                                    onClick={() => handleDelet(item.id)}
                                                >Eliminar</button>
                                                <button
                                                    className="btn btn-warning btn-sm"
                                                    onClick={() => handleEdit(item)}
                                                >Editar</button>
                                            </div>
                                        </li>
                                    ))

                                )
                        }
                    </ul>

                </div>
                <div className="col-4">
                    <h4 className="text-center">{modoEdicion ? 'Editar tarea' : 'Agregar tarea'}</h4>
                    <form className="row m-2 justify-content-center" onSubmit={modoEdicion ? handleEditTarea : handleSubmit}>

                        {
                            error ? <span className="text-danger mb-1">{error}</span> : null
                        }
                        <input
                            type="text"
                            className="form-control mb-2 row justify-content-center"
                            placeholder="Ingrese Tarea"
                            onChange={handleInputChnage}
                            value={tarea}
                        />
                        {
                            modoEdicion ? (
                                <button className="btn btn-warning btn-block" type="submit">Editar</button>
                            ) : (
                                <button className="btn btn-dark btn-block" type="submit">Agregar</button>
                            )
                        }

                    </form>
                </div>
            </div>
        </div>
    );
}

export default App;