import { create } from "zustand";

export const useUserStore = create((set) => ({
  profileImage: localStorage.getItem("profileImage") 
    || "/assets/default-user-profile.png",

  setProfileImage: (image) => {
    localStorage.setItem("profileImage", image);
    set({ profileImage: image });
  },

  removeProfileImage: () => {
    localStorage.removeItem("profileImage");
    set({ profileImage: "/assets/default-user-profile.png" });
  },
}));
