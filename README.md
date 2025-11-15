# شات لمتنا — Expo WebView wrapper

هذا المشروع هو تطبيق Expo بسيط يعمل كغلاف (wrapper) لعرض موقع الشات داخل WebView.

المحتوى
- App.js — التطبيق الرئيسي (WebView يعرض https://www.lmtna.chat/ar/)
- app.json — إعدادات Expo (مقترح لتعديل package/bundle قبل البناء)
- assets/ — أيقونات و splash

متطلبات
- Node.js (LTS) و npm أو yarn
- Expo CLI (اختياري) أو استخدام npx
- (لبناء نسخة جاهزة للنشر) EAS CLI وتكوين حساب Expo وبيانات توقيع

تشغيل محلياً (تطوير)
1. انسخ الريبو:
   git clone https://github.com/mamdohahmed043-tech/chat-lmtna.git
   cd chat-lmtna

2. ثبّت الحزم:
   npm install
   أو
   yarn install

3. شغّل المشروع:
   npx expo start
   ثم افتح على جهازك باستخدام Expo Go أو المحاكي.

ملاحظات مهمة قبل البناء (release)
- التطبيق يعرض المحتوى من https://www.lmtna.chat/ar/؛ تأكد أن الموقع يعمل عبر HTTPS وأنه صالح للعرض داخل WebView.
- قبل بناء APK/IPA حدّث app.json لتعيين:
  - android.package (مثال: "com.mydomain.chatlmtna")
  - ios.bundleIdentifier (مثال: "com.mydomain.chatlmtna")
- لإنشاء إصدارات (standalone) يوصى باستخدام EAS Build:
  1. npm install -g eas-cli
  2. eas login
  3. حدّث app.json كما في الأعلى
  4. eas build -p android --profile production
     eas build -p ios --profile production

توصيات قبل التسليم
- تحقق من أيقونات splash وأحجامها (assets).
- جهّز keystore/credentials للـ Android وبيانات App Store للتوقيع والنشر إن مطلوب.
- اختبر التطبيق على جهاز حقيقي لأن WebView سلوكها يختلف عن المحاكي في بعض الحالات.

ما بعد ذلك
- أقدر أفتح Pull Request بالفرع feature/webview-improvements لدمج التغييرات، أو أجهّز build APK باستخدام EAS إذا وفّرت بيانات النشر.