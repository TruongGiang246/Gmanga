import React, { useState, createContext } from 'react';
import HomeCss from'./HomePage.module.css'
import axios from 'axios';
import Images from '../Image/Images';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import homeSlice from './homeSlice';
import { useDispatch } from 'react-redux';
import loadingImage from '../Image/loadingImage.png'


export const Detail = createContext()
function HomePage() {
  // https://jsonplaceholder.typicode.com/albums/1/photos
const dispatch = useDispatch()
sessionStorage.removeItem('saveIdPage')
sessionStorage.removeItem('currentPage')



const [listRecommend, setListRecommend] = useState([{}])

let currentIndex = 0

useEffect(() => {
  const getData = async () => {
    const res = await axios.get('https://comics-api.vercel.app/recommend-comics')
    // const res = await axios.get('https://jsonplaceholder.typicode.com/albums/1/photos')
    // setPage(res.data)
    setListRecommend(res.data)
  
    console.log(res.data)
  }
  getData()
},[])


const navigate = useNavigate()
const el = document.querySelector(".card");
const prevBtn = document.querySelector(".prev")
const nextBtn = document.querySelector(".next")
const image = document.querySelector('.image')
const title = document.querySelector('.title')
const description = document.querySelector('.description')
const genres = document.querySelector('.genres')
const feature = document.querySelector("."+HomeCss.feature)
const content_time = document.querySelectorAll(`.${HomeCss.content_time} > p`)
const recommendBackGround = document.querySelector(`.${HomeCss.recommend}`)






// btn.addEventListener('click', () => ComicsDetailBtn(listRecommend[index].id))
function updateImageByIndex(index, type){
  currentIndex = index
  feature.style.animation = ''
  if(type){
    setTimeout(() => {
      image.src = listRecommend[index].thumbnail
      title.innerText = listRecommend[index].title
      recommendBackGround.setAttribute('style',`background-image:url(${listRecommend[index].thumbnail})`)
      content_time[0].innerHTML = `<i class="bx bxs-bell"></i>  ${listRecommend[index].updated_at}`
      content_time[1].innerHTML = `<i class='bx bx-book-open'></i>  ${listRecommend[index].lastest_chapter.name}`
      
      // genres.innerText = listRecommend[index].id
      feature.style.animation = `${type} 0.9s ease-in-out forwards`
    }, 300) 
    
    
    
  }
}


if(prevBtn && nextBtn){
  prevBtn.addEventListener('click', () => {
    if(currentIndex == 0){
      currentIndex = listRecommend.length - 1
    }else{
      currentIndex--
    }
    updateImageByIndex(currentIndex, HomeCss.SlideRight)
  })
  
  nextBtn.addEventListener('click', () => {
    if(currentIndex == listRecommend.length - 1){
      currentIndex = 0
    }else{
      currentIndex++
    }
    updateImageByIndex(currentIndex, HomeCss.slideLeft)
  })
}

if(el){
  let w = el.clientWidth;
let h = el.clientHeight;
let b = el.getBoundingClientRect();
el.addEventListener("mousemove", (e) => {
  let X = (e.clientX - b.left) / w;
  let Y = (e.clientY - b.top) / h;

  let rX = -(X - 0.5) * 26;
  let rY = (Y - 0.5) * 26;

  let bgX = 40 + 20 * X;
  let bgY = 40 + 20 * Y;

  // console.log(X, Y);
  document.documentElement.style.setProperty("--x", 100 * X + "%");
  document.documentElement.style.setProperty("--y", 100 * Y + "%");

  document.documentElement.style.setProperty("--bg-x", bgX + "%");
  document.documentElement.style.setProperty("--bg-y", bgY + "%");

  document.documentElement.style.setProperty("--r-x", rX + "deg");
  document.documentElement.style.setProperty("--r-y", rY + "deg");
});
}

function ComicsDetailBtn(id, thumbnail, title){
  dispatch(homeSlice.actions.dispatchComicsDetail({
      hot: id.toString(),
      thumbnail: thumbnail.toString(),
      title: title
  }))
  console.log(typeof thumbnail.toString())
  navigate('/comics')
}



    return ( 
  
  <React.Fragment>
   <div className={`${HomeCss.recommend} `} style={{backgroundImage: `url(${listRecommend[currentIndex].thumbnail})`}}>
  {
    JSON.stringify(listRecommend) === "[{}]" ? (
    <div className={HomeCss.loading}>
        <div className={HomeCss.loadingAnimation}>
            Loading...
        </div>
    </div>
  ):(
   
    <>
    <div className={HomeCss.color_overlay}></div>
    <div className={`${HomeCss.feature} feature`}>
    <div className={HomeCss.card_content}>
      <div className={`${HomeCss.card} card`}>
      <div className={`${HomeCss.card_wrapper} card_wrapper`}>
        <div className={HomeCss.card__3d}>
          <div className={HomeCss.card__image}>
            <img className = "image" src={listRecommend[currentIndex].thumbnail} alt="" />
          </div>
          <div className={HomeCss.card__layer1}></div>
        </div>
      </div>
    </div>

  </div>


  <div className={HomeCss.content}>
        <h3 className='genres'><i class='bx bxs-hot'>Truyện hot</i></h3>
        <div className={HomeCss.content_time}>
          <p><i class='bx bxs-bell'></i>  {listRecommend[currentIndex].updated_at}</p>
          <p><i class='bx bx-book-open'></i>  {listRecommend[currentIndex].lastest_chapter.name}</p>
        </div>
          <h1 className='title'>{listRecommend[currentIndex].title}</h1>
  
          <div className={HomeCss.content_btn}>
          <button onClick = {() => ComicsDetailBtn(
            listRecommend[currentIndex].id,      
            listRecommend[currentIndex].thumbnail,
            listRecommend[currentIndex].title
            )}>Read now</button>
    </div>
  </div>

    </div>

            <div class={`${HomeCss.control} ${HomeCss.prev} prev`}>
                <i class='bx bx-chevron-left'></i>
            </div>
            <div className={`${HomeCss.control} ${HomeCss.next} next`}>
                <i class='bx bx-chevron-right'></i>
            </div>
            </>
    )}
</div>    

<div className={HomeCss.recentUpdate}>

      <div>
        <Images/>
      </div>
</div>
</React.Fragment>

    );
}

export default HomePage;