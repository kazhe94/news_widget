document.addEventListener('DOMContentLoaded', ()=> {
  const newsList = document.querySelector('.news__list');
  let button = null;
  let modal = null;
    
  const randomDate = (start, end) => {
      return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  }
  const modifyRead = (arr, id) => {
    const currentEl = arr.find(item => item.id === id)
    currentEl.read = true
    button.textContent = newsLength(arr)
    renderNews(arr)
    renderModal(currentEl)
  }

  document.body.addEventListener('click', (e) => {

    if(e.target.classList.contains('modal__close') || e.target.classList.contains('modal__backdrop')) {
      modal = null
      document.body.querySelector('.modal').remove()
    }
  })

  const renderModal = (item) => {
    modal = 
    `<div class="modal">
      <div class="modal__backdrop"></div>      
        <div class="modal__body">
          <h4 class="modal__title">${item.title} ${item.id}</h4>
          <p class="modal__text">${item.body}</p>
          <div class="modal__close">&times;</div>        
      </div>
    </div>`
    document.body.insertAdjacentHTML('beforeend', modal)
  }

  const readNews = (arr) => {
    newsList.addEventListener('click', function click(e) {
      let target = e.target
      if(target.classList.contains('news__item-link')) {
        let id = target.closest('.news__list-item').getAttribute('data-id');
        modifyRead(arr, parseInt(id))
      }
    })
  }

  const mapArr = (arr) => {
    return arr.map(item => {
      delete item.userId
      return {
        ...item,
        date: randomDate(new Date(2021, 0, 1), new Date()),
        author: 'Author123',
        read: false
      }
    })
  }

  const renderNews = (arr) => {
    newsList.textContent = '';
    arr.forEach(n => {
      date = n.date.toLocaleString()
      let newsItem = 
      `<li class="news__list-item ${n.read ? 'news__list-item--read' : ''}" data-id="${n.id}">
          <article class="news__item">
            <div class="news__item-top">
                <h4 class="news__item-title">${n.title}</h4>
                <div class="news__item-author">
                  <span>Источник:</span>
                  ${n.author}
                </div>
            </div>
            <div class="news__item-bottom">
              <div class="news__item-status">${n.read ? 'Прочитано' : 'Не прочитано'}</div>
              <div class="news__item-date">
                <time>${date.split(', ')[0]}</time>
                <time>${date.split(' ')[1]}</time>
              </div>
              <a class="news__item-link" href="#">Узнать больше</a>
            </div>
          </article>
        </li>`
        newsList.insertAdjacentHTML('beforeend', newsItem)
    })
  }
  
  const newsLength = (arr) => {
    return arr.filter(item => item.read !== true).length
  }

  const createButton = (arr) => {
    button = document.createElement('button')
    button.classList.add('open-btn')
    button.textContent = newsLength(arr)
    document.body.appendChild(button)
    button.addEventListener('click', ()=> {
      newsList.classList.toggle('news__list--active')
      renderNews(arr);
      readNews(arr);
    })
  }
  
  const getData = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts')
      data = await response.json()
      data.splice(10)
      const newsArr = mapArr(data)
      newsArr.sort((a, b) => {
        return new Date(b.date) - new Date(a.date)
      })
      createButton(newsArr)
      
    } catch (e) {
      console.log(e.message);
    }
  }
  getData()

})