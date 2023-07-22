import { useDispatch, useSelector } from "react-redux"
import { voteOf } from "../reducers/anecdoteReducer"
import { setNotificationTime} from "../reducers/notificationReducer"

const AnecdoteList = () => {
    const dispatch = useDispatch()

    const filter = useSelector(state => state.filter)
    const anecdotes = useSelector(state => state.anecdotes)

    const filteredAnecdotes = anecdotes.filter(anecdote => {
      return anecdote.content.toLowerCase().includes(filter.toLowerCase())
    })

    const sortedAnecdotes = [...filteredAnecdotes].sort((a, b) => b.votes - a.votes)

     const vote = (id) => {
      dispatch(voteOf(id))
      const anecdoteToVote = anecdotes.find(a => a.id === id)
      dispatch(setNotificationTime(`You voted '${anecdoteToVote.content}'`, 10))
    }

    return (
        <div>
        {sortedAnecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div> 
  )
}

export default AnecdoteList