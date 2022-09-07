<script lang="ts">
  import { goto, invalidateAll } from "$app/navigation";

  async function login() {
    try {
      const res = await fetch("/auth/exchange-magic-token", { method: "POST" });
      const json = await res.json();
      const token = json.token;
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
