<script>
    import {router} from "tinro"
    import {AuthenticateReal, IsAuthenticated} from "../../wailsjs/go/jirahelper/JiraHelper.js";
    import {Button, Input} from "agnostic-svelte";
    import {callTracker} from "./../util";
    import {BrowserOpenURL} from "../../wailsjs/runtime/runtime.js";

    const regexpEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const regExpUrl = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;

    let url = ""
    let emailAddress = ""
    let token = ""

    let loginError = false
    let tokenInvalid = false
    let emailAddressInvalid = false
    let urlInvalid = false

    const validEmailAddress = () => regexpEmail.test(String(emailAddress).toLowerCase())
    const validToken = () => token.length > 10
    const validUrl = () => regExpUrl.test(String(url))

    const login = async () => {
        loginError = false
        tokenInvalid = !validToken();
        emailAddressInvalid = !validEmailAddress();
        urlInvalid = !validUrl();
        if (tokenInvalid || emailAddressInvalid || urlInvalid) {
            return
        }

        await callTracker("Authenticate", async () => await AuthenticateReal({url, emailAddress, token}))
        if (await IsAuthenticated()) {
            router.goto("/app")
        } else {
            loginError = true
        }
    }
    const openUrl = e => {
        e.preventDefault()
        BrowserOpenURL("https://id.atlassian.com/manage-profile/security/api-tokens")
    }
</script>
<main>
    <div>
        <div class="mbe24 text-center">
            <h2>Login with Jira</h2>
            <p>If you need a token go to:
                <a href="https://id.atlassian.com/manage-profile/security/api-tokens" on:click={openUrl}>https://id.atlassian.com/manage-profile/security/api-tokens</a>
            </p>
        </div>
        <section class="mbe24">
            <Input label="Jira cloud url" type="text" placeholder="Jira cloud url" bind:value={url}
                   invalidText="Jira cloud url needs to be filled" isInvalid={urlInvalid}
            />
        </section>
        <section class="mbe24">
            <Input label="Email address" type="text" placeholder="Email address" bind:value={emailAddress}
                   invalidText="Email address needs to be filled" isInvalid={emailAddressInvalid}
            />
        </section>
        <section class="mbe24">
            <Input label="Token" type="password" placeholder="Token" bind:value={token}
                   invalidText="Token needs to be filled" isInvalid={tokenInvalid}/>
        </section>
        <div class="submit-wrapper">
            <Button on:click={login}>Login</Button>
        </div>
        {#if loginError}
            <p>Error occurred when logging in, please retry</p>
        {/if}
    </div>
</main>
<style>
    main {
        padding: 16px;
        display: flex;
        justify-content: center
    }

    .text-center {
        text-align: center
    }

    .submit-wrapper {
        display: flex;
        justify-content: flex-end;
    }
</style>
