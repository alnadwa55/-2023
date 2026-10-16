# أكاديمية انطلاق للتدريب والتكنولوجيا

موقع تعريفي وتسجيل لأكاديمية انطلاق — HTML/CSS/JS ثابت، عربي RTL، متجاوب مع الموبايل، بدون أي خادم.

## المزايا
تصميم عصري: هيرو بتدرجات وأضواء متحركة، هيدر زجاجي، بطاقات متدرجة، عدّادات إحصائيات متحركة، شريط تقدّم التمرير، قسم خطوات الالتحاق، دعم كامل للموبايل وتقليل الحركة.

## الهيكل
```
index.html · 404.html · manifest.webmanifest · robots.txt
css/style.css · js/config.js · js/app.js · assets/logo.svg
docs/ (إعداد Google Sheet) · .github/workflows/pages.yml (نشر تلقائي)
```

## التعديل
كل الإعدادات (العام الدراسي، المقاعد، رقم واتساب، رابط Google Sheet) في `js/config.js`.
التخصصات والمميزات والبرامج في أعلى `js/app.js`.

## النشر على GitHub Pages
```bash
git init -b main
git add .
git commit -m "Initial release"
git remote add origin https://github.com/<USERNAME>/<REPO>.git
git push -u origin main
```
ثم من المستودع: **Settings ← Pages ← Source: GitHub Actions**. يُنشر الموقع تلقائياً مع كل push.

## استقبال الطلبات
راجع `docs/SETUP-AR.md`.
