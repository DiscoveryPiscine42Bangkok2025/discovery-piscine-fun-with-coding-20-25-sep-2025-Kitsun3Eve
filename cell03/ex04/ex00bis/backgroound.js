// โค้ดนี้จะทำงานเมื่อเอกสาร HTML โหลดเสร็จเรียบร้อยแล้ว
$(document).ready(function(){
    
    // ฟังก์ชันสำหรับสร้างโค้ดสี Hex แบบสุ่ม
    function getRandomHexColor() {
        const randomColor = Math.floor(Math.random() * 16777215);
        const hexColor = '#' + randomColor.toString(16).padStart(6, '0');
        return hexColor;
    }

    // เมื่อคลิกที่ปุ่ม (#colorChangeBtn)
    $("#colorChangeBtn").on("click", function() {
        // เปลี่ยนสีพื้นหลังของ body ให้เป็นสีที่สุ่มมา
        $("body").css("background-color", getRandomHexColor());
    });
});