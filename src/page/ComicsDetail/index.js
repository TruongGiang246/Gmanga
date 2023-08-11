
import { useSelector} from "react-redux/es/hooks/useSelector";
import { handleRequest } from "../../redux/selector";
import DetailCss from './ComicsDetail.module.css'
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import dispatchIdPage from "./dispatchIdPage";
import Image from "./Black_image.jpg"
function ComicsDetail() {
    const [checkedFollow, setCheckedFollow] = useState(false)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    

    sessionStorage.removeItem('currentPage')


    const follow = document.querySelector('.follow')
    useEffect(() => {
        
        const arrCheck2 = []
        const followList = JSON.parse(localStorage.getItem('follow'))

        // if(checkedFollow === false){
        //     follow.style.backgroundColor = "rgba(240, 248, 255, 0.751)"
        //     follow.style.color = "black"
        //     console.log('k')
        // }

        //kiểm tra xem listfolow đã có truyện hiện tại chưa
        
        if(followList !== null){
            followList.list.forEach((element) => {
                arrCheck2.push(element.id)
            })

            if(arrCheck2.length === 0){
                arrCheck2.push('more-length')
            }
            
            for (let i = 0; i < arrCheck2.length; i++) {
                if(!(arrCheck2[i].includes(detail.hot))){
                    //nếu k có trùng
                    setCheckedFollow(true)
                    console.log('unlock')
                }else if(arrCheck2[i].includes(detail.hot)){
                    //nếu có trùng
                    console.log(detail.hot)
                    if(follow){

                        follow.classList.add(`${DetailCss.active}`)
                    }
                }
                console.log('buh')
            }

        }else{
            const list = {list: []}
            localStorage.setItem('follow', JSON.stringify(list))
            setCheckedFollow(true)
            console.log('setfirst')
        }
    


    },[checkedFollow, follow])

    const detail = useSelector(handleRequest)
    if(sessionStorage.getItem('saveIdPage') === null ){
        sessionStorage.setItem('saveIdPage', JSON.stringify(detail))
    }

    const checkFirst = sessionStorage.getItem('saveIdPage')
    if( checkFirst === undefined || checkFirst.hot === "" || checkFirst.thumbnail === "" || checkFirst.title === ""){
        navigate('/')
    }


    const pageDetail = JSON.parse(sessionStorage.getItem('saveIdPage'))
    

    const [data, setData] = useState({})
    console.log(detail)

    useEffect(() => {
        const getData = async() => {
        try {
            const res = await axios.get(`https://comics-api.vercel.app/comics/${pageDetail.hot}`)
            console.log(res.data)
            setData(res.data)
        } catch (error) {
            console.log(error)
        }

        }
        getData()
    },[])

    useEffect(() => {
        if(JSON.stringify(data) == "{}"){
            const getData = JSON.parse(sessionStorage.getItem('saveIdPage'))
            if(getData.hot === "" || getData.thumbnail === "" || getData.title === ""){
                navigate('/')
            }
            
        }
    },[data])

    const loading = document.querySelector(`.${DetailCss.loading}`)
    if(loading){
        loading.scrollIntoView()
    }



    const history = localStorage.getItem('history')
    const checked = JSON.parse(history)
   
    console.log(pageDetail)
    console.log(checked)
    const arrCheck = []
    if(!(history === null)){
       
        checked.historyList.forEach(element => {
            arrCheck.push(element.hot)
        });

        if(!(arrCheck.includes(pageDetail.hot))){
            checked.historyList.push(detail)
            localStorage.setItem('history', JSON.stringify(checked))
        }

        // for (let i = 0; i < checked.historyList.length; i++) {
        //     // if(!(checked.historyList[i].hot === pageDetail.hot)){
        //     //     flag = true
        //     // }     
        //     console.log(checked.historyList[i].values(hot))       
        // }
    // if(flag){
    //     const add = JSON.parse(history)
    //     add.historyList.push(detail)
    //     localStorage.setItem('history', JSON.stringify(add))
    //     // console.log(JSON.parse(history))
    //    console.log('add')
    // }

    }else if(history === null){
        
        const historyFirst = {historyList: [detail]}
        localStorage.setItem('history', JSON.stringify(historyFirst))
    }
    
    function dispatchId( id, chapterId, index){
        dispatch(dispatchIdPage.actions.dispatchComicsIdPage({
            id: id.toString(),
            chapterId: chapterId.toString(), 
            index: index,
        }))
        navigate('/read')
    }


    function handleBtnMenu(type){
        switch(type){
            case "read":
                const index = data.chapters.length - 1
                dispatchId(data.id, data.chapters[index].id, index)
                break;
            case "follow":
                console.log(checkedFollow)
                if(checkedFollow){
                    console.log('ok')
                    const followList = JSON.parse(localStorage.getItem('follow'))
                    const obj = {
                        id: data.id, 
                        thumbnail: data.thumbnail,
                        title: data.title
                    }
                    followList.list.push(obj)
                    localStorage.setItem('follow',JSON.stringify(followList))
                    console.log('save')
                    setCheckedFollow(false)
                }
                break;
        }

    }
    
    console.log(JSON.stringify(data) == "{}")
    return ( 
        <div className={DetailCss.content} style={{backgroundImage:`url("${data.thumbnail ? data.thumbnail : Image}")`}}>
            <div className={DetailCss.conten_overlay}></div>
            {
                JSON.stringify(data) == "{}" ? (
                <div className={DetailCss.loading}>
                    <div className={DetailCss.loadingAnimation}>
                        Loading...
                    </div>
                </div>
                
                ) : 

                ( 
                     <div className={DetailCss.book_detail}>
                    
                    <div className={DetailCss.book_info}>
                        <div className={DetailCss.book_imgWrapper}>
                            <img src={data.thumbnail} alt="ii"/>
                        </div>
                        <section className={DetailCss.book_menu} >
                            <h1>{data.title}</h1>
                            <ul className={DetailCss.list_info}>
                                <li>
                                    <p><i class='bx bxs-user-detail' ></i>Tác giả</p>
                                    <p>{data.authors}</p>
                                </li>
                                <li>
                                    <p><i class='bx bxs-bell'></i>Tình Trạng</p>
                                    <p>{data.status}</p>
                                </li>
                                <li>
                                    <p><i class='bx bxs-like' ></i>Lượt thích</p>
                                    <p>Tên Lượt thích</p>
                                </li>
                                <li>
                                    <p><i class='bx bxs-heart' ></i>Lượt theo dõi</p>
                                    <p>{data.followers}</p>
                                </li>
                                <li>
                                    <p><i class='bx bxs-user-plus'></i>Lượt xem</p>
                                    <p>{data.total_views}</p>
                                </li>
                            </ul>
                            <ul className={DetailCss.book_genres}>
                            <li>
                                {data.genres.map((genre, index) => {
                                    return(
                                        <button key={index} >{genre.name}</button>
                                    )
                                })}
                            </li>
                            </ul>
                            <ul className={DetailCss.Menu}>
                                <li><button onClick={() => handleBtnMenu("read")}><i class='bx bx-book'></i>Đọc từ đầu</button></li>
                                <li><button className="follow" onClick={() => handleBtnMenu("follow")}><i class='bx bxs-heart' ></i>Theo dõi</button></li>
                               
                            </ul>
                        </section>
                    </div>
    
                    <div className={DetailCss.description}>
                        <h3><i class='bx bx-info-circle'></i> Giới thiệu</h3>
                        <p>{data.description}</p>
                    </div>
    
                    <div className={DetailCss.book_chappter}>
                        <h3><i class='bx bxs-data'></i>Danh sách chương</h3>
                        <div className={DetailCss.book_chappterList_down}>
                            {data.chapters.map((chapter, index) => {
    
                                return(
                                    <span onClick={() => dispatchId(data.id, chapter.id, index)}>
                                        <p>{chapter.name}</p>
                                    </span>
                                )
                            })}
                        </div>
                    </div>
    
                    
                </div>
                )
            }
            
        </div>
     );
}

export default ComicsDetail;