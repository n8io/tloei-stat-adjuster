Login to ESPN and go to the league settings page. Run this in DevTools

```javascript
copy(__NEXT_DATA__.props.pageProps.page.config)
```

Paste in `espn.json`

Next copy the response from `https://lm-api-reads.fantasy.espn.com/apis/v3/games/ffl/seasons/2024/segments/0/leagues/220779?view=mSettings&view=mTeam&view=modular&view=mNav`

and paste in `league.json`