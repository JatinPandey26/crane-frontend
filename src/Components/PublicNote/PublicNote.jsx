import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context/AuthContext';
import './PublicNote.scss'
const PublicNote = ({ note }) => {
    const navigate = useNavigate();

    const queryClient = useQueryClient();

    const { user } = useContext(UserContext);

    const { isLoading, error, data: owner } = useQuery({
        queryKey: [note._id],
        queryFn: async () => {

            return await axios.get('http://localhost:8080/users/' + note.createdBy, { withCredentials: true });
        }
        ,
        enabled: !!note
    })



    const mutation = useMutation({
        mutationFn: async (id) => {
            const res = await axios.put(`http://localhost:8080/notes/like/${id}`, {}, { withCredentials: true })
            console.log(
                res
            );
            return res;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['publicnotes']);

        },
        onError: (err) => {
            console.log(err);
        }
    })


    const handleLike = async () => {
        mutation.mutate(note._id)
    }


    return (
        <div className='note'>
            <h3 className='scroll'>{note.title}</h3>
            <p className='scroll'>{note.description}</p>
            <div className="bottom">
                <span>{isLoading ? '...Loading' : error ? 'something went wrong' : owner.data.username}</span>
                <button onClick={handleLike}><img src={note?.likedBy.includes(user?._id.toString()) ? '/heartred.png' : '/blackheart.png'} alt="" /> </button>
                <span>{note.likedBy.length}</span>
            </div>
        </div>
    )
}

export default PublicNote