export const mainCommon = () => {
  const isFromPc = computed<any>(() => {
    if (process.browser) {
      const width = window.innerWidth
      return width > 2048
    }
    return false
  })

  function goHome() {
    if (process.browser) {
      window.location.href = useRuntimeConfig().public.frontUrl;
    }
  }

  function setCookie(name: String, value: any, exhour: number) {
    const d = new Date();
    // TODO: expire time
    d.setTime(d.getTime() + exhour * 60 * 60 * 1000)
    const expires = 'expires=' + d.toUTCString()

    document.cookie = name + '=' + value + ';' + expires + ';path=/;'
    if (window.location.href.search('127.0.0.1') > -1) {
      document.cookie = name + '=' + value + ';' + expires + ';path=/;'
    }
  }

  return {
    isFromPc,
    goHome,
    setCookie,
  }
}