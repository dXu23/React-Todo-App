import React from 'react';
import { useLiveQuery } from 'dexie-react-hooks';

import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

import { db, Todo } from '../db';
import TodoElem from '../components/TodoElem';

export default function Completed() {
    const btnStyles = {
      display: 'flex',
      marginLeft: 'auto',
      flexDirection: 'row' as const,
      alignItems: 'center'
    };

    const completedTodos = useLiveQuery(
        async () => {
            const completedTodos = await db.todos
                .filter((todo: Todo) => Boolean(todo.completed))
                .toArray();

            return completedTodos;
        }
    );

    async function clearCompleted() {
        await db.todos.filter((todo: Todo) => Boolean(todo.completed)).delete();
    }

    return (
      <>
        <div className="todo-list">
          {completedTodos?.map((item: Todo) =>
            <TodoElem
              key={item.id}
              item={item}
              isInCompleted={true}
            />
          )}
        </div>
        <button className="btn-warning" style={btnStyles} onClick={clearCompleted}>
          <DeleteOutlinedIcon /> Delete all
        </button>
      </>
    );
}
