import axios from 'axios';
interface UserData {
  role:string;
  username: string;
  displayName: string;
  avatarUrl: string;
  country:string;
  state:string;
  phone?:string;
}

export const generateUsername = async (displayName: string, token: string) => {
  const res = await axios.post(
    'http://localhost:5000/api/services/generate-username',
    { displayName },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data.username;
}

export const saveToDb = async (data: UserData, token: string) => {
  await axios.post(
    'http://localhost:5000/api/user/onboarding',
    data,
    { headers: { Authorization: `Bearer ${token}` } }
  );
};

