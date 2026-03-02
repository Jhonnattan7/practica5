import AppRouter from "./routes/AppRouter";
import { Toaster } from 'react-hot-toast';
import { useUIStore } from './store/uiStore';

function App() {
  const { theme } = useUIStore();
  
  return (
    <>
      <AppRouter />
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 3000,
          className: theme === 'dark' ? 'bg-gray-800 text-white' : '',
          style: {
            background: theme === 'dark' ? '#1f2937' : '#fff',
            color: theme === 'dark' ? '#fff' : '#363636',
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: '#10b981',
              secondary: '#fff',
            },
          },
          error: {
            duration: 4000,
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />
    </>
  );
}

export default App;
