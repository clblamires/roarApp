import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonLabel, IonList, IonItem, IonImg, IonIcon, IonAccordion, IonAccordionGroup } from '@ionic/react';
import LoadingData from '../components/LoadingData';
import { useAppData } from '../context/appDataContext';
import { useEffect, useState } from 'react';
import { calendar, map, time, timeOutline } from 'ionicons/icons';
import NoClasses from '../components/NoClasses';
import roarLogo from '../assets/images/roar_logo.png';
import WeatherWidget from '../components/WeatherWidget';


const Today: React.FC = () => {
	const { loading, formatTime, getCurrentSemester, getEnrollments, getCourseById, getStudentById } = useAppData();
	// const [todayCourses, setTodayCourses] = useState<any[]>([]);

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





				{/* {todayCourses?.map((course) => (
					<IonCard key={course.course_id}>
						<IonCardHeader>
							<IonCardTitle>
								{course.course_code}
							</IonCardTitle>
							<IonCardSubtitle>
								{course.course_title}
							</IonCardSubtitle>
						</IonCardHeader>
						<IonCardContent>
							<IonList lines='none'>
								<IonItem>
									<IonIcon icon={timeOutline} slot="start"></IonIcon>
									<IonLabel>
										<strong>Start Time: </strong>
										{formatTime(course.start_time)}
									</IonLabel>
								</IonItem>
								<IonItem>
									<IonIcon icon={time} slot="start"></IonIcon>
									<IonLabel>
										<strong>End Time: </strong>
										{formatTime(course.end_time)}
									</IonLabel>
								</IonItem>
								<IonItem>
									<IonIcon icon={calendar} slot="start"></IonIcon>
									<IonLabel>
										<strong>Days of the Week: </strong>
										{course.days_of_week}
									</IonLabel>
								</IonItem>
								<IonItem button onClick={() => openLocationInMaps(`WSU ${course.building}`)}>
									<IonIcon icon={map} slot="start" ></IonIcon>
									<IonLabel>
										<strong>Location: </strong>
										{course.room_number}
									</IonLabel>
								</IonItem>
							</IonList>
						</IonCardContent>
					</IonCard>
				))} */}
			</IonContent>
		</IonPage>
	)
}
export default Today;