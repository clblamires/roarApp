import { IonAvatar, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonItem, IonLabel, IonPage, IonRow, IonTitle, IonToolbar, IonSpinner, IonImg, IonList, IonButton, IonRippleEffect, IonToast } from '@ionic/react';
import "./Profile.css";
import { calendar, person, peopleCircle, card, calendarOutline, school, schoolOutline, cardOutline, mailOutline, globe, documentText, logOut } from 'ionicons/icons';
import { useMasterData } from '../hooks/useMasterData';
import { useHistory } from 'react-router';
import { useEffect, useState } from 'react';
import WSUBackground from '../components/WSUBackground';
import { useAppData } from '../context/appDataContext';
import LoadingData from '../components/LoadingData';

const Profile: React.FC = () => {
    // const { data, loading, error } = useMasterData();
    const { data, loading, getStudentById, getPodById } = useAppData();
    const studentId = JSON.parse(localStorage.getItem('student') || '{}');
    const history = useHistory();
    const [isBirthday, setIsBirthday] = useState(false);
    const [birthdayToastIsOpen, setBirthdayToastIsOpen] = useState(false);
    
    if( loading ) return <LoadingData/>;
    // if( error ) return <p>Error loading data</p>;

    const student = getStudentById(studentId );
    const pod = getPodById( student.pod_id ) ?? "No pod assignment";

    // Birthday formatting
    const formatBirthday = ( dateString: string): string => {
        const date = new Date(dateString );
        return date.toLocaleDateString('en-US', {
            month: "long",
            day: "numeric"
        });
    }

    // helper function to check if today is the birthday!!!
    const checkBirthday = (dob: string) => {
        const today = new Date();
        const birthday = new Date(dob);
        return today.getUTCMonth() === birthday.getUTCMonth() && today.getUTCDate() === birthday.getUTCDate();
    };

    const birthdayMessage = () => {
        if ( checkBirthday(student.date_of_birth)){
            return (
                    <div className="birthday-banner">
                        <h2>🎉 Happy Birthday, {student.first_name}! 🎉</h2>
                        <p>Wishing you a wonderful day filled with joy and celebration!</p>
                    </div>
            );
        }
        return null;
    }




    // clickable pod link!
    const handlePodClick = () => {
        history.push(`/pods/${student.pod_id}`);
    }

    // clickable links
    const openInBrowser = ( url: string ) => {
        if( url ){
            window.open(url, '_blank');
        }
    }

    // logout
    const logOut = () => {
        // localStorage.removeItem("student");
        console.log("This logOut function will eventually work lol");
    }


    
    const pageTitle = "Profile";

    return (
        <IonPage>
            <IonContent fullscreen className="">
                <WSUBackground/>
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

                        { birthdayMessage() }

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

                        <IonButton
                            onClick={ ()=> openInBrowser(student.pcp_website_url)}
                            expand="block"
                        >
                            <IonIcon slot="start" icon={globe}></IonIcon>
                            PCP Website
                        </IonButton>
                        <IonButton
                            onClick={ ()=> openInBrowser(student.ilp_document_url)}
                            expand="block"
                        >
                            <IonIcon slot="start" icon={documentText}></IonIcon>
                            Learning Plan
                        </IonButton>
                        <hr/>
                        
                    </IonCardContent>
                </IonCard>
            </IonContent>
        </IonPage>
    )
}
export default Profile;