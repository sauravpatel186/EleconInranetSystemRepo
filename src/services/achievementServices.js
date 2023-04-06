import {db} from "../firebase-config";
import {
    collection,
    getDocs,
    getDoc,
    addDoc,
    deleteDoc,
    updateDoc,
    doc
} from "firebase/firestore";

const achievementCollectionRef =collection(db,"achievements");
class AchievementService {
    addAchievement = (newAchievement)=>{
        return addDoc(achievementCollectionRef,newAchievement);
    };
    updateAchievement = (id,updatedAchievement)=>{
        const achievementDoc = doc(db,"achievements",id);
        return updateDoc(achievementDoc,updatedAchievement);
    };
    deleteAchievement = (id) => {
        const achievementDoc = doc(db,"achievements",id);
        return deleteDoc(achievementDoc);
    };
    getAllAchievements = () => {
        return getDocs(achievementCollectionRef);
    }
    getAchievement = (id) =>{
        const achievementDoc = doc(db,"achievements",id);
        return getDocs(achievementDoc);
    }
    
}

export default new AchievementService();