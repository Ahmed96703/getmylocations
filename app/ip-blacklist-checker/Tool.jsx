'use client';

import { useEffect, useState } from 'react';
import { Card, QueryForm, Status, ResultTable, Badge, Examples } from '../components/toolUi.jsx';
import { dns, isIPv4, isIPv6, myIp, toDomain } from '../components/net.js';

// DNS blocklists that answer through a public DNS resolver. Spamhaus is left
// out on purpose: it refuses queries from public resolvers, so a check from a
// browser would always look like an error (the page links to its own checker).
const LISTS = [
  ['Barracuda', 'b.barracudacentral.org', 'https://www.barracudacentral.org/lookups'],
  ['SpamCop', 'bl.spamcop.net', 'https://www.spamcop.net/bl.shtml'],
  ['UCEPROTECT Level 1', 'dnsbl-1.uceprotect.net', 'https://www.uceprotect.net/en/rblcheck.php'],
  ['PSBL (Passive Spam Block List)', 'psbl.surriel.com', 'https://psbl.org/'],
  ['Mailspike', 'bl.mailspike.net', 'https://mailspike.org/'],
  ['s5h.net', 'all.s5h.net', 'https://www.usenix.org.uk/content/rbl.html'],
  ['DroneBL', 'dnsbl.dronebl.org', 'https://dronebl.org/lookup'],
  ['Anonmails DNSBL', 'spam.dnsbl.anonmails.de', 'https://anonmails.de/dnsbl.php'],
  ['GBUdb Truncate', 'truncate.gbudb.net', 'https://www.gbudb.com/truncate/'],
  ['0spam', 'bl.0spam.org', 'https://0spam.org/'],
  ['InterServer RBL', 'rbl.interserver.net', 'https://rbl.interserver.net/'],
  ['SPFBL', 'dnsbl.spfbl.net', 'https://spfbl.net/en/dnsbl/'],
  ['blocklist.de', 'bl.blocklist.de', 'https://www.blocklist.de/en/search.html'],
  ['Mailspike Z (zero reputation)', 'z.mailspike.net', 'https://mailspike.org/'],
];

async function check(rev, zone) {
  try {
    const r = await dns(`${rev}.${zone}`, 'A');
    if (r.status === 3) return { listed: false };
    const hits = r.answers.filter((a) => a.type === 'A').map((a) => a.data);
    if (r.status === 0 && hits.length && hits.every((h) => h.startsWith('127.255.255.'))) return { error: 'Refused the query' };
    if (r.status === 0 && hits.some((h) => h.startsWith('127.'))) {
      const reason = await dns(`${rev}.${zone}`, 'TXT').then((t) => t.answers.map((a) => a.data.replace(/^"|"$/g, '')).join(' ')).catch(() => '');
      return { listed: true, code: hits.join(', '), reason };
    }
    if (r.status === 0) return { listed: false };
    return { error: r.statusText };
  } catch (err) {
    return { error: 'No answer' };
  }
}

export default function Tool() {
  const [q, setQ] = useState('');
  const [status, setStatus] = useState(null);
  const [res, setRes] = useState(null);

  const run = async (input) => {
    let ip = input.trim();
    setQ(ip);
    setRes(null);
    if (!isIPv4(ip)) {
      // A domain: check the address its mail or web server uses.
      const d = toDomain(ip);
      if (isIPv6(ip)) { setStatus({ type: 'err', msg: 'These blocklists only cover IPv4 addresses. Enter an IPv4 address, or a domain to check its server.' }); return; }
      if (!d) { setStatus({ type: 'err', msg: 'Enter an IPv4 address such as 203.0.113.7, or a domain name.' }); return; }
      setStatus({ type: 'loading', msg: `Finding the address of ${d}…` });
      const a = await dns(d, 'A').catch(() => null);
      ip = a?.answers.find((x) => x.type === 'A')?.data;
      if (!ip) { setStatus({ type: 'err', msg: `${d} has no IPv4 address.` }); return; }
    }
    const rev = ip.split('.').reverse().join('.');
    setStatus({ type: 'loading', msg: `Checking ${ip} against ${LISTS.length} blocklists…` });
    const results = LISTS.map(([name, zone, url]) => ({ name, zone, url, state: null }));
    setRes({ ip, results: [...results] });
    await Promise.all(results.map(async (r, i) => {
      results[i] = { ...r, state: await check(rev, r.zone) };
      setRes({ ip, results: [...results] });
    }));
    setStatus(null);
  };

  useEffect(() => { myIp().then((m) => isIPv4(m.ip) && run(m.ip)).catch(() => {}); }, []);

  const listed = res?.results.filter((r) => r.state?.listed) || [];
  const done = res && res.results.every((r) => r.state);

  return (
    <Card title="Check an IP against spam blocklists">
      <QueryForm value={q} onChange={setQ} onSubmit={run} placeholder="203.0.113.7 or mail.example.com" label="IPv4 address or domain" busy={status?.type === 'loading'} />
      <Examples items={['8.8.8.8', '127.0.0.2', 'gmail.com']} onPick={run} />
      <Status status={status} />
      {res && (
        <>
          {done && (
            <div className={`mt-4 rounded-xl p-4 border ${listed.length ? 'bg-rose-500/10 border-rose-400/40' : 'bg-emerald-500/10 border-emerald-400/40'}`}>
              <p className="font-semibold text-fg">
                {listed.length
                  ? `${res.ip} is listed on ${listed.length} of ${res.results.length} blocklists.`
                  : `${res.ip} is not listed on any of the ${res.results.length} blocklists checked.`}
              </p>
            </div>
          )}
          <ResultTable
            head={['Blocklist', 'Result', 'Details']}
            rows={res.results.map((r) => [
              <a href={r.url} target="_blank" rel="noopener nofollow" className="text-accent hover:underline">{r.name}</a>,
              !r.state ? <span className="text-fg-subtle text-xs">checking…</span>
                : r.state.error ? <Badge>{r.state.error}</Badge>
                  : r.state.listed ? <Badge ok={false}>Listed</Badge> : <Badge ok>Not listed</Badge>,
              <span className="text-xs text-fg-subtle break-words">{r.state?.listed ? (r.state.reason || `Return code ${r.state.code}`) : r.zone}</span>,
            ])}
          />
        </>
      )}
    </Card>
  );
}
