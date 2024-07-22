import PropTypes from 'prop-types'
import Todo from './Todo'

const TodoList = ({ todos, deleteTodo, completeTodo }) => {
  const onClickDelete = (todo) => () => {
    deleteTodo(todo)
  }

  const onClickComplete = (todo) => () => {
    completeTodo(todo)
  }

  return (
    <>
      {todos.map(todo => (
        <Todo
          key={todo._id}
          todo={todo}
          onClickDelete={onClickDelete}
          onClickComplete={onClickComplete}
        />
      )).reduce((acc, cur, index) => [...acc, <hr key={index} />, cur], [])}
    </>
  )
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      done: PropTypes.bool.isRequired,
    })
  ).isRequired,
  deleteTodo: PropTypes.func.isRequired,
  completeTodo: PropTypes.func.isRequired,
}

export default TodoList