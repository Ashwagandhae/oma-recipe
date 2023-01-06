import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

const app = createApp(App);

app.use(router);
app.directive('scroll-in', {
  mounted: (el, binding) => {
    el.classList.add('scrollHidden');
    let f = () => {
      let rect = el.getBoundingClientRect();
      let inView =
        rect.width > 0 &&
        rect.height > 0 &&
        rect.top >= 0 &&
        rect.bottom <=
          (window.innerHeight || document.documentElement.clientHeight) +
            (binding.value *
              (window.innerHeight ||
                window.innerHeight ||
                document.documentElement.clientHeight) || 200);
      if (inView) {
        el.classList.add('scrollIn');
        el.classList.remove('scrollHidden');
        window.removeEventListener('scroll', f);
        el.addEventListener('animationend', () => {
          el.classList.remove('scrollIn');
        });
      }
    };
    window.addEventListener('scroll', f);
    f();
  },
});
app.mount('#app');
