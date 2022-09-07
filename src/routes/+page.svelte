<script lang="ts">
  import type { PageData } from "./$types";
  export let data: PageData;
  const { token } = data;
</script>

<h1>Welcome to SvelteKit</h1>
<p>
  Token: {token}
</p>

<p>
  <a href="/login">Login</a>
</p>
