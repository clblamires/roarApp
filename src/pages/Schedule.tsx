import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonButton, IonModal, IonIcon, IonAccordion, IonAccordionGroup } from '@ionic/react';
// import { useMasterData } from '../hooks/useMasterData';
import { useAppData } from '../context/appDataContext';
import { getEnrollments } from '../services/firebaseService';
import { useState } from 'react';
import './Schedule.css';
import { calendar, map, time, timeOutline } from 'ionicons/icons';
import WSUBackground from '../components/WSUBackground';
import LoadingData from '../components/LoadingData';
import NoClasses from '../components/NoClasses';

const Schedule: React.FC = () => {

    const { 
        loading,
        getCurrentSemester, 
        getStudentById, 
        getEnrollments, 
        getCourseById, 
        formatTime
    } = useAppData();
    const [selectedCourse, setSelectedCourse] = useState<any>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    
    const studentId = JSON.parse(localStorage.getItem('student') || '{}');
    const student = getStudentById( studentId );
    const semester = getCurrentSemester();
    const enrollments = getEnrollments( student?.student_id, semester?.semester_id );
    const courses = enrollments.map( (enrollment) => getCourseById(enrollment.course_id));
    
    // course sorting
    const dayOrder = ['M','T','W','Th','F','Sa','Su'];
    const sortedCourses = courses.sort( (a,b) => {
        const dayA = a.days_of_week[0];
        const dayB = b.days_of_week[0];
        return dayOrder.indexOf(dayA) - dayOrder.indexOf(dayB);
    });
    
    const openLocationInMaps = (location: string) => {
        const query = encodeURIComponent(location);
        const isIOS = /iPad|iPhone|iPod/.test( navigator.userAgent );
        const url = `https://www.google.com/maps/search/?api=1&query=${query}`;
        window.open(url, '_blank'); // Open in a new tab or app
    };
    
    
    // Modals
    const openModal = (course:any) => {
        setSelectedCourse(course);
        setIsModalOpen(true);
    }
    const closeModal = () => {
        setSelectedCourse(null);
        setIsModalOpen(false);
    }
    
    const pageTitle = "Your Class Schedule";

    if( loading ) return <LoadingData/>
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar color="primary">
                    <IonTitle>{ pageTitle }</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                
            { sortedCourses.length > 0 ? (
					<IonAccordionGroup>
						{sortedCourses.map((course) => (
							<IonAccordion key={course.course_id} value={course.course_id}>
								<IonItem slot="header">
									<IonLabel>
										<h1>{course.course_code}</h1>
										<p>{formatTime(course.start_time)}</p>
									</IonLabel>
								</IonItem>
								<div slot="content" style={{ padding: '16px' }}>
									<IonList lines='none'>
										<IonItem>
											<IonIcon icon={timeOutline} slot="start"></IonIcon>
											<IonLabel>
												<strong>Start Time: </strong>
												{ formatTime(course.start_time) }
											</IonLabel>
										</IonItem>
										<IonItem>
											<IonIcon icon={time} slot="start"></IonIcon>
											<IonLabel>
												<strong>End Time: </strong>
												{ formatTime(course.end_time) }
											</IonLabel>
										</IonItem>
										<IonItem>
											<IonIcon icon={calendar} slot="start"></IonIcon>
											<IonLabel>
												<strong>Days of the Week: </strong>
												{ course.days_of_week }
											</IonLabel>
										</IonItem>
										<IonItem button onClick={ ()=> openLocationInMaps(`WSU ${course.building}`) }>
											<IonIcon icon={map} slot="start" ></IonIcon>
											<IonLabel>
												<strong>Location: </strong> 
												{ course.room_number }
											</IonLabel>
										</IonItem>
									</IonList>
								</div>
							</IonAccordion>
						))}
					</IonAccordionGroup>
				) : (
					<NoClasses/>
				)}

            </IonContent>
        </IonPage>
    )
}
export default Schedule;