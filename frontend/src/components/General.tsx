import React, { useEffect, useState } from 'react';
import ProfileUploader from '../components/ProfileUploader';
import { Pencil } from 'lucide-react';
import useAuthStore from '../stores/authStore';
import api from '../utils/api';
import { auth } from '../Firebase';
import { uploadToCloudinary } from '../utils/uploadToCloudinary';

const GeneralSettings = () => {
  const { user, client, editor, role, updateUser, updateClient, updateEditor } = useAuthStore();
  const [image, setImage] = useState(user?.avatarUrl || '');
  const [isChanged, setIsChanged] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [form, setForm] = useState({
    username: user?.displayName,
    email: user?.email,
    country: user?.country,
    state: user?.state,
    phone: user?.phone
  });
  const [clientForm, setClientForm] = useState({
    bio: client?.bio,
    company: client?.company,
    job: client?.job,
    socials: client?.socials,
  });
  const [editorForm, setEditorForm] = useState({
    bio: editor?.bio,
    portfolio: editor?.portfolio,
    skills: editor?.skills,
    socials: editor?.socials,
  });
  useEffect(() => {
    const isUserChanged =
      form.username !== user?.displayName ||
      form.phone !== user?.phone ||
      image !== user?.avatarUrl;

    const isEditorChanged =
      role === 'EDITOR' &&
      (editorForm.bio !== editor?.bio ||
        JSON.stringify(editorForm.portfolio) !== JSON.stringify(editor?.portfolio) ||
        JSON.stringify(editorForm.skills) !== JSON.stringify(editor?.skills) ||
        JSON.stringify(editorForm.socials) !== JSON.stringify(editor?.socials));

    const isClientChanged =
      role === 'CLIENT' && (
        clientForm.bio !== client?.bio ||
        clientForm.company !== client?.company ||
        clientForm.job !== client?.job ||
        JSON.stringify(clientForm.socials) !== JSON.stringify(client?.socials)
      )

    setIsChanged(isUserChanged || isEditorChanged || isClientChanged);
  }, [form, editorForm, clientForm,user,editor,client,image]);

  const handleSave = async (e: React.FormEvent) => {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      console.error('No user is currently logged in.');
      return;
    }
    const token = await currentUser.getIdToken();
    e.preventDefault();
    const updatedUser: any = {};
    const updatedEditor: any = {};
    const updatedClient: any = {};

    if (form.username !== user?.displayName) updatedUser.displayName = form.username;
    if (form.phone !== user?.phone) updatedUser.phone = form.phone;
    if (image !== user?.avatarUrl) {
      if (!file) {
        console.error('No file selected for upload.');
        return;
      }

      try {
        const url = await uploadToCloudinary(file, token, user?.username || "");
        setImage(url);
        updatedUser.avatarUrl = url;
      } catch (error) {
        console.error('Failed to upload image:', error);
        return;
      }

    }

    if (role === 'EDITOR') {
      if (editorForm.bio !== editor?.bio) updatedEditor.bio = editorForm.bio;
      if (JSON.stringify(editorForm.skills) !== JSON.stringify(editor?.skills))
        updatedEditor.skills = editorForm.skills;
      if (JSON.stringify(editorForm.portfolio) !== JSON.stringify(editor?.portfolio))
        updatedEditor.portfolio = editorForm.portfolio;
      if (JSON.stringify(editorForm.socials) !== JSON.stringify(editor?.socials))
        updatedEditor.socials = editorForm.socials;
    }
    if (role === 'CLIENT') {
      if (clientForm.bio !== client?.bio) updatedClient.bio = clientForm.bio;
      if (clientForm.company !== client?.company)
        updatedClient.company = clientForm.company;
      if (clientForm.job !== client?.job) updatedClient.job = clientForm.job;
      if (JSON.stringify(clientForm.socials) !== JSON.stringify(client?.socials))
        updatedClient.socials = clientForm.socials;
    }

    try {
      if (Object.keys(updatedUser).length > 0) {
        const { data } = await api.patch('/api/updates/user', updatedUser, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        updateUser(data);
      }
      if (role === 'EDITOR' && Object.keys(updatedEditor).length > 0) {
        const { data } = await api.patch('/api/updates/editor', updatedEditor,{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        updateEditor(data);
      }
      if (role === 'CLIENT' && Object.keys(updatedClient).length > 0) {
        const { data } = await api.patch('/api/updates/client', updatedClient,{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        updateClient(data);
        console.log('Client profile updated:', user);
        
      }
    } catch (err) {
      console.error('Failed to update:', err);
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleChange2 = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setClientForm({ ...clientForm, [e.target.name]: e.target.value });
  };

  return (
    <div className=" flex w-full items-center flex-col ">
      <form onSubmit={handleSave} className="flex flex-col gap-4 max-w-xl w-full px-5 ">
        <div className='flex w-full justify-between items-center'>
          <h2 className="sm:text-3xl    text-2xl font-semibold text-gray-800 ">My Profile</h2>
          <button
            type="submit"
            disabled={!isChanged}
            className={`px-4 py-2 border rounded-lg font-semibold transition-colors ${isChanged
              ? 'border-black text-black hover:bg-black hover:text-white'
              : 'border-gray-300 text-gray-400 cursor-not-allowed'
              }`}
          >
            Save Changes
          </button>

        </div>
        <div className="flex flex-col items-center  mb-3">
          <ProfileUploader image={image} setImage={setImage} setFile={setFile} />

        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Username</label>
          <input
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            disabled
            className="w-full border border-gray-300 bg-gray-100 rounded-md px-4 py-2 text-gray-500 cursor-not-allowed"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Country</label>
            <input
              type="text"
              name="country"
              value={form.country}
              disabled
              className="w-full border border-gray-300 bg-gray-100 rounded-md px-4 py-2 text-gray-500 cursor-not-allowed"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">State</label>
            <input
              type="text"
              name="state"
              value={form.state}
              disabled
              className="w-full border cursor-not-allowed border-gray-300 text-gray-500 bg-gray-100 rounded-md px-4 py-2 focus:ring-2 focus:ring-yellow-500 focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Phone No.</label>
          <input
            type="text"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-gray-400 focus:outline-none"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 flex items-center justify-between">
            Bio
            <Pencil className="w-4 h-4 text-gray-500" />
          </label>
          <textarea
            name="bio"
            value={clientForm.bio}
            onChange={handleChange2}
            rows={3}
            className="w-full border border-gray-300 rounded-md px-4 resize-none py-2 focus:ring-2 focus:ring-green-400 focus:outline-none"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Job</label>
            <input
              type="text"
              name="job"
              value={clientForm.job}
              onChange={handleChange2}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Company Name</label>
            <input
              type="text"
              name="company"
              value={clientForm.company}
              onChange={handleChange2}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default GeneralSettings;
