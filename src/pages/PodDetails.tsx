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
import { useMasterData } from '../hooks/useMasterData';

interface PodDetailsParams {
	podId: string;
}

const PodDetails: React.FC = () => {
	const { podId } = useParams<PodDetailsParams>(); // Get the podId from route params
	const { data, loading, error } = useMasterData(); // Access master data

	if (loading) {
		return (
			<IonContent className="ion-padding">
				<IonSpinner name="crescent" />
			</IonContent>
		);
	}

	if (error) {
		return <p>Error loading pod information.</p>;
	}

	const pod = data?.pods[podId]; // Safely access the pod
	const gradAssistant = data?.staff[pod?.grad_assistant_id] ?? "None";
	const coach = data?.staff[pod?.academic_coach_id] ?? "None";
	const jobCoach1 = data?.staff[pod?.job_coach_1_id] ?? "None";
	const jobCoach2 = data?.staff[pod?.job_coach_2_id] ?? "None";
	const ala = data?.staff[pod?.ala_id] ?? "None";

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
