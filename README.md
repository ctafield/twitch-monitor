# twitch-monitor
Node JS API to return a 400x300 image detailing if someone is streaming, with a fall back to displaying the current weather.

## Why 400x300?
This is designed for use with InkyWHAT eink display for the Raspberry Pi.

## Configuration
Create a secrets.json in the root of the project with the following format:

```
{
    "twitch": {
        "clientId": "**clientId**",
        "secret": "**secret**"
    },
    "openWeather": {
        "apiKey": "**apikey**",
        "lat":"**latitude**",
        "lon":"**longitude**"        
    }
}