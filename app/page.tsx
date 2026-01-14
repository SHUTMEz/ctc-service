import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full flex items-center justify-center">
              <Image src="/logo.png" alt="CTC Logo" width={30} height={30} />
            </div>
            <h1 className="text-lg font-bold text-gray-800">ระบบแจ้งซ่อม</h1>
          </div>
          <div className="flex gap-4">
            <Link href="/mechanic/login" className="px-4 py-2 text-blue-600 hover:text-blue-700 font-medium">
              เข้าสู่ระบบช่าง
            </Link>
            <Link href="/admin/login" className="px-4 py-2 text-red-600 hover:text-red-700 font-medium">
              เข้าสู่ระบบผู้ดูแล
            </Link>
            <Link href="/request" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
              แจ้งปัญหา
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              ระบบแจ้งซ่อม
              <br />
              <span className="text-blue-600">วิทยาลัยเทคนิคชัยภูมิ</span>
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              บริการแจ้งซ่อมอาคารสถานที่และอุปกรณ์โดยใช้ระบบดิจิทัล ที่มีประสิทธิภาพ เร็ว และโปร่งใส เพื่อให้สภาพแวดล้อมการเรียนการสอนดีขึ้น
            </p>
            <div className="flex gap-4">
              <Link href="/request" className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition">
                แจ้งปัญหา
              </Link>
              <Link href="/about" className="px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 font-medium transition">
                เรียนรู้เพิ่มเติม
              </Link>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="bg-gradient-to-br from-blue-400 to-indigo-600 rounded-2xl h-80 flex items-center justify-center text-white">
              <div className="text-center">
                <svg className="w-24 h-24 mx-auto mb-4 opacity-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-xl font-semibold">บริการ 24/7</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
            ความสามารถของระบบ
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-blue-50 p-8 rounded-xl hover:shadow-lg transition">
              <div className="bg-blue-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">แจ้งซ่อมง่าย</h4>
              <p className="text-gray-600">
                ระบบการแจ้งซ่อมที่ง่าย รวดเร็ว และผ่านอินเทอร์เน็ต สามารถแจ้งซ่อมได้ทุกเวลา
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-indigo-50 p-8 rounded-xl hover:shadow-lg transition">
              <div className="bg-indigo-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">ติดตามสถานะ</h4>
              <p className="text-gray-600">
                ตรวจสอบสถานะการซ่อมแบบเรียลไทม์ รู้ว่างานซ่อมอยู่ที่ขั้นไหนในขณะนี้
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-purple-50 p-8 rounded-xl hover:shadow-lg transition">
              <div className="bg-purple-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">ประสิทธิภาพสูง</h4>
              <p className="text-gray-600">
                ลดเวลาในการซ่อม และทำให้การซ่อมแซมมีประสิทธิภาพมากขึ้น จัดการทรัพยากรได้ดีกว่า
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-4xl font-bold mb-2">24/7</p>
              <p className="text-blue-100">บริการตลอดเวลา</p>
            </div>
            <div>
              <p className="text-4xl font-bold mb-2">100%</p>
              <p className="text-blue-100">ปลอดภัยดิจิทัล</p>
            </div>
            <div>
              <p className="text-4xl font-bold mb-2">&lt;5 นาที</p>
              <p className="text-blue-100">เวลาแจ้งซ่อม</p>
            </div>
            <div>
              <p className="text-4xl font-bold mb-2">100+</p>
              <p className="text-blue-100">อาคารสถานที่</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-6xl mx-auto px-4 py-20 text-center">
        <h3 className="text-3xl font-bold text-gray-900 mb-6">
          พร้อมที่จะแจ้งปัญหา?
        </h3>
        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
          เข้าสู่ระบบหรือสมัครสมาชิกเพื่อเริ่มใช้บริการแจ้งซ่อมวิทยาลัยเทคนิคชัยภูมิ
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/request" className="px-14 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition">
            แจ้งปัญหา
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h5 className="text-white font-bold mb-4">เกี่ยวกับ</h5>
              <ul className="space-y-2 text-sm">
                <li><Link href="/about" className="hover:text-white transition">เกี่ยวกับระบบ</Link></li>
                <li><Link href="/features" className="hover:text-white transition">ความสามารถ</Link></li>
                <li><Link href="/team" className="hover:text-white transition">ทีมงาน</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="text-white font-bold mb-4">ช่วยเหลือ</h5>
              <ul className="space-y-2 text-sm">
                <li><Link href="/faq" className="hover:text-white transition">คำถามที่พบบ่อย</Link></li>
                <li><Link href="/support" className="hover:text-white transition">ติดต่อสนับสนุน</Link></li>
                <li><Link href="/guide" className="hover:text-white transition">คู่มือการใช้งาน</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="text-white font-bold mb-4">นโยบาย</h5>
              <ul className="space-y-2 text-sm">
                <li><Link href="/privacy" className="hover:text-white transition">นโยบายความเป็นส่วนตัว</Link></li>
                <li><Link href="/terms" className="hover:text-white transition">ข้อตกลงการใช้งาน</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="text-white font-bold mb-4">ติดต่อเรา</h5>
              <ul className="space-y-2 text-sm">
                <li>วิทยาลัยเทคนิคชัยภูมิ</li>
                <li>Email: support@ctc.ac.th</li>
                <li>โทรศัพท์: 044 812 075</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>&copy; 2026 ระบบแจ้งซ่อมวิทยาลัยเทคนิคชัยภูมิ. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}