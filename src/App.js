import logo from './logo.svg'
import './App.css'

import '../node_modules/antd/dist/antd.css'

import { useState } from 'react'
import { observer } from 'mobx-react-lite'

import { Input } from 'antd'

import { ArrowDownOutlined } from '@ant-design/icons'

import TodoView from '../src/components/TodoView'
import TodoList from '../src/components/TodoList'

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
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        Todos
        <Input
          onPressEnter={handleSubmit}
          style={{ width: 600, height: 55 }}
          placeholder='What needs to be done?'
          prefix={<ArrowDownOutlined />}
          name='todo'
          value={todo}
          onChange={ev => setTodo(ev.target.value)}
        />
        <TodoList
          onChange={ev => setTodo(ev.target.value)}
          itemsLeft={store.itemsLeft}
        >
          {store.todos.map(todo => (
            <TodoView
              key={todo.key}
              todo={todo}
            />
          ))}
        </TodoList>
      </header>
    </div>
  )
})

export default App
