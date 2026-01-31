Place the SRIT images provided as attachments into this folder with the exact filenames below so the About section slider displays them automatically.

Required filenames (use these exact names):
- srit_banner.jpg (promotional banner — use the attached image)
- srit_1.jpg  (e.g. aerial daytime view)
- srit_2.jpg  (e.g. promotional banner with logo)
- srit_3.jpg  (e.g. night/front facade)
- srit_4.jpg  (e.g. entrance/driveway view)

If you keep different names, update `src/pages/Home.jsx` -> `aboutImages` array accordingly.

Fallbacks:
- If any image fails to load the slider will fall back to `/images/clg.png` (ensure `clg.png` exists).

Tips:
- Recommended sizes: 1600x900 (or 1200x800) optimized for web (use progressive JPEG or WebP for smaller size).
- On Windows: copy the image files into `frontend/public/images/`.

Example PowerShell copy command (run from your images folder):

    Copy-Item .\srit_banner.jpg d:\pdfs\campuss\campus\frontend\public\images\srit_banner.jpg
    Copy-Item .\file1.jpg d:\pdfs\campuss\campus\frontend\public\images\srit_1.jpg
    Copy-Item .\file2.jpg d:\pdfs\campuss\campus\frontend\public\images\srit_2.jpg
    Copy-Item .\file3.jpg d:\pdfs\campuss\campus\frontend\public\images\srit_3.jpg
    Copy-Item .\file4.jpg d:\pdfs\campuss\campus\frontend\public\images\srit_4.jpg

After adding the files, restart the dev server or refresh the page to see the updated About slider.
