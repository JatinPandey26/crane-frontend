import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import './Dashboard.scss'
const Dashboard = () => {

    const queryClient = useQueryClient();

    const { isLoading, error, data } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const { data } = await axios.get('https://crane-backend.vercel.app/admin/users', { withCredentials: true });
            return data;
        }
    })

    const { isLoading: notesLoading, error: notesError, data: notes } = useQuery({
        queryKey: ['notesAdmin'],
        queryFn: async () => {
            const { data } = await axios.get('https://crane-backend.vercel.app/admin/notes', { withCredentials: true });
            return data;
        }
    })

    const mutationRole = useMutation({
        mutationKey: ['changeRole'],
        mutationFn: async (userId) => {
            return await axios.put('https://crane-backend.vercel.app/admin/user/' + userId, {}, { withCredentials: true })
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['users'])
        }
    })

    const mutationDeleteUser = useMutation({
        mutationKey: ['deleteUser'],
        mutationFn: async (userId) => {
            return await axios.delete('https://crane-backend.vercel.app/admin/user/' + userId, { withCredentials: true })
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['users'])
        }
    })


    const mutationDeleteNote = useMutation({
        mutationKey: ['deleteNote'],
        mutationFn: async (noteId) => {
            return await axios.delete('https://crane-backend.vercel.app/admin/note/' + noteId, { withCredentials: true })
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['notesAdmin'])
        }
    })

    const handleRoleToggle = (userId) => {
        mutationRole.mutate(userId)
    }

    const handleDeleteUser = (userId) => {
        mutationDeleteUser.mutate(userId)
    }

    const handleDeleteNote = (noteId) => {
        mutationDeleteNote.mutate(noteId)
    }
    return (
        <div className='dashboard'>
            <h1>Dashboard</h1>
            <h2>Users</h2>
            <p>* admin cannot be deleted or changed to user . Request dev team for any help</p>
            <div className="table-container">
                <table>
                    <tr>
                        <th>Id</th>
                        <th>Username</th>
                        <th>Role</th>
                        <th>Change Role</th>
                        <th>Delete</th>
                    </tr>
                    {
                        isLoading ? '...loading' : error ? 'something went wrong' : data.map((user, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{user.username}</td>
                                <td>{user.isAdmin ? 'Admin' : 'User'}</td>
                                <td> <button onClick={e => handleRoleToggle(user._id)}>{!user.isAdmin ? 'Admin' : 'User'}</button></td>
                                <td><button onClick={e => handleDeleteUser(user._id)} style={{ background: 'rgb(229, 104, 104)' }}>Delete</button></td>
                            </tr>
                        ))
                    }
                </table>
            </div>


            <h2>Notes</h2>

            <div className="table-container">
                <table className='noteTable'>
                    <tr>
                        <th>Id</th>
                        <th>Title</th>
                        <th>Access</th>
                        <th>Delete</th>

                    </tr>
                    {
                        notesLoading ? '...loading' : notesError ? 'something went wrong' : notes.map((note, index) => (
                            <tr key={index} >
                                <td>{index + 1}</td>
                                <td>{note.title}</td>
                                <td>{note.isPublic ? 'Public' : 'Private'}</td>

                                <td><button onClick={e => handleDeleteNote(note._id)} style={{ background: 'rgb(229, 104, 104)' }}>Delete</button></td>
                            </tr>
                        ))
                    }
                </table>
            </div>
        </div>
    )
}

export default Dashboard