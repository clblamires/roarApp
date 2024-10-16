import { IonCard, IonCardHeader, IonCardTitle, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCardContent, IonItem, IonLabel, IonInput, IonButton, IonToast, IonRouterOutlet, IonIcon } from '@ionic/react';
import { useState } from 'react';
import { storage } from '../firebaseConfig';
import { ref, getDownloadURL } from 'firebase/storage';
import { useHistory } from 'react-router-dom';
import "./Login.css";

import { getStudents } from '../services/firebaseService';
import { logIn } from 'ionicons/icons';
import WSUBackground from '../components/WSUBackground';

const Login: React.FC = () => {

    const history = useHistory();

    // State variables
    const [email, setEmail] = useState('');
    const [studentId, setStudentId] = useState('');
    const [showToast, setShowToast] = useState(false);
    const [toastMsg, setToastMsg] = useState('');
    const [isAuth, setIsAuth] = useState(false);


    // Login function :)
    const handleLogin = async () => {
        const studentsData = await getStudents();
        if( studentsData ){
            console.log(studentsData);
            const student = studentsData[2].data.find(
                (s:any) => s.email_address === email && s.student_id === studentId 
            );
            if( student ){
                console.log(student); // just checking :)
                localStorage.setItem("student", JSON.stringify(student.student_id));
                history.push('/profile');
            } else {
                setToastMsg("Invalid email or student ID");
                setShowToast(true);
            }
        } else {
            setToastMsg("Unable to fetch student data");
            setShowToast(true);
        }

    }

    return (
        <IonPage>
            <IonHeader>
            </IonHeader>
            <IonContent fullscreen className="ion-padding ion-text-center">
                <WSUBackground/>
                <IonCard className="login-card">
                    <IonCardHeader>
                        <IonCardTitle>Login</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                        <IonItem>
                            <IonInput
                                label="WSU Email"
                                labelPlacement='floating'
                                type="text"
                                value={email}
                                onIonInput={(e) => setEmail(e.detail.value!)}
                               
                            />
                        </IonItem>
                        <IonItem>
                            <IonInput
                                label="Student ID"
                                labelPlacement='floating'
                                type="text"
                                value={studentId}
                                onIonInput={(e)=>setStudentId(e.detail.value!)}
                            />
                        </IonItem>

                        <IonButton
                            expand="block"
                            onClick={ handleLogin }
                            className="login-button"
                        >
                            <IonIcon slot="start" icon={logIn}></IonIcon>
                            Login
                        </IonButton>
                    </IonCardContent>
                </IonCard>

                <IonToast
                    isOpen={showToast}
                    message={toastMsg}
                    duration={2000}
                    onDidDismiss={() => setShowToast(false)}
                />
            </IonContent>
        </IonPage>
    )
}
export default Login;