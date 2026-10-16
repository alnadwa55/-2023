# إعداد استقبال الطلبات (Google Sheet)

1. أنشئ Google Sheet جديداً، ثم **Extensions ← Apps Script**.
2. الصق محتوى `docs/google-apps-script.gs` واحفظ.
3. **Deploy ← New deployment ← Web app**: Execute as = *Me*، Who has access = *Anyone*. انسخ رابط الـ Web app.
4. ضع الرابط في `js/config.js` داخل `submitEndpoint` ثم ارفع التعديل إلى GitHub.
5. أرسل طلباً تجريبياً من الموقع وتأكد من ظهوره في الشيت (تبويب `Registrations`).

> عند ترك `submitEndpoint` فارغاً يُرسَل الطلب عبر واتساب فقط.
> بعد أي تعديل في السكربت يجب عمل **New version** للـ deployment.
