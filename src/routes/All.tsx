import React from 'react';
import { useLiveQuery } from 'dexie-react-hooks';

import Add from '../components/Add';
import TodoElem from '../components/TodoElem';

import { db, Todo } from '../db';

export default function All() {
    const todos = useLiveQuery(
        () => db.todos.orderBy('completed').toArray()
    );

    return (
      <>
        <Add />
        <div className="todo-list">
          {todos?.map((todo: Todo) => 
            <TodoElem
              key={todo.id}
              item={todo}
            />
          )}
        </div>
      </>
    );
}
