import React, { useContext, useEffect, useState } from 'react'
import Note from '../../Components/Note/Note'
import './Home.scss'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { UserContext } from '../../Context/AuthContext'
import { redirect, useNavigate } from 'react-router-dom'
const Home = () => {

    const [isNewestSort, setNewestSort] = useState(false)
    const [options, setOptions] = useState(false)
    const [search, setsearch] = useState('')
    const { user } = useContext(UserContext);
    const navigate = useNavigate()
    
    

    const { isLoading, error, data: notes, refetch } = useQuery({
        queryKey: ['notes'],
        queryFn: async () => {
            return await axios.get(`http://localhost:8080/notes/my/${user._id}?search=${search}&sort=${isNewestSort}`, { withCredentials: true })
        },
        enabled: !!user
    })

    const resort = (e) => {
        e.preventDefault()
        refetch()
    }

    return (
        <div className='home'>
            <div className="container">
                <form action="">
                    <input type="text" name="" id="" value={search} onChange={(e) => setsearch(e.target.value)} />
                    <button onClick={resort}>Search</button>
                </form>
                <div className="sort">
                    <span>sort by :</span>
                    <strong>{isNewestSort ? 'Newest' : 'Abc'}</strong>
                    <img src="/downarrow.png" alt="" onClick={() => { setOptions(!options) }} />
                    {
                        options && <div className="options">
                            <span onClick={(e) => { setNewestSort(!isNewestSort); resort(e) }}>{!isNewestSort ? 'Newest' : 'Abc'}</span>
                        </div>
                    }
                </div>
            </div>
            <div className="note-container">
                {
                    isLoading ? '...Loading' : error ? 'Something went wrong' : notes.data.map((note, index) => {
                        return <Note key={index} note={note} />
                    })
                }
            </div>
        </div>
    )
}

export default Home