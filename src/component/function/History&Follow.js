import { useState } from 'react';
import HisAndFolower from './His&Fol.module.css'
function HisAndFol({getData, name, deleteOk}) {
    const [reRender, setReRender] = useState(true)
    console.log(deleteOk)

    function handleDelete(id){
        const arrCheckId = []
        getData.forEach(element => {
            arrCheckId.push(element.id)
        });

        const getIdIndex = arrCheckId.indexOf(id)
        
        getData.splice(getIdIndex, 1)
        console.log(getData)

        const list = {list: getData}
        
        localStorage.setItem('follow', JSON.stringify(list))
        setReRender(!reRender)
    }

    const deleteHistory = () => {
        const getData = JSON.parse(localStorage.getItem("history"))
        const length = getData.historyList.length
        getData.historyList.splice(0, length)
        
        localStorage.setItem("history", JSON.stringify(getData))
        setReRender(!reRender)
    }

    return ( 
        
        <div className={HisAndFolower.content} >
            <div className={HisAndFolower.content_title}>
                <h2>{name} </h2>
                {deleteOk ? (true) : (<h2 onClick={deleteHistory}>Xóa <i class='bx bx-trash' ></i></h2>)}
            </div>

            <div className={HisAndFolower.content_box}>
            {getData.map((data, index) => {

                if(deleteOk){
                    return(
                    <div className={HisAndFolower.content_box_wrapper}>
                        <div className={HisAndFolower.content_box_wrapper_i}>
                            <i onClick={() => handleDelete(data.id)} class='bx bx-message-square-x'></i>
                        </div>
                        <img src={data.thumbnail}/>
                        <p>{data.title}</p>
                    </div>
                    )
                }else{
                    return(
                    <div className={HisAndFolower.content_box_wrapper}>
                        <img src={data.thumbnail}/>
                        <p>{data.title} </p>
                    </div>
                    )
                }
                
})}
                
            </div>
        </div>
     );
}

export default HisAndFol;