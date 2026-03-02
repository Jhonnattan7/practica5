import { useState } from 'react';
import { useAuthStore } from '../../store/authStore';
import { useTaskStore } from '../../store/taskStore';
import { useUIStore } from '../../store/uiStore';
import { useTasks } from '../../hooks/useTasks';
import TaskStats from '../../components/tasks/TaskStats';
import TaskFilters from '../../components/tasks/TaskFilters';
import TaskList from '../../components/tasks/TaskList';
import TaskForm from '../../components/tasks/TaskForm';
import LoadingSpinner from '../../components/common/LoadingSpinner';

export default function Dashboard() {
  const user = useAuthStore((state) => state.user);
  const { tasks, currentFilter, currentCategory, searchQuery, loading } = useTaskStore();
  const { theme } = useUIStore();
  const [showCreateModal, setShowCreateModal] = useState(false);
  
  // Hook que se suscribe a las tareas en tiempo real
  useTasks();
  
  // Aplicar filtros seleccionados
  const filteredTasks = tasks.filter((task) => {
    // Filtro por estado
    if (currentFilter === 'completed' && !task.completed) return false;
    if (currentFilter === 'pending' && task.completed) return false;
    
    // Filtro por categoría
    if (currentCategory !== 'all' && task.category !== currentCategory) return false;
    
    // Filtro por búsqueda (título o descripción)
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const matchTitle = task.title.toLowerCase().includes(query);
      const matchDescription = task.description?.toLowerCase().includes(query);
      
      if (!matchTitle && !matchDescription) return false;
    }
    
    return true;
  });
  
  if (loading) {
    return <LoadingSpinner />;
  }
  
  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className={`text-3xl font-bold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'}`}>
              Bienvenido, {user?.displayName || 'Usuario'}
            </h1>
            <p className={`mt-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              Tienes {tasks.filter(t => !t.completed).length} tareas pendientes
            </p>
          </div>
          
          {/* Botón para crear nueva tarea */}
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Nueva Tarea
          </button>
        </div>
      </div>
      
      <TaskStats tasks={tasks} />
      
      <TaskFilters />
      
      <TaskList tasks={filteredTasks} />
      
      {/* Modal para crear tarea */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className={`rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
            <TaskForm onClose={() => setShowCreateModal(false)} />
          </div>
        </div>
      )}
    </div>
  );
} 