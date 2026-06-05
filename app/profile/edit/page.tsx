"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function EditProfilePage() {
  const router = useRouter();
  const [email, setEmail] = useState<string | null>(null);

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [county, setCounty] = useState("");
  const [password, setPassword] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [newPicFile, setNewPicFile] = useState<File | null>(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const storedEmail = localStorage.getItem("userEmail");
    setEmail(storedEmail);
  }, []);

  useEffect(() => {
    if (!email) return;

    const loadProfile = async () => {
      try {
        const res = await fetch(`/api/get-profile?email=${encodeURIComponent(email)}`);
        const data = await res.json();

        if (data.success && data.profile) {
          setFullName(data.profile.full_name || "");
          setPhone(data.profile.phone || "");
          setCounty(data.profile.county || "");
          setPassword(data.profile.password || "");
          setProfilePic(data.profile.profile_picture_url || "");
        }
      } catch (err) {
        console.error("Failed to load profile", err);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [email]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setSaving(true);

    let uploadedUrl = profilePic;

    try {
      if (newPicFile) {
        const formData = new FormData();
        formData.append("file", newPicFile);
        formData.append("email", email);

        const uploadRes = await fetch("/api/upload-profile-picture", {
          method: "POST",
          body: formData,
        });

        const uploadData = await uploadRes.json();
        if (uploadData.success) {
          uploadedUrl = uploadData.url;
          setProfilePic(uploadedUrl);
        } else {
          alert("Failed to upload profile picture");
        }
      }

      const res = await fetch("/api/update-profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          full_name: fullName,
          phone,
          county,
          password,
          profile_picture_url: uploadedUrl,
        }),
      });

      const data = await res.json();

      if (data.success) {
        alert("Profile updated successfully");
        router.push("/dashboard");
      } else {
        alert("Failed to update profile");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong while saving");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-sacco-blue">
        Loading profile…
      </div>
    );
  }

  if (!email) {
    return (
      <div className="min-h-screen flex items-center justify-center text-sacco-blue">
        No user session found. Please log in again.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-sacco-bg p-6 flex justify-center">
      <div className="w-full max-w-lg bg-white p-6 rounded-xl shadow-xl border border-sacco-blue/20">
        <h1 className="text-2xl font-semibold text-sacco-blue mb-4">
          Edit Profile
        </h1>

        <div className="flex flex-col items-center mb-4">
          {profilePic ? (
            <img
              src={profilePic}
              alt="Profile"
              className="h-24 w-24 rounded-full object-cover mb-2 border border-sacco-blue/30"
            />
          ) : (
            <div className="h-24 w-24 rounded-full bg-sacco-bg border border-sacco-blue/30 flex items-center justify-center text-sacco-blue font-semibold mb-2">
              {fullName
                ? fullName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()
                : "?"}
            </div>
          )}

          <label className="text-sm text-sacco-blue font-medium cursor-pointer">
            <span className="px-3 py-1 border border-sacco-blue/40 rounded-lg hover:bg-sacco-bg">
              Change Picture
            </span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0] || null;
                setNewPicFile(file);
                if (file) {
                  const preview = URL.createObjectURL(file);
                  setProfilePic(preview);
                }
              }}
            />
          </label>
        </div>

        <form className="space-y-4" onSubmit={handleSave}>
          <input
            type="text"
            placeholder="Full Name"
            className="w-full border border-gray-300 p-3 rounded-lg focus:border-sacco-blue focus:ring-1 focus:ring-sacco-blue outline-none transition"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />

          <input
            type="text"
            placeholder="Phone Number"
            className="w-full border border-gray-300 p-3 rounded-lg focus:border-sacco-blue focus:ring-1 focus:ring-sacco-blue outline-none transition"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <input
            type="text"
            placeholder="County"
            className="w-full border border-gray-300 p-3 rounded-lg focus:border-sacco-blue focus:ring-1 focus:ring-sacco-blue outline-none transition"
            value={county}
            onChange={(e) => setCounty(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border border-gray-300 p-3 rounded-lg focus:border-sacco-blue focus:ring-1 focus:ring-sacco-blue outline-none transition"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="w-full bg-sacco-blue text-white p-3 rounded-lg font-medium hover:bg-[#00264d] transition shadow-sm"
            disabled={saving}
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
}