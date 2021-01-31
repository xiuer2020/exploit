export default [{
    path: '/Demo',
    name: 'Demo',

    //懒加载组件
    component: r => require(['../views/Demo.vue'], r)
}, {
    path: '*',
    redirect: {
        name: 'Demo'
    }
}];