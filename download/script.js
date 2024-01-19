document.addEventListener("DOMContentLoaded", function () {
    fetch('/download')
        .then(response => response.json())
        .then(data => {
            const fileList = document.getElementById('fileList');

            // Hiển thị từng tệp tin và thư mục trong danh sách
            data.forEach(item => {
                const listItem = document.createElement('li');

                if (item.type === 'file') {
                    // Nếu là tệp tin
                    const link = document.createElement('a');
                    link.href = `/download/${item.name}`;
                    link.textContent = item.name;
                    listItem.appendChild(link);
                } else if (item.type === 'dir') {
                    // Nếu là thư mục
                    const folderIcon = document.createElement('span');
                    folderIcon.textContent = '📁 ';
                    listItem.appendChild(folderIcon);

                    const folderLink = document.createElement('a');
                    folderLink.href = `/download/${item.name}`;
                    folderLink.textContent = item.name;
                    listItem.appendChild(folderLink);
                }

                fileList.appendChild(listItem);
            });
        })
        .catch(error => console.error('Error fetching file list:', error));
});
