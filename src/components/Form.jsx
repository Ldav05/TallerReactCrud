import React, {useState, useEffect} from 'react'
import {db} from '../firebase'
import {collection, doc, addDoc, onSnapshot, deleteDoc, updateDoc} from 'firebase/firestore'


const Form = () => {
    const [Element, setElement] = useState('')
    const [apellido, setApellido] = useState('')
    const [documento, setDocumento] = useState('')
    const [email, setEmail] = useState('')
    const [telefono, setTelefono] = useState('')
    const [profesion, setProfesion] = useState('')
    const [sexo, setSexo] = useState('')
    const [id, setId] = useState(0)
    const [ElementList, setElementList] = useState([])
    const [editing, setEditing] = useState(false)
    const Img = ('https://picsum.photos/100');

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
                name: Element,
                fullName: apellido,
                sex: sexo,
                documento: documento,
                email: email,
                tel: telefono,
                profession: profesion,
                Img: Img,

            })
            setElementList(
                [...ElementList, {
                    name: Element,
                    fullName: apellido,
                    sex: sexo,
                    documento: documento,
                    email: email,
                    tel: telefono,
                    profession: profesion,
                    Img: Img,
                    id: data.id
                }]
            )
           setElement('')
           setApellido('')
           setSexo('')
           setDocumento('')
           setEmail('')
           setTelefono('')
           setProfesion('')
           
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
        
        setElement(item.name)
        setApellido(item.fullName)
        setSexo(item.sex)
        setDocumento(item.documento)
        setEmail(item.email)
        setTelefono(item.tel)
        setProfesion(item.profession)
        setId(item.id)
        setEditing(true)
    }

    const editElement = async e =>{
        e.preventDefault();
        try {
            const docRef = doc(db, 'Elements', id);
            await updateDoc(docRef,{
                    name: Element,
                    fullName: apellido,
                    sex: sexo,
                    documento: documento,
                    email: email,
                    tel: telefono,
                    profession: profesion,
                    Img: Img
            })

            const newArray = ElementList.map(
                item => item.id === id ? {name: Element,
                    fullName: apellido,
                    sex: sexo,
                    documento: documento,
                    email: email,
                    tel: telefono,
                    profession: profesion, Img: Img, id:id
                }: item
            )

            setElementList(newArray)
            setElement('')
            setApellido('')
            setSexo('')
            setDocumento('')
            setEmail('')
            setTelefono('')
            setProfesion('')
            setId('')
            setEditing(false)

        } catch (error) {
            console.log(error)
        }
    }

    const Cancel = () =>{
        setEditing(false)
        setElement('')
        setApellido('')
        setSexo('')
        setDocumento('')
        setEmail('')
        setTelefono('')
        setProfesion('')
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
                        ElementList.map(item => (
                            <li className="list-group-item" key={item.id}>
                                <span className="lead">Nombre: {item.name} - Apellido: {item.fullName} <br></br>Sexo: {item.sex} - Documento: {item.documento} <br></br> Correo: {item.email} - Teléfono: {item.tel} <br></br>Profesión: {item.profession}<br></br><br></br><img src={item.Img} alt='Imagen aleatoria'/></span>
                                <button className="btn btn-danger btn-sm fload-end mx-2" onClick={()=>Delete(item.id)}>Eliminar</button>
                                <button className="btn btn-warning btn-sm fload-end" onClick={()=>Edit(item)}>Editar</button>
                            </li>
                         ))
                   }
                    
                </ul>
            </div>
            <div className="col-4">
                <h4 className="text-center">{ editing ? 'Editar Aspirante': 'Crear Aspirante'}</h4>
                <form onSubmit={editing ? editElement : saveElements}>
                    <input required type="text" className="form-control mb-2" placeholder='Ingresar Nombre' value = {Element} onChange={(e)=>setElement(e.target.value)} />
                    <input required type="text" className="form-control mb-2" placeholder='Ingresar Apellido'value = {apellido} onChange={(e)=>setApellido(e.target.value)}/>
                    <input required type="text" className="form-control mb-2" placeholder='Ingresar Sexo' value = {sexo} onChange={(e)=>setSexo(e.target.value)} />
                    <input required type="number" className="form-control mb-2" placeholder='Ingresar Documento'value = {documento} onChange={(e)=>setDocumento(e.target.value)}/>
                    <input required type="text" className="form-control mb-2" placeholder='Ingresar Email' value = {email} onChange={(e)=>setEmail(e.target.value)} />
                    <input required type="number" className="form-control mb-2" placeholder='Ingresar Teléfono'value = {telefono} onChange={(e)=>setTelefono(e.target.value)}/>
                    <input required type="text" className="form-control mb-2" placeholder='Ingresar Profesión' value = {profesion} onChange={(e)=>setProfesion(e.target.value)} />
            
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