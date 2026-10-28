# ตั้งค่า Search Console / GA4 สำหรับ AAB

## Google Search Console (ต้องใช้บัญชีเจ้าของโดเมน)
1. เข้า https://search.google.com/search-console → Add property → Domain: aabgroups.com
2. ยืนยัน DNS TXT ตามที่ Google แสดง (ไม่สามารถใส่ค่าตัวอย่างแทนค่าจริง)
3. เมื่อเว็บไซต์เผยแพร่แล้ว ส่ง sitemap: https://www.aabgroups.com/sitemap.xml
4. URL Inspection: https://www.aabgroups.com/th/ , https://www.aabgroups.com/en/ และหน้าบริการ
5. แยกดู Performance → Search results → Queries / Pages / Countries / Devices → ตรวจจำนวน Click, Impression, CTR และ Average Position
6. ตรวจ Page indexing และ Core Web Vitals; ไม่ควรอ้างว่าเว็บไซต์ติด Google จนตรวจได้จากบัญชีจริง

## Google Analytics 4
1. สร้าง GA4 Web data stream สำหรับ aabgroups.com
2. เอา Measurement ID ที่ขึ้นต้น G-... มาใส่สคริปต์ GA4 จริงในเว็บไซต์หรือผ่าน Google Tag Manager
3. ไฟล์ site/script.js เตรียมชื่อ event: phone_click, line_click, directions_click, booking_form_prepared ไว้แล้ว และจะส่ง event เมื่อ window.gtag มีอยู่จริง
4. อย่าส่ง PII เช่น ชื่อ เบอร์ และข้อความนัดหมายใน GA4; ควรมี privacy notice และพิจารณาความยินยอมตามกฎหมายที่ใช้บังคับ
5. ตรวจ DebugView ว่า events ทำงานเมื่อคลิกจริง
6. หากต้องการวัดคิวที่ยืนยันจริง ต้องเชื่อมข้อมูล CRM/ระบบรับนัดหมายโดยไม่อาศัยเพียงการคลิก

## เช็คลิสต์ทดสอบ
- Googlebot เปิดหน้าได้โดยไม่ติด firewall / noindex / password
- URL ทั้ง 12 หน้า ตอบ 200 HTTPS / canonical ถูก / ภาษาและ hreflang จับคู่กัน
- Sitemap มี URL canonical เท่านั้น; ไม่มี root duplicate
- ไม่คัดลอกรีวิวปลอมใส่ metadata
- ชื่อศูนย์/พิกัด/ที่อยู่บนหน้าเว็บตรงกับ Business Profile จริง
