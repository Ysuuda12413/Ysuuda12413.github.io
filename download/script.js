document.addEventListener("DOMContentLoaded", function () {
    // Lấy danh sách các tệp tin từ thư mục "download"
    fetch('/download')
        .then(response => response.json())
        .then(data => {
            const fileList = document.getElementById('fileList');

            // Hiển thị từng tệp tin trong danh sách
            data.forEach(file => {
                const listItem = document.createElement('li');
                listItem.textContent = file;
                fileList.appendChild(listItem);
            });
        })
        .catch(error => console.error('Error fetching file list:', error));
});
