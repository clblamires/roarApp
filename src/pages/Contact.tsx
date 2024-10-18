import { IonContent, IonLabel, IonList, IonListHeader, IonPage, IonIcon, IonItem, IonFab, IonFabButton, IonButton } from '@ionic/react';
import WSUBackground from '../components/WSUBackground';
import { useMasterData } from '../hooks/useMasterData';
import { callOutline, mail, mailOutline, person, personCircleOutline, phonePortrait } from 'ionicons/icons';
import { useEffect } from 'react';
import { useAppData, AppDataProvider } from '../context/appDataContext';

const ROLE_ORDER = [
    "Administrator",
    "Grad Assistant",
    "ALA",
    "Academic Coach",
    "Job Coach"
];

const Contact: React.FC = () => {
    // const { data, loading, error } = useMasterData();
    const { data, loading } = useAppData();

    if (loading) return <p>Loading...</p>;
    // if(error) return <p>Error loading data...</p>;

    const staff:any = data?.staff;
    const admin:any = [
        staff[0],
        staff[1],
        staff[2],
        staff[3]
    ];
    const grad:any = [
        staff[4], staff[5], staff[6]
    ];
    const academicCoach:any = [
        staff[10], staff[11], staff[12], staff[13], staff[14]
    ];
    const jobCoach:any = [
        staff[15], staff[16], staff[17], staff[18], staff[19], staff[20]
    ];
    const ala:any = [
        staff[7], staff[8], staff[9]
    ];

    return (
        <IonPage>
            <IonContent fullscreen className="ion-padding">
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
                    <IonListHeader color="primary" className="contact-list-header">Administration</IonListHeader>
                    { admin.map( (member) => 
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

                    <IonListHeader color="primary" className="contact-list-header">Graduate Assistants</IonListHeader>
                    { grad.map( (member) => 
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

                    <IonListHeader color="primary" className="contact-list-header">Academic Coaches</IonListHeader>
                    { academicCoach.map( (member) => 
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

                    <IonListHeader color="primary" className="contact-list-header">Job Coaches</IonListHeader>
                    { jobCoach.map( (member) => 
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

                    <IonListHeader color="primary" className="contact-list-header">Assistive Living Advisors</IonListHeader>
                    { ala.map( (member) => 
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