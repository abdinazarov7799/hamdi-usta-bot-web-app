import React, {Suspense} from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Query from "./services/query/index.jsx";
import Theme from "./theme/theme.jsx";
import Router from "./router/router.jsx";
import Loader from "./components/Loader.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
    <Suspense fallback={<Loader/>}>
        <Query>
            <Theme>
                <Router/>
            </Theme>
        </Query>
    </Suspense>
)
