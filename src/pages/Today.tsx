import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';

const Today: React.FC = () => {

    const pageTitle = "Today";

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
export default Today;