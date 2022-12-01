import React, {useState, useEffect} from 'react'
import {db} from '../firebase'
import {collection, doc, addDoc, onSnapshot, deleteDoc, updateDoc} from 'firebase/firestore'
import { async } from '@firebase/util'


const Form = () => {
    const [element, setElement] = useState('')
    const [description, setDescription] = useState('')
    const [id, setId] = useState(0)
    const [elementList, setElementList] = useState([])
    const [editing, setEditing] = useState(false)

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
                    id: data.id,
                }]
            )
           setElement('')
           setDescription('')
        } catch (error) {
            console.log(error)
        }
    }

    const Delete = async id =>{
        try {
           await deleteDoc(doc(db,'Elements', id)) 
        } catch (error) {
           console.log(error) 
        }
    }

    const Edit = item =>{
        setElement(item.elementName)
        setDescription(item.descriptionName)
        setId(item.id)
        setEditing(true)
    }

    const editElement = async e =>{
        e.preventDefault();
        try {
            const docRef = doc(db, 'Elements', id);
            await updateDoc(docRef,{
                elementName:element,
                descriptionName: description,
            })

            const newArray = elementList.map(
                item => item.id === id ? {elementName:element, descriptionName:description, id:id}: item
            )

            setElementList(newArray)
            setElement('')
            setDescription('')
            setId('')
            setEditing(false)

        } catch (error) {
            console.log(error)
        }
    }

    const Cancel = () =>{
        setEditing(false)
        setElement('') 
        setDescription('')
        setId('')
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
                            <li className="list-group-item" key={item.id}>
                                <span className="lead">{item.elementName}-{item.descriptionName}</span>
                                <button className="btn btn-danger btn-sm fload-end mx-2" onClick={()=>Delete(item.id)}>Eliminar</button>
                                <button className="btn btn-warning btn-sm fload-end" onClick={()=>Edit(item)}>Editar</button>
                            </li>
                         ))
                   }
                    
                </ul>
            </div>
            <div className="col-4">
                <h4 className="text-center">{ editing ? 'Editar Elemento': 'Agregar Elemento'}</h4>
                <form onSubmit={editing ? editElement : saveElements}>
                    <input type="text" className="form-control mb-2" placeholder='Ingresar elemento' value = {element} onChange={(e)=>setElement(e.target.value)} />
                    <input type="text" className="form-control mb-2" placeholder='Ingresar Descripción'value = {description} onChange={(e)=>setDescription(e.target.value)}/>
                    {
                        editing
                         ? 
                        (
                            <>
                             <button className="btn btn-warning btn-block" on='submit'>Editar</button>
                             <button className="btn btn-dark btn-block mx-2" onClick={()=>Cancel()}>Cancelar</button>
                            </>
                        )
                        :
                        <button className="btn btn-primary btn-block" on='submit'>Agregar</button> 
                    }


                </form>
            </div>
        </div>
    </div>
  )
}

export default Form