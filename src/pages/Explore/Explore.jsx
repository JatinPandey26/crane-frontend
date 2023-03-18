import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import PublicNote from '../../Components/PublicNote/PublicNote'
import './Explore.scss'
const Explore = () => {
    const { isLoading, error, data: res, refetch } = useQuery({
        queryKey: ['publicnotes'],
        queryFn: async () => {
            return await axios.get(`https://crane-backend.vercel.app/notes/public/`, { withCredentials: true })
        }
    })
    return (
        <div className='explore'>
            <h1>Explore Other's Notes</h1>
            <div className="notes-container">
                {
                    isLoading ? '...loading' : error ? '...something went wrong' : (
                        res.data.map((note, index) => <PublicNote key={index} note={note} />)
                    )
                }
            </div>
        </div>
    )
}

export default Explore