import { auth, requiredPropsValidate } from "./helpers";

const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "login",
        component: () => import("pages/Login.vue"),
        name: "login"
      },
      ...auth([
        {
          path: "",
          component: () => import("src/pages/Main.vue"),
          name: "main"
        },
        {
          path: "history",
          component: () => import("pages/History.vue"),
          name: "history"
        },
        {
          path: "transfer/create",
          component: () => import("pages/Transfer/TransferCreate.vue"),
          name: "transfer.create"
        },
        {
          path: "/transaction/created",
          component: () => import("pages/Transfer/TransactionCreated.vue"),
          name: "transaction.created",
          props: true,
          beforeEnter(to, from, next) {
            const requiredProps = ["incoming", "amount", "balanceBefore"];
            requiredPropsValidate(to, next, requiredProps, "main");
          }
        }
      ])
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "*",
    component: () => import("pages/Error404.vue")
  }
];

export default routes;
