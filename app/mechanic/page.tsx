"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { FaStar } from "@react-icons/all-files/fa/FaStar";
import { FaCheck } from "@react-icons/all-files/fa/FaCheck";
import { FaHistory } from "@react-icons/all-files/fa/FaHistory";
import { FaSignOutAlt } from "@react-icons/all-files/fa/FaSignOutAlt";
import { FaClock } from "@react-icons/all-files/fa/FaClock";
import { FaCheckCircle } from "@react-icons/all-files/fa/FaCheckCircle";
import { FaSpinner } from "@react-icons/all-files/fa/FaSpinner";
import { FaTimesCircle } from "@react-icons/all-files/fa/FaTimesCircle";
import { FaMapMarkerAlt } from "@react-icons/all-files/fa/FaMapMarkerAlt";
import { FaUser } from "@react-icons/all-files/fa/FaUser";
import { FaCalendarAlt } from "@react-icons/all-files/fa/FaCalendarAlt";
import { FaThumbsUp } from "@react-icons/all-files/fa/FaThumbsUp";
import { FaPlay } from "@react-icons/all-files/fa/FaPlay";
import { FaTrash } from "@react-icons/all-files/fa/FaTrash";
import { FaSearch } from "@react-icons/all-files/fa/FaSearch";

type JobStatus = "pending" | "accepted" | "in_progress" | "completed" | "declined";

type Job = {
    id: string;
    title: string;
    customer: string;
    address: string;
    scheduled: string;
    status: JobStatus;
    details?: string;
    reason?: string;
};

const SAMPLE_JOBS: Job[] = [
    {
        id: "J-1001",
        title: "อินเตอร์เน็ตช้า",
        customer: "อาจารย์สมศรี",
        address: "ตึกคอมพิวเตอร์ ชั้น 2",
        scheduled: "2026-01-07 09:30",
        status: "pending",
        details: "ใช้งานอินเตอร์เน็ตไม่สะดวก โปรดตรวจสอบความเร็วและการเชื่อมต่อ",
    },
    {
        id: "J-1002",
        title: "จอประสาทหลวง",
        customer: "อาจารย์เพชร",
        address: "ห้องศูนย์วิจัย ชั้น 3",
        scheduled: "2026-01-07 10:00",
        status: "pending",
        details: "เปลี่ยนจอคอมพิวเตอร์ที่เสีย",
    },
    {
        id: "J-1003",
        title: "ซ่อมเครื่องพิมพ์",
        customer: "นางสาวสมหวัง",
        address: "สำนักงานสาขา ชั้น 1",
        scheduled: "2026-01-07 11:30",
        status: "accepted",
        details: "เครื่องพิมพ์เอกสารผิดปกติ ไม่ให้กระดาษออก",
    },
    {
        id: "J-1004",
        title: "ตรวจสอบระบบ CCTV",
        customer: "เจ้าหน้าที่รักษาความปลอดภัย",
        address: "ห้องควบคุม ชั้น B1",
        scheduled: "2026-01-07 13:00",
        status: "in_progress",
        details: "ระบบกล้องวงจรปิดหลายตัวไม่ทำงาน ต้องตรวจสอบสายและระบบไฟ",
    },
    {
        id: "J-1005",
        title: "เปลี่ยนฮาร์ดดิสก์",
        customer: "อาจารย์มงคล",
        address: "ห้องสำนักงาน ชั้น 4",
        scheduled: "2026-01-06 14:30",
        status: "completed",
        details: "ฮาร์ดดิสก์เก่าเหลือพื้นที่น้อย เปลี่ยนเป็นขนาด 1TB",
    },
    {
        id: "J-1006",
        title: "สายเน็ตหลวม",
        customer: "นางสาวนวล",
        address: "ห้องเรียน 204",
        scheduled: "2026-01-06 15:00",
        status: "completed",
        details: "ต่อ network cable ใหม่และตรวจสอบ patch panel",
    },
    {
        id: "J-1007",
        title: "อินเตอร์เน็ตตัดบ่อย",
        customer: "อาจารย์วิชัย",
        address: "ห้องศูนย์วิจัย ชั้น 5",
        scheduled: "2026-01-05 16:00",
        status: "declined",
        reason: "ลูกค้าขอเลื่อนการซ่อม ไม่พร้อมในตอนนี้",
        details: "ตรวจสอบการเชื่อมต่อและ router",
    },
    {
        id: "J-1008",
        title: "ซ่อมจอ LED",
        customer: "เจ้าหน้าที่บัญชี",
        address: "ห้องประชุมใหญ่",
        scheduled: "2026-01-08 09:00",
        status: "pending",
        details: "จอ LED โปรเจกเตอร์ไม่แสดงภาพ",
    },
    {
        id: "J-1009",
        title: "ติดตั้ง Software",
        customer: "อาจารย์สุรชัย",
        address: "ห้องแลบ ชั้น 2",
        scheduled: "2026-01-08 10:30",
        status: "accepted",
        details: "ติดตั้ง Adobe Creative Suite และ AutoCAD",
    },
    {
        id: "J-1010",
        title: "ตรวจสอบระบบ WiFi",
        customer: "ผู้บริหาร IT",
        address: "สำนักงาน CEO",
        scheduled: "2026-01-08 11:00",
        status: "in_progress",
        details: "ปรับปรุงสัญญาณ WiFi ในพื้นที่บอร์ดรูม",
    },
];

