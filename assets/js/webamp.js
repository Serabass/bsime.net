jQuery(function () {
    window.w = new Webamp({
        initialTracks: [{
            metaData: {
                artist: "BSIME",
                title: "Far Away"
            },
            url: "https://cf-hls-media.sndcdn.com/media/1276864/1436523/K7X6yZee2kHR.128.mp3?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiKjovL2NmLWhscy1tZWRpYS5zbmRjZG4uY29tL21lZGlhLyovKi9LN1g2eVplZTJrSFIuMTI4Lm1wMyIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTUyNzc5NTY3OX19fV19&Signature=uEOU27aptc9Z36yeAxFmPQwP6c38yIqOBZbzJU72LA~diCfBkchZpcpdZlVFzAjWXzhqMsv3Kb2PT2Z88ziP9-Ui3tT0ZIXdqhB9TsaJqwE87J9CQOXIMXjT1U3PqrBFCQW6Wi7cIcr2-wHVonQCxDPaOzitU~2eujeNpSe6sNhD-7hkQ05F7u~4pP9Utnw7Uhq6NzEb1KHX9ZplJOZu3peOZPgpuVwt1sOn3ToIOMNGuoLAb0G0JOBAPXzEagXawDJh-3Rmm~Tkhmf87MR7J3QYpw3mzz1ZEoqpSyMEfHiQLgqXM-58v5Sj3rFgEhzuqI9-If7ba9lY6k55VtRt3A__&Key-Pair-Id=APKAJAGZ7VMH2PFPW6UQ",
            duration: 5.322286
        }],
        initialSkin: {
            url: "https://cdn.rawgit.com/captbaritone/webamp/43434d82/skins/base-2.91.wsz"
        },
    });
    w.renderWhenReady(document.getElementById('player'));
});