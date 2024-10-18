import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
// import { useMasterData } from '../hooks/useMasterData';
import { AppDataProvider, useAppData } from '../context/appDataContext';

const Schedule: React.FC = () => {

    const { data, loading } = useAppData();
    // const staff = data?.staff;
    const enrollments = data?.enrollments || [];
    const schedule = enrollments?.filter( (course) => course.student_id === "0123456789");

    const pageTitle = "Schedule";

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>{ pageTitle }</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle>{ pageTitle }</IonTitle>
                    </IonToolbar>
                </IonHeader>
            </IonContent>
        </IonPage>
    )
}
export default Schedule;