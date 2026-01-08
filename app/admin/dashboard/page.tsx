"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { FaStar } from "@react-icons/all-files/fa/FaStar";
import { FaCheck } from "@react-icons/all-files/fa/FaCheck";
import { FaSignOutAlt } from "@react-icons/all-files/fa/FaSignOutAlt";
import { FaClock } from "@react-icons/all-files/fa/FaClock";
import { FaCheckCircle } from "@react-icons/all-files/fa/FaCheckCircle";
// removed unused icons
import { FaTimesCircle } from "@react-icons/all-files/fa/FaTimesCircle";
import { FaMapMarkerAlt } from "@react-icons/all-files/fa/FaMapMarkerAlt";
import { FaUser } from "@react-icons/all-files/fa/FaUser";
import { FaCalendarAlt } from "@react-icons/all-files/fa/FaCalendarAlt";
import { FaThumbsUp } from "@react-icons/all-files/fa/FaThumbsUp";
import { FaPlus } from "@react-icons/all-files/fa/FaPlus";
import { FaEdit } from "@react-icons/all-files/fa/FaEdit";
import { FaTrash } from "@react-icons/all-files/fa/FaTrash";
import { FaDownload } from "@react-icons/all-files/fa/FaDownload";
import { FaUsers } from "@react-icons/all-files/fa/FaUsers";
import { FaList } from "@react-icons/all-files/fa/FaList";

type JobStatus = "pending" | "approved" | "rejected" | "assigned" | "completed" | "failed";
type MechanicStatus = "active" | "inactive";

type Job = {
  id: string;
  title: string;
  customer: string;
  address: string;
  scheduled: string;
  status: JobStatus;
  details?: string;
  assignedTo?: string;
  priority: "low" | "medium" | "high";
  estimatedHours: number;
  completedDate?: string;
  reason?: string;
};

type Mechanic = {
  id: string;
  name: string;
  email: string;
  phone: string;
  specialty: string;
  status: MechanicStatus;
  joinDate: string;
  completedJobs: number;
};

const SAMPLE_JOBS: Job[] = [
  {
    id: "J-2001",
    title: "อินเตอร์เน็ตช้า",
    customer: "อาจารย์สมศรี",
    address: "ตึกคอมพิวเตอร์ ชั้น 2",
    scheduled: "2026-01-07 09:30",
    status: "pending",
    details: "ใช้งานอินเตอร์เน็ตไม่สะดวก",
    priority: "high",
    estimatedHours: 2,
  },
  {
    id: "J-2002",
    title: "จอประสาทหลวง",
    customer: "อาจารย์เพชร",
    address: "ห้องศูนย์วิจัย ชั้น 3",
    scheduled: "2026-01-07 10:00",
    status: "pending",
    details: "เปลี่ยนจอคอมพิวเตอร์ที่เสีย",
    priority: "medium",
    estimatedHours: 1.5,
  },
  {
    id: "J-2003",
    title: "ซ่อมเครื่องพิมพ์",
    customer: "นางสาวสมหวัง",
    address: "สำนักงานสาขา ชั้น 1",
    scheduled: "2026-01-07 11:30",
    status: "approved",
    details: "เครื่องพิมพ์เอกสารผิดปกติ",
    assignedTo: "M-001",
    priority: "medium",
    estimatedHours: 2,
  },
  {
    id: "J-2004",
    title: "ตรวจสอบระบบ CCTV",
    customer: "เจ้าหน้าที่รักษาความปลอดภัย",
    address: "ห้องควบคุม ชั้น B1",
    scheduled: "2026-01-07 13:00",
    status: "assigned",
    details: "ระบบกล้องวงจรปิดหลายตัวไม่ทำงาน",
    assignedTo: "M-002",
    priority: "high",
    estimatedHours: 4,
  },  {
    id: "J-2005",
    title: "ซ่อมแซม UPS",
    customer: "ห้องปฏิบัติการ",
    address: "ห้องเซิร์ฟเวอร์",
    scheduled: "2026-01-06 10:00",
    status: "completed",
    details: "UPS เสีย สามารถซ่อมได้สำเร็จ",
    assignedTo: "M-003",
    priority: "high",
    estimatedHours: 3,
    completedDate: "2026-01-06 12:30",
  },
  {
    id: "J-2006",
    title: "ตรวจสอบระบบไฟ",
    customer: "หัวหน้า IT",
    address: "ตึกสำนักงาน ชั้น 6",
    scheduled: "2026-01-05 08:00",
    status: "failed",
    details: "ตรวจสอบระบบไฟหลัก",
    assignedTo: "M-001",
    priority: "high",
    estimatedHours: 2,
    reason: "พบปัญหาแยกส่วน ต้องเรียกช่างไฟฟ้าทั่วไป"
  },];

