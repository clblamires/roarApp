import { IonAvatar, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonItem, IonLabel, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import "./Profile.css";
import { calendar, person } from 'ionicons/icons';

const Profile: React.FC = () => {

    const student = JSON.parse( localStorage.getItem("student") || '{}' );
    const pageTitle = "Profile";

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>{ pageTitle }</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen className="ion-padding">
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
                            </IonRow>
                        </IonGrid>
                    </IonCardContent>
                </IonCard>
            </IonContent>
        </IonPage>
    )
}
export default Profile;