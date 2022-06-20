var annoucement;
initAnnouncement();
async function initAnnouncement() {
    var url = location.href;

    if (url.indexOf('?') != -1) {
        var id = "";
        var ary = url.split('?')[1].split('&');

        for (i = 0; i <= ary.length - 1; i++) {
            if (ary[i].split('=')[0] == 'id') {
                id = ary[i].split('=')[1];
                await GetByIdAnnoucement(id).then(r => annoucement = r);
                loadAnnouncement();
            }
        }
    }
}

function loadAnnouncement() {
    let title = document.querySelector('.a-title-content');
    let admin = document.querySelector('#admin-name');
    let time = document.querySelector('#a-time');
    let content = document.querySelector('.a-content');

    if (annoucement) {
        var data = annoucement;
        title.innerHTML = data.Title;
        admin.innerHTML = "By " + data.Name;
        time.innerHTML = data.CreatedAt;
        content.innerHTML = data.Content;
    }
}