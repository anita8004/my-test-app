// import { accountService } from '@/_services';

const facebookAppId = import.meta.env.VUE_APP_FACEBOOK_APP_ID;

export function initFacebookSdk() {
    return new Promise(resolve => {
        // load facebook sdk script
        (function (d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) { return; }
            js = d.createElement(s); js.id = id;
            js.src = "https://connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));

        // wait for facebook sdk to initialize before starting the vue app
        window.fbAsyncInit = function () {
            const FB = window.FB;
            FB.init({
                appId: facebookAppId,
                cookie: true,
                xfbml: true,
                version: 'v8.0'
            });

            // auto authenticate with the api if already logged in with facebook
            FB.getLoginStatus(({ authResponse }) => {
                if (authResponse) {
                    console.log('fb: ', authResponse)
                    // accountService.apiAuthenticate(authResponse.accessToken).then(resolve);
                    resolve()
                } else {
                    resolve();
                }
            });
        };    
    });
}