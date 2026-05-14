window.addEventListener('onEventReceived', function (obj) {
    if (obj.detail.listener !== "message-received") return;
    const data = obj.detail.event.data;
    
    let message = data.text;
    let user = data.displayName;
    let color = data.color || '#4c1d95';
    let badges = "";

    if (data.badges) {
        for (let badge of data.badges) {
            badges += `<img src="${badge.url}" class="badge">`;
        }
    }

    const html = `
        <div class="chat-item" data-id="${data.msgId}">
            <span class="meta">
                <span class="badges">${badges}</span>
                <span class="name" style="color: ${color}">${user}</span>
            </span>
            <span class="message">${message}</span>
        </div>
    `;

    $('#log').append(html);

    // จำกัดจำนวนข้อความให้แสดงแค่ 10 ข้อความล่าสุด (เพื่อไม่ให้แชทล้นจอ)
    if ($('#log .chat-item').length > 10) {
        $('#log .chat-item').first().remove();
    }
});
