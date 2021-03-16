document.addEventListener('DOMContentLoaded', ()=> {
  const newsList = document.querySelector('.news__list');
    
  function randomDate(start, end) {
      return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  }
  function capFirst(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
  }
  
  function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
  }
  
  function generateName(){
    let name1 = ["abandoned","able","absolute","adorable","adventurous","academic","acceptable","acclaimed","accomplished","accurate","aching","acidic","acrobatic","active","actual","adept","admirable","admired","adolescent","adorable","adored","advanced","afraid","affectionate","aged","aggravating","aggressive","agile","agitated","agonizing","agreeable"];
  
    let name2 = ["people","history","way","art","world","information","map","family","government","health","system","computer","meat","year","thanks","music","person","reading","method","data","food","understanding","theory","law","bird","literature","problem","software","control","knowledge","power","ability","economics","love"];
  
    let name = capFirst(name1[getRandomInt(0, name1.length + 1)]) + ' ' + capFirst(name2[getRandomInt(0, name2.length + 1)]);
    return name;  
  }
  const modifyRead = (arr, id) => {
    const currentEl = arr.find(item => item.id === id)
    // console.log(arr);
    currentEl.read = true
    renderNews(arr)
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
        date: randomDate(new Date(2021, 0, 1), new Date()).toLocaleString(),
        author: generateName(),
        read: false
      }
    })
  }

  const renderNews = (arr) => {
    newsList.textContent = '';
    arr.forEach(n => {
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
                <time>${n.date.split(', ')[0]}</time>
                <time>${n.date.split(' ')[1]}</time>
              </div>
              <a class="news__item-link" href="#">Узнать больше</a>
            </div>
          </article>
        </li>`
        newsList.insertAdjacentHTML('beforeend', newsItem)
    })
  }
  
  const getData = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts')
      data = await response.json()
      data.splice(10)
      const newsArr = mapArr(data)
      renderNews(newsArr);
      readNews(newsArr);
    } catch (e) {
      console.log(e.message);
    }
  }
  getData()

})