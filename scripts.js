$(document).ready(function () {
    fetchBerita();
});

function fetchBerita() {
    $.ajax({
        url: 'https://api-berita-indonesia.vercel.app/antara/politik/',
        method: 'GET',
        success: function (data) {

            displayHeader(data.data);


            displayBerita(data.data.posts);
        },
        error: function (error) {
            handleError(error);
        }
    });
}

function displayHeader(headerData) {

    const { link, image, description, title } = headerData;
    

    $('#header').html(`
    <header id="news-header" class="mb-4">
    <nav class="navbar navbar-expand-lg navbar-light bg-light justify-content-between">
        <a class="navbar-brand" href="${headerData.link}">
            <img src="${headerData.image}" alt="${headerData.title}" height="40" class="d-inline-block align-top">
        </a>
        <h5 class="mb-0 text-danger">${headerData.title}</h5>
        <span class="navbar-text">
            ${headerData.description}
        </span>
    </nav>
</header>
    `);
}

function displayBerita(posts) {
    let output = '';
    const maxDescriptionLength = 90; 

    $.each(posts, function (index, post) {
        if (index % 3 === 0) {
            output += '</div><div class="row">';
        }
        const truncatedDescription = post.description.length > maxDescriptionLength
            ? `${post.description.substring(0, maxDescriptionLength)}...`
            : post.description;

        output += `
        <div class="col-md-4 col-sm-6 col-12 mb-3 d-flex">
            <div class="card shadow p-3 bg-white rounded">
                <img src="${post.thumbnail}" class="card-img-top" alt="${post.title}">
                <div class="card-body">
                    <h5 class="card-title">${post.title}</h5>
                    <p class="card-text">${truncatedDescription}</p>
                    <a href="${post.link}" class="btn btn-danger stretched-link btn-block">Baca Selengkapnya</a>
                </div>
            </div>
        </div>
        `;
    });

    $('#beritaList').html(output);
}

function handleError(error) {
    console.error("Error fetching data: ", error);
    // Handle the error gracefully, e.g., display an error message to the user
}
