import { create } from "zustand";
import { persist } from "zustand/middleware";

const DEFAULT_PROFILE_IMAGE = "/assets/default-user-profile.png";

export const useUserStore = create(
  persist(
    (set) => ({
      profileImage: DEFAULT_PROFILE_IMAGE,

      setProfileImage: (image) => {
        set({ profileImage: image || DEFAULT_PROFILE_IMAGE });
      },

      removeProfileImage: () => {
        set({ profileImage: DEFAULT_PROFILE_IMAGE });
      },
    }),
    {
      name: "user-storage",
      partialize: (state) => ({
        profileImage: state.profileImage,
      }),
    }
  )
);
