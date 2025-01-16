import React from 'react';
import { Route, Link } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { matchPath } from 'react-router';
import  coreroutes from "./../../routes"

const routes = {
    '/': 'Dashboard',
   // '/admin/user': 'Users',
   // '/admin/ceritifcattype/edit/:id': 'Edit Ceritifcate Type ',
};



const breadcrumbsroutes = () => {

    let allr = []
    coreroutes.map(p => {
        allr.push({key :"/admin"+p.path,value:p.name })

        // add submenu
        if(p.views){
            p.views.map(p => {
                allr.push({key :"/admin"+p.path,value:p.name })
            })
        }
    })

    return allr
};

 const getADvBreadcrumbs = ( url ) => {

     const allarray= breadcrumbsroutes()

     for(let i=0;i<allarray.length;i++){
      const route = allarray[i];
         const match = matchPath(url, {
             path: route.key,
             exact: true,
             strict: false
         });
         if(match){
             return route.value
         }
     }
    /* for (const [key, value] of Object.entries(routes)) {
         const match = matchPath(url, {
             path: key,
             exact: true,
             strict: false
         });
         if(match){
             return value
         }
     }*/

     const foundroute = allarray.find(v => v.key === url)
     if(foundroute){
         return foundroute.value
     }
     return routes[url];
};
const findRouteName = url => getADvBreadcrumbs(url);

const getPaths = (pathname) => {
    const paths = ['/'];

    if (pathname === '/') return paths;

    pathname.split('/').reduce((prev, curr, index) => {
        const currPath = `${prev}/${curr}`;
        paths.push(currPath);
        return currPath;
    });

    return paths;
};

const BreadcrumbsItem = ({  match,...rest }) => {
    const routeName = findRouteName(match.url);
    if (routeName) {
        return (
            match.isExact ?
                (
                    <BreadcrumbItem active>{routeName}</BreadcrumbItem>
                ) :
                (
                    <BreadcrumbItem>
                        <Link to={match.url || ''}>
                            {routeName}
                        </Link>
                    </BreadcrumbItem>
                )
        );
    }
    return null;
};

const Breadcrumbs = ({  location : { pathname }, match ,...rest}) => {
    const paths = getPaths(pathname);
    return (
        <Breadcrumb>
            {paths.map(p => <Route key={p} path={p} component={BreadcrumbsItem} />)}
        </Breadcrumb>
    );
};

export default props => (
    <div>
        <Route path="/:path" component={Breadcrumbs} {...props} />
    </div>
);