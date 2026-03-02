import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { loginUser } from '../../services/authService';
import { useAuthStore } from '../../store/authStore';
import { useUIStore } from '../../store/uiStore';

export default function Login() {
    const navigate = useNavigate();
    const setUser = useAuthStore((state) => state.setUser);
    const { theme } = useUIStore();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // React Hook Form para manejar el formulario 
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        setLoading(true);
        setError('');

        // Llamar al servicio de autenticación 
        const result = await loginUser(data.email, data.password);

        if (result.success) {
            // Guardar usuario en Zustand y redirigir 
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
                <div className="text-center mb-8">
                    <h1 className={`text-3xl font-bold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'}`}>Task Manager Pro</h1>
                    <p className={`mt-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Inicia sesión para continuar</p>
                </div>

                {/* Mensaje de error */}
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
                    {/* Campo de email */}
                    <div>
                        <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                            Correo electrónico
                        </label>
                        <input
                            type="email"
                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none ${
                                theme === 'dark'
                                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                                  : 'bg-white border-gray-300 text-gray-900'
                            }`}
                            placeholder="tu@email.com"
                            {...register('email', {
                                required: 'El correo es obligatorio',
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: 'Correo inválido'
                                }
                            })}
                        />
                        {errors.email && (
                            <p className={`text-sm mt-1 ${theme === 'dark' ? 'text-red-400' : 'text-red-500'}`}>{errors.email.message}</p>
                        )}
                    </div>

                    {/* Campo de contraseña */}
                    <div>
                        <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                            Contraseña
                        </label>
                        <input
                            type="password"
                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none ${
                                theme === 'dark'
                                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                                  : 'bg-white border-gray-300 text-gray-900'
                            }`}
                            placeholder="••••••••"
                            {...register('password', {
                                required: 'La contraseña es obligatoria',
                                minLength: {
                                    value: 6,
                                    message: 'Mínimo 6 caracteres'
                                }
                            })}
                        />
                        {errors.password && (<p className={`text-sm mt-1 ${theme === 'dark' ? 'text-red-400' : 'text-red-500'}`}>{errors.password.message}</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors w-full disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Iniciando sesión...' : 'Iniciar sesión'}
                    </button>
                </form>

                <p className={`text-center mt-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                    ¿No tienes cuenta?{' '}
                    <Link to="/register" className={`hover:underline font-medium ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>
                        Regístrate aquí
                    </Link>
                </p>
            </div>
        </div>
    );
} 