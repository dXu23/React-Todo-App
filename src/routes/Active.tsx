// import React from 'react-dom';
import React, { useState, useEffect } from 'react';
import { db, Todo } from '../db';
import TodoElem from '../components/TodoElem';
import { useLiveQuery } from 'dexie-react-hooks';
import Add from '../components/Add';

export default function Active() {
    const activeTodos = useLiveQuery(
        async () => {
            const activeTodos = await db.todos
                .filter((todo: Todo) => !todo.completed)
                .toArray();

            return activeTodos;
        }
    );

    return (
      <>
        <Add />
        <div className="todo-list">
          {activeTodos?.map((item: Todo) =>
            <TodoElem
              key={item.id}
              item={item}
            />
          )}
        </div>
      </>
    );
}
