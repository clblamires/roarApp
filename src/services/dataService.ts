import { ref, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebaseConfig';

export const fetchMasterData = async () => {
    try {
        const fileRef = ref( storage, 'appdata/wsu-roar.json');
        const url = await getDownloadURL(fileRef);
        const response = await fetch( url );
        const data = await response.json();
        // console.log("Master data loaded:", data );
        return data;
    } catch (error) {
        console.error("Error fetching master data:", error);
        throw error;
    }
};