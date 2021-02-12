import { useState } from 'react'
import { observer } from 'mobx-react-lite'

const TodoView = observer(({ todo }) => {
  function handleDoubleClick (ev) {
    todo.toggle()
  }

  function handleRemoveClick (ev) {
    ev.preventDefault()
    todo.remove()
  }

  if (todo.done) {
    return (
      <li onDoubleClick={handleDoubleClick} key={todo.key}>
        <strike>{todo.value}</strike>
        <button onClick={handleRemoveClick}>🗑</button>
      </li>
    )
  } else {
    return (
      <li onDoubleClick={handleDoubleClick} key={todo.key}>
        {todo.value}
        <button onClick={handleRemoveClick}>🗑</button>
      </li>
    )
  }
})

const App = observer(({ store }) => {
  const [todo, setTodo] = useState('')

  function handleSubmit (ev) {
    ev.preventDefault()
    store.addTodo(todo)
    console.log(todo)
    setTodo('')
  }

  return (
    <div className='App'>
      Todos
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>New Todo</legend>
          <input
            name='todo'
            value={todo}
            onChange={ev => setTodo(ev.target.value)}
          />
          <button>Add</button>
        </fieldset>
      </form>
      <ul>{store.todos.map(todo => (
        <TodoView
          key={todo.key}
          todo={todo}
        />
      ))}
      </ul>
      <p>
        {store.itemsLeft} item(s) left
      </p>
    </div>
  )
})

export default App
