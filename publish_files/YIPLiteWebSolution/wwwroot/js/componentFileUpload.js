window.YipUpload = (function () {
    function toBase64Async(file) {
        return new Promise((res, rej) => {
            const reader = new FileReader();
            reader.onerror = () => rej("Cannot read file");
            reader.onload = () => {
                const base64 = (reader.result + "").split(",")[1] || "";
                res(base64);
            };
            reader.readAsDataURL(file);
        });
    }

    function hasAllowedExt(name, allowed) {
        const dot = name.lastIndexOf(".");
        const ext = dot >= 0 ? name.substring(dot).toLowerCase() : "";
        return allowed.map(a => a.toLowerCase()).includes(ext);
    }

    function initDropzone(elementId, dotnetRef, allowedExtensions, maxBytes) {
        const el = document.getElementById(elementId);
        if (!el) return;

        const prevent = (e) => { e.preventDefault(); e.stopPropagation(); };

        ["dragenter", "dragover"].forEach(evt => {
            el.addEventListener(evt, (e) => {
                prevent(e);
                dotnetRef.invokeMethodAsync("__DragStateChanged", true);
            });
        });

        ["dragleave", "drop"].forEach(evt => {
            el.addEventListener(evt, (e) => {
                prevent(e);
                dotnetRef.invokeMethodAsync("__DragStateChanged", false);
            });
        });

        el.addEventListener("drop", async (e) => {
            const file = e.dataTransfer?.files?.[0];
            if (!file) return;

            if (file.size < 1 || file.size > maxBytes) {
                alert("ขนาดไฟล์ไม่ถูกต้อง");
                return;
            }
            // you may also check MIME ifต้องการ
            const allowed = allowedExtensions || [".csv"];
            if (!hasAllowedExt(file.name, allowed)) {
                alert("ประเภทไฟล์ไม่ถูกต้อง");
                return;
            }

            try {
                const base64 = await toBase64Async(file);
                const dot = file.name.lastIndexOf(".");
                const ext = dot >= 0 ? file.name.substring(dot).toLowerCase() : "";
                await dotnetRef.invokeMethodAsync("__ReceiveDroppedFile", file.name, file.size, ext, base64);
            } catch (err) {
                console.error(err);
                alert("ไม่สามารถอ่านไฟล์ที่วางได้");
            }
        });
    }

    // === เปิด native file dialog โดยคลิก input[type=file] ที่อยู่ใน TelerikFileSelect ===
    function openPicker(hostEl) {
        const root = hostEl || document;
        let input =
            root.querySelector(".yip-file-select input[type='file']") ||   // ของเราเอง
            root.querySelector(".k-file-select input[type='file']") ||   // บางเวอร์ชัน
            root.querySelector(".k-upload input[type='file']") ||   // บางเวอร์ชัน
            root.querySelector("input[type='file']");                       // fallback

        if (input) input.click();
        else console.warn("YipUpload.openPicker: file input not found");
    }

    function clearInput(hostEl) {
        const root = hostEl || document;
        let input =
            root.querySelector(".yip-file-select input[type='file']") ||
            root.querySelector(".k-file-select input[type='file']") ||
            root.querySelector(".k-upload input[type='file']") ||
            root.querySelector("input[type='file']");

        if (input) {
            input.value = "";
            input.dispatchEvent(new Event("change", { bubbles: true }));
        }
    }

    return { initDropzone, openPicker, clearInput };
})();
