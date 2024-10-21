// This file makes sure the user is logged in. If not, it redirects them to the login page
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
