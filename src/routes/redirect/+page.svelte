<script lang="ts">
    import { page } from "$app/stores";
    import json from "../../redirects.json";
    console.log(json);

    type Redirects = { [key: string]: string };
    const redirects: Redirects = json;

    const { url } = $page;

    const [service] = url.hostname.split(".");

    const iconUrl = `icons/${service}.png`;
    const redirectUrl = redirects[service];
</script>

<svelte:head>
    <link rel="apple-touch-icon" href={iconUrl} />
    <meta http-equiv="refresh" content="0; URL='{redirectUrl}'" />
</svelte:head>
