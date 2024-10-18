import { IonContent, IonLabel, IonList, IonListHeader, IonPage, IonIcon, IonItem, IonFab, IonFabButton, IonButton } from '@ionic/react';
import WSUBackground from '../components/WSUBackground';
import { useMasterData } from '../hooks/useMasterData';
import { callOutline, mail, mailOutline, person, personCircleOutline, phonePortrait } from 'ionicons/icons';
import { useEffect } from 'react';

const ROLE_ORDER = [
    "Administrator",
    "Grad Assistant",
    "ALA",
    "Academic Coach",
    "Job Coach"
];

const Contact: React.FC = () => {
    const { data, loading, error } = useMasterData();

    if (loading) return <p>Loading...</p>;
    if(error) return <p>Error loading data...</p>;

    const staff:any = data?.staff;
    const admin = [
        staff["1"],
        staff["2"],
        staff["3"],
        staff["6"],
    ];
    const grad = [
        staff["7"],
        staff["8"],
        staff["9"],
    ];
    const academicCoach = [
        staff["15"],
        staff["16"],
        staff["17"],
        staff["18"],
        staff["19"],
    ];
    const jobCoach = [
        staff["20"],
        staff["21"],
        staff["22"],
        staff["23"],
        staff["24"],
        staff["25"],
    ];
    const ala = [
        staff["12"],
        staff["13"],
        staff["14"],
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