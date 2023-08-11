import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import ImageCss from './Image.module.css'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import homeSlice from "../HomePage/homeSlice";
import checkLength from '../../component/function/checkLength'
function Images() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [data, setData] = useState([])
    const [topComment, setTopComment] = useState([])
    const [pageChange, setPageChange] = useState(1)

    useEffect(() => {

        const getData2 = async () => {
            try {
                const res = await axios.get(`https://comics-api.vercel.app/top/comment?page=${pageChange}&status=all`)
                setTopComment(res.data.comics)
                console.log('top',res.data)
            } catch (error) {
                console.log(error)
            }
        }

        const getData = async () => {
            try {
                const res = await axios.get(`https://comics-api.vercel.app/recent-update-comics?page=${pageChange}`)
                setData(res.data.comics)
                console.log(res.data)
            } catch (error) {
                console.log(error)
            }
        }

        getData2()
        getData()
      },[pageChange])
      


    const loadingSkeleton = [
        {},{},{},{},{},{},{},{},{},{},
        {},{},{},{},{},{},{},{},{},{},
    ]

    const [currentItems, setCurrentItems] = useState([])
    const [currentItems2, setCurrentItems2] = useState([])
    const pageCount = 554
    const [itemOffset, setItemOffset] = useState(0)
    const itemsPerPage = 36

    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage

        setCurrentItems(data.slice(itemOffset, endOffset))
        setCurrentItems2(topComment.slice(itemOffset, endOffset))

        // setPageCount(Math.ceil(data.length / itemsPerPage))
    }, [itemOffset, itemsPerPage, data])

    const handlePageClick = (event) => {
        setPageChange(event.selected + 1)
        const newOffset = (event.selected * itemsPerPage) % data.length
        setItemOffset(newOffset)

     
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
        <>
            {currentItems.length === 0 ?
            (         
            <div className={ImageCss.loadingSkeleton}>
            {loadingSkeleton.map((loading, index) => (
                <div key={index} className={ImageCss.loadingSkeleton_Children}>
                </div>
            ))}
            </div>
              
            ) : (
            <>
                <h1>Top recommend</h1>
                <div className={ImageCss.images}>
                {currentItems2.map((image, index) => (
                    <div onClick={() => {ComicsDetailBtn(image.id, image.thumbnail, image.title)}} key={index} className={ImageCss.image}>
                        <span className={ImageCss.info_slideUp_top}>
                            <div className={ImageCss.info_slideUp}>
                                <div >
                                    <ul className={ImageCss.info_slideUp_div}>
                                        <li><h4>{checkLength(image.title, 40)}</h4></li>
                                        <li className={ImageCss.des}>
                                            <p><h5>Mô tả:</h5> {image.short_description}</p>
                                            
                                        </li>
                                        <li>
                                            <p><h5>Trạng thái:</h5> {image.status}</p>
                                        
                                        </li>
                                    </ul>
                                </div>

                                <div >
                                    <ul className={`${ImageCss.info_slideUp_div} ${ImageCss.check}`}>
                                        <li>
                                            <p>view: {image.total_views}</p>
                                           
                                        </li>
                                        <li>
                                            <p>{image.last_chapter.name}</p>
                                            
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </span>
                        <img src = {image.thumbnail} alt={image.title}/>
                        <div className={ImageCss.infoBox}>
                            <p className={ImageCss.info}>{checkLength(image.title, 18)}</p>
                            <p>{image.last_chapter.name}</p>
                        </div>
                    </div>
                ))}
            </div>
                

                <h1>Truyện mới cập nhật</h1>
                <div className={ImageCss.images}>
                {currentItems.map((image, index) => (
                    <div onClick={() => {ComicsDetailBtn(image.id)}} key={index} className={ImageCss.image}>
                        <span className={ImageCss.info_slideUp_top}>
                            <div className={ImageCss.info_slideUp}>
                                <div >
                                    <ul className={ImageCss.info_slideUp_div}>
                                        <li><h4>{checkLength(image.title, 45)}</h4></li>
                                        <li className={ImageCss.des}>
                                            <p><h5>Mô tả:</h5> {image.short_description}</p>
                                            
                                        </li>
                                        <li>
                                            <p><h5>Trạng thái:</h5> {image.status}</p>
                                        
                                        </li>
                                    </ul>
                                </div>

                                <div >
                                    <ul className={`${ImageCss.info_slideUp_div} ${ImageCss.check}`}>
                                        <li>
                                            <p>view: {image.total_views}</p>
                                           
                                        </li>
                                        <li>
                                            <p>{image.last_chapter.name}</p>
                                            
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </span>

                        <img src = {image.thumbnail} alt={image.title}/>
                        <div className={ImageCss.infoBox}>
                            <p className={ImageCss.info}>{checkLength(image.title, 18)}</p>
                            <p>{image.last_chapter.name}</p>
                            
                        </div>
                    </div>
                ))}
            </div>
            </>
            )

            
            }


        <ReactPaginate
        
        breakLabel="..."//nhãn gạch 
        nextLabel=">"//tên next
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}// hiển thị bao nhiêu trang trước brick label
        pageCount={pageCount}//số trang
        previousLabel="<"
        renderOnZeroPageCount={null}
        containerClassName={ImageCss.pagination}
        pageLinkClassName={ImageCss.pageNum}
        previousLinkClassName={ImageCss.pageNum}
        nextLinkClassName={ImageCss.pageNum}
        activeLinkClassName={ImageCss.active}
        
        />
      </>
     );
}

export default Images;