import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login'] // no redirect whitelist白名单

//路由前置守卫
router.beforeEach(async (to, from, next) => {
  // start progress bar
  NProgress.start();//进度条开始

  // set page title
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  // const hasToken = getToken()

  const hasGetUserInfo = store.getters.user;//获取本地用户信息

  if (to.meta.auth) {
    //需要鉴权
    if (hasGetUserInfo) {
      next()
    } else {
      const hasToken = localStorage.getItem('adminToken');//拿到token
      if (hasToken) {
        //有token，需要验证token
        try {
          await store.dispatch('user/getInfo');//相当于之前学的whoamI
          next();
        } catch (error) {
          await store.dispatch('user/resetToken');
          Message.error("登录过期，请重新登录");
          next(`/login?redirect=${to.path}`);
          NProgress.done();//进度条完成
        }
      } else {
        //没有token，需要跳转到导航
        next(`/login?redirect=${to.path}`);
        NProgress.done();//进度条完成
      }
    }
  } else {
    //不需要鉴权
    if (to.path === '/login' && hasGetUserInfo) {
      //说明你是在登录的状态下要去登录页面，然后我们就将其导航到首页
      next({ path: '/' })
    } else {
      next()
    }
    NProgress.done();//进度条走完
  }

  //原本的鉴权流程，vue-element-admin 鉴权流程
  // if (hasToken) {
  //   if (to.path === '/login') {
  //     // if is logged in, redirect to the home page
  //     next({ path: '/' })
  //     NProgress.done()
  //   } else {
  //     const hasGetUserInfo = store.getters.name
  //     if (hasGetUserInfo) {
  //       next()
  //     } else {
  //       try {
  //         // get user info
  //         await store.dispatch('user/getInfo')

  //         next()
  //       } catch (error) {
  //         // remove token and go to login page to re-login
  //         await store.dispatch('user/resetToken')
  //         Message.error(error || 'Has Error')
  //         next(`/login?redirect=${to.path}`)
  //         NProgress.done()
  //       }
  //     }
  //   }
  // } else {
  //   /* has no token*/

  //   if (whiteList.indexOf(to.path) !== -1) {
  //     // in the free login whitelist, go directly
  //     next()
  //   } else {
  //     // other pages that do not have permission to access are redirected to the login page.
  //     next(`/login?redirect=${to.path}`)
  //     NProgress.done()
  //   }
  // }

})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
