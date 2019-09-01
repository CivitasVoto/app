const routes = [
  {
    path: "/",
    component: () => import("layouts/AppLayout.vue"),
    children: [
      { path: "", component: () => import("pages/Index.vue") },
      {
        path: "community/create",
        component: () => import("pages/communities/Create.vue")
      },
      {
        path: "community/:id",
        component: () => import("pages/communities/Detail.vue")
      },
      {
        path: "community/:id/edit",
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
