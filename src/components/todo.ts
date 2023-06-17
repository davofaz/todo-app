export interface Todo  {
    id: string;
    text: string;
    completed: boolean;
    selectedColor: string;
    backgroundColor: string;
};

export interface TaskListProps {
    todos: Todo[];
}

export type HeaderProps = {
    todos: Todo[];
    handleFormSubmit: (e: React.FormEvent) => void;
    newTodo: string;
    setNewTodo: React.Dispatch<React.SetStateAction<string>>;
}
