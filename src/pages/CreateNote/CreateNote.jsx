import axios from 'axios'
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../Context/AuthContext'
import './CreateNote.scss'
const CreateNote = () => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const { user } = useContext(UserContext)
    const navigate = useNavigate();
    const submitHandler = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:8080/notes/create', { title, description }, { withCredentials: true });
        alert('Note Created Successfully')
        setTitle('');
        setDescription('');
        navigate('/');
    }
    return (
        <div className='register'>
            <form action="" onSubmit={submitHandler}>
                <h1>ADD NOTE</h1>
                <input type="text" placeholder='title' name="title" value={title} onChange={(e) => setTitle(e.target.value)} />
                <textarea type="text" placeholder='description' name="description" value={description} onChange={(e) => setDescription(e.target.value)} />
                <button type='submit'>Add Note</button>

            </form>
        </div>
    )
}

export default CreateNote