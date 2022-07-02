<script>
    import {meta} from "tinro";
    import {onMount} from "svelte";
    import LoadingScreen from "./../components/LoadingScreen.svelte";
    import {IssueDetails, IssueDetailsCached} from "../../wailsjs/go/jirahelper/JiraHelper.js";
    import {Divider} from "agnostic-svelte";
    import {callTracker} from "./../util.js";
    import Page from "../components/Page.svelte";

    export let issueKey = ""
    let issue = null
    const route = meta()

    const getIssueDetails = async () => {
        issue = await IssueDetailsCached(issueKey)
        issue = await callTracker("IssueDetails", async () => await IssueDetails(issueKey))
    }

    const render = (t) => {
        return t ? t.replaceAll("\n", "<br/>") : ""
    }

    onMount(async () => await getIssueDetails())
</script>

{#if issue == null}
    <LoadingScreen text="Loading {issueKey}"/>
{/if}

{#if issue }
    <Page title={issueKey + " - " + issue.fields.summary} previousUrl={route.from}
          favouriteName={"Issue - " + issueKey + "-" + issue.fields.summary} favouriteUrl={route.url}
          refresh={getIssueDetails}>
        <section class="mbe24">
            <p><b>Type:</b> {issue.fields.issuetype.name}</p>
            <p><b>Reporter:</b> {issue.fields.reporter.displayName}</p>
        </section>
        <section class="mbe24">
            {@html render(issue.fields.description)}
        </section>
        {#if issue.fields.comment.comments.length > 0}
            <h4>Comments</h4>
        {/if}
        {#each issue.fields.comment.comments as comment}
            <section class="mbs24 mbe24">
                <b>Author: </b>{comment.author.displayName}
                <br/>
                <b>Created: </b>{new Date(comment.created).toLocaleDateString("en-GB", {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            })}
                <br/>
                <p>{@html render(comment.body)}</p>
            </section>
            <Divider/>
        {/each}
    </Page>
{/if}

<style>
</style>