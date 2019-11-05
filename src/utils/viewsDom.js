if(window.location.pathname === '/otn/resources/login.html'){
  /**
   * @Description: 登录页控制页面显示及登录类型
   * @author Wish
   * @date 2019/10/21
   */
  let LoginHeader = document.getElementsByClassName("header")
  let LoginFooter = document.getElementsByClassName("footer")
  let LoginBanner = document.getElementsByClassName("loginSlide")
  let LoginActive = document.getElementsByClassName("login-hd-account")[0].getElementsByTagName("a")
  LoginHeader[0].hidden = true
  LoginFooter[0].hidden = true
  LoginBanner[0].hidden = true
  setTimeout(() =>{
    LoginActive[0].click()
  },1000)
}else if(window.location.pathname === '/otn/view/index.html'){
  /**
   * @Description: 个人中心页自动跳转联系人页
   * @author Wish
   * @date 2019/10/21
  */
  setTimeout(() =>{
    window.location.href="https://kyfw.12306.cn/otn/view/passengers.html"
  },300)
}else if(window.location.pathname === '/otn/view/passengers.html' || window.location.pathname === '/otn/view/passenger_edit.html'){
  /**
   * @Description: 联系人页页面修改
   * @author Wish
   * @date 2019/10/21
  */
  document.getElementsByClassName("wrapper content")[0].style.width = '100%'
  document.getElementsByClassName("center-menu")[0].style.display = 'none'
  document.getElementsByClassName("footer")[0].style.display = 'none'
}else if(window.location.pathname === '/otn/leftTicket/init'){
  document.getElementsByClassName("content")[0].style.margin = '0 1% 0 auto'
  document.getElementsByClassName("footer")[0].style.display = 'none'
}else if(window.location.pathname === '/otn/confirmPassenger/initDc'){
  document.getElementsByClassName("content")[0].style.margin = '0 1% 0 auto'
  document.getElementsByClassName("footer")[0].style.display = 'none'
  document.getElementsByClassName("tips-txt")[0].style.display = 'none'
}

console.log(window.location.pathname);
