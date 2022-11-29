import React, {useState} from 'react'

const Form = () => {
    const [element, setElement] = useState('')
    const [Description, setDescripton] = useState('')
    const [elementList, setElementList] = useState([])
  return (
    <div className='container mt-5'>
        <h1 className='text-cent'>TALLER CRUD</h1>
        <hr/>
        <div className='row'>
            <div className="col-8">
                <h4 className="text-center">Listado</h4>
                <ul className="list-group">
                    <li className="list-group-item"></li>
                </ul>
            </div>
            <div className="col-4">
                <h4 className="text-center">Agregar elemento</h4>
                <form action="">
                    <input type="text" className="form-control mb-2" placeholder='Ingresar elemento' />
                    <input type="text" className="form-control mb-2" placeholder='Ingresar Descripción' />
                    <button className="btn btn-primary btn-block" on='submit'>Agregar</button>
                    <button className="btn btn-dark btn-block mx-2" on='submit'>Cancelar</button>

                </form>
            </div>
        </div>
    </div>
  )
}

export default Form