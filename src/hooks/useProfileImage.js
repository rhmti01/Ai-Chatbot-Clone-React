import { useRef } from "react";
import { useUserStore } from "../store/useUserStore";
import toast from "react-hot-toast";

export default function useProfileImage() {
  const fileInputRef = useRef(null);
  const setProfileImage = useUserStore((s) => s.setProfileImage);

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) {
      toast.error("No file selected. Please choose an image.");
      return;
    }

    if (!file.type.startsWith("image/")) {
      toast.error("Invalid file type. Please upload an image file.");
      return;
    }

    if (file.size > 1024 * 1024) {
      toast.error("Image size must be less than 1 MB.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setProfileImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return {
    fileInputRef,
    triggerFileSelect,
    handleFileChange,
  };
}
