<script>
    import {onMount} from "svelte";
    import {Input} from "agnostic-svelte";
    import {GetBoards, GetBoardsCached} from "../../wailsjs/go/jirahelper/JiraHelper.js";
    import {callTracker, groupArr} from "./../util.js";
    import Page from "../components/Page.svelte";
    import LoadingScreen from "./../components/LoadingScreen.svelte";

    let boards = []
    let searchQuery = ""

    const retrieveBoards = async () => {
        boards = (await GetBoardsCached()) || []
        boards = await callTracker("GetBoards", async () => await GetBoards())
    }

    onMount(() => retrieveBoards())
</script>

{#if boards.length === 0}
    <LoadingScreen/>
{/if}

{#if boards.length > 0}
    <Page title="Boards" refresh={retrieveBoards}>
        <Input type="text" placeholder="Search" bind:value={searchQuery}/>
        <section class="mbs16">
            {#each groupArr(boards
                .filter(b => b.name.toUpperCase().includes(searchQuery.toUpperCase()))
                .sort((a, b) => a.name.localeCompare(b.name)), 2) as boardsWindow}
                <div class="flex">
                    <div class="column mbe4 mbs4"><a href="/app/boards/{boardsWindow[0].id}">{boardsWindow[0].name}</a></div>
                    {#if boardsWindow.length > 1}
                        <div class="column mbe4 mbs4"><a href="/app/boards/{boardsWindow[1].id}">{boardsWindow[1].name}</a></div>
                    {/if}
                </div>
            {/each}
        </section>
    </Page>
{/if}
<style>
    .column {
        flex: 1
    }
</style>