// Shared by the tool and the page, so the page's tables match what the tool checks.

// Well-known throwaway inbox services (a short list of the most used ones).
export const DISPOSABLE = new Set(['mailinator.com', 'guerrillamail.com', 'guerrillamail.net', 'sharklasers.com', '10minutemail.com', '10minutemail.net', 'temp-mail.org', 'tempmail.com', 'tempmail.net', 'yopmail.com', 'yopmail.net', 'getnada.com', 'nada.email', 'trashmail.com', 'trashmail.de', 'dispostable.com', 'maildrop.cc', 'mintemail.com', 'throwawaymail.com', 'fakeinbox.com', 'mailnesia.com', 'mohmal.com', 'emailondeck.com', 'tempail.com', 'moakt.com', 'spamgourmet.com', 'mytemp.email', 'tempmailo.com', 'burnermail.io', 'inboxkitten.com', 'mailcatch.com', 'mail.tm', 'tmpmail.org', 'emailfake.com', 'temp-mail.io', 'luxusmail.org', 'getairmail.com', 'discard.email', 'spambox.us', 'anonaddy.me']);
export const ROLES = new Set(['admin', 'administrator', 'info', 'contact', 'support', 'sales', 'help', 'office', 'billing', 'webmaster', 'postmaster', 'hostmaster', 'abuse', 'noreply', 'no-reply', 'marketing', 'team', 'hello', 'jobs', 'careers', 'hr']);
export const FREE = new Set(['gmail.com', 'googlemail.com', 'yahoo.com', 'outlook.com', 'hotmail.com', 'live.com', 'msn.com', 'icloud.com', 'me.com', 'aol.com', 'proton.me', 'protonmail.com', 'gmx.com', 'gmx.de', 'mail.com', 'yandex.com', 'zoho.com', 'web.de', 'yahoo.co.uk', 'hotmail.co.uk']);
// Common typing slips of big providers.
export const TYPOS = { 'gmial.com': 'gmail.com', 'gmai.com': 'gmail.com', 'gamil.com': 'gmail.com', 'gmail.co': 'gmail.com', 'gmail.con': 'gmail.com', 'gnail.com': 'gmail.com', 'hotmial.com': 'hotmail.com', 'hotmal.com': 'hotmail.com', 'hotmail.co': 'hotmail.com', 'yahooo.com': 'yahoo.com', 'yaho.com': 'yahoo.com', 'yahoo.co': 'yahoo.com', 'outlok.com': 'outlook.com', 'outloo.com': 'outlook.com', 'iclod.com': 'icloud.com', 'icloud.co': 'icloud.com' };

// Syntax check for everyday addresses (RFC 5321/5322 dot-atom form).
export function syntax(email) {
  if (email.length > 254) return 'The address is longer than the 254-character limit.';
  const at = email.lastIndexOf('@');
  if (at < 1) return 'An email address needs a name, then @, then a domain.';
  const local = email.slice(0, at);
  const domain = email.slice(at + 1);
  if (local.length > 64) return 'The part before @ is longer than 64 characters.';
  if (!/^[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+(\.[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+)*$/.test(local)) return 'The part before @ has a character that is not allowed, or a dot at the start, end or twice in a row.';
  if (!/^([A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?\.)+[A-Za-z]{2,63}$/.test(domain)) return 'The domain part does not look like a valid domain name.';
  return null;
}
