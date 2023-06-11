<script>
    import {onMount} from "svelte";
    import {callTracker} from "./../util.js";
    import {
        RetrieveBoardBacklog,
        RetrieveDashboardsForProject,
        RetrieveDashboardsForProjectCached,
        RetrieveProject,
        RetrieveProjectCached
    } from "../../wailsjs/go/jirahelper/JiraHelper.js";
    import LoadingScreen from "./../components/LoadingScreen.svelte";
    import {meta} from "tinro";
    import Page from "../components/Page.svelte";
    import {Card, Tag} from "agnostic-svelte";

    export let projectKey
    let project = null
    let boards = []
    let backlog = []
    const route = meta();

    onMount(async () => retrieveProjectDetails())

    const retrieveProjectDetails = async () => {
        project = await RetrieveProjectCached(projectKey)
        boards = (await RetrieveDashboardsForProjectCached(projectKey)) || []

        callTracker("RetrieveProject", async () => await RetrieveProject(projectKey)).then(p => project = p)
        callTracker("RetrieveDashboardsForProject", async () => await RetrieveDashboardsForProject(projectKey))
            .then(d => {
                if (d) {
                    boards = d;
                    callTracker("RetrieveDashboardBacklog", async () => RetrieveBoardBacklog(d[0].id + ""))
                        .then(r => {if (r) backlog = r.issues })
                }
            })
    }


    const resolveType = (status) => {
        switch (status.toLowerCase()) {
            case "done":
                return "success"
            case "under development":
            case "in progress":
                return "warning"
        }
        return ""
    }
</script>


{#if project == null}
    <LoadingScreen text="Loading {projectKey}"/>
{/if}

{#if project}
    <Page refresh={retrieveProjectDetails} previousUrl={route.from}
          favouriteName={"Project - " + project.name} favouriteUrl={route.url}>
        <div slot="title">
            <img src={project.avatarUrls["32x32"]} alt="logo" height="48" width="48" class="mie8">
            {project.name}
        </div>

        <section class="mbs24">
            {#each boards as board}
                <div><a href="/app/boards/{board.id}">{board.name}</a></div>
            {/each}
        </section>

        <section class="mbs24">
            <h3>Backlog:</h3>
            {#each backlog as issue}
                <Card isBorder>
                    <div class="p16">{issue.key}</div>
                    <div class="p16 flex-grow-1 flex-shrink-1" style="flex-basis: 50ch;">
                        {issue.fields.summary}
                    </div>
                    <div class="tag-position">
                        <Tag type={resolveType(issue.fields.status.name)} isUppercase="true">
                            {issue.fields.status.name}
                        </Tag>
                    </div>
                </Card>

            {/each}
        </section>
    </Page>
{/if}
<style></style>