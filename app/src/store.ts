import {create} from 'zustand';

interface Task {
    id: string;
    name: string;
    status: 'in-progress' | 'done';
}

interface TaskStore {
    tasks: Task[];
    addTask: (name: string) => void;
    toggleTask: (id: string) => void;
    deleteTask: (id: string) => void;
    editTask: (id: string, name: string) => void;
}

export const useTaskStore = create<TaskStore>((set) => ({
    tasks: [],
    addTask: (name) => set((state) => ({
        tasks: [...state.tasks, { id: Date.now().toString(), name, status: 'in-progress' }]
    })),
    toggleTask: (id) => set((state) => ({
        tasks: state.tasks.map(task =>
            task.id === id ? { ...task, status: task.status === 'done' ? 'in-progress' : 'done' } : task
        )
    })),
    deleteTask: (id) => set((state) => ({
        tasks: state.tasks.filter(task => task.id !== id)
    })),
    editTask: (id, name) => set((state) => ({
        tasks: state.tasks.map(task =>
            task.id === id ? { ...task, name } : task
        )
    })),
}));
