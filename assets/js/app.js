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
        <li onclick="getCategoryNews(${category.category_id})">${category.category_name}</li>
        `
        categoryList.appendChild(ul)


    })

}


// get categoris news
const getCategoryNews = async (id) => {
    const url = `https://openapi.programming-hero.com/api/news/category/0${id}`;
    try {
        const res = await fetch(url);
        const data = await res.json();
        displayCategoryNews(data.data);

    }
    catch (error) {
        console.log(error);
    }


};




// displaly category news
const displayCategoryNews = allNews => {
    // console.log(allNews)
    //    console.log(allNews[0].category_id)
    const newsMain = document.getElementById('news-main');
    newsMain.innerHTML = '';


    const newsEmptyError = document.getElementById('newsEmptyError')

    //error for no data
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

    console.log(value)

    // allNews.sort((a, b) => {
    //     return b.total_view - a.total_view;
    // });



    console.log(allNews)


    allNews.forEach(news => {

        // console.log(news.total_view)

        // array.push(`${news.total_view}`);
        // console.log(array)
        const newsMain = document.getElementById('news-main');
        const div = document.createElement('div');
        div.classList.add('news');

        div.innerHTML = `
         <div class="news-thumbnail">
                        <img src="${news.thumbnail_url}" alt="">
                    </div>
                    <div class="news-inner">
                        <div class="news-description">
                            <h2 class="news-title">${news.title ? news.title : 'no data to show'}</h2>
                            <p class="news-paragraph">${news.details.slice(0, 400) + '...'}
                            </p>
                           
                        </div>
                        <div class="other-informations">
                            <div class="author">
                                <div class="author-image">
                                    <img src="${news.author.img}" alt="">
                                </div>
                                <div class="author-designation">
                                    <p class="author-name" id="author-name">${news.author.name ? news.author.name : 'no data to show'}</p>
                                    <p class="author-date">${news.author.published_date ? news.author.published_date : 'no data to show'} </p>
                                </div>
                            </div>
                            <div class="views">
                                <p><i class="fa-solid fa-eye"></i><span class="view-count">${news.total_view ? news.total_view : 'no data to show'}</span></p>
                            </div>
                            <div class="ratings">
                                <ul>
                                    <li><i class="fa-regular fa-star"></i></li>
                                    <li><i class="fa-regular fa-star"></i></li>
                                    <li><i class="fa-regular fa-star"></i></li>
                                    <li><i class="fa-regular fa-star"></i></li>
                                    <li><i class="fa-regular fa-star"></i></li>
                                </ul>
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
    detailTitile.innerText = `${details.title}`
    const detailImage = document.getElementById('detail-image')
    detailImage.setAttribute('src', `${details.image_url}`)
    const authorImage = document.getElementById('detailsAuthor-image')
    authorImage.setAttribute('src', `${details.author.img}`)
    const authorName = document.getElementById('detailsAuthor-name');
    authorName.innerText = `${details.author.name ? details.author.name : 'no data to show'}`
    const publishedDate = document.getElementById('details-publishedDate');
    publishedDate.innerText = `${details.author.published_date ? details.author.published_date : 'no data to show'}`
    const detailsView = document.getElementById('details-view');
    detailsView.innerText = `${details.total_view}`
}

getCategories()
