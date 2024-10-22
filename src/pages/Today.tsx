import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonLabel, IonList, IonItem, IonImg, IonIcon, IonAccordion, IonAccordionGroup, IonModal, IonChip, IonButton, IonButtons } from '@ionic/react';
import LoadingData from '../components/LoadingData';
import { useAppData } from '../context/appDataContext';
import { useEffect, useState } from 'react';
import { calendar, calendarClear, map, schoolOutline, time, timeOutline } from 'ionicons/icons';
import NoClasses from '../components/NoClasses';
import roarLogo from '../assets/images/roar_logo.png';
import WeatherWidget from '../components/WeatherWidget';
import AffirmationWidget from '../components/AffirmationWidget';
import WSUBackground from '../components/WSUBackground';


const Today: React.FC = () => {

	const [ isModalOpen, setIsModalOpen ] = useState(false);

	const { loading, formatTime, getCurrentSemester, getEnrollments, getCourseById, getStudentById } = useAppData();

	const studentId = JSON.parse(localStorage.getItem('student') || '{}');
	const student = getStudentById(studentId);
	const semester = getCurrentSemester();
	const enrollments = getEnrollments(student?.student_id, semester?.semester_id);

	// helper functions
	const getTodayAbbreviation = (): string => {
		const days = ['Su', 'M', 'T', 'W', 'Th', 'F', 'Sa'];
		const today = new Date().getDay();
		return days[today];
	};
	const todayAbbreviation = getTodayAbbreviation();


	const courses = enrollments.map((enrollment) => getCourseById(enrollment.course_id));
	const todayCourses = courses?.filter((course) => course.days_of_week.includes(todayAbbreviation));



	const openLocationInMaps = (location: string) => {
		const query = encodeURIComponent(location);
		const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
		const url = `https://www.google.com/maps/search/?api=1&query=${query}`;
		window.open(url, '_blank'); // Open in a new tab or app
	};

	const handleLoungeScheduleButton = () => {
		setIsModalOpen(true);
	}

	const time_slots = ["11:00am", "11:30am", "12:00pm"];



	const pageTitle = "Today";

	if( loading ) return <LoadingData/>;
	return (
		<IonPage>
			<IonHeader>
				<IonToolbar color="primary">
					<IonTitle>{ pageTitle }</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent className="ion-padding">
				<IonImg src={roarLogo}></IonImg>
				<h1>Today's Classes</h1>
				{ todayCourses.length > 0 ? (
					<IonAccordionGroup>
						{todayCourses.map((course) => (
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


				<WeatherWidget/>

				<AffirmationWidget/>

				<IonButton expand="block" onClick={handleLoungeScheduleButton}>
					<IonIcon icon={schoolOutline} slot="start"></IonIcon>
					View Study Lounge Schedule
				</IonButton>


				<IonModal
					isOpen={isModalOpen}
				>
					<IonHeader>
						<IonToolbar color="primary">
							<IonTitle>Coaches in the Lounge</IonTitle>
							<IonButtons slot="end">
								<IonButton onClick={() => setIsModalOpen(false)}>Close</IonButton>
							</IonButtons>
						</IonToolbar>
					</IonHeader>
					<IonContent>
						{ time_slots.map( (slot) => (
							<IonItem key={Math.random()}>
								{slot}
								<IonChip>Taeya</IonChip>
								<IonChip>Cas</IonChip>
								<IonChip>Amaya</IonChip>
								<IonChip>Itzel</IonChip>
								<IonChip>Kili</IonChip>
							</IonItem>
						))}
					</IonContent>
				</IonModal>

				
			</IonContent>
		</IonPage>
	)
}
export default Today;