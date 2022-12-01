import React, {useState, useEffect} from 'react'
import {db} from '../firebase'
import {collection, doc, addDoc, onSnapshot} from 'firebase/firestore'

const Form = () => {
    const [element, setElement] = useState('')
    const [description, setDescription] = useState('')
    const [elementList, setElementList] = useState([])
    useEffect(()=>{
        const getData = async () =>{
           try {
                await onSnapshot(collection(db, 'Elements'), (query) => {
                    setElementList(query.docs.map((doc) => ({...doc.data(), id:doc.id})))
                })
           } catch (error) {
                console.log(error)
           } 
        }
            getData();
    }, [])

    const saveElements = async(e) => {
        e.preventDefault()
        try {
            const data = await addDoc(collection(db, 'Elements'),{
                elementName: element,
                descriptionName: description
            })
            setElementList(
                [...elementList, {
                    elementName: element,
                    descriptionName: description,
                    id: data.id
                }]
            )
           // setElement('')
           // setDescription('')
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <div className='container mt-5'>
        <h1 className='text-cent'>TALLER CRUD</h1>
        <hr/>
        <div className='row'>
            <div className="col-8">
                <h4 className="text-center">Listado</h4>
                <ul className="list-group"> 
                   {
                        elementList.map(item => (
                            <li className="list-group-item" key={item.id}>{item.elementName}-{item.descriptionName}</li>
                         ))
                   }
                    
                </ul>
            </div>
            <div className="col-4">
                <h4 className="text-center">Agregar elemento</h4>
                <form onSubmit={saveElements}>
                    <input require type="text" className="form-control mb-2" placeholder='Ingresar elemento' value = {element} onChange={(e)=>setElement(e.target.value)} />
                    <input require type="text" className="form-control mb-2" placeholder='Ingresar Descripción'value = {description} onChange={(e)=>setDescription(e.target.value)}/>
                    <button className="btn btn-primary btn-block" on='submit'>Agregar</button>
                    <button className="btn btn-dark btn-block mx-2" on='submit'>Cancelar</button>

                </form>
            </div>
        </div>
    </div>
  )
}

export default Form