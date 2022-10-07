import Dexie, { Table } from 'dexie';

export interface Todo {
    id?: number;
    completed: number;
    name: string;
}

export class TodoDexie extends Dexie {
    todos!: Table<Todo>;

    constructor() {
        super('TodoDB');
        this.version(1).stores({
            todos: '++id, completed, name'
        })
    }
}

export const db = new TodoDexie();
