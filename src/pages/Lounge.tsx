import { IonPage, IonHeader, IonTitle, IonToolbar, IonContent } from "@ionic/react";
import LoadingData from "../components/LoadingData";
import { useAppData } from "../context/appDataContext";


const Lounge: React.FC = () => {
    const { loading } = useAppData();


    return (
        <IonPage>
            <IonHeader color="primary">
                <IonToolbar>
                    <IonTitle>
                        ROAR Study Lounge
                    </IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
            <iframe 
                src="https://calendar.google.com/calendar/embed?src=c1097f33a84452c28ff772b6c597b8e491a27f20b2f026a81bae25a59b974b36%40group.calendar.google.com&ctz=America%2FLos_Angeles" 
                className="calendar-iframe"
            ></iframe>
            </IonContent>
        </IonPage>
    )
}

export default Lounge;