document.getElementById('downloadMinefc').addEventListener('click', function() {
    // Tạo một đối tượng JSZip để đóng gói thư mục Minefc
    var zip = new JSZip();
    var minefcFolder = zip.folder('Minefc');

    // Thêm các tệp tin và thư mục trong thư mục Minefc vào zip
    minefcFolder.file('file1.txt', 'Nội dung tệp tin 1.');
    minefcFolder.file('file2.txt', 'Nội dung tệp tin 2.');
    // Thêm các tệp tin và thư mục khác nếu cần

    // Tạo nội dung zip
    zip.generateAsync({type: 'blob'})
    .then(function(content) {
        // Tạo đường dẫn đến tệp zip và kích thước tệp
        var blob = new Blob([content]);
        var link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = 'Minefc.zip';

        // Simulate click on the link to trigger the download
        link.click();
    });
});