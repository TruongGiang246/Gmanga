import React, { useRef, useState, useEffect } from 'react';
import G from './G.png'
import Footer from '../Footer/Footer';
import NavStyle from './Navbar.module.css'
import Menu from '../Menu/Menu';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import filterSlice from '../../page/Filter/filterSlice';

function NavBar({children}) {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const saveGenres = useRef()

    useEffect(() => {
        const getData = async () => {
            const res = await axios.get('https://comics-api.vercel.app/genres')
            saveGenres.current = res.data
            console.log(res.data)
          }
        getData()
    },[])


    const Nav = document.querySelector(`.check`)
    useEffect(() => {
        if(Nav){
            Nav.scrollIntoView()
        }
        console.log(Nav)
    },[Nav])

    useEffect(() => {
    setTimeout(() => {
        setReady(!ready)
    },1000)
    },[])

  
                
        const sreach_box = document.querySelector('.sreach_box')
   
        // if(sreach_box){
        //     sreach_box.addEventListener('keypress', function(e){
        //        console.log('ok1')
        //         switch(e.key){
        //             case "Enter":
        //                 break;
        //             default:
        //                 break;
        //         }
        //             // handleSearch()
        //             // e.preventDefault();
                  
                   
                
        //     })
        // }

        const handleEnter = (e) => {
            if(e.key === "Enter"){
                if(sreach_box){
                    handleSearch()
                }
            }
        }

        const handleSearch = () => {
            console.log('ok')
            console.log(sreach_box.value)
            dispatch(filterSlice.actions.dispatchSearchFilter({
                search: sreach_box.value,
                type: 'search'
            }))
            sreach_box.value = ""
            console.log(sreach_box.value)
            navigate('/filter')
        }
    


    const [ready, setReady] = useState(true)
    const [menuData, setMenuData] = useState([])
    const [type, setType] = useState("")


    const rank = [
        {name: 'Top ngày', id:"daily"},
        {name: 'Top Tuần', id:"weekly"},
        {name: 'Top Tháng', id:"monthly"},
        {name: 'Yêu Thích', id:""},

        
    ]
    const typeChoice = useRef()
    const MenuToggle =  (type) => {        
        if(type === 'genres'){
            setMenuData(saveGenres.current)
            setType("genres")
            typeChoice.current = type
        }

        if(menuData.length > 0 && typeChoice.current === type){
            setMenuData([])
        }
        else if(type === 'rank'){
            typeChoice.current = type
            setMenuData(rank)
            setType("rank")
        }
    }

    const handleRedirect = (type) => {
        switch(type){
            case "home":
                navigate('/')
                break;
            case "history":
                navigate('/history')
                break;
            case "follow":
                navigate('/follow')
                break;
        }
    }



    return ( 
    <React.Fragment>
    <div className={`${NavStyle.NavBar} check`}>
        <div className={NavStyle.NavContent}>
            <div onClick={() => handleRedirect("home")} className={NavStyle.NavIcon}>
                <img src={G}/>
                <p>Manga</p>
            </div>

            <div className={NavStyle.NavMenu}>
                <p onClick={() => MenuToggle('genres')}>Thể loại</p>
                <p onClick={() => MenuToggle('rank')}>Xếp hạng</p>
                <p onClick={() => handleRedirect("history")}>Lịch sử</p>
                
                <p onClick={() => handleRedirect("follow")}>Theo dõi</p>
            </div>
            
            <div className={NavStyle.NavSearch}>
                <input onKeyDown={handleEnter} className="sreach_box" type='text' placeholder='search...'/>
                
                <button onClick={handleSearch} type='submit'>
                <i className='bx bx-search'></i>
                </button>
            </div>

        </div>
        
                {
                    menuData.length > 0 ? 
                    <Menu data = {menuData} type = {type}/> 
                    : true
                }
    </div>

   
        {children}
    <div>
        <Footer />
    </div>
    </React.Fragment>

     );
}

export default NavBar;

