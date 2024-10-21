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
  getStaffById: (id:string) => any| undefined;
  getPodById: (id:string) => any | undefined;
  getStudentById: (id:string) => any | undefined;
  getStaff: any;
  getEnrollments: (studentId?: string, semesterId?: string) => any[];
  getCurrentSemester: any;
  getCourseById: (id:string) => any | undefined;
  formatTime: (time:string) => any | undefined;
}

const AppDataContext = createContext<AppDataContextType>({
  data: null,
  loading: true,
  getStaffById: () => undefined,
  getPodById: () => undefined,
  getStudentById: () => undefined,
  getStaff: undefined,
  getEnrollments: () => [],
  getCurrentSemester: undefined,
  getCourseById: () => undefined,
  formatTime: () => undefined,
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

  // Helper functions :)
  const getStaffById = (id:string) => data?.staff.find( (s) => s.staff_id === id );

  const getPodById = (id:string) => data?.pods.find( 
    (p) => p.pod_id === id
  );

  const getStudentById = (id:string) => {
    return data?.students.find(
      (s) => s.student_id === id
    );
  }

  const getEnrollments = (studentId?: string, semesterId?: string) => {
    return data?.enrollments.filter((enrollment) => {
      const matchesStudent = studentId ? enrollment.student_id === studentId : true;
      const matchesSemester = semesterId ? enrollment.semester_id === semesterId : true;
      return matchesStudent && matchesSemester;
    }) || [];
  };

  const getCurrentSemester = () => {
    const today = new Date();
    return data?.semesters.find( (semester) => {
      const start = new Date(semester.start_date);
      const end = new Date(semester.end_date);
      return today >= start && today <= end;
    });
  }

  const getStaff = () =>  data?.staff;

  const getCourseById = (id:string) => {
    return data?.courses.find( 
      (c) => c.course_id === id
    );
  }

  const formatTime = (time: string ):string => {
    const [hours, minutes] = time.split(":").map(Number);
    const period = hours >= 12 ? 'PM' : 'AM';
    const standardHours = hours % 12 || 12;
    return `${standardHours}:${minutes.toString().padStart(2, '0')} ${period}`;
  }

  return (
    <AppDataContext.Provider 
      value={{ 
        data, 
        loading, 
        getStaffById,
        getPodById,
        getStudentById,
        getStaff,
        getEnrollments,
        getCurrentSemester,
        getCourseById,
        formatTime
      }}
    >
      {children}
    </AppDataContext.Provider>
  );
};
