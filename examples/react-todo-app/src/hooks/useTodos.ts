import { useState, useCallback, useEffect } from 'react';
import { Todo, FilterType } from '../types';

const STORAGE_KEY = 'todos';

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  });

  const [filter, setFilter] = useState<FilterType>('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Save to localStorage whenever todos change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  const addTodo = useCallback((todo: Omit<Todo, 'id' | 'createdAt'>) => {
    const newTodo: Todo = {
      ...todo,
      id: Date.now().toString(),
      createdAt: new Date(),
    };
    setTodos((prev) => [newTodo, ...prev]);
    return newTodo;
  }, []);

  const updateTodo = useCallback((id: string, updates: Partial<Todo>) => {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, ...updates } : todo))
    );
  }, []);

  const deleteTodo = useCallback((id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  }, []);

  const toggleTodo = useCallback((id: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }, []);

  const clearCompleted = useCallback(() => {
    setTodos((prev) => prev.filter((todo) => !todo.completed));
  }, []);

  const filteredTodos = todos.filter((todo) => {
    // Filter by status
    if (filter === 'active' && todo.completed) return false;
    if (filter === 'completed' && !todo.completed) return false;

    // Filter by search term
    if (searchTerm.trim()) {
      const search = searchTerm.toLowerCase();
      return (
        todo.title.toLowerCase().includes(search) ||
        todo.description?.toLowerCase().includes(search)
      );
    }

    return true;
  });

  const stats = {
    total: todos.length,
    completed: todos.filter((todo) => todo.completed).length,
    active: todos.filter((todo) => !todo.completed).length,
  };

  return {
    todos: filteredTodos,
    allTodos: todos,
    addTodo,
    updateTodo,
    deleteTodo,
    toggleTodo,
    clearCompleted,
    filter,
    setFilter,
    searchTerm,
    setSearchTerm,
    stats,
  };
};
