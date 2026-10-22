import ToolPage, { toolMetadata, Section, P, UL, B, A, Table } from '../components/ToolPage.jsx';
import Tool from './Tool.jsx';

const path = '/password-generator';
export const metadata = toolMetadata({
  path,
  title: 'Password Generator: Strong Random Passwords & Passphrases',
  description: 'Create strong random passwords or easy-to-type passphrases, with a strength meter and crack-time estimate. Made on your device, never sent or stored. Free.',
  keywords: ['password generator', 'strong password generator', 'random password generator', 'passphrase generator', 'secure password', 'generate password'],
});

const faqs = [
  { q: 'Is it safe to use an online password generator?', a: 'This one creates passwords inside your browser with its cryptographically secure random generator. Nothing is sent to a server or saved, so no one else ever sees them. You can even disconnect from the internet before pressing New.' },
  { q: 'How long should a password be?', a: 'At least 12 characters for everyday accounts, 16 or more for email, banking and your password manager. Length adds more strength than symbols do.' },
  { q: 'Password or passphrase?', a: 'A passphrase of five random words, like Fable-Orbit-Mango-Cider-Tulip-42, is as strong as a 10-character random password and far easier to type and remember. Use passphrases for things you type by hand, random passwords for everything stored in a password manager.' },
  { q: 'What does “bits of entropy” mean?', a: 'It measures how many guesses an attacker would need: each extra bit doubles them. 60 bits is strong for online accounts; 80 or more is very strong even against offline attacks on stolen password databases.' },
];

export default function Page() {
  return (
    <ToolPage
      path={path}
      name="Password Generator"
      eyebrow="Free Tool · Generated on your device"
      h1="Password generator"
      accent="strong, random and private"
      intro="Create strong random passwords of any length, or passphrases made of random words that are easier to type. A meter shows how strong each one is. Everything is generated on your device and never sent anywhere."
      bold={['strong random passwords', 'passphrases']}
      appDescription="Free client-side password and passphrase generator using the Web Crypto secure random generator with unbiased selection, with length and character options, look-alike removal, EFF word-list passphrases, entropy and crack-time estimates."
      tool={<Tool />}
      faqs={faqs}
      related={['/md5-generator', '/random-word-generator']}
    >
      <Section title="How strong is strong enough?">
        <Table head={['Password', 'Entropy', 'Offline guessing time*']} rows={[
          ['8 characters, all types', '≈ 51 bits', 'about 5 hours'],
          ['12 characters, all types', '≈ 77 bits', 'about 300 centuries'],
          ['16 characters, all types', '≈ 103 bits', 'longer than the age of the universe'],
          ['4 random words', '≈ 52 bits', 'about 5 hours'],
          ['6 random words', '≈ 78 bits', 'about 350 centuries'],
        ]} />
        <P>* At 100 billion guesses a second against a fast hash. Online logins allow far fewer guesses, but databases leak, so plan for the offline case.</P>
      </Section>

      <Section title="Good password habits">
        <UL items={[
          <><B>Never reuse a password.</B> One leaked site then unlocks every other account with the same one.</>,
          <><B>Use a password manager</B> to store a different random password for each site.</>,
          <><B>Turn on two-factor authentication</B> for email, banking and social accounts.</>,
          <><B>Change a password</B> when a service reports a breach, not on a fixed schedule.</>,
        ]} />
        <P>The passphrase words come from the EFF long word list (7,776 words, CC BY 3.0, Electronic Frontier Foundation). To create checksums of text instead, use the <A href="/md5-generator">hash generator</A>.</P>
      </Section>
    </ToolPage>
  );
}
