import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';

const Resources: React.FC = () => {

    const pageTitle = "Resources";

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
export default Resources;