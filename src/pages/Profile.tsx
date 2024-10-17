import { IonAvatar, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonItem, IonLabel, IonPage, IonRow, IonTitle, IonToolbar, IonSpinner, IonImg } from '@ionic/react';
import "./Profile.css";
import { calendar, person, peopleCircle } from 'ionicons/icons';
import { useMasterData } from '../hooks/useMasterData';

const Profile: React.FC = () => {
    const { data, loading, error } = useMasterData();
    const studentId = JSON.parse(localStorage.getItem('student') || '{}')//.student_id;
    
    if( loading ) return <IonSpinner name="crescent"/>;
    if( error ) return <p>Error loading data</p>;

    const student = data?.students[studentId];
    const pod = data?.pods[student.pod_id]?.pod_name ?? "No pod assigned";


    
    const pageTitle = "Profile";

    return (
        <IonPage>
            <IonContent fullscreen className="">
                <div className="wsu-background"></div>

                <IonAvatar>
                    <IonImg
                        alt="Avatar"
                        src={"https://www.gravatar.com/avatar"}
                    ></IonImg>
                    <p>Image</p>
                </IonAvatar>
                <IonCard className="profile-card">
                    <IonCardHeader>
                        <IonAvatar className="profile-avatar">
                            <img
                                alt="Avatar"
                                src={`https://www.gravatar.com/avatar`}
                            />
                        </IonAvatar>
                        <IonCardTitle className="profile-name">
                            { student.first_name } { student.last_name }
                        </IonCardTitle>
                        <IonCardSubtitle className="profile-pronouns">
                            { student.pronouns } - { student.year }
                        </IonCardSubtitle>
                    </IonCardHeader>
                    <IonCardContent>
                        <IonGrid>
                            <IonRow>
                                <IonCol size="12">
                                    <IonItem lines="none">
                                        <IonIcon icon={calendar} slot="start"></IonIcon>
                                        <IonLabel>Birthday: {student.date_of_birth}</IonLabel>
                                    </IonItem>
                                </IonCol>
                                <IonCol size="12">
                                    <IonItem lines="none">
                                        <IonIcon icon={person} slot="start"></IonIcon>
                                        <IonLabel>Student ID: {student.student_id}</IonLabel>
                                    </IonItem>
                                </IonCol>
                                <IonCol size="12">
                                    <IonItem lines="none">
                                        <IonIcon icon={peopleCircle} slot="start"></IonIcon>
                                        <IonLabel>Pod: {pod}</IonLabel>
                                    </IonItem>
                                </IonCol>
                            </IonRow>
                        </IonGrid>
                    </IonCardContent>
                </IonCard>
            </IonContent>
        </IonPage>
    )
}
export default Profile;