// ProtectedRoute.tsx
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const history = useHistory();

  useEffect(() => {
    const student = localStorage.getItem('student');
    if (!student) {
      history.push('/login');
    }
  }, [history]);

  return <>{children}</>;
};

export default ProtectedRoute;
