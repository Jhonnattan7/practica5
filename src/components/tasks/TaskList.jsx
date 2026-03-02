import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { updateTask, deleteTask } from '../../services/taskService';
import { useUIStore } from '../../store/uiStore';

export default function TaskList({ tasks }) {
  const { theme } = useUIStore();
  const toggleComplete = async (task) => {
    const newStatus = !task.completed;
    const result = await updateTask(task.id, { completed: newStatus });
    
    if (result.success) {
      if (newStatus) {
        toast.success('Tarea completada ✓');
      } else {
        toast('Tarea marcada como pendiente', { icon: '⏳' });
      }
    } else {
      toast.error('Error al actualizar la tarea');
    }
  };

  const handleDelete = async (taskId) => {
    if (window.confirm('¿Estás seguro de eliminar esta tarea?')) {
      const result = await deleteTask(taskId);
      
      if (result.success) {
        toast.success('Tarea eliminada correctamente');
      } else {
        toast.error('Error al eliminar la tarea');
      }
    }
  };

  if (tasks.length === 0) {
    return (
      <div className={`rounded-lg shadow-md p-6 text-center py-12 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
        <p className={`text-lg ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
          No hay tareas que mostrar
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <div
          key={task.id}
          className={`rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}
        >
          <div className="flex items-start gap-4">
            {/* Checkbox para marcar como completada */}
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleComplete(task)}
              className="mt-1 h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
            />

            {/* Contenido de la tarea */}
            <div className="flex-1">
              <Link to={`/tasks/${task.id}`}>
                <h3 className={`text-lg font-semibold transition-colors ${
                  task.completed 
                    ? `line-through ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}` 
                    : `${theme === 'dark' ? 'text-gray-100 hover:text-blue-400' : 'text-gray-800 hover:text-blue-600'}`
                }`}>
                  {task.title}
                </h3>
              </Link>
              
              {task.description && (
                <p className={`mt-1 text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  {task.description}
                </p>
              )}

              <div className="flex gap-2 mt-2">
                {/* Categoría */}
                <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                  {task.category}
                </span>

                {/* Prioridad */}
                {task.priority && (
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    task.priority === 'high' ? 'bg-red-100 text-red-800' :
                    task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {task.priority === 'high' ? 'Alta' : 
                     task.priority === 'medium' ? 'Media' : 'Baja'}
                  </span>
                )}

                {/* Fecha de vencimiento */}
                {task.dueDate && (
                  <span className="px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">
                    {new Date(task.dueDate).toLocaleDateString('es-ES')}
                  </span>
                )}
              </div>
            </div>

            {/* Botón de eliminar */}
            <button
              onClick={() => handleDelete(task.id)}
              className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
            >
              Eliminar
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
