import React from 'react';

import Checkbox from '@mui/material/Checkbox';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { grey } from '@mui/material/colors';

import { db, Todo } from '../db';
import { useLiveQuery } from 'dexie-react-hooks';

interface TodoElemProps {
    item: Todo;
    isInCompleted?: boolean;
}

export default function TodoElem(props: TodoElemProps) {
    const TodoStyles = {
      display: 'flex',
      flexDirection: 'row' as const,
      alignItems: 'center',
      paddingBlock: '0.25em',
      justifyContent: props.isInCompleted ? 'space-between' : 'start'
    };

    const labelStyles = {
        textDecoration: props.item.completed ? 'line-through' : 'none'
    };

    function handleCheckboxChange(event: React.ChangeEvent<HTMLInputElement>) {
        if (props.item.id) {
            db.todos.update(props.item.id, { completed: event.target.checked ? 1 : 0 });
        }
    }

    async function deleteTodo() {
        if (props.item.id) {
            await db.todos.delete(props.item?.id);
        }
    }

    return (
      <div className="todo" style={TodoStyles}>
        <div>
          <input type="checkbox"
            id={props.item?.id?.toString()}
            checked={Boolean(props.item.completed)}
            onChange={handleCheckboxChange}
          />
          <label htmlFor={props.item?.id?.toString()} style={labelStyles} >{props.item.name}</label>
        </div>
        {
           props.isInCompleted && (
             <button onClick={deleteTodo}>
               <DeleteOutlinedIcon sx={{ color: grey['A400'], '&:hover': { color: '#eb5757' } }}/>
             </button>
           )
        }
      </div>
    );
}