// localStorage disabled

export default function MechanicDashboard() {
    const [jobs, setJobs] = useState<Job[]>(SAMPLE_JOBS);
    const [filter, setFilter] = useState<"all" | JobStatus | "search">("all");
    const [query, setQuery] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const [modalClosing, setModalClosing] = useState(false);
    const [modalReason, setModalReason] = useState("");
    const [modalJobId, setModalJobId] = useState<string | null>(null);

    // initialized with sample jobs; no mount state required

    function updateStatus(id: string, status: JobStatus) {
        setJobs((prev) => prev.map((j) => (j.id === id ? { ...j, status } : j)));
    }

    function openFailModal(jobId: string) {
        setModalJobId(jobId);
        setModalReason("");
        setModalClosing(false);
        setModalOpen(true);
    }

    function closeModal() {
        setModalClosing(true);
        setTimeout(() => {
            setModalOpen(false);
            setModalClosing(false);
        }, 300);
    }

    function submitFailReason() {
        if (modalJobId) {
            setJobs((prev) =>
                prev.map((j) =>
                    j.id === modalJobId ? { ...j, status: "declined", reason: modalReason } : j
                )
            );
            closeModal();
            setModalJobId(null);
            setModalReason("");
        }
    }

    function filteredJobs() {
        return jobs.filter((j) => {
            if (filter === "all") return true;
            if (filter === "search") {
                const q = query.toLowerCase();
                return (
                    j.title.toLowerCase().includes(q) ||
                    j.customer.toLowerCase().includes(q) ||
                    j.id.toLowerCase().includes(q)
                );
            }
            return j.status === filter;
        });
    }

    const counts = {
        all: jobs.length,
        pending: jobs.filter((j) => j.status === "pending").length,
        accepted: jobs.filter((j) => j.status === "accepted").length,
        in_progress: jobs.filter((j) => j.status === "in_progress").length,
        completed: jobs.filter((j) => j.status === "completed").length,
        declined: jobs.filter((j) => j.status === "declined").length,
    };

    return (
        <div className="flex min-h-screen bg-[#F3F3F3] ">
            {/* Modal Backdrop */}
            {modalOpen && (
                <div
                    className={`fixed inset-0 bg-white-20 bg-opacity-50 backdrop-blur-sm z-40 ${modalClosing ? 'animate-fadeOut' : 'animate-fadeIn'}`}
                    onClick={() => closeModal()}
                />
            )}

            {/* Modal */}
            {modalOpen && (
                <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${modalClosing ? 'animate-slideDown' : 'animate-slideUp'}`}>
                    <div
                        className="bg-white rounded-lg shadow-2xl max-w-md w-full p-6"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                            <FaTimesCircle className="text-red-500" /> เหตุผลที่ไม่สำเร็จ
                        </h2>
                        <textarea
                            value={modalReason}
                            onChange={(e) => setModalReason(e.target.value)}
                            placeholder="กรุณาใส่เหตุผล..."
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 mb-4 resize-none"
                            rows={4}
                        />
                        <div className="flex gap-2">
                            <button
                                onClick={() => closeModal()}
                                className="flex-1 px-4 py-2 rounded-lg bg-gray-200 text-gray-800 font-medium hover:bg-gray-300 transition-all duration-200"
                            >
                                ยกเลิก
                            </button>
                            <button
                                onClick={submitFailReason}
                                className="flex-1 px-4 py-2 rounded-lg bg-red-600 text-white font-medium hover:bg-red-700 transition-all duration-200 flex items-center justify-center gap-2"
                            >
                                <FaCheck size={14} /> ยืนยัน
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* sidebar mechanic page */}
            <div className="p-4">
                <div className="flex flex-col bg-white rounded-lg border border-gray-100 w-1.5/12 px-2 py-3 min-h-full">
                    <Image className='mx-auto' src="/logo.png" alt="CTC Logo" width={40} height={40} />
                    <span className="mx-auto font-bold">Mechanic</span>
                    <span className="mx-auto font-bold text-xs text-gray-500">ระบบจัดการงานช่าง</span>
                    <hr className="text-gray-200 my-2" />
                    <div>
                        <ul className="flex flex-col gap-2 text-sm">
                            <li className="px-4 py-2 rounded-lg bg-gray-900 text-white font-medium cursor-pointer transition-all duration-200 flex items-center gap-2">
                                <FaStar /> งานที่ได้รับมอบหมาย
                            </li>
                            <li className="px-4 py-2 rounded-lg hover:bg-gray-100 cursor-pointer transition-all duration-200 flex items-center gap-2">
                                <FaHistory /> ประวัติการซ่อม
                            </li>
                        </ul>
                    </div>
                    <div className='mt-auto flex flex-col gap-2'>
                        <hr className="text-gray-200 my-2" />
                        <Link href="/mechanic/login" className="px-4 py-2 rounded-lg hover:bg-red-100 hover:text-red-500 cursor-pointer text-center transition-all duration-200 flex items-center justify-center gap-2">
                            <FaSignOutAlt /> ออกจากระบบ
                        </Link>
                    </div>
                </div>
            </div>

            {/* main mechanic page */}
            <div className="flex flex-1 flex-col ml-4 p-6 overflow-y-auto max-h-screen ">
                <span><span className='text-gray-500'>Page </span>/ Mechanic</span>
                <br />
                <span className='text-xl font-bold'>Mechanic Dashboard</span>
                <span className='text-gray-500 mb-6'>ยินดีต้อนรับ, ช่าง สมชาย ใจดี ( ช่างซ่อมไฟฟ้า )</span>

                <div className="grid grid-cols-4 gap-4 mb-8">
                    <div className="bg-gray-900 w-full flex flex-col p-5 rounded-xl">
                        <span className='flex justify-center items-center gap-x-2 font-medium text-gray-400 text-center'><FaStar /> งานที่ได้รับมอบหมาย</span>
                        <span className='text-8xl text-white text-center'>{counts.all}</span>
                    </div>
                    <div className="bg-green-600 w-full flex flex-col p-5 rounded-xl">
                        <span className='flex justify-center items-center gap-x-2 font-medium text-gray-200 text-center'><FaCheck /> งานที่เสร็จสิ้น</span>
                        <span className='text-8xl text-white text-center'>{counts.completed}</span>
                    </div>
                    <div className="bg-yellow-500 w-full flex flex-col p-5 rounded-xl">
                        <span className='flex justify-center items-center gap-x-2 font-medium text-gray-200 text-center'><FaSpinner /> งานที่กำลังดำเนินการ</span>
                        <span className='text-8xl text-white text-center'>{counts.in_progress}</span>
                    </div>
                    <div className="bg-red-500 w-full flex flex-col p-5 rounded-xl">
                        <span className='flex justify-center items-center gap-x-2 font-medium text-gray-200 text-center'><FaClock /> งานรอดำเนินการ</span>
                        <span className='text-8xl text-white text-center'>{counts.pending}</span>
                    </div>
                </div>

                {/* Filter buttons */}
                <div className="flex gap-2 mb-6 flex-wrap">
                    <button
                        onClick={() => setFilter("all")}
                        className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 ${filter === "all" ? 'bg-gray-900 text-white' : 'bg-white border border-gray-200 hover:bg-gray-100'}`}
                    >
                        <FaStar size={14} /> ทั้งหมด ({counts.all})
                    </button>
                    <button
                        onClick={() => setFilter("pending")}
                        className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 ${filter === "pending" ? 'bg-red-500 text-white' : 'bg-white border border-gray-200 hover:bg-gray-100'}`}
                    >
                        <FaClock size={14} /> รอรับงาน ({counts.pending})
                    </button>
                    <button
                        onClick={() => setFilter("accepted")}
                        className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 ${filter === "accepted" ? 'bg-green-600 text-white' : 'bg-white border border-gray-200 hover:bg-gray-100'}`}
                    >
                        <FaThumbsUp size={14} /> รับงาน ({counts.accepted})
                    </button>
                    <button
                        onClick={() => setFilter("in_progress")}
                        className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 ${filter === "in_progress" ? 'bg-yellow-500 text-white' : 'bg-white border border-gray-200 hover:bg-gray-100'}`}
                    >
                        <FaSpinner size={14} /> กำลังทำ ({counts.in_progress})
                    </button>
                    <button
                        onClick={() => setFilter("completed")}
                        className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 ${filter === "completed" ? 'bg-blue-600 text-white' : 'bg-white border border-gray-200 hover:bg-gray-100'}`}
                    >
                        <FaCheckCircle size={14} /> เสร็จแล้ว ({counts.completed})
                    </button>
                    <button
                        onClick={() => setFilter("declined")}
                        className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 ${filter === "declined" ? 'bg-gray-500 text-white' : 'bg-white border border-gray-200 hover:bg-gray-100'}`}
                    >
                        <FaTimesCircle size={14} /> ไม่สำเร็จ ({counts.declined})
                    </button>
                </div>

                {/* Search bar */}
                <div className="mb-6">
                    <div className="flex gap-2">
                        <div className="flex-1 relative">
                            <input
                                placeholder="ค้นหา by id, ชื่อ, ลูกค้า"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                onFocus={() => setFilter("search")}
                                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <FaSearch className="absolute right-3 top-3 text-gray-400" size={16} />
                        </div>
                        <button
                            onClick={() => { setQuery(""); setFilter("all"); }}
                            className="px-4 py-2 rounded-lg bg-white border border-gray-200 hover:bg-gray-100 transition-all duration-200"
                        >
                            ล้าง
                        </button>
                    </div>
                </div>

                {/* Job list */}
                {filteredJobs().length === 0 && (
                    <div className="text-center text-gray-500 py-8">ไม่พบงาน</div>
                )}

                <div className="grid gap-3">
                    {filteredJobs().map((job) => (
                        <div key={job.id} className="bg-white border border-gray-200 rounded-lg p-4 flex gap-4 hover:shadow-md transition-all duration-200">
                            <div className="flex-1">
                                <div className="font-bold text-lg mb-2 flex items-center gap-2">{job.title} — <span className="text-gray-500 text-sm">{job.id}</span></div>
                                <div className="text-gray-600 text-sm flex items-center gap-3 mb-2">
                                    <span className="flex items-center gap-1"><FaUser size={14} /> {job.customer}</span>
                                    <span className="flex items-center gap-1"><FaMapMarkerAlt size={14} /> {job.address}</span>
                                </div>
                                <div className="text-gray-500 text-sm flex items-center gap-1 mb-2"><FaCalendarAlt size={13} /> {job.scheduled}</div>
                                {job.details && <div className="text-gray-700 text-sm mt-2">{job.details}</div>}
                                {job.status === "declined" && job.reason && (
                                    <div className="mt-3 p-3 rounded-lg bg-red-50 border border-red-200">
                                        <div className="text-red-700 font-medium text-xs mb-1">เหตุผล:</div>
                                        <div className="text-red-600 text-sm">{job.reason}</div>
                                    </div>
                                )}
                            </div>

                            <div className="text-right min-w-max">
                                <div className="mb-4">
                                    <span className={`px-4 py-2 rounded-lg font-bold text-white flex items-center gap-2 justify-center ${getStatusBg(job.status)}`}>
                                        {getStatusIcon(job.status)}
                                        {readableStatus(job.status)}
                                    </span>
                                </div>

                                <div className="flex gap-2 flex-col">
                                    {job.status === "pending" && (
                                        <>
                                            <button onClick={() => updateStatus(job.id, "accepted")} className="px-3 py-2 rounded-lg bg-green-600 text-white font-medium hover:bg-green-700 transition-all duration-200 flex items-center justify-center gap-2">
                                                <FaThumbsUp size={14} /> รับงาน
                                            </button>
                                            <button onClick={() => openFailModal(job.id)} className="px-3 py-2 rounded-lg bg-red-600 text-white font-medium hover:bg-red-700 transition-all duration-200 flex items-center justify-center gap-2">
                                                <FaTimesCircle size={14} /> ไม่สำเร็จ
                                            </button>
                                        </>
                                    )}

                                    {job.status === "accepted" && (
                                        <>
                                            <button onClick={() => updateStatus(job.id, "in_progress")} className="px-3 py-2 rounded-lg bg-yellow-500 text-white font-medium hover:bg-yellow-600 transition-all duration-200 flex items-center justify-center gap-2">
                                                <FaPlay size={14} /> เริ่มงาน
                                            </button>
                                            <button onClick={() => openFailModal(job.id)} className="px-3 py-2 rounded-lg bg-red-600 text-white font-medium hover:bg-red-700 transition-all duration-200 flex items-center justify-center gap-2">
                                                <FaTimesCircle size={14} /> ไม่สำเร็จ
                                            </button>
                                        </>
                                    )}

                                    {job.status === "in_progress" && (
                                        <button onClick={() => updateStatus(job.id, "completed")} className="px-3 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-all duration-200 flex items-center justify-center gap-2">
                                            <FaCheckCircle size={14} /> เสร็จสิ้น
                                        </button>
                                    )}

                                    {job.status === "completed" && (
                                        <button onClick={() => updateStatus(job.id, "accepted")} className="px-3 py-2 rounded-lg bg-gray-600 text-white font-medium hover:bg-gray-700 transition-all duration-200 flex items-center justify-center gap-2">
                                            <FaTrash size={14} /> เปิดใหม่
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

function readableStatus(s: JobStatus) {
    switch (s) {
        case "pending":
            return "รอรับงาน";
        case "accepted":
            return "รับงาน";
        case "in_progress":
            return "กำลังทำ";
        case "completed":
            return "เสร็จแล้ว";
        case "declined":
            return "ปฏิเสธ";
    }
}

function getStatusBg(s: JobStatus) {
    switch (s) {
        case "pending":
            return "bg-red-500";
        case "accepted":
            return "bg-green-600";
        case "in_progress":
            return "bg-yellow-500";
        case "completed":
            return "bg-blue-600";
        case "declined":
            return "bg-gray-500";
    }
}

function getStatusIcon(s: JobStatus) {
    switch (s) {
        case "pending":
            return <FaClock size={14} />;
        case "accepted":
            return <FaThumbsUp size={14} />;
        case "in_progress":
            return <FaSpinner size={14} />;
        case "completed":
            return <FaCheck size={14} />;
        case "declined":
            return <FaTimesCircle size={14} />;
    }
}

// Add CSS for animations
const styles = `
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes fadeOut {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
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

  .animate-fadeIn {
    animation: fadeIn 0.3s ease-in-out;
  }

  .animate-fadeOut {
    animation: fadeOut 0.3s ease-in-out;
  }

  .animate-slideUp {
    animation: slideUp 0.3s ease-out;
  }

  .animate-slideDown {
    animation: slideDown 0.3s ease-in;
  }
`;

// Inject styles into head
if (typeof document !== 'undefined') {
    const style = document.createElement('style');
    style.textContent = styles;
    document.head.appendChild(style);
}