export const useFetchCommon = () => {
  const token = useCookie("token");
  
  async function fetch_get({ url, params }: { [key: string]: any }) {
    const options: { [key: string]: any } = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token.value === undefined ? '' : `Bearer ${token.value}`,
      },
    };

    let reqUrl = params
      ? url + "?" + new URLSearchParams(params).toString()
      : url;
    
    const res: any = await $fetch(reqUrl, options);
    return res;
  }

  async function fetch_post({ url, body }: { [key: string]: any }) {
    const options: { [key: string]: any } = {
      method: "POST",
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        Authorization: token.value === undefined ? '' : `Bearer ${token.value}`,
      },
      body: JSON.stringify(body),
    };

    const res: any = await useFetch(url, options);

    if (res.status.value === "success") {
      const data = await res.data.value;
      return data;
    } else {
      const data = await res.error.value.data;
      throw data;
    }
  }

  async function fetch_put({ url, body }: { [key: string]: any }) {
    const options: { [key: string]: any } = {
      method: "PUT",
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.value}`,
      },
      body: JSON.stringify(body),
    };

    const res: any = await useFetch(url, options);

    if (res.status.value === "success") {
      const data = await res.data.value;
      return data;
    } else {
      const data = await res.error.value.data;
      throw data;
    }
  }

  async function fetch_delete({ url, body }: { [key: string]: any }) {
    const options: { [key: string]: any } = {
      method: "DELETE",
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.value}`,
      },
      body: JSON.stringify(body),
    };

    const res: any = await useFetch(url, options);

    if (res.status.value === "success") {
      const data = await res.data.value;
      return data;
    } else {
      const data = await res.error.value.data;
      throw data;
    }
  }

  async function fetch_form({ url, formData }: { [key: string]: any }) {
    const options: { [key: string]: any } = {
      method: "POST",
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
      body: formData,
    };

    const res: any = await useFetch(url, options);

    if (res.status.value === "success") {
      const data = await res.data.value;
      return data;
    } else {
      const data = await res.error.value.data;
      throw data;
    }
  }

  return {
    fetch_get,
    fetch_post,
    fetch_put,
    fetch_delete,
    fetch_form,
  };
}