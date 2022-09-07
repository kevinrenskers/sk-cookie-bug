<script lang="ts">
  import type { PageData } from "./$types";
  import { invalidateAll } from "$app/navigation";
  export let data: PageData;
  const { token } = data;

  async function logout() {
    const request = new Request("/auth/logout", { method: "post" });
    await fetch(request);
    await invalidateAll();
  }
</script>

<h1>Welcome to SvelteKit</h1>
<p>Token: {token}</p>

{#if token}
  <button on:click={logout}>Logout</button>
{:else}
  <p><a href="/login">Login</a></p>
{/if}
