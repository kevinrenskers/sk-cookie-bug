<script lang="ts">
  import { page } from "$app/stores";
  import { goto, invalidateAll } from "$app/navigation";
  import { postLocal } from "$lib/api";

  async function login() {
    const payload = {
      token: $page.params.token,
    };

    try {
      const res = await postLocal<{ token: string }>(
        fetch,
        "/auth/exchange-magic-token",
        payload
      );

      const token = res.token;
      if (token) {
        console.log(token);
        await invalidateAll();
        goto("/");
      }
    } catch (error) {
      console.log(JSON.stringify(error));
    }
  }
</script>

<button on:click={() => login()}>Click to login</button>
