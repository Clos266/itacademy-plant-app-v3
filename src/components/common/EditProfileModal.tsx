import { useState, useEffect } from "react";
import { BaseModal } from "./BaseModal";
import { Input } from "@/components/ui/input";
import { ImageUploader } from "./ImageUploader";

interface Profile {
  id: number;
  name: string;
  email: string;
  bio: string;
  location: string;
  joinDate: string;
  avatar?: string;
  plantsCount: number;
  exchangesCount: number;
}

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: Profile;
  onSave: (
    profileData: Pick<Profile, "name" | "email" | "bio" | "location" | "avatar">
  ) => void;
}

export function EditProfileModal({
  isOpen,
  onClose,
  profile,
  onSave,
}: EditProfileModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");
  const [avatar, setAvatar] = useState<File | null>(null);

  // Cargar datos del perfil cuando se abre el modal
  useEffect(() => {
    if (profile && isOpen) {
      setName(profile.name);
      setEmail(profile.email);
      setBio(profile.bio);
      setLocation(profile.location);
      setAvatar(null); // Reset avatar file
    }
  }, [profile, isOpen]);

  const handleSave = () => {
    const profileData = {
      name,
      email,
      bio,
      location,
      avatar: avatar ? URL.createObjectURL(avatar) : profile.avatar,
    };
    onSave(profileData);
    onClose();
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={handleClose}
      title="Edit Profile"
      description="Update your profile information below."
      onConfirm={handleSave}
      confirmLabel="Save Changes"
    >
      <form className="flex flex-col gap-4">
        <ImageUploader
          value={profile.avatar}
          onChange={setAvatar}
          label="Profile Picture"
          helpText="Upload a profile photo"
        />

        <Input
          type="text"
          placeholder="Full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <Input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <Input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <textarea
          className="w-full p-3 border border-border rounded-md bg-background text-foreground placeholder:text-muted-foreground resize-none"
          placeholder="Tell us about yourself and your plant interests"
          rows={4}
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />

        <div className="text-sm text-muted-foreground space-y-1">
          <div className="flex justify-between">
            <span>Member since:</span>
            <span>{new Date(profile.joinDate).toLocaleDateString()}</span>
          </div>
          <div className="flex justify-between">
            <span>Plants in collection:</span>
            <span>{profile.plantsCount}</span>
          </div>
          <div className="flex justify-between">
            <span>Exchanges completed:</span>
            <span>{profile.exchangesCount}</span>
          </div>
        </div>
      </form>
    </BaseModal>
  );
}
