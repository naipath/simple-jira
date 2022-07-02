<script>
    import {onMount} from "svelte";
    import {callTracker} from "./../util.js";
    import {
        RetrieveBoardDetails,
        RetrieveBoardDetailsCached,
        RetrieveSprintsForBoard,
        RetrieveSprintsForBoardCached
    } from "../../wailsjs/go/jirahelper/JiraHelper.js";
    import LoadingScreen from "./../components/LoadingScreen.svelte";
    import {meta} from "tinro";
    import Page from "../components/Page.svelte";

    export let boardId
    let board = null
    let sprints = []
    let completedSprints = []
    let futureSprints = []
    onMount(async () => retrieveBoardDetails())

    const groupSprints = (result) => {
        sprints = result.filter(sp => sp.state === 'active');
        futureSprints = result.filter(sp => sp.state === 'future');
        completedSprints = result.filter(sp => sp.state !== 'future' && sp.state !== 'active')
    }

    const retrieveBoardDetails = async () => {
        board = await RetrieveBoardDetailsCached(Number(boardId))
        groupSprints((await RetrieveSprintsForBoardCached(boardId)) || [])

        callTracker("retrieveBoardDetails", async () => await RetrieveBoardDetails(Number(boardId))).then(p => board = p)
        callTracker("retrieveSprintsForBoard", async () => await RetrieveSprintsForBoard(boardId)).then(p => p && groupSprints(p))
    }

    const route = meta();
</script>

{#if board == null}
    <LoadingScreen text="Loading {boardId}"/>
{/if}

{#if board != null}
    <Page title={"Board: " + board.name} refresh={retrieveBoardDetails} previousUrl={route.from}
          favouriteName={"Board - " + board.name} favouriteUrl={route.url}>
        <section class="mbs24">
            <b>Type: </b>{board.type}
        </section>
        <section class="mbs24">
            <h4>Sprints</h4>
            {#each sprints as {id, name}}
                <div>
                    <a href={"/app/sprints/" + id}>{name}</a>
                </div>
            {/each}
        </section>
        {#if futureSprints.length > 0}
            <section class="mbs24">
                <h4>Future sprints</h4>
                {#each futureSprints as {id, name}}
                    <div>
                        <a href={"/app/sprints/" + id}>{name}</a>
                    </div>
                {/each}
            </section>
        {/if}
        {#if completedSprints.length > 0}
            <section class="mbs24">
                <h4>Completed sprints</h4>
                {#each completedSprints as {id, name}}
                    <div>
                        <a href={"/app/sprints/" + id}>{name}</a>
                    </div>
                {/each}
            </section>
        {/if}
    </Page>
{/if}
<style>
</style>