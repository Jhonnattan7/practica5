import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useAuthStore } from '../../store/authStore';
import { useUIStore } from '../../store/uiStore';
import { createTask, updateTask } from '../../services/taskService';
import { CATEGORIES, PRIORITIES } from '../../utils/constants';

export default function TaskForm({ onClose, taskToEdit = null }) {
  const user = useAuthStore((state) => state.user);
  const { theme } = useUIStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Determinar si estamos en modo edición
  const isEditing = !!taskToEdit;
  
  // Preparar valores por defecto
  const defaultValues = taskToEdit ? {
    title: taskToEdit.title,
    description: taskToEdit.description || '',
    category: taskToEdit.category,
    priority: taskToEdit.priority,
    // Convertir Date a formato YYYY-MM-DD para el input
    dueDate: taskToEdit.dueDate 
      ? taskToEdit.dueDate.toISOString().split('T')[0] 
      : ''
  } : {
    title: '',
    description: '',
    category: 'other',
    priority: 'medium',
    dueDate: ''
  };
  
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues
  });
  
  const onSubmit = async (data) => {
    setLoading(true);
    setError('');
    
    const taskData = {
      title: data.title,
      description: data.description,
      category: data.category,
      priority: data.priority,
      dueDate: data.dueDate ? new Date(data.dueDate) : null
    };
    
    let result;
    
    if (isEditing) {
      // Modo edición: actualizar tarea existente
      result = await updateTask(taskToEdit.id, taskData);
      
      if (result.success) {
        toast.success('Tarea actualizada correctamente');
        onClose();
      } else {
        toast.error('Error al actualizar la tarea');
        setError('Error al actualizar la tarea');
      }
    } else {
      // Modo creación: crear nueva tarea
      result = await createTask(user.uid, taskData);
      
      if (result.success) {
        toast.success('Tarea creada correctamente');
        onClose();
      } else {
        toast.error('Error al crear la tarea');
        setError('Error al crear la tarea');
      }
    }
    
    setLoading(false);
  };
  
  return (
    <div className={`rounded-lg shadow-md p-6 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
      {/* Header del formulario */}
      <div className="flex justify-between items-center mb-4">
        <h3 className={`text-xl font-bold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'}`}>
          {isEditing ? 'Editar Tarea' : 'Nueva Tarea'}
        </h3>
        <button
          onClick={onClose}
          className={`text-2xl leading-none ${theme === 'dark' ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700'}`}
        >
          &times;
        </button>
      </div>
      
      {error && (
        <div className={`px-4 py-3 rounded-lg mb-4 ${
          theme === 'dark'
            ? 'bg-red-900/30 border border-red-800 text-red-300'
            : 'bg-red-50 border border-red-200 text-red-700'
        }`}>
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Campo: Título */}
        <div>
          <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
            Título *
          </label>
          <input
            type="text"
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none ${
              theme === 'dark' 
                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                : 'bg-white border-gray-300 text-gray-900'
            }`}
            placeholder="Ej: Completar informe mensual"
            {...register('title', {
              required: 'El título es obligatorio',
              minLength: {
                value: 3,
                message: 'Mínimo 3 caracteres'
              }
            })}
          />
          {errors.title && (
            <p className={`text-sm mt-1 ${theme === 'dark' ? 'text-red-400' : 'text-red-500'}`}>{errors.title.message}</p>
          )}
        </div>
        
        {/* Campo: Descripción */}
        <div>
          <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
            Descripción
          </label>
          <textarea
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none ${
              theme === 'dark'
                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                : 'bg-white border-gray-300 text-gray-900'
            }`}
            rows="3"
            placeholder="Descripción detallada de la tarea..."
            {...register('description')}
          />
        </div>
        
        {/* Grid de 3 columnas: Categoría, Prioridad, Fecha */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              Categoría *
            </label>
            <select
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none ${
                theme === 'dark'
                  ? 'bg-gray-700 border-gray-600 text-white'
                  : 'bg-white border-gray-300 text-gray-900'
              }`}
              {...register('category', { required: true })}
            >
              {CATEGORIES.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              Prioridad *
            </label>
            <select
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none ${
                theme === 'dark'
                  ? 'bg-gray-700 border-gray-600 text-white'
                  : 'bg-white border-gray-300 text-gray-900'
              }`}
              {...register('priority', { required: true })}
            >
              {PRIORITIES.map((priority) => (
                <option key={priority.id} value={priority.id}>
                  {priority.label}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              Fecha de vencimiento
            </label>
            <input
              type="date"
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none ${
                theme === 'dark'
                  ? 'bg-gray-700 border-gray-600 text-white'
                  : 'bg-white border-gray-300 text-gray-900'
              }`}
              {...register('dueDate')}
            />
          </div>
        </div>
        
        {/* Botones de acción */}
        <div className="flex gap-3 justify-end">
          <button
            type="button"
            onClick={onClose}
            className={`font-semibold py-2 px-4 rounded-lg transition-colors ${
              theme === 'dark'
                ? 'bg-gray-700 hover:bg-gray-600 text-gray-200'
                : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
            }`}
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors disabled:opacity-50"
          >
            {loading 
              ? (isEditing ? 'Actualizando...' : 'Guardando...') 
              : (isEditing ? 'Actualizar' : 'Crear Tarea')
            }
          </button>
        </div>
      </form>
    </div>
  );
}
