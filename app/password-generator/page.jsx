import ToolPage, { toolMetadata, Section, P, UL, B, A, Table } from '../components/ToolPage.jsx';
import Tool from './Tool.jsx';

const path = '/password-generator';
export const metadata = toolMetadata({
  path,
  title: 'Password Generator: Free Strong & Random Password Maker',
  description: 'Generate a strong random password in one click: 8, 12, 15, 16 or up to 64 characters, or an easy passphrase. Made on your device, never sent or stored. Free.',
  keywords: [
    'password generator', 'random password generator', 'generate password', 'strong password generator',
    'password generator 15 characters', 'password generator free', 'suggest password', 'secure password generator',
    'password maker', 'password creator', 'random password', 'strong password', '12 character password generator',
    '16 character password generator', 'password generator with symbols', 'passphrase generator',
    'memorable password generator', 'pin generator', 'wifi password generator', 'create a strong password',
  ],
});

const faqs = [
  { q: 'Is it safe to use an online password generator?', a: 'This one creates passwords inside your browser with its cryptographically secure random generator. Nothing is sent to a server or saved, so no one else ever sees them. You can even disconnect from the internet before pressing New.' },
  { q: 'How do I generate a 15-character password?', a: 'Press 15 under Quick length, or drag the slider to 15. With uppercase, lowercase, numbers and symbols turned on, a 15-character password has about 97 bits of entropy, far beyond what any attacker can guess.' },
  { q: 'Is this password generator free?', a: 'Yes. It is free with no signup and no limit: press New as often as you like and copy any of the suggestions.' },
  { q: 'Can it suggest a password for me?', a: 'Yes. As soon as the page opens it suggests five strong random passwords. Pick one, copy it, or press New for five more. It works for any site or device, including Wi-Fi routers and apps where your browser does not offer its own suggestion.' },
  { q: 'How long should a password be?', a: 'At least 12 characters for everyday accounts, 16 or more for email, banking and your password manager. Length adds more strength than symbols do.' },
  { q: 'Password or passphrase?', a: 'A passphrase of five random words, like Fable-Orbit-Mango-Cider-Tulip-42, is as strong as a 10-character random password and far easier to type and remember. Use passphrases for things you type by hand, random passwords for everything stored in a password manager.' },
  { q: 'What does “bits of entropy” mean?', a: 'It measures how many guesses an attacker would need: each extra bit doubles them. 60 bits is strong for online accounts; 80 or more is very strong even against offline attacks on stolen password databases.' },
];

export default function Page() {
  return (
    <ToolPage
      path={path}
      name="Password Generator"
      eyebrow="Free Password Generator · Made on your device"
      h1="Generate Password"
      intro="Generate a strong random password of any length, from 8 to 64 characters, or a passphrase of random words that is easier to type. A meter shows how strong each one is. This free password generator works on your device, and nothing is ever sent anywhere."
      bold={['strong random password', 'passphrase', 'free password generator']}
      appDescription="Free client-side random password generator and passphrase generator using the Web Crypto secure random generator with unbiased selection, with quick length presets (8, 12, 15, 16, 20, 32), character options including symbols, look-alike removal, EFF word-list passphrases, entropy and crack-time estimates."
      tool={<Tool />}
      faqs={faqs}
      related={['/md5-generator', '/random-word-generator', '/email-validator', '/ip-blacklist-checker']}
    >
      <Section title="How to generate a strong password">
        <UL items={[
          <><B>Pick a length.</B> Tap a quick length such as 12, 15 or 16, or drag the slider anywhere from 6 to 64.</>,
          <><B>Choose the characters:</B> uppercase, lowercase, numbers and symbols. Turn on “Avoid look-alikes” if you will read the password aloud or type it from paper.</>,
          <><B>Copy the suggested password,</B> or press New for five fresh suggestions.</>,
          <><B>Save it in a password manager</B> straight away, so you never need to remember it.</>,
        ]} />
        <P>
          Every <B>random password</B> comes from your browser’s cryptographically secure random number generator, the same source used for encryption keys, and each character is chosen without bias. That makes this a true <B>random password generator</B> and a <B>secure password generator</B>, not just a “random-looking” one.
        </P>
      </Section>

      <Section title="How strong is strong enough?">
        <Table head={['Password', 'Entropy', 'Offline guessing time*']} rows={[
          ['8 characters, all types', '≈ 51 bits', 'about 5 hours'],
          ['12 characters, all types', '≈ 77 bits', 'about 300 centuries'],
          ['15 characters, all types', '≈ 97 bits', 'longer than the age of the universe'],
          ['16 characters, all types', '≈ 103 bits', 'longer than the age of the universe'],
          ['4 random words', '≈ 52 bits', 'about 5 hours'],
          ['6 random words', '≈ 78 bits', 'about 350 centuries'],
        ]} />
        <P>* At 100 billion guesses a second against a fast hash. Online logins allow far fewer guesses, but databases leak, so plan for the offline case.</P>
      </Section>

      <Section title="Which password length should you use?">
        <Table head={['Length', 'Good for']} rows={[
          ['8 characters', 'Only where a site forces a short maximum. Add every character type.'],
          ['12 characters', 'Everyday accounts: shopping, forums, streaming'],
          ['15 characters', 'A strong default, and the minimum many workplaces now require'],
          ['16 characters', 'Email, banking, social media, cloud storage'],
          ['20–32 characters', 'Password manager vaults, Wi-Fi networks, admin and server accounts'],
        ]} />
        <P>
          Set this <B>strong password generator</B> to <B>15 characters</B> with all four character types and you have a sensible choice for almost any account. For a <B>Wi-Fi password</B>, 20 or more characters with “Avoid look-alikes” on keeps it strong and still easy to type on a TV or games console.
        </P>
      </Section>

      <Section title="Random password or memorable passphrase?">
        <P>
          Switch to <B>Passphrase</B> for a <B>memorable password</B> made of random words, such as a phrase for your computer login or password manager. Five or six words beat a short random password and are much easier to type. For everything saved in a password manager, a long <B>strong password</B> of random characters is best.
        </P>
        <P>
          Need a numeric <B>PIN</B>? Turn off everything except Numbers and set the length to 6 or more.
        </P>
      </Section>

      <Section title="Good password habits">
        <UL items={[
          <><B>Never reuse a password.</B> One leaked site then unlocks every other account with the same one.</>,
          <><B>Use a password manager</B> to store a different random password for each site.</>,
          <><B>Turn on two-factor authentication</B> for email, banking and social accounts.</>,
          <><B>Change a password</B> when a service reports a breach, not on a fixed schedule.</>,
          <><B>Don’t build passwords from personal details</B> like names, birthdays or pets. A password maker with real randomness is far harder to guess.</>,
        ]} />
        <P>The passphrase words come from the EFF long word list (7,776 words, CC BY 3.0, Electronic Frontier Foundation). To create checksums of text instead, use the <A href="/md5-generator">hash generator</A>.</P>
      </Section>
    </ToolPage>
  );
}
