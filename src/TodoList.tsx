import React, { useState } from 'react';

type Todo = {
    text: string;
    progress: 'Not Started' | 'In Progress' | 'Completed';
};

const TodoList: React.FC = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [newTodo, setNewTodo] = useState<string>('');

    const addTodo = () => {
        if (newTodo.trim() !== '') {
            setTodos([...todos, { text: newTodo, progress: 'Not Started' }]);
            setNewTodo('');
        }
    };

    const deleteTodo = (index: number) => {
        const newTodos = todos.filter((_, i) => i !== index);
        setTodos(newTodos);
    };

    const updateProgress = (index: number, progress: 'Not Started' | 'In Progress' | 'Completed') => {
        const newTodos = todos.map((todo, i) =>
            i === index ? { ...todo, progress } : todo
        );
        setTodos(newTodos);
    };

    const getBackgroundColor = (progress: 'Not Started' | 'In Progress' | 'Completed') => {
        switch (progress) {
            case 'Not Started':
                return 'bg-red-200'; // Light Red
            case 'In Progress':
                return 'bg-yellow-200'; // Light Yellow
            case 'Completed':
                return 'bg-green-200'; // Light Green
            default:
                return 'bg-white';
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6">
            <div className="flex justify-between mb-6">
                <input
                    type="text"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    placeholder="Add a new todo"
                    className="border p-2 flex-1 mr-4 rounded"
                />
                <button
                    onClick={addTodo}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Add
                </button>
            </div>
            <div className="space-y-4">
                {todos.map((todo, index) => (
                    <div
                        key={index}
                        className={`flex items-center p-4 rounded border ${getBackgroundColor(todo.progress)}`}
                    >
                        <select
                            value={todo.progress}
                            onChange={(e) => updateProgress(index, e.target.value as 'Not Started' | 'In Progress' | 'Completed')}
                            className="mr-4 border rounded p-2"
                        >
                            <option value="Not Started">Not Started</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                        </select>
                        <span className="flex-1">{todo.text}</span>
                        <button
                            className="bg-red-500 text-white px-4 py-2 rounded"
                            onClick={() => deleteTodo(index)}
                        >
                            Delete
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TodoList;
