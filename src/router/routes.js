const routes = [
  {
    path: "/",
    component: () => import("layouts/AppLayout.vue"),
    children: [
      { path: "", component: () => import("pages/Index.vue") },
      { path: "create", component: () => import("pages/Create.vue") },
      { path: "detail", component: () => import("pages/Detail.vue") },
      { path: "edit", component: () => import("pages/Edit.vue") }
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
