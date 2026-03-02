import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { updateTask, deleteTask } from '../../services/taskService';
import { useUIStore } from '../../store/uiStore';
import { CATEGORIES } from '../../utils/constants';
import { getDueDateLabel, isOverdue } from '../../utils/dateHelpers';

export default function TaskCard({ task }) {
  const { theme } = useUIStore();
  const category = CATEGORIES.find(c => c.id === task.category);
  
  const handleToggleComplete = async (e) => {
    e.preventDefault(); // Evitar que el Link navegue
    try {
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
    } catch (error) {
      console.error('Error al actualizar tarea:', error);
      toast.error('Error al actualizar la tarea');
    }
  };
  
  const handleDelete = async (e) => {
    e.preventDefault();
    if (window.confirm('¿Estás seguro de que deseas eliminar esta tarea?')) {
      try {
        const result = await deleteTask(task.id);
        
        if (result.success) {
          toast.success('Tarea eliminada correctamente');
        } else {
          toast.error('Error al eliminar la tarea');
        }
      } catch (error) {
        console.error('Error al eliminar tarea:', error);
        toast.error('Error al eliminar la tarea');
      }
    }
  };
  
  const dueDateLabel = getDueDateLabel(task.dueDate);
  const overdueTask = isOverdue(task.dueDate, task.completed);
  
  return (
    <Link to={`/tasks/${task.id}`} className="block">
      <div 
        className={`card hover:shadow-lg transition-shadow ${
          task.completed ? 'opacity-60' : ''
        } ${
          overdueTask ? 'border-2 border-red-500' : ''
        }`}
      >
        <div className="flex justify-between items-start gap-4">
          {/* Contenido principal */}
          <div className="flex-1">
            {/* Título */}
            <h3 className={`text-lg font-semibold mb-2 ${
              task.completed 
                ? `line-through ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}` 
                : theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
            }`}>
              {task.title}
            </h3>
            
            {/* Descripción */}
            {task.description && (
              <p className={`text-sm mb-3 line-clamp-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                {task.description}
              </p>
            )}
            
            {/* Información adicional */}
            <div className="flex flex-wrap gap-2 items-center">
              {/* Categoría */}
              {category && (
                <span 
                  className={`px-3 py-1 rounded-full text-xs font-medium bg-${category.color}-100 text-${category.color}-800`}
                >
                  {category.label}
                </span>
              )}
              
              {/* Fecha de vencimiento */}
              {dueDateLabel && (
                <span 
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    overdueTask 
                      ? 'bg-red-100 text-red-800' 
                      : dueDateLabel === 'Hoy' 
                        ? 'bg-orange-100 text-orange-800'
                        : dueDateLabel === 'Mañana'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {dueDateLabel}
                </span>
              )}
              
              {/* Estado */}
              <span 
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  task.completed 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-blue-100 text-blue-800'
                }`}
              >
                {task.completed ? 'Completada' : 'Pendiente'}
              </span>
            </div>
          </div>
          
          {/* Botones de acción */}
          <div className="flex flex-col gap-2">
            {/* Botón toggle completado */}
            <button
              onClick={handleToggleComplete}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                task.completed
                  ? theme === 'dark'
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  : theme === 'dark'
                    ? 'bg-green-500 text-white hover:bg-green-600'
                    : 'bg-green-600 text-white hover:bg-green-700'
              }`}
              title={task.completed ? 'Marcar como pendiente' : 'Marcar como completada'}
            >
              {task.completed ? '↶' : '✓'}
            </button>
            
            {/* Botón eliminar */}
            <button
              onClick={handleDelete}
              className={`px-3 py-2 rounded-lg text-sm font-medium text-white transition-colors ${
                theme === 'dark' ? 'bg-red-500 hover:bg-red-600' : 'bg-red-600 hover:bg-red-700'
              }`}
              title="Eliminar tarea"
            >
              🗑
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
