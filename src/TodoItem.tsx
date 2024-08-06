import React from 'react';

interface Todo {
    id: number;
    text: string;
    progress: 'todo' | 'in-progress' | 'done';
}

interface TodoItemProps {
    todo: Todo;
    onUpdateProgress: (id: number, progress: 'todo' | 'in-progress' | 'done') => void;
    onDelete: (id: number) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onUpdateProgress, onDelete }) => {
    const progressColors = {
        'todo': 'bg-red-200',
        'in-progress': 'bg-yellow-200',
        'done': 'bg-green-200',
    };

    return (
        <div className={`flex items-center justify-between p-4 mb-2 rounded-lg ${progressColors[todo.progress]}`}>
            <span className="flex-grow">{todo.text}</span>
            <select
                value={todo.progress}
                onChange={(e) => onUpdateProgress(todo.id, e.target.value as 'todo' | 'in-progress' | 'done')}
                className="mr-2 p-1 rounded"
            >
                <option value="todo">Todo</option>
                <option value="in-progress">In Progress</option>
                <option value="done">Done</option>
            </select>
            <button
                onClick={() => onDelete(todo.id)}
                className="bg-red-500 text-white p-1 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
            >
                Delete
            </button>
        </div>
    );
};

export default TodoItem;