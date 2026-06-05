"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();
  const [email, setEmail] = useState<string | null>(null);
  const [profile, setProfile] = useState<any>(null);
  const [analytics, setAnalytics] = useState<any>(null);
  const [recentActivity, setRecentActivity] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedEmail = localStorage.getItem("userEmail");
    setEmail(storedEmail);
  }, []);

  useEffect(() => {
    if (!email) return;

    const loadData = async () => {
      try {
        // Load profile
        const profileRes = await fetch(`/api/get-profile?email=${email}`);
        const profileData = await profileRes.json();
        if (profileData.success) setProfile(profileData.profile);

        // Load analytics
        const dashRes = await fetch(`/api/applicant-dashboard?email=${email}`);
        const dashData = await dashRes.json();

        if (dashData.success) {
          setAnalytics(dashData.analytics);
          setRecentActivity(dashData.recentActivity);
        }
      } catch (err) {
        console.error("Dashboard load error:", err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [email]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-sacco-blue text-lg">
        Loading dashboard…
      </div>
    );
  }

  if (!email) {
    return (
      <div className="min-h-screen flex items-center justify-center text-sacco-blue text-lg">
        No user session found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-sacco-bg p-6">
      <h1 className="text-3xl font-semibold text-sacco-blue mb-6">
        Welcome, {profile?.full_name}
      </h1>

      {/* Navigation Buttons */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => router.push("/new-loan")}
          className="px-4 py-2 bg-sacco-blue text-white rounded-lg shadow"
        >
          New Loan Application
        </button>

        <button
          onClick={() => router.push("/loan-status")}
          className="px-4 py-2 bg-white border border-sacco-blue text-sacco-blue rounded-lg shadow"
        >
          Loan Status
        </button>

        <button
          onClick={() => router.push("/profile/edit")}
          className="px-4 py-2 bg-white border border-sacco-blue text-sacco-blue rounded-lg shadow"
        >
          Profile
        </button>

        <button
          onClick={() => {
            localStorage.removeItem("userEmail");
            router.push("/login");
          }}
          className="px-4 py-2 bg-red-500 text-white rounded-lg shadow"
        >
          Logout
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-xl shadow border border-sacco-blue/20">
          <p className="text-gray-500 text-sm">Pending Loans</p>
          <p className="text-2xl font-bold text-sacco-blue">
            {analytics?.pending}
          </p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow border border-sacco-blue/20">
          <p className="text-gray-500 text-sm">Approved Loans</p>
          <p className="text-2xl font-bold text-green-600">
            {analytics?.approved}
          </p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow border border-sacco-blue/20">
          <p className="text-gray-500 text-sm">Declined Loans</p>
          <p className="text-2xl font-bold text-red-600">
            {analytics?.declined}
          </p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white p-6 rounded-xl shadow border border-sacco-blue/20">
        <h2 className="text-xl font-semibold text-sacco-blue mb-4">
          Recent Activity
        </h2>

        {recentActivity.length === 0 ? (
          <p className="text-gray-500 text-sm">No recent activity.</p>
        ) : (
          <ul className="space-y-2">
            {recentActivity.map((item, index) => (
              <li key={index} className="text-gray-700 text-sm">
                {item}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}