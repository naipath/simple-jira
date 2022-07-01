<script>
    import appicon from "./../assets/images/appicon.png"
    import appiconDark from "./../assets/images/appicon-dark.png"
    import {onMount} from "svelte";
    import {GetFavourites, RemoveFavourite} from "../../wailsjs/go/main/App.js";
    import {Close} from "agnostic-svelte";
    import Page from "../components/Page.svelte";

    let favourites = null
    const getFavourites = async () => favourites = await GetFavourites()
    onMount(() => getFavourites())

    const remove = (url) => async () => {
        await RemoveFavourite(url)
        await getFavourites()
    }
</script>

<Page refresh={getFavourites}>
    <div class="logo-wrapper">
        <img src={appicon} alt="logo" class="light"/>
        <img src={appiconDark} alt="logo" class="dark"/>
    </div>
    <div>
        <h3>Favourites</h3>
        <section class="mbs16">
            {#if favourites === null}
                Loading
            {/if}
            {#if favourites !== null && Object.keys(favourites).length === 0}
                No favourites yet
            {/if}
            {#if favourites !== null && Object.keys(favourites).length > 0}
                <ul>
                    {#each Object.entries(favourites) as favourite}
                        <li>
                            <a href={favourite[0]}>{favourite[1]}</a>
                            <Close on:click={remove(favourite[0])}/>
                        </li>
                    {/each}
                </ul>
            {/if}
        </section>
    </div>
</Page>
<style>
    .logo-wrapper {
        display: flex;
        justify-content: center;
        height: 100px;
        align-items: center
    }

    .light {
        height: 100px;
        display: block;
    }

    .dark {
        height: 100px;
        display: none;
    }

    @media (prefers-color-scheme: dark) {
        .light {
            display: none;
        }

        .dark {
            display: block;
        }
    }
</style>