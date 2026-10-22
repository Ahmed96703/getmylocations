import ToolPage, { toolMetadata, Section, P, UL, B, A } from '../components/ToolPage.jsx';
import Tool from './Tool.jsx';

const path = '/random-word-generator';
export const metadata = toolMetadata({
  path,
  title: 'Random Word Generator: 1 to 100 Random English Words',
  description: 'Generate random English words for games, drawing prompts, writing, names and passphrases. Choose how many, word length and first letter. Free and instant.',
  keywords: ['random word generator', 'random words', 'random english words', 'word generator', 'pictionary word generator', 'random noun generator'],
});

const faqs = [
  { q: 'Where do the words come from?', a: 'From the EFF long word list: 7,776 common, easy-to-spell English words chosen by the Electronic Frontier Foundation, published under CC BY 3.0. Obscure and offensive words were left out of it.' },
  { q: 'Are the words truly random?', a: 'Yes. Each word is picked with your browser’s cryptographically secure random generator, with equal odds for every word, and no word repeats within one list.' },
  { q: 'Can I use these words for a passphrase?', a: 'Yes, five or six random words make a strong, memorable passphrase. The password generator has a passphrase mode that also shows how strong it is.' },
];

export default function Page() {
  return (
    <ToolPage
      path={path}
      name="Random Word Generator"
      eyebrow="Free Tool · 7,776 common words"
      h1="Random word generator"
      intro="Get between 1 and 100 random English words at once. Pick the word length and first letter, capitalize them, and copy the list. Words are common and easy to spell."
      appDescription="Free random word generator that picks 1 to 100 distinct common English words from the EFF long word list with a secure random generator, filtered by length and first letter."
      tool={<Tool />}
      faqs={faqs}
      related={['/password-generator', '/binary-to-text']}
    >
      <Section title="Ideas for random words">
        <UL items={[
          <><B>Games:</B> Pictionary, charades, Taboo-style guessing and word association.</>,
          <><B>Creative prompts:</B> pick three words and write a story, draw a scene or name a band.</>,
          <><B>Teaching:</B> spelling practice, vocabulary warm-ups and sentence-building exercises.</>,
          <><B>Naming:</B> project code names, Wi-Fi network names or team names.</>,
          <><B>Passphrases:</B> memorable passwords made of several random words.</>,
        ]} />
        <P>
          The list is the EFF long word list (Electronic Frontier Foundation, CC BY 3.0). For a full passphrase with a strength rating, use the <A href="/password-generator">password generator</A>.
        </P>
      </Section>
    </ToolPage>
  );
}
