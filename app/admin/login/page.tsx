"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaUser } from "@react-icons/all-files/fa/FaUser";
import { FaLock } from "@react-icons/all-files/fa/FaLock";
import { FaSignInAlt } from "@react-icons/all-files/fa/FaSignInAlt";
import { FaEye } from "@react-icons/all-files/fa/FaEye";
import { FaEyeSlash } from "@react-icons/all-files/fa/FaEyeSlash";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate login
    setTimeout(() => {
      setLoading(false);
      router.push('/admin/dashboard');
    }, 1000);
  };

  return (
    <div className="flex min-h-screen bg-[#F3F3F3] items-center justify-center">
      {/* Main Login */}
      <div className="w-full max-w-md p-6">
        <div className="bg-white rounded-lg border border-gray-200 p-8 shadow-lg">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Image src="/logo.png" alt="CTC Logo" width={50} height={50} />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">เข้าสู่ระบบผู้ดูแล</h1>
            <p className="text-gray-500">ระบบจัดการงานและช่าง</p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            {/* Username Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ชื่อผู้ใช้งาน
              </label>
              <div className="relative">
                <FaUser className="absolute left-4 top-3 text-gray-400" size={16} />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="กรุณากรอกชื่อผู้ใช้งาน"
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                รหัสผ่าน
              </label>
              <div className="relative">
                <FaLock className="absolute left-4 top-3 text-gray-400" size={16} />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="กรุณากรอกรหัสผ่าน"
                  className="w-full pl-10 pr-12 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-3 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between pt-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-gray-300 text-gray-900 focus:ring-gray-900"
                />
                <span className="ml-2 text-sm text-gray-600">จำชื่อผู้ใช้งาน</span>
              </label>
              <Link href="/forgot-password" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                ลืมรหัสผ่าน?
              </Link>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-6 px-4 py-2.5 rounded-lg bg-gray-900 text-white font-medium hover:bg-gray-800 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FaSignInAlt size={16} />
              {loading ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ"}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">หรือ</span>
            </div>
          </div>

          {/* Quick Access */}
          <div className="grid grid-cols-2 gap-3">
            <button className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-all duration-200 text-sm">
              Demo Admin
            </button>
            <button className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-all duration-200 text-sm">
              ช่วยเหลือ
            </button>
          </div>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              © 2026 CTC Service Management. All rights reserved.
            </p>
          </div>
        </div>

        {/* Info Box */}
        <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-sm text-yellow-800">
            <strong>Demo Credentials:</strong><br />
            Username: <code className="bg-yellow-100 px-2 py-1 rounded text-xs">admin</code><br />
            Password: <code className="bg-yellow-100 px-2 py-1 rounded text-xs">admin123</code>
          </p>
        </div>
      </div>
    </div>
  );
}
