import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios'
import React from 'react'
import { useNavigate } from 'react-router-dom';
import './Note.scss'
const Note = ({ note }) => {
    const navigate = useNavigate();

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async(id) => {
            return await axios.delete(`http://localhost:8080/notes/delete/${id}`, { withCredentials: true })
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['notes'])
          
        }
    })


    const mutationToggle = useMutation({
        mutationFn: (id) => {
            return axios.put(`http://localhost:8080/notes/${id}`, {}, { withCredentials: true })
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['notes'])
       
        }
    })

    const handleDelete = async () => {

        mutation.mutate(note._id)

    }

    const handleToggle = async () => {
        mutationToggle.mutate(note._id)
    }
    return (
        <div className='note'>
            <h3 className='scroll'>{note?.title}</h3>
            <p className='scroll'>{note?.description}</p>
            <div className="bottom">
                <button onClick={handleToggle}><span>{note?.isPublic ? 'Public' : 'Private'}</span></button>
                <button onClick={handleDelete}><img src="/delete.png" alt="" /></button>
            </div>
        </div>
    )
}

export default Note