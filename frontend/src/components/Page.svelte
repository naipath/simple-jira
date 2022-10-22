<script>

    import {Button, ButtonGroup} from "agnostic-svelte";
    import {router} from "tinro";
    import Favourite from "./Favourite.svelte";

    export let title = null
    export let previousUrl = null
    export let refresh = null
    export let favouriteUrl = null
    export let favouriteName = null

    const back = () => router.goto(previousUrl)
</script>
<main>
    <div style="display: flex; justify-content: space-between">
        <h4><slot name="title">{title || ""}</slot></h4>
        <div>
            <ButtonGroup>
                {#if refresh}
                    <Button on:click={refresh}>Refresh</Button>
                {/if}
                {#if favouriteUrl && favouriteName}
                    <Favourite url={favouriteUrl} name={favouriteName}/>
                {/if}
                {#if previousUrl}
                    <Button mode="primary" on:click={back}>Back</Button>
                {/if}
            </ButtonGroup>
        </div>
    </div>

    <slot></slot>
</main>
<style>
    main {
        padding: 16px;
        margin: 0 auto;
        max-width: 1200px
    }
</style>