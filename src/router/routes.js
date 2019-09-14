const routes = [
  {
    path: "/",
    component: () => import("layouts/AppLayout.vue"),
    children: [
      { path: "", component: () => import("pages/Index.vue") },
      {
        path: "communities/create",
        component: () => import("pages/communities/Create.vue")
      },
      {
        path: "communities/:address",
        component: () => import("pages/communities/Detail.vue")
      },
      {
        path: "communities/:address/edit",
        component: () => import("pages/communities/Edit.vue")
      },
      {
        path: "users/:account", // change to users/:id
        component: () => import("pages/users/Profile.vue")
      }
    ]
  }
];

// Always leave this as last one
if (process.env.MODE !== "ssr") {
  routes.push({
    path: "*",
    component: () => import("pages/Error404.vue")
  });
}

export default routes;
