// The network, web and text tools, in one list used by the header menu, the
// home page, related-tool links and the sitemap check. Location tools stay in
// SiteHeader.jsx and app/page.jsx.
export const NET_GROUPS = [
  { id: 'ip', label: 'IP tools', icon: '🌐', blurb: 'Who owns an address, and is it trusted?' },
  { id: 'dns', label: 'DNS & email tools', icon: '✉️', blurb: 'Records, mail servers and spoofing checks' },
  { id: 'web', label: 'Website & SEO tools', icon: '🔍', blurb: 'What a site runs on and how it shares' },
  { id: 'util', label: 'Everyday tools', icon: '🧰', blurb: 'Quick generators and converters' },
];

export const NET_TOOLS = [
  { group: 'ip', href: '/ip-whois-lookup', label: 'IP WHOIS Lookup', desc: 'Who owns an IP address' },
  { group: 'ip', href: '/asn-lookup', label: 'ASN WHOIS Lookup', desc: 'Owner of an autonomous system' },
  { group: 'ip', href: '/ipv4-to-ipv6', label: 'IPv4 to IPv6', desc: 'Convert an IPv4 address to IPv6' },
  { group: 'ip', href: '/ip-blacklist-checker', label: 'IP Blacklist Checker', desc: 'Is an IP on spam blocklists?' },
  { group: 'ip', href: '/mac-address-lookup', label: 'MAC Address Lookup', desc: 'Device maker from a MAC address' },
  { group: 'dns', href: '/dns-lookup', label: 'DNS Lookup', desc: 'A, AAAA, CNAME, TXT and more' },
  { group: 'dns', href: '/mx-lookup', label: 'MX Lookup', desc: 'Mail servers for a domain' },
  { group: 'dns', href: '/ns-lookup', label: 'NS Lookup', desc: 'Name servers for a domain' },
  { group: 'dns', href: '/dmarc-checker', label: 'DMARC Checker', desc: 'Check a domain’s DMARC and SPF' },
  { group: 'dns', href: '/email-validator', label: 'Email Validator', desc: 'Check an address can receive mail' },
  { group: 'dns', href: '/email-header-analyzer', label: 'Email Header Analyzer', desc: 'Trace where an email came from' },
  { group: 'web', href: '/domain-age-checker', label: 'Domain Age Checker', desc: 'When a domain was registered' },
  { group: 'web', href: '/ssl-certificate-checker', label: 'SSL Certificate Checker', desc: 'Certificates and fingerprints' },
  { group: 'web', href: '/website-server-checker', label: 'Website Server Checker', desc: 'Server software and headers' },
  { group: 'web', href: '/view-page-source', label: 'View Page Source', desc: 'HTML source of any page' },
  { group: 'web', href: '/open-graph-checker', label: 'Open Graph Checker', desc: 'Preview a link’s share card' },
  { group: 'web', href: '/link-analyzer', label: 'Website Link Analyzer', desc: 'All links on a page' },
  { group: 'web', href: '/multiple-url-opener', label: 'Multiple URL Opener', desc: 'Open many links at once' },
  { group: 'util', href: '/internet-speed-test', label: 'Internet Speed Test', desc: 'Download, upload and ping' },
  { group: 'util', href: '/password-generator', label: 'Password Generator', desc: 'Strong passwords and passphrases' },
  { group: 'util', href: '/md5-generator', label: 'MD5 & SHA Hash Generator', desc: 'MD5, SHA-1 and SHA-256 hashes' },
  { group: 'util', href: '/random-word-generator', label: 'Random Word Generator', desc: 'Random English words' },
  { group: 'util', href: '/binary-to-text', label: 'Binary to Text', desc: 'Binary, text, hex and decimal' },
  { group: 'util', href: '/bytes-bits-converter', label: 'Bytes & Bits Converter', desc: 'KB, MB, GB, Mbps and more' },
];
