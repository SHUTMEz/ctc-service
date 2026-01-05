"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaPhone } from "@react-icons/all-files/fa/FaPhone";
import { FaMapMarkerAlt } from "@react-icons/all-files/fa/FaMapMarkerAlt";
import { FaHome } from "@react-icons/all-files/fa/FaHome";
import { FaPaperPlane } from "@react-icons/all-files/fa/FaPaperPlane";
import { FaCheckCircle } from "@react-icons/all-files/fa/FaCheckCircle";
import { FaClock } from "@react-icons/all-files/fa/FaClock";

type RequestStatus = "pending" | "confirmed" | "in_progress" | "completed";

type ServiceRequest = {
  id: string;
  name: string;
  phone: string;
  address: string;
  description: string;
  category: string;
  requestDate: string;
  status: RequestStatus;
  assignedTo?: string;
};

const SAMPLE_REQUESTS: ServiceRequest[] = [
  {
    id: "R-1001",
    name: "อาจารย์สมศรี",
    phone: "081-234-5678",
    address: "ตึกคอมพิวเตอร์ ชั้น 2",
    description: "อินเตอร์เน็ตช้า ใช้งานไม่สะดวก",
    category: "networking",
    requestDate: "2026-01-07 09:30",
    status: "confirmed",
  },
  {
    id: "R-1002",
    name: "อาจารย์เพชร",
    phone: "081-345-6789",
    address: "ห้องศูนย์วิจัย ชั้น 3",
    description: "เปลี่ยนจอคอมพิวเตอร์ที่เสีย",
    category: "hardware",
    requestDate: "2026-01-07 10:00",
    status: "pending",
  },
  {
    id: "R-1003",
    name: "นางสาวสมหวัง",
    phone: "081-456-7890",
    address: "สำนักงานสาขา ชั้น 1",
    description: "เครื่องพิมพ์ไม่ให้กระดาษออก",
    category: "hardware",
    requestDate: "2026-01-07 11:30",
    status: "in_progress",
    assignedTo: "M-001",
  },
  {
    id: "R-1004",
    name: "เจ้าหน้าที่รักษาความปลอดภัย",
    phone: "081-567-8901",
    address: "ห้องควบคุม ชั้น B1",
    description: "ระบบกล้องวงจรปิดหลายตัวไม่ทำงาน",
    category: "surveillance",
    requestDate: "2026-01-07 13:00",
    status: "completed",
  },
];

const CATEGORIES = [
  { value: "networking", label: "เครือข่าย" },
  { value: "hardware", label: "ฮาร์ดแวร์" },
  { value: "software", label: "ซอฟต์แวร์" },
  { value: "printer", label: "เครื่องพิมพ์" },
  { value: "surveillance", label: "ระบบกล้องวงจรปิด" },
  { value: "other", label: "อื่น ๆ" },
];

