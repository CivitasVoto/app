const routes = [
  {
    path: "/",
    component: () => import("layouts/MyLayout.vue"),
    children: [
      { path: "", component: () => import("pages/Index.vue") },
      { path: "community/create", component: () => import("pages/community/Create.vue") },
      { path: "community/detail", component: () => import("pages/community/Detail.vue") },
      { path: "community/edit", component: () => import("pages/community/Edit.vue") }
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
