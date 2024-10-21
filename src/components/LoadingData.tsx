import { IonContent, IonLoading, IonPage } from "@ionic/react";
import React from "react";

const LoadingData: React.FC = () => {
    return (
        <IonPage>
            <IonContent>
                <IonLoading isOpen={true} message="Loading..." spinner={"lines"}></IonLoading>
            </IonContent>
        </IonPage>
    );
}
export default LoadingData;