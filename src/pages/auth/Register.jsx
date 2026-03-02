import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { registerUser } from '../../services/authService';
import { useAuthStore } from '../../store/authStore';
import { useUIStore } from '../../store/uiStore';

export default function Register() {
  const navigate = useNavigate();
  const setUser = useAuthStore((state) => state.setUser);
  const { theme } = useUIStore();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    setError('');

    const result = await registerUser(data.email, data.password, data.displayName);

    if (result.success) {
      setUser(result.user);
      navigate('/dashboard');
    } else {
      setError(result.error);
    }

    setLoading(false);
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 ${
      theme === 'dark'
        ? 'bg-gradient-to-br from-gray-900 to-gray-800'
        : 'bg-gradient-to-br from-blue-50 to-indigo-100'
    }`}>
      <div className={`rounded-lg shadow-md p-6 max-w-md w-full ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
        <h2 className={`text-3xl font-bold text-center mb-6 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'}`}>
          Crear Cuenta
        </h2>

        {error && (
          <div className={`px-4 py-3 rounded mb-4 ${
            theme === 'dark'
              ? 'bg-red-900/30 border border-red-800 text-red-300'
              : 'bg-red-100 border border-red-400 text-red-700'
          }`}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Campo Nombre Completo */}
          <div>
            <label className={`block font-semibold mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              Nombre Completo
            </label>
            <input
              type="text"
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none ${
                theme === 'dark'
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                  : 'bg-white border-gray-300 text-gray-900'
              }`}
              placeholder="Tu nombre completo"
              {...register('displayName', {
                required: 'El nombre es obligatorio',
                minLength: {
                  value: 3,
                  message: 'El nombre debe tener al menos 3 caracteres'
                }
              })}
            />            {errors.displayName && (
              <p className={`text-sm mt-1 ${theme === 'dark' ? 'text-red-400' : 'text-red-500'}`}>
                {errors.displayName.message}
              </p>
            )}
          </div>

          {/* Campo Email */}
          <div>
            <label className={`block font-semibold mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              Correo Electrónico
            </label>
            <input
              type="email"
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none ${
                theme === 'dark'
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                  : 'bg-white border-gray-300 text-gray-900'
              }`}
              placeholder="correo@ejemplo.com"
              {...register('email', {
                required: 'El correo es obligatorio',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Formato de correo inválido'
                }
              })}
            />
            {errors.email && (
              <p className={`text-sm mt-1 ${theme === 'dark' ? 'text-red-400' : 'text-red-500'}`}>
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Campo Contraseña */}
          <div>
            <label className={`block font-semibold mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              Contraseña
            </label>
            <input
              type="password"
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none ${
                theme === 'dark'
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                  : 'bg-white border-gray-300 text-gray-900'
              }`}
              placeholder="Mínimo 6 caracteres"
              {...register('password', {
                required: 'La contraseña es obligatoria',
                minLength: {
                  value: 6,
                  message: 'La contraseña debe tener al menos 6 caracteres'
                }
              })}
            />
            {errors.password && (
              <p className={`text-sm mt-1 ${theme === 'dark' ? 'text-red-400' : 'text-red-500'}`}>
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Botón de Registro */}
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors w-full"
          >
            {loading ? 'Registrando...' : 'Crear Cuenta'}
          </button>
        </form>

        {/* Enlace a Login */}
        <p className={`text-center mt-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
          ¿Ya tienes cuenta?{' '}
          <Link to="/login" className={`hover:underline font-semibold ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>
            Inicia sesión aquí
          </Link>
        </p>
      </div>
    </div>
  );
} 