import ky from 'ky';
import { Notify } from 'quasar'

function handler(err, router) {

  if (err instanceof ky.HTTPError) {
    if (err.response.status === 401) { return router.push({ name: 'common.login' }) }

    Notify.create({
      type: 'negative',
      message: `Произошла ошибка на сервере.`
    });
  }

  if (err instanceof ky.TimeoutError) {
    return Notify.create({
      type: 'negative',
      message: `Истекло время ожидания запроса попробуйте снова`,
      actions: [
        {
          label: 'Перезагрузить страницу',
          color: 'white',
          handler: () => {
            location.reload();
          }
        }
      ]
    });
  }

}

window.addEventListener("error", function (e) {
  console.error(); ('global', e);
  return false;
});

window.addEventListener('unhandledrejection', function (e) {
  console.log('unhandle promise', e);
  handler(e.reason);
});

export default ({ app, router, store, Vue }) => {

  Vue.config.errorHandler = function (err, vm, info) {

    handler(err, router);

    console.error(err);
  }
}
