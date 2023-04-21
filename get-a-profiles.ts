import { load } from 'https://deno.land/std@0.184.0/dotenv/mod.ts';
import AtprotoAPI from 'npm:@atproto/api';

const env = await load();

const agent = new AtprotoAPI.BskyAgent({ service: 'https://bsky.social' });
await agent.login({ identifier: env['IDENTIFIER'], password: env['PASSWORD'] });

// `_currentHandle` は未使用
const a        = { did: 'did:plc:ltazzlibzu4qn53vtsylhcbr', _currentHandle: 'fhjgjhjgh.bsky.social' };
const _nobodyu = { did: 'did:plc:xddhn2m2weqtuyvz35qdkvzb', _currentHandle: 'nobodyu.bsky.social'   };

// フォロー一覧から除外するユーザ情報・`_currentHandle` は未使用
const usersToExclude = [
  { did: 'did:plc:qjp6exfcyenr22yucr5nomyi', _currentHandle: 'telco.bsky.social' }
];

const resFollows = await agent.api.app.bsky.graph.getFollows({ actor: a.did });

const profile = resFollows.data.subject;
// Exclude Unrelated Users
const follows = resFollows.data.follows.filter((follow) => usersToExclude.map((userToExclude) => userToExclude.did).every((excludeDid) => excludeDid !== follow.did))
// All Users
const users = [profile, ...follows].map((follow) => ({
  did        : follow.did,
  handle     : follow.handle,
  displayName: follow.displayName ?? '(Undefined)'
}));

const now = new Date().toISOString();
const result = JSON.stringify({
  dateTime: now,
  users: users
}, null, '  ');

console.log(result);
await Deno.writeTextFile(`./${now}.json`, result);
