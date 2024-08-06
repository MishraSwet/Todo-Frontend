import React, { useState } from 'react';
import TodoForm from './TodoForm';
import TodoItem from './TodoItem';

interface Todo {
  id: number;
  text: string;
  progress: 'todo' | 'in-progress' | 'done';
}

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: Date.now(),
      text,
      progress: 'todo',
    };
    setTodos([...todos, newTodo]);
  };

  const updateProgress = (id: number, progress: 'todo' | 'in-progress' | 'done') => {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, progress } : todo));
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-3xl font-bold mb-4">Todo App</h1>
      <TodoForm onAdd={addTodo} />
      <div className="mt-4">
        {todos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onUpdateProgress={updateProgress}
            onDelete={deleteTodo}
          />
        ))}
      </div>
    </div>
  );
};

export default App;