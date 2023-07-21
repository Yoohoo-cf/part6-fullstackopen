import AnecdoteForm from './components/AnecdoteForm'

import { useQueryClient, useMutation, useQuery } from 'react-query'
import { getAnecdotes, updateAnecdote  } from './requests'

const App = () => {

  const queryClient = useQueryClient()

  const updateAnecdoteMutation = useMutation(updateAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    }
  })
 

  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1})
  }

  const result = useQuery('anecdotes', getAnecdotes, {
    retry: 1
  })

  if ( result.isLoading) {
    return <div>loading date...</div>
  }

  if ( result.isError) {
    return <span>Error: anecdote service is not available due to problems in server</span>
  }

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>
    
  
      <AnecdoteForm />
    
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
     </div>
  )
}

export default App
