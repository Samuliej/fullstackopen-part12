import React from 'react'
import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import Todo from '../src/Todos/Todo'

// Define a test case
describe('Todo component', () => {
  // Mock todo item
  const todo = {
    _id: '1',
    text: 'Test Todo',
    done: false
  }

  const mockCompletedTodo = {
    ...todo,
    done:true
  }

  const mockComplete = jest.fn()
  const mockDelete = jest.fn()

  it('renders Todo text', () => {
    render(<Todo todo={todo} onClickDelete={() => {}} onClickComplete={() => {}} />)
    expect(screen.getByText('Test Todo')).toBeInTheDocument()
  })

  it('displays "This todo is not done" when todo is not completed', () => {
    render(<Todo todo={todo} onClickDelete={() => {}} onClickComplete={() => {}} />)
    expect(screen.getByText('This todo is not done')).toBeInTheDocument()
  })

  it('displays "This todo is done" when todo is completed', () => {
    render(<Todo todo={mockCompletedTodo} onClickDelete={() => {}} onClickComplete={() => {}} />)
    expect(screen.getByText('This todo is done')).toBeInTheDocument()
  })

  it('shows delete button', () => {
    render(<Todo todo={todo} onClickDelete={() => {}} onClickComplete={() => {}} />)
    expect(screen.getByText('Delete')).toBeInTheDocument()
  })

  it('shows "Set as done" button for not completed todos', () => {
    render(<Todo todo={todo} onClickDelete={() => {}} onClickComplete={() => {}} />)
    expect(screen.getByText('Set as done')).toBeInTheDocument()
  })

  it('does not show "Set as done" button for completed todos', () => {
    render(<Todo todo={mockCompletedTodo} onClickDelete={() => {}} onClickComplete={() => {}} />)
    expect(screen.queryByText('Set as done')).toBeNull()
  })

  it('calls onClickDelete when delete button is clicked', () => {
    render(<Todo todo={todo} onClickDelete={mockDelete} onClickComplete={() => {}} />)
    fireEvent.click(screen.getByText('Delete'))
    expect(mockDelete).toHaveBeenCalledWith(todo)
  })

  it('calls onClickComplete when "Set as done" button is clicked', () => {
    render(<Todo todo={todo} onClickDelete={() => {}} onClickComplete={mockComplete} />)
    fireEvent.click(screen.getByText('Set as done'))
    expect(mockComplete).toHaveBeenCalledWith(todo)
  })
})