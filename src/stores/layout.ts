import { defineStore } from 'pinia';
import { ref } from 'vue';

const useLayoutStore = defineStore('layoutStore', () => {
  const isDark = ref<boolean>(false);

  const currentTheme = localStorage.getItem('q-theme-isDark');
  if (currentTheme) {
    isDark.value = Boolean(currentTheme === 'true');
  }

  return {
    isDark,
    setLayouTheme(themeIsDark: boolean) {
      isDark.value = themeIsDark;
      localStorage.setItem('q-theme-isDark', `${isDark.value}`);
    },
  };
});
export default useLayoutStore;
