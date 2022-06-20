var annoucementlist;

initAnnoucement();
async function initAnnoucement() {

    var data;
    await GetAnnoucement().then(r => data = r);

    if (data && data.hasOwnProperty('data')) {
        annoucementlist = data.data;
        console.log(annoucementlist);
        loadAnnouncemnet();
    }

}

function loadAnnouncemnet() {
    for (i = 0; i < annoucementlist.length; i++) {
        let div = document.createElement('a');
        div.href = "news_detail.html?id=" + annoucementlist[i].AnnouncementId;
        div.innerHTML = `
        <div class="news">
            <div class="news_img">
                <img src="../image/news_bg.jpg">
            </div>
            <div class="news_content">
                <span id="post_title">${annoucementlist[i].Title}</span>
                <span id="post_time">${annoucementlist[i].CreatedAt}</span>
                <span id="post_content">${formatecontent(annoucementlist[i].Content)}</span>
            </div>
        </div>
        `;
        document.querySelector('.main').appendChild(div);
    }
}

function formatecontent(string) {
    if (string.length > 10) {
        string = string.substring(0, 10) + "...";
    }
    return string;
}