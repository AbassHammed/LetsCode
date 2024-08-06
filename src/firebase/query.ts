import { firestore } from '@firebase/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';

export const userInfoQuery = async (userId: string) => {
  const dataQuery = query(collection(firestore, 'users'), where('uid', '==', userId));
  const querySnapshot = await getDocs(dataQuery);

  if (querySnapshot.empty) {
    return;
  }

  const data: { fullName: string } = {
    fullName: querySnapshot.docs[0].data().fullName,
  };

  return data;
};
