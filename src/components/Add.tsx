import { useState, useEffect } from 'react';
import { db } from '../db';

interface AddProps {
}

export default function Add(props: AddProps) {
    const [todoInput, setTodoInput] = useState('');

    async function AddTodo(task: string) {
        try {
            const id = await db.todos.add({
                completed: 0,
                name: task
            });
        } catch (err) {
            console.log(`Failed to add todo: ${err}`);
        }
    }

    function handleTodoInput(event: React.ChangeEvent<HTMLInputElement>) {
        setTodoInput(event.currentTarget?.value);
    }

    function handleSubmit(event: React.ChangeEvent<HTMLFormElement>) {
        event.preventDefault();

        AddTodo(todoInput);

        setTodoInput('');
    }

    return (
        <form className="add-todo" onSubmit={handleSubmit}>
          <input id="add-item" type="text" placeholder="add details" onChange={handleTodoInput} value={todoInput} />
          <button className="btn-primary" type="submit">Add</button>
        </form>
    );
}
