const routes = [
  {
    path: "/",
    component: () => import("layouts/AppLayout.vue"),
    children: [
      { path: "", component: () => import("pages/Index.vue") },
      {
        path: "create",
        component: () => import("pages/communities/Create.vue")
      },
      {
        path: "detail",
        component: () => import("pages/communities/Detail.vue")
      },
      { path: "edit", component: () => import("pages/communities/Edit.vue") }
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
