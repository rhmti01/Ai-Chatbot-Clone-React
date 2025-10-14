import React from "react";

export default function UserAvatar() {
  return (
    <div className="absolute top-4 right-4 cursor-pointer">
      <img
        className="size-11 rounded-[18px] shadow-xl shadow-gray-200"
        src="assets/profile-img.png"
        alt="profile image"
      />
    </div>
  );
}
