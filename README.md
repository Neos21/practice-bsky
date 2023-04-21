# Practice Bluesky API

Practice Bluesky API.

```bash
$ deno -V
deno 1.32.5

# Create .env File
cat << EOL > ./.env
IDENTIFIER=EXAMPLE-USERNAME.bsky.social
PASSWORD=EXAMPLE-PASSWORD
EOL

# Execute
$ deno run --allow-read --allow-env --allow-net --allow-write ./get-a-profiles.ts
```

- Other Examples

```bash
# Get My Profile
$ deno run --allow-read --allow-env --allow-net ./example-get-my-profile.ts 

# Post Text
$ deno run --allow-read --allow-env --allow-net ./example-post.ts 
```


## Links

- [Neo's World](https://neos21.net/)
