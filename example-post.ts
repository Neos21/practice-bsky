import { load } from 'https://deno.land/std@0.184.0/dotenv/mod.ts';
import AtprotoAPI from 'npm:@atproto/api';

const env = await load();

const agent = new AtprotoAPI.BskyAgent({ service: 'https://bsky.social' });
await agent.login({ identifier: env['IDENTIFIER'], password: env['PASSWORD'] });

/** 投稿するテキスト */
const text = 'Hello World';

const richText = new AtprotoAPI.RichText({ text: text });
await richText.detectFacets(agent);
await agent.post({
  $type : 'app.bsky.feed.post',
  text  : richText.text,
  facets: richText.facets
});
console.log(richText.text, richText.facets);

// https://zenn.dev/kawarimidoll/articles/42efe3f1e59c13
// https://github.com/aliceisjustplaying/atproto-starter-kit/blob/main/index.ts
