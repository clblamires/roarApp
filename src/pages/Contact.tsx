import { IonContent, IonLabel, IonList, IonListHeader, IonPage, IonIcon, IonItem, IonFab, IonFabButton, IonButton } from '@ionic/react';
import WSUBackground from '../components/WSUBackground';
import { callOutline, mail, mailOutline, person, personCircleOutline, phonePortrait } from 'ionicons/icons';
import { useEffect } from 'react';
import { useAppData, AppDataProvider } from '../context/appDataContext';
import LoadingData from '../components/LoadingData';

const ROLE_ORDER = [
    "Administrator",
    "Grad Assistant",
    "ALA",
    "Academic Coach",
    "Job Coach"
];

const Contact: React.FC = () => {
    // const { data, loading, error } = useMasterData();
    const { data, loading, getStaff } = useAppData();

    if (loading) return <LoadingData/>;
    // if(error) return <p>Error loading data...</p>;

    const staff = getStaff();
    const admin = staff.filter( (s:any ) => s.role == "Administrator" );
    const grad = staff.filter( (s:any) => s.role == "Grad Assistant" );
    const academicCoach = staff.filter( (s:any) => s.role == "Academic Coach");
    const jobCoach = staff.filter( (s:any) => s.role == "Job Coach");
    const ala = staff.filter( (s:any) => s.role == "ALA");


    return (
        <IonPage>
            <IonContent fullscreen>
                <IonButton
                    expand="block"
                    color="danger"
                    href="tel:+15092882121"
                    style={{marginBottom:'20px'}}
                >
                    <IonIcon slot="start" icon={callOutline}/>
                    Call Emergency Line
                </IonButton>
                <IonList lines="full">
                    <IonListHeader color="primary">Administration</IonListHeader>
                    { admin.map( (member:any) => 
                        <IonItem key={member.staff_id}>
                            <IonIcon slot="start" icon={person}/>
                            <IonLabel>
                                <h2>{ member.staff_name}</h2>
                            </IonLabel>
                            
                            { member.email_address && (
                                <a href={`mailto:${member.email_address}`}>
                                    <IonIcon slot="end" icon={mail}/>
                                </a>
                            )}
                        </IonItem>
                    )}

                    <IonListHeader color="primary">Graduate Assistants</IonListHeader>
                    { grad.map( (member:any) => 
                        <IonItem key={member.staff_id}>
                            <IonIcon slot="start" icon={person}/>
                            <IonLabel>
                                <h2>{ member.staff_name}</h2>
                            </IonLabel>
                            
                            { member.email_address && (
                                <a href={`mailto:${member.email_address}`}>
                                    <IonIcon slot="end" icon={mail}/>
                                </a>
                            )}
                        </IonItem>
                    )}

                    <IonListHeader color="primary">Academic Coaches</IonListHeader>
                    { academicCoach.map( (member:any) => 
                        <IonItem key={member.staff_id}>
                            <IonIcon slot="start" icon={person}/>
                            <IonLabel>
                                <h2>{ member.staff_name}</h2>
                            </IonLabel>
                            
                            { member.email_address && (
                                <a href={`mailto:${member.email_address}`}>
                                    <IonIcon slot="end" icon={mail}/>
                                </a>
                            )}
                        </IonItem>
                    )}

                    <IonListHeader color="primary">Job Coaches</IonListHeader>
                    { jobCoach.map( (member:any) => 
                        <IonItem key={member.staff_id}>
                            <IonIcon slot="start" icon={person}/>
                            <IonLabel>
                                <h2>{ member.staff_name}</h2>
                            </IonLabel>
                            
                            { member.email_address && (
                                <a href={`mailto:${member.email_address}`}>
                                    <IonIcon slot="end" icon={mail}/>
                                </a>
                            )}
                        </IonItem>
                    )}

                    <IonListHeader color="primary">Assistive Living Advisors</IonListHeader>
                    { ala.map( (member:any) => 
                        <IonItem key={member.staff_id}>
                            <IonIcon slot="start" icon={person}/>
                            <IonLabel>
                                <h2>{ member.staff_name}</h2>
                            </IonLabel>
                            
                            { member.email_address && (
                                <a href={`mailto:${member.email_address}`}>
                                    <IonIcon slot="end" icon={mail}/>
                                </a>
                            )}
                        </IonItem>
                    )}
                </IonList>
            </IonContent>
        </IonPage>
    )
}
export default Contact;