export default function RequestServicePage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [phoneInput, setPhoneInput] = useState("");
  const [authenticatedPhone, setAuthenticatedPhone] = useState("");
  const [requests, setRequests] = useState<ServiceRequest[]>(SAMPLE_REQUESTS);
  const [activeTab, setActiveTab] = useState<"form" | "history">("form");
  const [showForm, setShowForm] = useState(false);
  const [formClosing, setFormClosing] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    description: "",
    category: "other",
  });

  const [successMessage, setSuccessMessage] = useState(false);

  function closeForm() {
    setFormClosing(true);
    setTimeout(() => {
      setShowForm(false);
      setFormClosing(false);
      resetForm();
    }, 300);
  }

  function resetForm() {
    setFormData({
      name: "",
      phone: "",
      address: "",
      description: "",
      category: "other",
    });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const newRequest: ServiceRequest = {
      id: `R-${Date.now()}`,
      name: formData.name,
      phone: formData.phone,
      address: formData.address,
      description: formData.description,
      category: formData.category,
      requestDate: new Date().toLocaleString("th-TH"),
      status: "pending",
    };

    setRequests((prev) => [newRequest, ...prev]);
    setSuccessMessage(true);
    setTimeout(() => {
      setSuccessMessage(false);
      setShowForm(false);
      resetForm();
    }, 2000);
  }

  function handlePhoneSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (phoneInput.trim()) {
      setIsAuthenticated(true);
      setAuthenticatedPhone(phoneInput);
      setPhoneInput("");
    }
  }

  function logout() {
    setIsAuthenticated(false);
    setAuthenticatedPhone("");
    setActiveTab("form");
  }

  function getCategoryLabel(category: string) {
    return CATEGORIES.find((c) => c.value === category)?.label || category;
  }

  function getStatusLabel(status: RequestStatus) {
    switch (status) {
      case "pending":
        return "รอยืนยัน";
      case "confirmed":
        return "ยืนยันแล้ว";
      case "in_progress":
        return "กำลังซ่อม";
      case "completed":
        return "เสร็จเรียบร้อย";
      default:
        return status;
    }
  }

  function getStatusColor(status: RequestStatus) {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "confirmed":
        return "bg-blue-100 text-blue-700";
      case "in_progress":
        return "bg-purple-100 text-purple-700";
      case "completed":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  }

  const filteredRequests = requests.filter((r) => r.phone === authenticatedPhone);

  const stats = {
    pending: filteredRequests.filter((r) => r.status === "pending").length,
    confirmed: filteredRequests.filter((r) => r.status === "confirmed").length,
    in_progress: filteredRequests.filter((r) => r.status === "in_progress").length,
    completed: filteredRequests.filter((r) => r.status === "completed").length,
  };

  // Authentication Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#F3F3F3] flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-8">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Image src="/logo.png" alt="CTC Logo" width={50} height={50} />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">แจ้งเรื่องซ่อม</h1>
            <p className="text-gray-500 text-sm">ยืนยันตัวตนด้วยเบอร์โทรศัพท์</p>
          </div>

          <form onSubmit={handlePhoneSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                เบอร์โทรศัพท์
              </label>
              <div className="relative">
                <FaPhone className="absolute left-4 top-3 text-gray-400" size={16} />
                <input
                  type="tel"
                  value={phoneInput}
                  onChange={(e) => setPhoneInput(e.target.value)}
                  placeholder="081-234-5678"
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-6 px-4 py-2.5 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-all duration-200"
            >
              ยืนยัน
            </button>
          </form>

          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-xs text-blue-800">
              <strong>ทดสอบ:</strong><br />
              081-234-5678<br />
              081-345-6789
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#F3F3F3]">
      {/* Form Modal */}
      {showForm && (
        <>
          <div
            className={`fixed inset-0 bg-opacity-50 backdrop-blur-sm z-40 ${
              formClosing ? "animate-fadeOut" : "animate-fadeIn"
            }`}
            onClick={() => closeForm()}
          />
          <div
            className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${
              formClosing ? "animate-slideDown" : "animate-slideUp"
            }`}
          >
            <div
              className="bg-white rounded-lg shadow-2xl max-w-2xl w-full p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl font-bold mb-6">แจ้งเรื่องซ่อม</h2>

              {successMessage && (
                <div className="mb-4 p-4 bg-green-100 border border-green-300 rounded-lg text-green-700">
                  ✓ ส่งแบบฟอร์มสำเร็จ! ทีมงานจะติดต่อท่านเร็ว ๆ นี้
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      ชื่อ-นามสกุล
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="ชื่อของท่าน"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      เบอร์โทรศัพท์
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      placeholder="081-234-5678"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    ที่อยู่
                  </label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                    placeholder="ตึก/ห้อง"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    หมวดหมู่
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat.value} value={cat.value}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    รายละเอียด
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    placeholder="อธิบายปัญหาและอาการที่เกิดขึ้น"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 resize-none"
                    rows={4}
                    required
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => closeForm()}
                    className="flex-1 px-4 py-2.5 rounded-lg bg-gray-200 text-gray-800 font-medium hover:bg-gray-300 transition-all duration-200"
                  >
                    ยกเลิก
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2.5 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    <FaPaperPlane size={16} /> ส่งแบบฟอร์ม
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}

      {/* Sidebar */}
      <div className="p-4">
        <div className="flex flex-col bg-white rounded-lg border border-gray-100 w-64 px-2 py-3 min-h-full">
          <Image
            className="mx-auto"
            src="/logo.png"
            alt="CTC Logo"
            width={40}
            height={40}
          />
          <span className="mx-auto font-bold text-gray-900">CTC Service</span>
          <span className="mx-auto font-bold text-xs text-gray-500">
            ระบบแจ้งซ่อม
          </span>
          <hr className="text-gray-200 my-4" />

          <div className="flex-1">
            <ul className="flex flex-col gap-2 text-sm">
              <li>
                <button
                  onClick={() => {
                    setActiveTab("form");
                    setShowForm(true);
                  }}
                  className={`w-full px-4 py-2.5 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
                    activeTab === "form"
                      ? "bg-blue-600 text-white"
                      : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <FaPaperPlane size={14} /> แจ้งเรื่องใหม่
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab("history")}
                  className={`w-full px-4 py-2.5 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
                    activeTab === "history"
                      ? "bg-green-600 text-white"
                      : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  ประวัติการแจ้ง
                </button>
              </li>
            </ul>
          </div>

          <div className="mt-auto pt-4 border-t border-gray-200">
            <div className="mb-3 p-2 bg-gray-50 rounded-lg text-xs text-gray-600 text-center">
              เบอร์: {authenticatedPhone}
            </div>
            <button
              onClick={logout}
              className="w-full px-4 py-2 rounded-lg text-red-600 hover:bg-red-50 transition-all duration-200 text-sm font-medium"
            >
              ออกจากระบบ
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 flex-col ml-4 p-6 overflow-y-auto max-h-screen">
        <span className="text-gray-500">Page / Service Request</span>
        <br />
        <span className="text-3xl font-bold mb-2">แจ้งเรื่องซ่อม</span>
        <span className="text-gray-500 mb-8">
          จัดการเรื่องแจ้งซ่อมของท่าน
        </span>

        {/* Tab Navigation */}
        <div className="flex gap-2 mb-8">
          <button
            onClick={() => {
              setActiveTab("form");
              setShowForm(true);
            }}
            className={`px-6 py-2.5 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 ${
              activeTab === "form"
                ? "bg-blue-600 text-white"
                : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
            }`}
          >
            <FaPaperPlane size={14} /> แจ้งเรื่องใหม่
          </button>
          <button
            onClick={() => setActiveTab("history")}
            className={`px-6 py-2.5 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 ${
              activeTab === "history"
                ? "bg-green-600 text-white"
                : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
            }`}
          >
            <FaClock size={14} /> ประวัติการแจ้ง
          </button>
        </div>

        {/* Form Tab */}
        {activeTab === "form" && !showForm && (
          <div className="bg-white border border-gray-200 rounded-lg p-8 text-center">
            <FaPaperPlane size={48} className="mx-auto text-blue-600 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">แจ้งเรื่องซ่อมใหม่</h3>
            <p className="text-gray-600 mb-6">คลิกปุ่มด้านบนเพื่อแจ้งเรื่องซ่อม</p>
            <button
              onClick={() => setShowForm(true)}
              className="px-6 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-all duration-200"
            >
              เริ่มแจ้งเรื่อง
            </button>
          </div>
        )}

        {/* History Tab */}
        {activeTab === "history" && (
          <div>
            <h2 className="text-xl font-bold mb-4">
              ประวัติการแจ้ง ({filteredRequests.length})
            </h2>

            {filteredRequests.length === 0 ? (
              <div className="text-center text-gray-500 py-12">
                ยังไม่มีการแจ้งเรื่องซ่อม
              </div>
            ) : (
              <div className="grid gap-4">
                {filteredRequests.map((request) => (
                  <div
                    key={request.id}
                    className="bg-white border border-gray-200 rounded-lg p-5 hover:shadow-md transition-all duration-200"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">
                          {request.description}
                        </h3>
                        <p className="text-sm text-gray-600">
                          เลขที่: {request.id}
                        </p>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                          request.status
                        )}`}
                      >
                        {getStatusLabel(request.status)}
                      </span>
                    </div>

                    <div className="space-y-2 text-sm text-gray-700">
                      <div className="flex items-center gap-2">
                        <FaMapMarkerAlt size={14} className="text-gray-400" />
                        {request.address}
                      </div>
                      <div className="text-gray-600">
                        <strong>หมวดหมู่:</strong> {getCategoryLabel(request.category)}
                      </div>
                      <div className="text-xs text-gray-500 mt-2">
                        วันที่แจ้ง: {request.requestDate}
                      </div>
                    </div>

                    {request.assignedTo && (
                      <div className="mt-3 text-sm text-blue-600 bg-blue-50 rounded px-3 py-2">
                        มอบหมายให้: {request.assignedTo}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// Add CSS for animations
const styles = `
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  @keyframes fadeOut {
    from { opacity: 1; }
    to { opacity: 0; }
  }
  @keyframes slideUp {
    from {
      transform: translateY(20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
  @keyframes slideDown {
    from {
      transform: translateY(0);
      opacity: 1;
    }
    to {
      transform: translateY(20px);
      opacity: 0;
    }
  }
  .animate-fadeIn { animation: fadeIn 0.3s ease-in-out; }
  .animate-fadeOut { animation: fadeOut 0.3s ease-in-out; }
  .animate-slideUp { animation: slideUp 0.3s ease-out; }
  .animate-slideDown { animation: slideDown 0.3s ease-in; }
`;

if (typeof document !== "undefined") {
  const style = document.createElement("style");
  style.textContent = styles;
  document.head.appendChild(style);
}
