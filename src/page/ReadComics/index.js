import { useSelector } from 'react-redux';
import { dispatchIdPage } from '../../redux/selector'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ReadCss from './ReadComics.module.css'
import G from './G.png'
import checkLength from '../../component/function/checkLength'
function ReadComics() {
   
  
    const navigate = useNavigate()
 
    const IdPage = useSelector(dispatchIdPage)
   
    if(sessionStorage.getItem('currentPage') === null ){
        sessionStorage.setItem('currentPage', JSON.stringify(IdPage))
    }
    const [data, setData] = useState({})
    const page = sessionStorage.getItem('currentPage')
    const pages = JSON.parse(page)
    const [idPageIndex, setIdPageIndex] = useState(pages.index)
  
    useEffect(() => {
        const getData = async() => {
            try {
                const res = await axios.get(`https://comics-api.vercel.app/comics/${pages.id}/chapters/${pages.chapterId}`)
                console.log(res.data)
                setData(res.data)
            } catch (error) {
                navigate('/comics')
            }

            // setImageList(res.data.images)
        }
        getData()
    },[])
   
        const downList = document.querySelector(`.${ReadCss.Menu_box_list_downlist}`)
        const List = document.querySelector(`.${ReadCss.Menu_box_list_down}`)
        const cover = document.querySelector(`.${ReadCss.cover}`)
        const Menu = document.querySelector(`.${ReadCss.Menu_box}`)


        let check = true
        let check2 = true
    useEffect(() => {

        if(downList && List && cover && Menu){
            console.log(cover, Menu)
            List.addEventListener('click', () => {
                if(check2){
                    downList.classList.remove("hide")
                    check2 = false
                }else{
                    downList.classList.add("hide")
                    check2 = true
                }
            })
    
            cover.addEventListener('click', () => {
                console.log('ples')
                if(check){
                    Menu.classList.add("hide")
                    check = false
                }else{
                    Menu.classList.remove("hide")
                    check = true
                }
            })
        }

    },[downList, List, cover, Menu])

    
    // setTimeout(() => {
    //     setReady(!ready)
    // },500)

    // useEffect(() => {
    //     const pageCurrent = document.querySelector('.pageCurrent ')
    //     const ListImage = document.querySelectorAll('.images_box img')
    //     window.onscroll = function checkPageNumber(){
    //             if(ListImage.length === data.images.length && ListImage.length > 0){
                    
                
    //                 let heightScreen = window.scrollY
    //                 for (let i = 1; i < ListImage.length + 1; i++) {
                            
    //                         if(heightScreen > ListImage[i-1].getClientRects()[0].top){
                                
    //                             pageCurrent.innerText = `${i}/${data.images.length}`
    //                         }
    //                     }
                        
    //                 }
    //             }
    //     },[ImageList, ready])

    // if(!(JSON.stringify(data) === "{}")){
    //     const pageCurrent = document.querySelector('.pageCurrent ')
    //     let ListImage = document.querySelectorAll('.images_box img')
    //     ImageNumber.current = ListImage.length
        
    //         window.onscroll = function checkPageNumber(){
    //             if(ImageNumber.current > 0 ){
                    
    //                 console.log(ImageNumber.current)
    //                 // let heightScreen = window.scrollY
    //                 // for (let i = 1; i < ListImage.length + 1; i++) {
                            
    //                 //         if(heightScreen > ListImage[i-1].getClientRects()[0].top){
                                
    //                 //             pageCurrent.innerText = `${i}/${data.images.length}`
    //                 //         }
    //                 //     }
                        
    //                 }
    //             }
            
    // }


    

    useEffect(() => {
        if(JSON.stringify(data) == "{}"){
            const getData = JSON.parse(sessionStorage.getItem('currentPage'))
            if(getData.id === "" || getData.chapterId === "" || getData.index === ""){
                navigate('/comics')
            }
            
        }
    },[data])


    const handleIdPage = async(id, index) => { 
       
        const newObj = {
            id: pages.id,
            chapterId: id,
            index: index
        }
        sessionStorage.setItem('currentPage', JSON.stringify(newObj))

        const res = await axios.get(`https://comics-api.vercel.app/comics/${pages.id}/chapters/${id}`)
        console.log(res.data)
        setData(res.data)
        setIdPageIndex(index)
        // setImageList(res.data.images)
        const Image = document.querySelector(`.images_box img`)
        Image.scrollIntoView()
    }

    
    const navigateToHome = () => {
        navigate('/')
    }

    return (
<>
<div className={ReadCss.cover}>

</div>

    <div className={ReadCss.back_ground}>
<div className={`${ReadCss.Menu_box}`}>
    <div className={ReadCss.Menu_box_name}>
        <h3>{JSON.stringify(data) === "{}" ? (true) : (checkLength(data.comic_name, 17))}</h3>
    </div>
    <div className={ReadCss.Menu_box_list}>
        <button onClick={() => handleIdPage(data.chapters[idPageIndex + 1].id, idPageIndex + 1)}><i class='bx bx-chevron-left'></i></button>
        
        <div className={ReadCss.Menu_box_list_down}>
            <p>{data.chapter_name}</p>
            <i class='bx bx-chevron-down'></i>
            <div className={`${ReadCss.Menu_box_list_downlist} hide`}> 
                {JSON.stringify(data) === "{}" ? (true) : (
                    data.chapters.map((chapter, index) => (
                        <p onClick = {() => handleIdPage(chapter.id, index)}>{chapter.name}</p>
                )
                ))}
            </div>
        </div>
        <button onClick={() => handleIdPage(data.chapters[idPageIndex - 1].id, idPageIndex - 1)}><i class='bx bx-chevron-right'></i></button>
    </div>

    <div className={ReadCss.Menu_box_page}>
    <div className={ReadCss.Menu_box_line}></div>
        <p onClick={navigateToHome}><img src={G}/>Manga</p>
    </div>
</div>

<div className={`${ReadCss.Image_box} `}>
    <div className={`${ReadCss.Image_box_Wrapper} images_box`}>
        { JSON.stringify(data) === "{}" ? (
            <div className={ReadCss.skeletonLoading}></div>
        ) : (
            data.images.map((image, index) => {
                return(
                        <img loading='lazy' src={image.src}/>                          
              )
            })
        )}
    </div>
</div>

</div>

     



        
</>
     );
}

export default ReadComics;