import { ref, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebaseConfig';

const fetchData = async (path:string) => {
    try {
        const fileRef = ref ( storage, `appdata/${path}.json`);
        const url = await getDownloadURL(fileRef);
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch( err ){
        console.error( `Error fetching ${path}:`, err );
        throw err;
    }
};

export const getStudents = () => fetchData('Students');
export const getCourses = () => fetchData('Courses');
export const getEnrollments = () => fetchData('Enrollments');
export const getSemesters = () => fetchData('Semesters');
export const getStaff = () => fetchData('Staff');
export const getPods = () => fetchData('Pods');