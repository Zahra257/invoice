import './addClient.css'
import React, {useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import Axios from 'axios'





const AddClient = () => {
    const [name, setname] = useState('')
    const [Rc, setRc] = useState('')
    const [adress, setAdress] = useState('')
    const [Error, setErrorBack] = useState('')
    const [Msg, setMsg] = useState('')

    

const addClient =  (e) => {
  e.preventDefault();
    Axios.post(`http://localhost:7000/AddClient`, {name , Rc , adress})
      .then(response => {
        setErrorBack('')
        setMsg(response.data.message)
console.log(Msg)
      }
      )

      .catch(error => {
        {
          setMsg('')
          setErrorBack(error.response.data.message)
        }
      })}


        return (
        <>
         <form>
    <input type="text" id="le nom" name="name" placeholder="le nom"  onChange={(e)=> setname(e.target.value)}/>
    <input type="text" id="RC" name="Rc" placeholder="RC" onChange={(e)=> setRc(e.target.value)}/>
    <input type="text" id="adress" name="adress" placeholder="Adresse" onChange={(e)=> setAdress(e.target.value)}/>
    <button type="submit" value="Submit" onClick={addClient}>add </button>
        </form>
        </>
    )



}
export default AddClient