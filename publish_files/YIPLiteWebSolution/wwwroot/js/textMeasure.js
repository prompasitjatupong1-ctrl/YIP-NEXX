window.textMeasure = {
    // selector: ตัวเลือก element ที่มี style ฟอนต์เดียวกับหัว Grid (เช่น container ของ grid)
    measurePx: function (text, selector) {
        try {
            const el = selector ? document.querySelector(selector) : document.body;
            const cs = el ? getComputedStyle(el) : null;

            // สร้าง canvas ชั่วคราว
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");

            // ประกอบค่า font ตาม CSS จริงของ element
            // ถ้าหาไม่ได้ให้ fallback เป็น 14px system-ui
            const fontStyle = cs?.fontStyle || "normal";
            const fontVariant = cs?.fontVariant || "normal";
            const fontWeight = cs?.fontWeight || "400";
            const fontSize = cs?.fontSize || "14px";
            const fontFamily = cs?.fontFamily || "system-ui, Segoe UI, Roboto, Arial";

            ctx.font = `${fontStyle} ${fontVariant} ${fontWeight} ${fontSize} ${fontFamily}`;
            const width = ctx.measureText(text ?? "").width;

            return Math.ceil(width); // พิกเซล
        } catch {
            return 0;
        }
    }
};
