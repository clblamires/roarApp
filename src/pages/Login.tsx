import { IonCard, IonCardHeader, IonCardTitle, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCardContent, IonItem, IonLabel, IonInput, IonButton, IonToast, IonRouterOutlet, IonIcon, IonImg, IonInputPasswordToggle } from '@ionic/react';
import { useState } from 'react';
import { storage } from '../firebaseConfig';
import { ref, getDownloadURL } from 'firebase/storage';
import { useHistory } from 'react-router-dom';
import "./Login.css";
import roarLogo from '../assets/images/roar_logo.png';

// import { getStudents } from '../services/firebaseService';
import { logIn } from 'ionicons/icons';
import WSUBackground from '../components/WSUBackground';
import { useAppData } from '../context/appDataContext';

const Login: React.FC = () => {

    const { getStudents } = useAppData();

    const history = useHistory();

    // State variables
    const [email, setEmail] = useState('test.student@wsu.edu');
    const [studentId, setStudentId] = useState('0123456789');
    const [showToast, setShowToast] = useState(false);
    const [toastMsg, setToastMsg] = useState('');


    // Login function :)
    const handleLogin = () => {
        const students = getStudents();
        const student = students.find( (s:any ) => s.email_address === email && s.student_id === studentId );
        if( student ){
            localStorage.setItem("student", JSON.stringify(student.student_id));
            console.log("Logging in!");
            window.location.href = '/profile';
        } else {
            setToastMsg("Invalid email or student ID");
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
                        <IonImg src={roarLogo}/>
                    </IonCardHeader>
                    <IonCardContent>
                        <IonCardTitle>Login</IonCardTitle>
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
                                type="password"
                                value={studentId}
                                onIonInput={(e)=>setStudentId(e.detail.value!)}
                            >
                                <IonInputPasswordToggle slot="end"></IonInputPasswordToggle>
                            </IonInput>
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