import MenuCss from './Menu.module.css'
import { useDispatch } from 'react-redux';
import filterSlice from '../../page/Filter/filterSlice';
import { useNavigate } from 'react-router-dom';
function Menu({data, type}) {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    function handleFilterGenres (id){
        dispatch(filterSlice.actions.dispatchGenreFilter(id))
        navigate('/filter')
    }

    function handleFilterRank(id){
        dispatch(filterSlice.actions.dispatchRankFilter(id))
        navigate('/filter')
    }
    return ( 
        <div className={MenuCss.Menu}>
        {data.map(genre => {
            if(type === "genres"){
                return(
                    <p onClick={() => handleFilterGenres({
                        genre: genre.id,
                        type: 'genres'
                    })}>{genre.name}</p>
                )
            }else if(type === "rank"){

                return(
                    <p onClick={() => handleFilterRank({
                        rank: genre.id,
                        type: 'rank'
                    })}>{genre.name}</p>
                )
            }

        })}
    </div> );
}

export default Menu;