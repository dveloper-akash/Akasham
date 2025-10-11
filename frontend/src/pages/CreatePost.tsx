import React, { useState } from 'react';
import BackNav from '../components/BackNav';
import { CircleQuestionMark } from 'lucide-react'
import api from '../utils/api';
import { auth } from '../Firebase';
import {toast} from 'react-toastify';
import { useNavigate } from "react-router-dom";


const CreatePost = () => {
    const navigate=useNavigate();
    const [referenceLinks, setReferenceLinks] = useState(['']);
    const [loading,setLoading]=useState(false);
    const [showTooltip, setShowTooltip] = useState(false);
    const applicantLimit = 10;
    const [dualEdit, setDualEdit] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        videoType: '',
        deadline: '',
        minBudget: '',
        maxBudget: '',
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]:['deadline','minBudget','maxBudget'].includes(name)?Number(value):value }));
    };

    const handleLinkChange = (index: number, value: string) => {
        const updated = [...referenceLinks];
        updated[index] = value;
        setReferenceLinks(updated);
    };

    const addLink = () => setReferenceLinks([...referenceLinks, '']);

    const removeLink = (index: number) => {
        const updated = [...referenceLinks];
        updated.splice(index, 1);
        setReferenceLinks(updated);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const user = auth.currentUser;
        if (!user) {
            console.error('No user is currently logged in.');
            setLoading(false);
            return;
        }
        const token = await user.getIdToken();
        const postPayload = {
            ...formData,
            dualEdit,
            referenceLinks: referenceLinks.filter((link) => link.trim() ),
            applicantLimit,
        };

        try{
        const res = await api.post('/api/client/posts',
            postPayload, {

            headers: {
                'authorization': `Bearer ${token}`,

            },
        });
        if(res.status===201){
            toast.success("Post created successfully")
            setLoading(false);
            navigate("/editor/home");
        }
    }catch(error:any){
        toast.error("Creating post failed");
        setLoading(false);
    }



    };

    return (
        <div className="flex overflow-hidden flex-col h-screen">
            <BackNav name="Create Post" redirect="/editor/home" />
            <div className='flex-1 relative px-6 sm:pt-5 pt-4 pb-5 w-full flex flex-col items-center'>
                <form onSubmit={handleSubmit} className=" border border-[#2d2d2d3f] rounded-xl pt-5 w-full max-w-150 bg-white flex flex-col shadow-lg">
                    <div className="mb-4">
                        <p className="sm:text-2xl text-xl font-poor-story px-6 text-black">
                            Describe what you need. Editors will apply with their best work.
                        </p>
                    </div>

                    <div className="flex flex-col text-black px-6 pb-3 gap-6 max-h-115 sm:max-h-120 overflow-y-auto pr-6 custom-scroll">
                        <div className="flex flex-col">
                            <label className="text-md font-medium mb-1">Title</label>
                            <input
                                required
                                type="text"
                                placeholder="Enter your video title.."
                                name="title"
                                value={formData.title}
                                onChange={handleInputChange}
                                className="border placeholder:tracking-tight border-[#2d2d2d6d] placeholder-[#777] rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-black"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="text-md font-medium mb-1">Brief</label>
                            <textarea
                                required
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                placeholder="E.g. Edit a 1-minute wedding reel from raw clips. Add transitions and music."
                                className="p-2 tracking-tight placeholder:text-sm border leading-snug border-[#2d2d2d6d] rounded-lg placeholder-[#777] resize-none focus:outline-none focus:ring-1 focus:ring-black"
                                rows={4}
                                maxLength={500}
                            ></textarea>
                        </div>

                        {/* Dual Edit Toggle */}
                        <div className="flex items-center justify-between mb- border border-[#2d2d2d6d] rounded-lg p-3">
                            <div className="flex items-center gap-2">
                                <label className="text-md font-medium">Dual Edit</label>
                                <div onClick={() => setShowTooltip(!showTooltip)} className="relative group">
                                    <CircleQuestionMark className="text-gray-500 w-6 cursor-pointer" />
                                    <div
                                        className={`absolute left-5 top-6 z-10
        ${showTooltip ? 'block' : 'hidden'} group-hover:block
        bg-black text-white md:w-xs text-xs w-64 rounded-md px-3 py-2 shadow-lg`}
                                    >
                                        Two editors deliver separate edits. Choose the best. Pay only for one.
                                    </div>
                                </div>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" checked={dualEdit} onChange={() => setDualEdit(!dualEdit)} className="sr-only peer" />
                                <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer  peer-checked:bg-blue-500 transition-all"></div>
                                <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform peer-checked:translate-x-full peer-checked:left-2"></div>
                            </label>
                        </div>

                        <div className="flex flex-col">
                            <label className="text-md font-medium mb-1">Video Type</label>
                            <select
                                required
                                name="videoType"
                                value={formData.videoType}
                                onChange={handleInputChange}
                                className="border border-[#2d2d2d6d] appearance-none rounded-lg px-3 py-2 text-black focus:outline-none focus:ring-1 focus:ring-black"
                            >
                                <option value="">Select type</option>
                                <option value="short">Short-form</option>
                                <option value="long">Long-form</option>
                            </select>
                        </div>

                        <div className="flex flex-col">
                            <label className="text-md font-medium mb-1">Expected Deadline</label>
                            <input
                                required
                                name="deadline"
                                value={formData.deadline}
                                onChange={handleInputChange}
                                type="number"
                                className="border border-[#2d2d2d6d] rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-black"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="text-md font-medium mb-1">Budget Range (₹)</label>
                            <div className="flex gap-3">
                                <input
                                    required
                                    name="minBudget"
                                    type="number"
                                    min={1000}
                                    value={formData.minBudget}
                                    onChange={handleInputChange}
                                    placeholder="Min"
                                    className="w-1/2 border border-[#2d2d2d6d] rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-black"
                                />
                                <input
                                    required
                                    name="maxBudget"
                                    type="number"
                                    min={formData.minBudget || 100}
                                    value={formData.maxBudget}
                                    onChange={handleInputChange}
                                    placeholder="Max"
                                    className="w-1/2 border border-[#2d2d2d6d] rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-black"
                                />
                            </div>
                        </div>


                        <div className="flex flex-col">
                            <label className="text-md font-medium ">
                                Max Applicants: <span className="font-bold px-2 rounded-sm py-1 text-lg bg-blue-50">{applicantLimit}</span>
                            </label>
                            {/* <input
                                type="range"
                                min="10"
                                max="50"
                                value={applicantLimit}
                                onChange={(e) => setApplicantLimit(Number(e.target.value))}
                                className="accent-black w-full"
                            /> */}
                        </div>

                        <div className="flex flex-col">
                            <label className="text-md font-medium mb-2">
                                Reference Links <span className="text-gray-400">(optional)</span>
                            </label>
                            {referenceLinks.map((link, index) => (
                                <div key={index} className="flex items-center gap-2 mb-3">
                                    <input
                                        type="url"
                                        value={link}
                                        onChange={(e) => handleLinkChange(index, e.target.value)}
                                        placeholder="https://youtube.com/reference"
                                        className="w-full rounded-xl border border-[#2d2d2d6d] placeholder-[#777] p-3 focus:outline-none focus:ring-1 focus:ring-black"
                                    />
                                    {referenceLinks.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => removeLink(index)}
                                            className="text-red-500 text-xl font-bold px-2"
                                            aria-label="Remove link"
                                        >
                                            ×
                                        </button>
                                    )}
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={addLink}
                                className="text-sm text-blue-500 hover:underline"
                            >
                                + Add another link
                            </button>
                        </div>
                    </div>

                    <div className='border-t px-6 sm:py-5 py-4 border-[#2d2d2d38]'>
                        <button
                            type="submit"
                            className="w-full bg-black text-white font-bold text-xl py-3 rounded-full hover:bg-transparent hover:text-black hover:border-black border transition duration-300"
                        >
                            Create Post
                        </button>
                    </div>
                </form>
                {loading && (
                        <div className="absolute inset-0 bg-white/70 flex items-center justify-center rounded-xl">
                        <p className="text-lg font-semibold text-black">Creating Post...</p>
                        </div>
                )}
            </div>
        </div>
    );
};

export default CreatePost;