const SAMPLE_MECHANICS: Mechanic[] = [
  {
    id: "M-001",
    name: "สมชาย ใจดี",
    email: "somchai@ctc.co.th",
    phone: "081-234-5678",
    specialty: "ช่างซ่อมไฟฟ้า",
    status: "active",
    joinDate: "2024-01-15",
    completedJobs: 45,
  },
  {
    id: "M-002",
    name: "วิชัย สุขสันต์",
    email: "vichai@ctc.co.th",
    phone: "081-345-6789",
    specialty: "ช่างซ่อมเครื่องฟอก",
    status: "active",
    joinDate: "2024-03-20",
    completedJobs: 32,
  },
  {
    id: "M-003",
    name: "มงคล สินวงศ์",
    email: "mongkol@ctc.co.th",
    phone: "081-456-7890",
    specialty: "ช่างเทคนิค IT",
    status: "active",
    joinDate: "2023-12-10",
    completedJobs: 58,
  },
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<"summary" | "jobs" | "mechanics">("summary");
  const [jobs, setJobs] = useState<Job[]>(SAMPLE_JOBS);
  const [mechanics, setMechanics] = useState<Mechanic[]>(SAMPLE_MECHANICS);
  const [jobFilter, setJobFilter] = useState<"all" | "pending" | "approved" | "assigned" | "completed" | "failed">("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalClosing, setModalClosing] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [mechanicModalOpen, setMechanicModalOpen] = useState(false);
  const [mechanicModalClosing, setMechanicModalClosing] = useState(false);
  const [selectedMechanic, setSelectedMechanic] = useState<Mechanic | null>(null);
  const [mechanicFormData, setMechanicFormData] = useState({ name: "", email: "", phone: "", specialty: "" });
  // initialized with sample data; no mount state needed

  function closeModal() {
    setModalClosing(true);
    setTimeout(() => {
      setModalOpen(false);
      setModalClosing(false);
      setSelectedJob(null);
    }, 300);
  }

  function approveJob(jobId: string) {
    setJobs((prev) =>
      prev.map((j) => (j.id === jobId ? { ...j, status: "approved" } : j))
    );
  }

  function rejectJob(jobId: string) {
    setJobs((prev) =>
      prev.map((j) => (j.id === jobId ? { ...j, status: "rejected" } : j))
    );
  }

  function assignJob(jobId: string, mechanicId: string) {
    setJobs((prev) =>
      prev.map((j) =>
        j.id === jobId ? { ...j, status: "assigned", assignedTo: mechanicId } : j
      )
    );
    closeModal();
  }

  function toggleMechanicStatus(mechanicId: string) {
    setMechanics((prev) =>
      prev.map((m) =>
        m.id === mechanicId
          ? { ...m, status: m.status === "active" ? "inactive" : "active" }
          : m
      )
    );
  }

  function closeMechanicModal() {
    setMechanicModalClosing(true);
    setTimeout(() => {
      setMechanicModalOpen(false);
      setMechanicModalClosing(false);
      setSelectedMechanic(null);
      setMechanicFormData({ name: "", email: "", phone: "", specialty: "" });
    }, 300);
  }

  function openMechanicEditModal(mechanic: Mechanic) {
    setSelectedMechanic(mechanic);
    setMechanicFormData({ name: mechanic.name, email: mechanic.email, phone: mechanic.phone, specialty: mechanic.specialty });
    setMechanicModalOpen(true);
  }

  function updateMechanic() {
    if (!selectedMechanic) return;
    setMechanics((prev) =>
      prev.map((m) =>
        m.id === selectedMechanic.id
          ? { ...m, name: mechanicFormData.name, email: mechanicFormData.email, phone: mechanicFormData.phone, specialty: mechanicFormData.specialty }
          : m
      )
    );
    closeMechanicModal();
  }

  function downloadReport(type: string) {
    alert(`ดาวโหลดรายงาน: ${type}`);
  }

  

  return (
    <div className="flex min-h-screen bg-[#F3F3F3]">
      {/* Modal */}
      {modalOpen && (
        <>
          <div
            className={`fixed inset-0 bg-opacity-50 backdrop-blur-sm z-40 ${
              modalClosing ? "animate-fadeOut" : "animate-fadeIn"
            }`}
            onClick={() => closeModal()}
          />
          <div
            className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${
              modalClosing ? "animate-slideDown" : "animate-slideUp"
            }`}
          >
            <div
              className="bg-white rounded-lg shadow-2xl max-w-md w-full p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-xl font-bold mb-4">มอบหมายงานให้ช่าง</h2>
              <p className="text-sm text-gray-600 mb-4">
                งาน: {selectedJob?.title}
              </p>

              <div className="space-y-2 mb-6 max-h-60 overflow-y-auto">
                {mechanics.map((mechanic) => (
                  <button
                    key={mechanic.id}
                    onClick={() =>
                      selectedJob && assignJob(selectedJob.id, mechanic.id)
                    }
                    className="w-full text-left p-3 rounded-lg border border-gray-300 hover:bg-blue-50 hover:border-blue-500 transition-all"
                  >
                    <div className="font-medium">{mechanic.name}</div>
                    <div className="text-xs text-gray-600">{mechanic.specialty}</div>
                  </button>
                ))}
              </div>

              <button
                onClick={() => closeModal()}
                className="w-full px-4 py-2 rounded-lg bg-gray-200 text-gray-800 font-medium hover:bg-gray-300 transition-all"
              >
                ยกเลิก
              </button>
            </div>
          </div>
        </>
      )}

      {/* Mechanic Edit Modal */}
      {mechanicModalOpen && (
        <>
          <div
            className={`fixed inset-0 bg-opacity-50 backdrop-blur-sm z-40 ${
              mechanicModalClosing ? "animate-fadeOut" : "animate-fadeIn"
            }`}
            onClick={() => closeMechanicModal()}
          />
          <div
            className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${
              mechanicModalClosing ? "animate-slideDown" : "animate-slideUp"
            }`}
          >
            <div
              className="bg-white rounded-lg shadow-2xl max-w-md w-full p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-xl font-bold mb-6">แก้ไขข้อมูลช่าง</h2>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">ชื่อ</label>
                  <input
                    type="text"
                    value={mechanicFormData.name}
                    onChange={(e) => setMechanicFormData({ ...mechanicFormData, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">อีเมล</label>
                  <input
                    type="email"
                    value={mechanicFormData.email}
                    onChange={(e) => setMechanicFormData({ ...mechanicFormData, email: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">เบอร์โทร</label>
                  <input
                    type="tel"
                    value={mechanicFormData.phone}
                    onChange={(e) => setMechanicFormData({ ...mechanicFormData, phone: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">ความเชี่ยวชาญ</label>
                  <input
                    type="text"
                    value={mechanicFormData.specialty}
                    onChange={(e) => setMechanicFormData({ ...mechanicFormData, specialty: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                  />
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-3">สถานะ</label>
                  <button
                    onClick={() => toggleMechanicStatus(selectedMechanic!.id)}
                    className={`w-full px-4 py-3 rounded-lg font-medium transition-all ${ selectedMechanic?.status === "active" ? "bg-green-600 text-white hover:bg-green-700" : "bg-gray-600 text-white hover:bg-gray-700"}`}
                  >
                    {selectedMechanic?.status === "active" ? "🔓 เปิดใช้งาน" : "🔒 ปิดใช้งาน"}
                  </button>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => updateMechanic()}
                  className="flex-1 px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-all"
                >
                  บันทึก
                </button>
                <button
                  onClick={() => closeMechanicModal()}
                  className="flex-1 px-4 py-2 rounded-lg bg-gray-200 text-gray-800 font-medium hover:bg-gray-300 transition-all"
                >
                  ยกเลิก
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Sidebar */}
      <div className="p-4">
        <div className="flex flex-col bg-white rounded-lg border border-gray-100 w-64 px-2 py-3 min-h-full">
          <Image className="mx-auto" src="/logo.png" alt="CTC Logo" width={40} height={40} />
          <span className="mx-auto font-bold">Admin</span>
          <span className="mx-auto font-bold text-xs text-gray-500">ระบบจัดการ</span>
          <hr className="text-gray-200 my-2" />

          <div>
            <ul className="flex flex-col gap-2 text-sm">
              <li
                onClick={() => setActiveTab("summary")}
                className={`px-4 py-2 rounded-lg font-medium cursor-pointer transition-all duration-200 flex items-center gap-2 ${
                  activeTab === "summary"
                    ? "bg-gray-900 text-white"
                    : "hover:bg-gray-100"
                }`}
              >
                <FaStar size={14} /> สรุปข้อมูล
              </li>
              <li
                onClick={() => setActiveTab("jobs")}
                className={`px-4 py-2 rounded-lg font-medium cursor-pointer transition-all duration-200 flex items-center gap-2 ${
                  activeTab === "jobs"
                    ? "bg-gray-900 text-white"
                    : "hover:bg-gray-100"
                }`}
              >
                <FaList size={14} /> จัดการงาน
              </li>
              <li
                onClick={() => setActiveTab("mechanics")}
                className={`px-4 py-2 rounded-lg font-medium cursor-pointer transition-all duration-200 flex items-center gap-2 ${
                  activeTab === "mechanics"
                    ? "bg-gray-900 text-white"
                    : "hover:bg-gray-100"
                }`}
              >
                <FaUsers size={14} /> จัดการช่าง
              </li>
            </ul>
          </div>

          <div className="mt-auto flex flex-col gap-2">
            <hr className="text-gray-200 my-2" />
            <Link
              href="/admin/login"
              className="px-4 py-2 rounded-lg hover:bg-red-100 hover:text-red-500 cursor-pointer text-center transition-all duration-200 flex items-center justify-center gap-2"
            >
              <FaSignOutAlt /> ออกจากระบบ
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 flex-col ml-4 p-6 overflow-y-auto max-h-screen">
        <span>
          <span className="text-gray-500">Page </span>/ Admin
        </span>
        <br />
        <span className="text-xl font-bold">Admin Dashboard</span>
        <span className="text-gray-500 mb-6">ยินดีต้อนรับ, ผู้ดูแลระบบ</span>

        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <div className="bg-gray-900 w-full flex flex-col p-5 rounded-xl">
            <span className="flex justify-center items-center gap-x-2 font-medium text-gray-400 text-center">
              <FaStar size={16} /> งานทั้งหมด
            </span>
            <span className="text-8xl text-white text-center">{jobs.length}</span>
          </div>
          <div className="bg-yellow-500 w-full flex flex-col p-5 rounded-xl">
            <span className="flex justify-center items-center gap-x-2 font-medium text-gray-200 text-center">
              <FaClock size={16} /> รอตรวจสอบ
            </span>
            <span className="text-8xl text-white text-center">{jobs.filter(j => j.status === "pending").length}</span>
          </div>
          <div className="bg-green-600 w-full flex flex-col p-5 rounded-xl">
            <span className="flex justify-center items-center gap-x-2 font-medium text-gray-200 text-center">
              <FaCheck size={16} /> อนุมัติแล้ว
            </span>
            <span className="text-8xl text-white text-center">{jobs.filter(j => j.status === "approved").length}</span>
          </div>
          <div className="bg-blue-600 w-full flex flex-col p-5 rounded-xl">
            <span className="flex justify-center items-center gap-x-2 font-medium text-gray-200 text-center">
              <FaUsers size={16} /> ช่างทั้งหมด
            </span>
            <span className="text-8xl text-white text-center">{mechanics.length}</span>
          </div>
        </div>

        {/* Summary Tab */}
        {activeTab === "summary" && (
          <div className="space-y-6">
            <h2 className="text-lg font-bold">สรุปข้อมูลระบบ</h2>

            {/* Job Statistics */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-base font-bold mb-4 flex items-center gap-2">
                <FaList size={16} /> สถิติงาน
              </h3>
              <div className="grid grid-cols-5 gap-4">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-3xl font-bold text-gray-900">{jobs.length}</div>
                  <div className="text-sm text-gray-600 mt-2">งานทั้งหมด</div>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <div className="text-3xl font-bold text-yellow-600">{jobs.filter(j => j.status === "pending").length}</div>
                  <div className="text-sm text-gray-600 mt-2">รอตรวจสอบ</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-3xl font-bold text-green-600">{jobs.filter(j => j.status === "approved").length}</div>
                  <div className="text-sm text-gray-600 mt-2">อนุมัติแล้ว</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-3xl font-bold text-blue-600">{jobs.filter(j => j.status === "assigned").length}</div>
                  <div className="text-sm text-gray-600 mt-2">มอบหมายแล้ว</div>
                </div>
                <div className="text-center p-4 bg-red-50 rounded-lg">
                  <div className="text-3xl font-bold text-red-600">{jobs.filter(j => j.status === "rejected").length}</div>
                  <div className="text-sm text-gray-600 mt-2">ปฏิเสธ</div>
                </div>
              </div>
            </div>

            {/* Mechanic Statistics */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-base font-bold mb-4 flex items-center gap-2">
                <FaUsers size={16} /> สถิติช่าง
              </h3>
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-3xl font-bold text-gray-900">{mechanics.length}</div>
                  <div className="text-sm text-gray-600 mt-2">ช่างทั้งหมด</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-3xl font-bold text-green-600">{mechanics.filter(m => m.status === "active").length}</div>
                  <div className="text-sm text-gray-600 mt-2">ใช้งาน</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-3xl font-bold text-gray-600">{mechanics.filter(m => m.status === "inactive").length}</div>
                  <div className="text-sm text-gray-600 mt-2">ปิดใช้งาน</div>
                </div>
              </div>
            </div>

            {/* Top Performers */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-base font-bold mb-4">ช่างด้าน (งานเสร็จสูงสุด)</h3>
              <div className="space-y-2">
                {mechanics
                  .sort((a, b) => b.completedJobs - a.completedJobs)
                  .slice(0, 3)
                  .map((mechanic) => (
                    <div
                      key={mechanic.id}
                      className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                    >
                      <div>
                        <div className="font-medium">{mechanic.name}</div>
                        <div className="text-xs text-gray-600">{mechanic.specialty}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-lg text-green-600">{mechanic.completedJobs}</div>
                        <div className="text-xs text-gray-600">งาน</div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Recent Jobs */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-base font-bold mb-4">งานล่าสุด</h3>
              <div className="space-y-2">
                {jobs.slice(0, 3).map((job) => (
                  <div key={job.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <div className="font-medium text-sm">{job.title}</div>
                      <div className="text-xs text-gray-600">{job.customer}</div>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-lg text-white text-xs font-medium ${
                        job.status === "pending"
                          ? "bg-yellow-500"
                          : job.status === "approved"
                          ? "bg-green-600"
                          : job.status === "assigned"
                          ? "bg-blue-600"
                          : "bg-red-500"
                      }`}
                    >
                      {job.status === "pending" && "รอตรวจสอบ"}
                      {job.status === "approved" && "อนุมัติแล้ว"}
                      {job.status === "assigned" && "มอบหมายแล้ว"}
                      {job.status === "rejected" && "ปฏิเสธ"}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Download Reports */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-base font-bold mb-4 flex items-center gap-2">
                <FaDownload size={16} /> ดาวโหลดรายงาน
              </h3>
              <div className="grid grid-cols-4 gap-4">
                <button
                  onClick={() => downloadReport("งานทั้งหมด")}
                  className="bg-white border border-gray-300 rounded-lg p-4 hover:shadow-md transition-all text-center"
                >
                  <FaDownload size={24} className="mx-auto mb-2 text-blue-600" />
                  <div className="text-sm font-medium">งานทั้งหมด</div>
                  <div className="text-xs text-gray-600 mt-1">Excel</div>
                </button>

                <button
                  onClick={() => downloadReport("งานที่เสร็จสิ้น")}
                  className="bg-white border border-gray-300 rounded-lg p-4 hover:shadow-md transition-all text-center"
                >
                  <FaDownload size={24} className="mx-auto mb-2 text-green-600" />
                  <div className="text-sm font-medium">งานที่เสร็จสิ้น</div>
                  <div className="text-xs text-gray-600 mt-1">Excel</div>
                </button>

                <button
                  onClick={() => downloadReport("ประสิทธิภาพช่าง")}
                  className="bg-white border border-gray-300 rounded-lg p-4 hover:shadow-md transition-all text-center"
                >
                  <FaDownload size={24} className="mx-auto mb-2 text-yellow-600" />
                  <div className="text-sm font-medium">ประสิทธิภาพช่าง</div>
                  <div className="text-xs text-gray-600 mt-1">Excel</div>
                </button>

                <button
                  onClick={() => downloadReport("สรุปรายการปัญหา")}
                  className="bg-white border border-gray-300 rounded-lg p-4 hover:shadow-md transition-all text-center"
                >
                  <FaDownload size={24} className="mx-auto mb-2 text-red-600" />
                  <div className="text-sm font-medium">สรุปปัญหา</div>
                  <div className="text-xs text-gray-600 mt-1">PDF</div>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Jobs Management Tab */}
        {activeTab === "jobs" && (
          <div>
            <h2 className="text-lg font-bold mb-4">จัดการงาน</h2>

            {/* Status Filters */}
            <div className="flex gap-2 mb-6 flex-wrap">
              <button 
                onClick={() => setJobFilter("all")}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 ${jobFilter === "all" ? 'bg-gray-900 text-white' : 'bg-white border border-gray-200 hover:bg-gray-100'}`}
              >
                <FaStar size={14} /> ทั้งหมด ({jobs.length})
              </button>
              <button 
                onClick={() => setJobFilter("pending")}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 ${jobFilter === "pending" ? 'bg-yellow-500 text-white' : 'bg-white border border-gray-200 hover:bg-gray-100'}`}
              >
                <FaClock size={14} /> รอตรวจสอบ ({jobs.filter(j => j.status === "pending").length})
              </button>
              <button 
                onClick={() => setJobFilter("approved")}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 ${jobFilter === "approved" ? 'bg-green-600 text-white' : 'bg-white border border-gray-200 hover:bg-gray-100'}`}
              >
                <FaCheck size={14} /> อนุมัติแล้ว ({jobs.filter(j => j.status === "approved").length})
              </button>
              <button 
                onClick={() => setJobFilter("assigned")}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 ${jobFilter === "assigned" ? 'bg-blue-600 text-white' : 'bg-white border border-gray-200 hover:bg-gray-100'}`}
              >
                <FaThumbsUp size={14} /> มอบหมายแล้ว ({jobs.filter(j => j.status === "assigned").length})
              </button>
              <button 
                onClick={() => setJobFilter("completed")}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 ${jobFilter === "completed" ? 'bg-green-700 text-white' : 'bg-white border border-gray-200 hover:bg-gray-100'}`}
              >
                <FaCheckCircle size={14} /> เสร็จสิ้น ({jobs.filter(j => j.status === "completed").length})
              </button>
              <button 
                onClick={() => setJobFilter("failed")}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 ${jobFilter === "failed" ? 'bg-red-600 text-white' : 'bg-white border border-gray-200 hover:bg-gray-100'}`}
              >
                <FaTimesCircle size={14} /> ไม่สำเร็จ ({jobs.filter(j => j.status === "failed").length})
              </button>
            </div>

            {/* Jobs List */}
            <div className="grid gap-3">
              {jobs
                .filter((j) => {
                  if (jobFilter === "all") return true;
                  return j.status === jobFilter;
                })
                .map((job) => (
                <div
                  key={job.id}
                  className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all"
                >
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <div className="font-bold text-lg mb-2">
                        {job.title} —{" "}
                        <span className="text-gray-500 text-sm">{job.id}</span>
                      </div>
                      <div className="text-gray-600 text-sm flex items-center gap-3 mb-2">
                        <span className="flex items-center gap-1">
                          <FaUser size={14} /> {job.customer}
                        </span>
                        <span className="flex items-center gap-1">
                          <FaMapMarkerAlt size={14} /> {job.address}
                        </span>
                      </div>
                      <div className="text-gray-500 text-sm flex items-center gap-1 mb-2">
                        <FaCalendarAlt size={13} /> {job.scheduled}
                      </div>
                      <div className="text-sm text-gray-700">
                        <span className="font-medium">ความสำคัญ: </span>
                        {job.priority === "high" && (
                          <span className="text-red-600">สูง</span>
                        )}
                        {job.priority === "medium" && (
                          <span className="text-yellow-600">ปานกลาง</span>
                        )}
                        {job.priority === "low" && (
                          <span className="text-green-600">ต่ำ</span>
                        )}
                        <span className="mx-4 font-medium">โมง: {job.estimatedHours}</span>
                      </div>
                      {job.details && (
                        <div className="text-gray-700 text-sm mt-2">
                          {job.details}
                        </div>
                      )}
                    </div>

                    <div className="text-right min-w-max">
                      <div className="mb-4">
                        <span
                          className={`px-3 py-1 rounded-lg text-white text-sm font-medium ${
                            job.status === "pending"
                              ? "bg-yellow-500"
                              : job.status === "approved"
                              ? "bg-green-600"
                              : job.status === "assigned"
                              ? "bg-blue-600"
                              : job.status === "completed"
                              ? "bg-green-700"
                              : "bg-red-600"
                          }`}
                        >
                          {job.status === "pending" && "รอตรวจสอบ"}
                          {job.status === "approved" && "อนุมัติแล้ว"}
                          {job.status === "assigned" && "มอบหมายแล้ว"}
                          {job.status === "completed" && "เสร็จสิ้น"}
                          {job.status === "rejected" && "ปฏิเสธ"}
                          {job.status === "failed" && "ไม่สำเร็จ"}
                        </span>
                      </div>

                      <div className="flex gap-2 flex-col">
                        {job.status === "pending" && (
                          <>
                            <button
                              onClick={() => approveJob(job.id)}
                              className="px-3 py-2 rounded-lg bg-green-600 text-white font-medium hover:bg-green-700 transition-all text-sm"
                            >
                              <FaCheck size={12} className="inline mr-1" /> อนุมัติ
                            </button>
                            <button
                              onClick={() => rejectJob(job.id)}
                              className="px-3 py-2 rounded-lg bg-red-600 text-white font-medium hover:bg-red-700 transition-all text-sm"
                            >
                              <FaTimesCircle size={12} className="inline mr-1" /> ปฏิเสธ
                            </button>
                          </>
                        )}

                        {job.status === "approved" && (
                          <button
                            onClick={() => {
                              setSelectedJob(job);
                              setModalOpen(true);
                            }}
                            className="px-3 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-all text-sm"
                          >
                            <FaThumbsUp size={12} className="inline mr-1" /> มอบหมาย
                          </button>
                        )}

                        {job.status === "assigned" && (
                          <div className="text-xs text-gray-600 p-2 bg-gray-50 rounded">
                            มอบหมายให้:{" "}
                            {mechanics.find((m) => m.id === job.assignedTo)?.name}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Mechanics Management Tab */}
        {activeTab === "mechanics" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold">จัดการช่าง</h2>
              <button className="px-4 py-2 rounded-lg bg-gray-900 text-white font-medium hover:bg-gray-800 flex items-center gap-2">
                <FaPlus size={14} /> เพิ่มช่างใหม่
              </button>
            </div>

            {/* Mechanics Table */}
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-900 text-white">
                  <tr>
                    <th className="px-4 py-3 text-left">ชื่อ</th>
                    <th className="px-4 py-3 text-left">อีเมล</th>
                    <th className="px-4 py-3 text-left">เบอร์โทร</th>
                    <th className="px-4 py-3 text-left">ความเชี่ยวชาญ</th>
                    <th className="px-4 py-3 text-left">งานเสร็จ</th>
                    <th className="px-4 py-3 text-left">สถานะ</th>
                    <th className="px-4 py-3 text-center">การจัดการ</th>
                  </tr>
                </thead>
                <tbody>
                  {mechanics.map((mechanic) => (
                    <tr key={mechanic.id} className="border-t border-gray-200 hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium">{mechanic.name}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{mechanic.email}</td>
                      <td className="px-4 py-3 text-sm">{mechanic.phone}</td>
                      <td className="px-4 py-3 text-sm">{mechanic.specialty}</td>
                      <td className="px-4 py-3 font-bold">{mechanic.completedJobs}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`px-3 py-1 rounded-lg text-white text-sm font-medium ${
                            mechanic.status === "active"
                              ? "bg-green-600"
                              : "bg-gray-500"
                          }`}
                        >
                          {mechanic.status === "active" ? "ใช้งาน" : "ปิดใช้งาน"}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <button
                          onClick={() => openMechanicEditModal(mechanic)}
                          className="inline-block px-3 py-1 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-all text-sm mr-2"
                        >
                          <FaEdit size={12} className="inline mr-1" /> แก้ไข
                        </button>
                        <button className="inline-block px-3 py-1 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-all text-sm">
                          <FaTrash size={12} className="inline mr-1" /> ลบ
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
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
