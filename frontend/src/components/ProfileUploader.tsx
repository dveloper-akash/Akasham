import React, { useRef, useState } from 'react';
import { Camera } from 'lucide-react';
import Cropper from 'react-easy-crop';
import { Dialog, DialogContent } from '@mui/material';
import getCroppedImg from '../utils/cropImage';

type Props = {
  image: string;
  setImage: (img: string) => void;
  setFile: (file: File) => void;
};

const ProfileUploader = ({ image, setImage, setFile }: Props) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const handleSelectImage = () => {
    inputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageSrc(reader.result as string);
        setOpen(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const onCropComplete = (_: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const handleCropDone = async () => {
  if (!imageSrc || !croppedAreaPixels) return;
  const blob = await getCroppedImg(imageSrc, croppedAreaPixels);
  const file = new File([blob], 'profile.jpeg', { type: 'image/jpeg' });
  const url = URL.createObjectURL(blob);
  setImage(url);   // for preview in img
  setFile(file);   // for upload later
  setOpen(false);
};

  return (
    <div className="flex flex-col mt-6 items-center">
      <div
        className="w-28 h-28 rounded-full bg-blue-300 flex items-center justify-center overflow-hidden cursor-pointer"
        onClick={handleSelectImage}
      >
        {image ? (
          <img src={image} alt="Profile" className="w-full h-full object-cover" />
        ) : (
          <Camera className="text-white w-8 h-8" />
        )}
      </div>
      <p
        onClick={handleSelectImage}
        className="text-sm cursor-pointer text-center font-medium mt-2 hover:text-gray-500 text-gray-600"
      >
        Edit Photo
      </p>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogContent>
          <div className="relative w-full h-[300px] bg-black">
            <Cropper
              image={imageSrc!}
              crop={crop}
              zoom={zoom}
              aspect={1}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
            />
          </div>
          <div className="flex justify-end gap-4 mt-4">
            <button onClick={() => setOpen(false)} className="px-4 py-2 bg-gray-200 rounded">
              Cancel
            </button>
            <button onClick={handleCropDone} className="px-4 py-2 bg-green-500 text-white rounded">
              Crop
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProfileUploader;
