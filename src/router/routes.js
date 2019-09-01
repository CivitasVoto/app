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
        path: "communities/:id",
        component: () => import("pages/communities/Detail.vue")
      },
      {
        path: "communities/:id/edit",
        component: () => import("pages/communities/Edit.vue")
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
