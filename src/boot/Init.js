import Vue from "vue";
import VueWait from "vue-wait";
// import PortalVue from "portal-vue";
// import moment from "moment";

Vue.use(VueWait);
// Vue.use(PortalVue);

// Vue.filter("prettyAmount", function(amount) {
//   if (typeof amount !== "string") return "";
//   if (amount === "") return amount;
//   const [letf, right = ""] = amount.split(",");
//   const prepared = letf.match(/.{1,3}(?=(.{3})*$)/g).join(" ");
//   if (!right) return prepared;
//   return prepared + "," + right;
// });

// Vue.filter("prettyDate", function(date) {
//   if (typeof date !== "string") return "";
//   if (date === "") return date;
//   return moment(date).format("DD.MM.YYYY");
// });

export default ({ app }) => {
  app.wait = new VueWait({
    useVuex: true
  });
};
