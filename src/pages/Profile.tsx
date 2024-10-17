import { IonAvatar, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonItem, IonLabel, IonPage, IonRow, IonTitle, IonToolbar, IonSpinner, IonImg, IonList} from '@ionic/react';
import "./Profile.css";
import { calendar, person, peopleCircle, card, calendarOutline, school, schoolOutline, cardOutline, mailOutline } from 'ionicons/icons';
import { useMasterData } from '../hooks/useMasterData';
import { useHistory } from 'react-router';

const Profile: React.FC = () => {
    const { data, loading, error } = useMasterData();
    const studentId = JSON.parse(localStorage.getItem('student') || '{}')//.student_id;
    const history = useHistory();
    
    if( loading ) return <IonSpinner name="crescent"/>;
    if( error ) return <p>Error loading data</p>;

    const student = data?.students[studentId];
    console.log(student);
    const pod = data?.pods[student.pod_id] ?? "No pod assigned";

    // Birthday formatting
    const formatBirthday = ( dateString: string): string => {
        const date = new Date(dateString );
        return date.toLocaleDateString('en-US', {
            month: "long",
            day: "numeric"
        });
    }

    // clickable pod link!
    const handlePodClick = () => {
        history.push(`/pods/${student.pod_id}`);
    }


    
    const pageTitle = "Profile";

    return (
        <IonPage>
            <IonContent fullscreen className="">
                <div className="wsu-background"></div>
                <IonAvatar>
                    <img
                        alt="Avatar"
                        src={`https://www.gravatar.com/avatar`}
                    />
                </IonAvatar>
                <IonCard className="profile-card">
                    <IonCardHeader className="custom-card-header">
                        <IonCardTitle className="profile-title">
                            { student.first_name } { student.last_name }
                        </IonCardTitle>
                        <IonCardSubtitle className="profile-subtitle">
                            { student.pronouns }
                        </IonCardSubtitle>
                    </IonCardHeader>
                    <IonCardContent>

                        <IonList inset={true} lines="none">
                            <IonItem>
                                <IonIcon icon={cardOutline} slot="start"></IonIcon>
                                <IonLabel><b>WSU ID:</b> {student.student_id}</IonLabel>
                            </IonItem>
                            <IonItem>
                                <IonIcon icon={mailOutline} slot="start"></IonIcon>
                                <IonLabel>{ student.email_address }</IonLabel>
                            </IonItem>
                            <IonItem>
                                <IonIcon icon={calendarOutline} slot="start"></IonIcon>
                                <IonLabel><b>Birthday:</b> { formatBirthday(student.date_of_birth) }</IonLabel>
                            </IonItem>
                            <IonItem button onClick={handlePodClick}>
                                <IonIcon icon={peopleCircle} slot="start"></IonIcon>
                                <IonLabel><b>Pod:</b> {pod.pod_name}</IonLabel>
                            </IonItem>
                            <IonItem>
                                <IonIcon icon={schoolOutline} slot="start"></IonIcon>
                                <IonLabel><b>ROAR:</b> {student.year}</IonLabel>
                            </IonItem>
                        </IonList>
                    </IonCardContent>
                </IonCard>
            </IonContent>
        </IonPage>
    )
}
export default Profile;