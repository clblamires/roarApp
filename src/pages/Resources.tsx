import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';

const Resources: React.FC = () => {

    const pageTitle = "Resources";

    
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar color="primary">
                    <IonTitle>{ pageTitle }</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                This is the resources page
            </IonContent>
        </IonPage>
    )
}
export default Resources;