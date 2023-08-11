import { useSelector } from "react-redux/es/hooks/useSelector";
import { dispatchFilter } from "../../redux/selector";
import axios from "axios";
import { useState } from "react";
import FilterCss from './filter.module.css'
import checkLength from '../../component/function/checkLength'
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import homeSlice from "../HomePage/homeSlice";
import ReactPaginate from "react-paginate";
function Filter() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    //------
    const [data, setData] = useState({})
    const [name, setName] = useState('baki')
    const [callData, setCallData] = useState(true)
    const [filters, setFilters] = useState(useSelector(dispatchFilter))
    
    const newFilter = useSelector(dispatchFilter)
    
    
    const [pageChange, setPageChange] = useState(1)
    const [pageCount, setPageCount] = useState(1)



    useEffect(() => {

        if(JSON.stringify(data) !== "{}" && filters.type === "search" && pageChange < pageCount){
            getDataSearch(pageChange)
        }else if(JSON.stringify(data) !== "{}" && filters.type === "rank" && pageChange < pageCount){
            getDataRank(pageChange)
        }

      },[pageChange])


    const handlePageClick = (event) => {
        setPageChange(event.selected + 1)
    }

    //------

    console.log(newFilter)
    useEffect(() => {
        if(callData === false && JSON.stringify(data) !== "{}"){
            setFilters(newFilter)
            console.log("new", newFilter)
            setCallData(true)
        }
 

    },[newFilter])



    

    const getDataSearch = async (page) => {
        const res = await axios.get(`https://comics-api.vercel.app/search?q=${filters.search}&page=${page}`)
        setData(res.data)
        setName(filters.search)
        setPageCount(res.data.total_pages)
        console.log(res.data)
    }

    const getDataGenres = async () => {
       
        const res = await axios.get(`https://comics-api.vercel.app/genres/${filters.genre}`)    
        setData(res.data)
        setName(filters.genre)
        console.log(res.data)
    }

    const getDataRank = async (page) => {
       
        const res = await axios.get(`https://comics-api.vercel.app/top/${filters.rank}?page=${page}&status=all`)    
        setData(res.data)
        setName(`Top ${filters.rank}`)
        setPageCount(res.data.total_pages)
        console.log(res.data)
    }

    switch(filters.type){
        case "search":
            if(callData){
                console.log('sreach again')
                getDataSearch(1)
                setCallData(false)
            }
            break;
        case "genres":
            if(callData){
                getDataGenres()
                setCallData(false)
            }

            break;
        case "rank":
            if(callData){
                getDataRank(1)
                setCallData(false)
            }
    }

    function ComicsDetailBtn(id, thumbnail, title){
        dispatch(homeSlice.actions.dispatchComicsDetail({
            hot: id.toString(),
            thumbnail: thumbnail,
            title: title
        }))
        navigate('/comics')
      }
      

    return ( 
        <div className={FilterCss.back_ground}>
            { JSON.stringify(data) == "{}" ? (
                <div className={FilterCss.loading}>
                    <div className={FilterCss.loadingAnimation}>
                        Loading...
                    </div>
                </div>) :  (

                <div className={FilterCss.content}>
                <h1>{`kết quả tìm kiếm cho "${name}"`}</h1>
                <div className={FilterCss.content_box}>
                    {data.comics.map((comic) => (
                        <div onClick={() => {ComicsDetailBtn(comic.id, comic.thumbnail, comic.title)}} className={FilterCss.content_box_wrapper}>
                        <span className={FilterCss.info_slideUp_top}>
                            <div className={FilterCss.info_slideUp}>
                                <div >
                                    <ul className={FilterCss.info_slideUp_div}>
                                        <li><h4>{checkLength(comic.title, 40)}</h4></li>
                                        <li className={FilterCss.des}>
                                            <p><h5>Mô tả:</h5> {comic.short_description}</p>
                                            
                                        </li>
                                        <li>
                                            <p><h5>Trạng thái:</h5> {comic.status}</p>
                                        
                                        </li>
                                    </ul>
                                </div>

                                <div >
                                    <ul className={`${FilterCss.info_slideUp_div} ${FilterCss.check}`}>
                                        <li>
                                            <p>view: {comic.total_views}</p>
                                           
                                        </li>
                                        <li>
                                            <p>{comic.last_chapter.name}</p>
                                            
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </span>
                            <img src={comic.thumbnail}/>
                            <p>{checkLength(comic.title, 15)}</p>
                            <p>{comic.last_chapter.name}</p>
                        </div>
                    ))}
                </div>
                </div>

                )}
                {filters.type === "genres" ? (true) : (

                <ReactPaginate
                        
                breakLabel="..."//nhãn gạch 
                nextLabel=">"//tên next
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}// hiển thị bao nhiêu trang trước brick label
                pageCount={pageCount}//số trang
                previousLabel="<"
                renderOnZeroPageCount={null}
                containerClassName={FilterCss.pagination}
                pageLinkClassName={FilterCss.pageNum}
                previousLinkClassName={FilterCss.pageNum}
                nextLinkClassName={FilterCss.pageNum}
                activeLinkClassName={FilterCss.active}

/>
                )}

        </div>
     );
}

export default Filter;