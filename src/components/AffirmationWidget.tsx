import { useEffect, useState } from 'react';
import { IonCard, IonCardContent} from '@ionic/react';
import './AffirmationWidget.css';

const PROXY = "https://cors-anywhere.herokuapp.com/";
const URL = "https://zenquotes.io/api/today";
const PROXY_URL = `https://api.allorigins.win/get?url=${encodeURIComponent(URL)}`;

const AffirmationWidget: React.FC = () => {
    const [affirmation, setAffirmation] = useState<string>('');
    const [author, setAuthor] = useState<string>('');
    const [loading, setLoading] = useState(true);

    useEffect( ()=> {
        const fetchAffirmation = async () => {
            try {
                const response = await fetch(PROXY_URL);
                const data = await response.json();
                const content = JSON.parse(data.contents);
                // console.log(content[0].q);
                setAffirmation(content[0].q);
                setAuthor(content[0].a);
            } catch (error){
                console.error("Error fetching Affirmation", error );
            } finally {
                setLoading(false);
            }
        };
        fetchAffirmation();
    }, []);

    return (
        <>
            <IonCard className="affirmation-card">
                <IonCardContent className="affirmation-content">
                    <div className="quotation-mark">“</div>
                    <p className="affirmation">
                        { affirmation }
                    </p>
                    <p className="author">
                        - { author }
                    </p>
                </IonCardContent>
            </IonCard>
        </>
    )
}
export default AffirmationWidget;