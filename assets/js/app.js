// get categories

const getCategories = async () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    try {
        const res = await fetch(url);
        const data = await res.json();
        displayCategory(data.data.news_category);
    }
    catch (error) {
        console.log(error);
    }

}

const displayCategory = categories => {
    categories.forEach(category => {
        const categoryList = document.getElementById('all-categories');
        const ul = document.createElement('ul');
        ul.innerHTML = `
        <li onclick="getCategoryNews('${category.category_id}',this)" id="categoryID" class="zero ${category.category_id == 7 ? 'active' : ''}">${category.category_name}</li>
        `
        categoryList.appendChild(ul)
    })
}


// get categoris news
const getCategoryNews = async (id, tagName) => {

    const url = `https://openapi.programming-hero.com/api/news/category/${id}`;

    try {
        const res = await fetch(url);
        const data = await res.json();
        displayCategoryNews(data.data, tagName);

    }
    catch (error) {
        console.log(error);
    }


};
getCategoryNews('07', undefined)
// displaly category news
const displayCategoryNews = (allNews, tagNames) => {

    const list = document.querySelectorAll('#categoryID')
    for (const id of list) {


        if (id.classList[1] === 'active') {

            id.classList.remove('active')
        }

        tagNames.classList.add('active')
    };


    const newsMain = document.getElementById('news-main');
    newsMain.innerHTML = '';
    //error for no data
    const newsEmptyError = document.getElementById('newsEmptyError')
    if (allNews.length === 0) {
        newsEmptyError.classList.remove('d-none')
    }
    else {
        newsEmptyError.classList.add('d-none')
    }
    //category counter
    const catergoryCount = document.getElementById('catergory-count')
    catergoryCount.innerText = allNews.length;
    //spinner show
    toggleSpinner(true);

    const options = document.getElementById("news");
    const value = options.options[options.selectedIndex].text;
    if (value === 'Views') {
        allNews.sort((a, b) => {
            return b.total_view - a.total_view;
        });

    }
    else {
        allNews.sort((a, b) => {
            return b.rating.number - a.rating.number;
        });
    }


    allNews.forEach(news => {

        const newsMain = document.getElementById('news-main');
        const div = document.createElement('div');
        div.classList.add('news');

        div.innerHTML = `
         <div class="news-thumbnail">
                        <img src="${news.thumbnail_url}" alt="">
                    </div>
                    <div class="news-inner">
                        <div class="news-description">
                            <h2 class="news-title">${news.title ? news.title : 'Not Found'}</h2>
                            <p class="news-paragraph">${news.details.slice(0, 400) + '...'}
                            </p>
                           
                        </div>
                        <div class="other-informations">
                            <div class="author">
                                <div class="author-image">
                                    <img src="${news.author.img}" alt="">
                                </div>
                                <div class="author-designation">
                                    <p class="author-name" id="author-name">${news.author.name ? news.author.name : 'Not Found'}</p>
                                    <p class="author-date">${news.author.published_date ? new Date(news.author.published_date).toDateString().slice(4, 16) : 'Not Found'} </p>
                                </div>
                            </div>
                            <div class="views">
                                <p><i class="fa-solid fa-eye"></i><span class="view-count">${news.total_view ? news.total_view : 'Not Found'}</span></p>
                            </div>
                           
                            <a onclick="getCategoryDetails('${news._id}')" class="detail-btn" href="" data-bs-toggle="modal" data-bs-target="#exampleModal"><i
                                    class="fa-solid fa-arrow-right"></i></a>
                        </div>
                    </div>
         
         `
        newsMain.appendChild(div);

    });

    toggleSpinner(false)
}

//spinner in category
const toggleSpinner = isLoading => {
    const spinner = document.getElementById('spinner-show')

    if (isLoading) {
        spinner.classList.remove('d-none')

    }
    else {
        spinner.classList.add('d-none')
    }
}

//get category details 

const getCategoryDetails = async id => {
    const url = `https://openapi.programming-hero.com/api/news/${id}`;
    try {
        const res = await fetch(url);
        const data = await res.json();
        displayCategoryDetails(data.data[0]);

    }
    catch (error) {
        console.log(error);
    }
};

//display category details 
const displayCategoryDetails = (details) => {
    const detailTitile = document.getElementById('detail-titile');
    detailTitile.innerText = `${details.title ? details.title : 'Not Found'}`
    const detailImage = document.getElementById('detail-image')
    detailImage.setAttribute('src', `${details.image_url}`)
    const authorImage = document.getElementById('detailsAuthor-image')
    authorImage.setAttribute('src', `${details.author.img}`)
    const authorName = document.getElementById('detailsAuthor-name');
    const detailPragraph = document.getElementById('detail-pragraph');
    detailPragraph.innerText = `${details.details ? details.details : 'Not Found'}`
    authorName.innerText = `${details.author.name ? details.author.name : 'Not Found'}`
    const publishedDate = document.getElementById('details-publishedDate');
    publishedDate.innerText = `${details.author.published_date ? new Date(details.author.published_date).toDateString().slice(4, 16) : 'Not Found'}`
    const detailsView = document.getElementById('details-view');
    detailsView.innerText = `${details.total_view ? details.total_view : 'Not Found'}`
}

getCategories()
