import { load } from 'https://deno.land/std@0.184.0/dotenv/mod.ts';
import AtprotoAPI from 'npm:@atproto/api';

const env = await load();

const agent = new AtprotoAPI.BskyAgent({ service: 'https://bsky.social' });
await agent.login({ identifier: env['IDENTIFIER'], password: env['PASSWORD'] });

/** 取得するユーザの Handle 名か Did 値 */
const handleOrDid = 'neos21.bsky.social';

const repo = await agent.com.atproto.repo.describeRepo({ repo: handleOrDid })
console.log(repo.data.handle, repo.data.did);

const profile = await agent.api.app.bsky.actor.getProfile({ actor: handleOrDid });
console.log(profile.data.handle, profile.data.did, profile.data.displayName, profile.data.description);
