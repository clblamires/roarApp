import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';

const Contact: React.FC = () => {

    const pageTitle = "Contact";

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
export default Contact;