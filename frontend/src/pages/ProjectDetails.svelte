<script>
    import {onMount} from "svelte";
    import {callTracker} from "./../util.js";
    import {
        RetrieveDashboardsForProject,
        RetrieveDashboardsForProjectCached,
        RetrieveProject,
        RetrieveProjectCached
    } from "../../wailsjs/go/main/App.js";
    import LoadingScreen from "./../components/LoadingScreen.svelte";
    import {meta} from "tinro";
    import Page from "../components/Page.svelte";

    export let projectKey
    let project = null
    let boards = []
    const route = meta();

    onMount(async () => retrieveProjectDetails())

    const retrieveProjectDetails = async () => {
        project = await RetrieveProjectCached(projectKey)
        boards = (await RetrieveDashboardsForProjectCached(projectKey)) || []

        callTracker("RetrieveProject", async () => await RetrieveProject(projectKey)).then(p => project = p)
        callTracker("RetrieveDashboardsForProject", async () => await RetrieveDashboardsForProject(projectKey))
            .then(d => {
                if (d) boards = d;
            })
    }
</script>


{#if project == null}
    <LoadingScreen text="Loading {projectKey}"/>
{/if}

{#if project}
    <Page title="Project: {project.name}" refresh={retrieveProjectDetails} previousUrl={route.from}
          favouriteName={"Project - " + project.name} favouriteUrl={route.url}>
        <section class="mbs24">
            <img src={project.avatarUrls["32x32"]} alt="logo"/>
        </section>

        <section class="mbs24">
            {#each boards as board}
                <div><a href="/app/boards/{board.id}">{board.name}</a></div>
            {/each}
        </section>
    </Page>
{/if}
<style></style>