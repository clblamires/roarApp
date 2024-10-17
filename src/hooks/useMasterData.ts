import { useEffect, useState } from 'react';
import { fetchMasterData } from '../services/dataService';

interface MasterData {
  students: { [key: string]: any };
  courses: { [key: string]: any };
  enrollments: { [key: string]: any };
  pods: { [key: string]: any };
  semesters: { [key: string]: any };
  staff: { [key: string]: any };
}

const transformData = (data: any[]): MasterData => {
  const result: MasterData = {
    students: {},
    courses: {},
    enrollments: {},
    pods: {},
    semesters: {},
    staff: {},
  };

  data.forEach((entry) => {
    if (entry.type === 'table') {
      switch (entry.name) {
        case 'Students':
          entry.data.forEach((item: any) => {
            result.students[item.student_id] = item;
          });
          break;
        case 'Courses':
          entry.data.forEach((item: any) => {
            result.courses[item.course_id] = item;
          });
          break;
        case 'Enrollments':
          entry.data.forEach((item: any) => {
            result.enrollments[item.enrollment_id] = item;
          });
          break;
        case 'Pods':
          entry.data.forEach((item: any) => {
            result.pods[item.pod_id] = item;
          });
          break;
        case 'Semesters':
          entry.data.forEach((item: any) => {
            result.semesters[item.semester_id] = item;
          });
          break;
        case 'Staff':
          entry.data.forEach((item: any) => {
            result.staff[item.staff_id] = item;
          });
          break;
        default:
          break;
      }
    }
  });

  return result;
};

export const useMasterData = () => {
  const [data, setData] = useState<MasterData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const rawData = await fetchMasterData();
        const transformedData = transformData(rawData);
        setData(transformedData);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  return { data, loading, error };
};


// data.students["the thing we're looking for!"]