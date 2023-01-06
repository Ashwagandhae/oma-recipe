<script setup lang="ts">
// routerlink
import { RouterLink } from 'vue-router';
</script>

<template>
  <nav :class="{ open: navOpen }">
    <ul>
      <li class="navOpen" v-on:click="navOpen = !navOpen">
        <svg v-if="navOpen" height="20" width="20">
          <path
            d="M11.469,10l7.08-7.08c0.406-0.406,0.406-1.064,0-1.469c-0.406-0.406-1.063-0.406-1.469,0L10,8.53l-7.081-7.08
							c-0.406-0.406-1.064-0.406-1.469,0c-0.406,0.406-0.406,1.063,0,1.469L8.531,10L1.45,17.081c-0.406,0.406-0.406,1.064,0,1.469
							c0.203,0.203,0.469,0.304,0.735,0.304c0.266,0,0.531-0.101,0.735-0.304L10,11.469l7.08,7.081c0.203,0.203,0.469,0.304,0.735,0.304
							c0.267,0,0.532-0.101,0.735-0.304c0.406-0.406,0.406-1.064,0-1.469L11.469,10z"
          ></path>
        </svg>
        <svg v-else viewBox="0 0 100 80" width="20" height="20">
          <rect width="100" height="10"></rect>
          <rect y="30" width="100" height="10"></rect>
          <rect y="60" width="100" height="10"></rect>
        </svg>
      </li>
      <RouterLink to="/">Home</RouterLink>
      <li
        v-on:click="toggleTheme()"
        :class="{ dark: userTheme === 'dark-theme' }"
      >
        Theme
      </li>
    </ul>
  </nav>
  <div class="content" :class="{ unfocus: navOpen }">
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script lang="ts">
export default {
  name: 'App',
  data() {
    return {
      navOpen: false,
      userTheme: 'light-theme',
    };
  },
  mounted() {
    this.setTheme(localStorage.getItem('userTheme') ?? 'light-theme');
  },
  methods: {
    setTheme(theme: string) {
      localStorage.setItem('userTheme', theme);
      this.userTheme = theme;
      document.documentElement.className = theme;
    },
    toggleTheme() {
      const activeTheme = localStorage.getItem('userTheme');
      if (activeTheme === 'dark-theme') {
        this.setTheme('light-theme');
      } else {
        this.setTheme('dark-theme');
      }
    },
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Josefin+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&family=Open+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500;1,600;1,700;1,800&display=swap');
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
:root {
  --color-weak: rgb(212, 184, 188);
  --color: rgb(0, 0, 0);
  --color-two: rgb(189, 118, 70);
  --background: rgb(255, 255, 255);
  --background-two: rgb(250, 243, 235);
  --background-bake: rgb(250, 235, 247);
  --background-three: rgb(247, 224, 217);
  --font: 'Open Sans', Helvetica, Arial, sans-serif;
  --font-big: 'Josefin Sans', sans-serif;
  --padding: 0.8rem;
  --padding-two: 1.6rem;
}
:root.dark-theme {
  --color-weak: rgb(161, 122, 132);
  --color: rgb(255, 255, 255);
  --color-two: rgb(255, 199, 161);
  --background: rgb(26, 26, 26);
  --background-two: rgb(46, 44, 42);
  --background-bake: rgb(54, 39, 47);
  --background-three: rgb(77, 66, 66);
  --background-four: rgb(121, 93, 96);
}
/* Hide scrollbar for Chrome, Safari and Opera */
:root::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
:root {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
body {
  margin: 0;
  background: var(--background);
}
#app {
  font-family: var(--font);
  color: var(--color);
  background-color: var(--background);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.scrollHidden {
  opacity: 0;
  transform: translateY(100px);
}
@keyframes scrollIn {
  from {
    opacity: 0;
    transform: translateY(100px);
  }

  to {
    opacity: 1;
    transform: none;
  }
}
.scrollIn {
  animation-name: scrollIn;
  animation-duration: 0.5s;
}
nav {
  position: fixed;
  top: 0;
  z-index: 1;
  height: 4rem;
  width: 100%;
  background-color: var(--background-two);
}
nav > ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  display: flex;
  align-items: center;
  flex-direction: row;
  height: 100%;
}
nav > ul > :is(li, a) {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: calc(1rem + 2px);
  position: relative;
  text-align: center;
  transition: background-color 0.3s;
  cursor: default;
  color: var(--color-two);
  height: 100%;
  box-sizing: border-box;
}
nav > ul > :is(li, a):hover {
  background-color: var(--background-three);
}
nav > ul > :is(li, a).navOpen {
  display: none;
}
@media screen and (max-width: 600px) {
  nav.open {
    z-index: 100;
  }
  nav > ul > :is(li, a).navOpen {
    display: flex;
    fill: var(--color);
  }
  nav > ul > :is(li, a) {
    display: none;
  }
  nav.open > ul > :is(li, a) {
    display: flex;
  }
  nav > ul {
    background-color: var(--background-two);
    width: max-content;
    overflow: hidden;
  }
  nav.open > ul {
    background-color: var(--background-two);
  }

  .content.unfocus {
    opacity: 0.4;
  }
}

h1 {
  font-size: min(15vw, 80px);
  font-weight: normal;
  margin: max(0.5em, 250px) 0 0.5em 0;
  font-family: var(--font-big);
}
h2 {
  font-size: 2rem;
  font-weight: normal;
  color: var(--color-two);
  margin: 0.5em 0;
  padding: 0;
  font-family: var(--font-big);
}
p {
  font-size: 1rem;
}
a {
  color: var(--color-two);
  text-decoration: none;
}
a:hover {
  text-decoration: underline;
}
</style>
