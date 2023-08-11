import HomePage from "../page/HomePage/index"
import ComicsDetail from "../page/ComicsDetail"
import ReadComics from "../page/ReadComics"
import History from "../page/History"
import Follow from "../page/Follower"
import Filter from "../page/Filter"

const publicRoutes = [
    {path: '/', component: HomePage},
    {path: '/comics', component:  ComicsDetail},
    {path: '/read', component: ReadComics, layout: null},
    {path: '/history', component: History},
    {path: '/follow', component: Follow},
    {path: '/filter', component: Filter}
]
const privateRoutes = [

]
export{privateRoutes, publicRoutes}