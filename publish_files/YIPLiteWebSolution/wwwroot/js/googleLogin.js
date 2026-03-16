window.googleLogin = (function () {
    async function init(clientId, apiBaseUrl, dotNetRef) {
        dotNetRef.invokeMethodAsync('OnGoogleSessionChecked', false);

        if (!window.google || !google.accounts || !google.accounts.id) {
            console.error("Google Identity Services script not loaded.");
            return;
        }

        // ✅ ยิงไปที่ API base (7073) แทน same-origin (7111)
        let nonce = null;
        try {
            const url = new URL("/api/accounts/login-nonce", apiBaseUrl).toString();
            const resp = await fetch(url, { method: "GET", credentials: "include" });
            const data = await resp.json();
            nonce = data?.nonce;
        } catch (e) {
            console.warn("Cannot fetch nonce:", e);
        }

        google.accounts.id.initialize({
            client_id: clientId,
            nonce: nonce,
            callback: (response) => dotNetRef.invokeMethodAsync('OnGoogleLoginSuccess', response.credential)
        });

        function renderButtonWhenReady() {
            const div = document.getElementById('googleSignInDiv');
            if (!div) return setTimeout(renderButtonWhenReady, 100);
            google.accounts.id.renderButton(div, { theme: 'outline', size: 'large' });
        }
        renderButtonWhenReady();
    }

    return { init };
})();