// src/context/AppDataContext.tsx
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { storage, ref, getDownloadURL } from '../firebaseConfig';

// Define MasterData with arrays instead of objects
interface MasterData {
  students: any[];
  courses: any[];
  enrollments: any[];
  pods: any[];
  semesters: any[];
  staff: any[];
}

interface AppDataContextType {
  data: MasterData | null;
  loading: boolean;
}

const AppDataContext = createContext<AppDataContextType>({
  data: null,
  loading: true,
});

export const useAppData = () => useContext(AppDataContext);

interface AppDataProviderProps {
  children: ReactNode;
}

export const AppDataProvider = ({ children }: AppDataProviderProps) => {
  const [data, setData] = useState<MasterData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const url = await getDownloadURL(ref(storage, 'appdata/wsu-roar.json'));
        const response = await fetch(url);
        const rawData = await response.json();

        const result: MasterData = {
          students: [],
          courses: [],
          enrollments: [],
          pods: [],
          semesters: [],
          staff: [],
        };

        // Helper function to convert tables into arrays
        const populateTable = (entry: any, key: keyof MasterData, idField: string) => {
          result[key] = Object.values(
            entry.data.reduce((acc: Record<string, any>, item: any) => {
              acc[item[idField]] = item;
              return acc;
            }, {})
          );
        };

        rawData.forEach((entry: any) => {
          if (entry.type === 'table') {
            switch (entry.name) {
              case 'Students':
                populateTable(entry, 'students', 'student_id');
                break;
              case 'Courses':
                populateTable(entry, 'courses', 'course_id');
                break;
              case 'Enrollments':
                populateTable(entry, 'enrollments', 'enrollment_id');
                break;
              case 'Pods':
                populateTable(entry, 'pods', 'pod_id');
                break;
              case 'Semesters':
                populateTable(entry, 'semesters', 'semester_id');
                break;
              case 'Staff':
                populateTable(entry, 'staff', 'staff_id');
                break;
              default:
                console.warn(`Unknown table: ${entry.name}`);
            }
          }
        });

        setData(result);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return (
    <AppDataContext.Provider value={{ data, loading }}>
      {children}
    </AppDataContext.Provider>
  );
};
