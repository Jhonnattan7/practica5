import { useUIStore } from '../../store/uiStore';
import { isOverdue } from '../../utils/dateHelpers';

export default function TaskStats({ tasks }) {
  const { theme } = useUIStore();
  // Calcular estadísticas
  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  const pending = tasks.filter(t => !t.completed).length;
  const overdue = tasks.filter(t => isOverdue(t.dueDate, t.completed)).length;
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  const stats = [
    {
      id: 'total',
      label: 'Total de tareas',
      value: total,
      color: 'blue',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      )
    },
    {
      id: 'completed',
      label: 'Completadas',
      value: completed,
      color: 'green',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600',
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      id: 'pending',
      label: 'Pendientes',
      value: pending,
      color: 'yellow',
      bgColor: 'bg-yellow-50',
      textColor: 'text-yellow-600',
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      id: 'overdue',
      label: 'Vencidas',
      value: overdue,
      color: 'red',
      bgColor: 'bg-red-50',
      textColor: 'text-red-600',
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      )
    },
    {
      id: 'percentage',
      label: 'Completitud',
      value: `${percentage}%`,
      color: 'purple',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600',
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      )
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
      {stats.map((stat) => (
        <div
          key={stat.id}
          className={`rounded-lg p-6 border ${
            theme === 'dark'
              ? 'bg-gray-800 border-gray-700'
              : `${stat.bgColor} border-${stat.color}-200`
          }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                {stat.label}
              </p>
              <p className={`text-3xl font-bold ${stat.textColor}`}>
                {stat.value}
              </p>
            </div>
            <div className={stat.textColor}>
              {stat.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
