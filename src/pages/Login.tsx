import { IonCard, IonCardHeader, IonCardTitle, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCardContent, IonItem, IonLabel, IonInput, IonButton, IonToast, IonRouterOutlet } from '@ionic/react';
import { useState } from 'react';
import { storage } from '../firebaseConfig';
import { ref, getDownloadURL } from 'firebase/storage';
import { useHistory } from 'react-router-dom';
import "./Login.css";

const Login: React.FC = () => {

    const history = useHistory();

    // State variables
    const [email, setEmail] = useState('');
    const [studentId, setStudentId] = useState('');
    const [showToast, setShowToast] = useState(false);
    const [toastMsg, setToastMsg] = useState('');
    const [isAuth, setIsAuth] = useState(false);

    // Get student data from online
    const fetchStudentsData = async () => {
        try {
            const studentsRef = ref( storage, 'appdata/Students.json' );
            const url = await getDownloadURL( studentsRef );
            const response = await fetch(url);
            const studentsData = await response.json();
            return studentsData;
        } catch( err ){
            console.error("Error fetching student data:", err );
            return null;
        }
    }


    // Login function :)
    const handleLogin = async () => {
        const studentsData = await fetchStudentsData();
        if( studentsData ){
            console.log(studentsData);
            const student = studentsData[2].data.find(
                (s:any) => s.email_address === email && s.student_id === studentId 
            );
            if( student ){
                console.log(student); // just checking :)
                localStorage.setItem("student", JSON.stringify(student));
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