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
    const newsEmptyError = document.getElementById('newsEmptyError')
    const newsMain = document.getElementById('news-main');
    newsMain.innerHTML = '';
    
  if(allNews.length === 0){
       newsEmptyError.classList.remove('d-none')
       console.log('hello')
  }
  else{
    newsEmptyError.classList.add('d-none')
  }
    
    
    

    allNews.forEach(news => {
        
        console.log(news)        
        const newsMain = document.getElementById('news-main');
        const div = document.createElement('div');
        div.classList.add('news');
      
        div.innerHTML = `
         <div class="news-thumbnail">
                        <img src="${news.thumbnail_url}" alt="">
                    </div>
                    <div class="news-inner">
                        <div class="news-description">
                            <h2 class="news-title">${news.title}</h2>
                            <p class="news-paragraph">${news.details.slice(0,400)+'...'}
                            </p>
                           
                        </div>
                        <div class="other-informations">
                            <div class="author">
                                <div class="author-image">
                                    <img src="${news.author.img}" alt="">
                                </div>
                                <div class="author-designation">
                                    <p class="author-name" id="author-name">${news.author.name}</p>
                                    <p class="author-date">${news.author.published_date} </p>
                                </div>
                            </div>
                            <div class="views">
                                <p><i class="fa-solid fa-eye"></i><span class="view-count">${news.total_view}</span></p>
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
                            <a class="detail-btn" href="" data-bs-toggle="modal" data-bs-target="#exampleModal"><i
                                    class="fa-solid fa-arrow-right"></i></a>
                        </div>
                    </div>
         
         `
        newsMain.appendChild(div);

        // const detailTitile = document.getElementById('detail-titile');
        // detailTitile.innerText = `${news.title}` ;
        // const detailImage = document.getElementById('detail-image')
        // detailImage.setAttribute("src",`${news.image_url}`);

    });


}


// const toggleSpinner = isLoading => {
//     const spinner = document.getElementById('spinner-show')

//     if (isLoading) {
//         spinner.classList.remove('d-none')

//     }
//     else {
//         spinner.classList.add('d-none')
//     }
// }

getCategories()
