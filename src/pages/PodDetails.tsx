import {
	IonPage,
	IonHeader,
	IonToolbar,
	IonTitle,
	IonContent,
	IonCard,
	IonCardHeader,
	IonCardTitle,
	IonCardContent,
	IonItem,
	IonLabel,
	IonSpinner,
	IonButtons,
	IonBackButton,
	IonListHeader
} from '@ionic/react';
import './PodDetails.css';
import { useParams } from 'react-router-dom';
// import { useMasterData } from '../hooks/useMasterData';
import { useAppData } from '../context/appDataContext';
import LoadingData from '../components/LoadingData';

interface PodDetailsParams {
	podId: string;
}

const PodDetails: React.FC = () => {
	const { podId } = useParams<PodDetailsParams>(); // Get the podId from route params
	// const { data, loading, error } = useMasterData(); // Access master data
	const { data, loading, getStaffById, getPodById } = useAppData();

	if (loading) {
		return (
			<LoadingData/>
		);
	}
	// const pod = data?.pods.find( (pod) => pod.pod_id === podId );
	const pod = getPodById( podId );
	const gradAssistant = getStaffById( pod?.grad_assistant_id );
	const coach = getStaffById( pod?.academic_coach_id );
	const jobCoach1 = getStaffById( pod?.job_coach_1_id );
	const jobCoach2 = getStaffById( pod?.job_coach_2_id );
	const ala = getStaffById( pod?.ala_id );



	if (!pod) {
		return <p>Pod not found.</p>; // Handle case where pod is missing
	}

	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonButtons slot="start">
						<IonBackButton></IonBackButton>
					</IonButtons>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen className="ion-padding">
				<IonCard>
					<IonCardHeader>
						<IonCardTitle className="pod-title">{pod.pod_name}</IonCardTitle>
					</IonCardHeader>
					<IonCardContent>
						<IonListHeader>
							<IonLabel>Graduate Assistant</IonLabel>
						</IonListHeader>
						<IonItem>
							<IonLabel>{gradAssistant.staff_name}</IonLabel>
						</IonItem>
						<IonListHeader>
							<IonLabel>Academic Coach</IonLabel>
						</IonListHeader>
						<IonItem>
							<IonLabel>{coach.staff_name}</IonLabel>
						</IonItem>
						<IonListHeader>
							<IonLabel>Job Coaches</IonLabel>
						</IonListHeader>
						<IonItem>
							<IonLabel>{jobCoach1.staff_name} &amp; {jobCoach2.staff_name}</IonLabel>
						</IonItem>
						<IonListHeader>
							<IonLabel>Assistive Living Advisor</IonLabel>
						</IonListHeader>
						<IonItem>
							<IonLabel>{ ala.staff_name }</IonLabel>
						</IonItem>
					</IonCardContent>
				</IonCard>
			</IonContent>
		</IonPage>
	);
};

export default PodDetails;
