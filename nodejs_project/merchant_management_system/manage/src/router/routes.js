export const routes = [
  {
    path: '/register',
    name: 'Register',

    //懒加载组件
    component: r => require(['../views/Register.vue'], r)
  },

  {
    path: '/login',
    name: 'Login',

    //懒加载组件
    component: r => require(['../views/Login.vue'], r)
  },

  {
    path: '/main',
    name: 'Main',

    //懒加载组件
    component: r => require(['../views/Main.vue'], r),
    children: [
      {
        path: 'type',
        name: 'Type',
        component: r => require(['../views/Type.vue'], r)
      },
      {
        path: 'products',
        name: 'Products',
        component: r => require(['../views/Products.vue'], r)
      },
      {
        //? 表示修饰前面一个参数可有可无，有只有一个
        path: 'pro/:id/:pid?',
        name: 'Pro',
        component: r => require(['../views/Pro.vue'], r)
      }
    ]
  },

  {
    path: '*',
    redirect: {
      name: 'Register'
    }
  }
]