import ToolPage, { toolMetadata, Section, P, UL, OL, B, A, Code, Table } from '../components/ToolPage.jsx';
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
  { q: 'Can I get only nouns, verbs or adjectives?', a: 'Not yet. The list mixes nouns, verbs and adjectives, and the tool filters only by length and first letter. Most words are nouns or can be read as one, so a list of 10 usually gives several good drawing or charades words.' },
  { q: 'Why do I get fewer words than I asked for?', a: 'Words never repeat within one list, so the list stops when every matching word has been used. Three-letter words are the rarest: only 82 of them are in the list, and only 2 words start with X.' },
  { q: 'Is anything I generate saved or sent anywhere?', a: 'No. The word list downloads once and every pick happens in your browser. Nothing is sent back to our server, so a passphrase made here is known only to you.' },
];

export default function Page() {
  return (
    <ToolPage
      path={path}
      name="Random Word Generator"
      eyebrow="Free Tool · 7,776 common words"
      h1="Random word generator"
      intro="Get between 1 and 100 random English words at once. Pick the word length and first letter, capitalize them, and copy the list. Words are common and easy to spell."
      bold={['1 and 100 random English words']}
      appDescription="Free random word generator that picks 1 to 100 distinct common English words from the EFF long word list with a secure random generator, filtered by length and first letter."
      tool={<Tool />}
      faqs={faqs}
      related={['/password-generator', '/binary-to-text']}
      updated="2026-11-04"
      features={['1 to 100 words at once', 'Word length 3 to 9 letters', 'Filter by first letter', 'No repeats within a list', 'Copy the whole list', 'Secure random choice in the browser']}
    >
      <Section title="What is a random word generator?">
        <P>
          A random word generator picks words by chance from a fixed list, so you get words you would not have thought of yourself. This one draws from 7,776 everyday English words, the <A href="https://www.eff.org/dice">EFF long word list</A>, and gives each word exactly the same chance of being picked. People use it for party games, drawing and writing prompts, classroom warm-ups, naming things and memorable passwords.
        </P>
      </Section>

      <Section title="Ideas for random words">
        <UL items={[
          <><B>Games:</B> Pictionary, charades, Taboo-style guessing and word association.</>,
          <><B>Creative prompts:</B> pick three words and write a story, draw a scene or name a band.</>,
          <><B>Teaching:</B> spelling practice, vocabulary warm-ups and sentence-building exercises.</>,
          <><B>Naming:</B> project code names, Wi-Fi network names or team names.</>,
          <><B>Passphrases:</B> memorable passwords made of several random words.</>,
        ]} />
      </Section>

      <Section title="How many words are there of each length?">
        <P>
          Longer words are far more common in the list than short ones. The counter under the buttons shows how many words match your settings; these are the totals for each length:
        </P>
        <Table head={['Letters', 'Words', 'Examples of use']} rows={[
          ['3', '82', 'Very young readers, quick spelling'],
          ['4', '467', 'Easy Pictionary and charades'],
          ['5', '928', 'Word games, warm-ups'],
          ['6', '1,372', 'Writing prompts'],
          ['7', '1,591', 'Harder guessing games'],
          ['8', '1,779', 'Vocabulary practice'],
          ['9', '1,557', 'Spelling challenges'],
          ['All', '7,776', 'Passphrases'],
        ]} />
        <P>
          First letters are uneven too: S starts 1,087 words and C 751, while Q starts 37, Y 27, Z 22 and X only 2. If a letter and length together match few words, the list comes out shorter than the number you chose, because words never repeat.
        </P>
      </Section>

      <Section title="Random words for games">
        <OL items={[
          <><B>Pictionary:</B> set <B>How many</B> to 1 and the length to 4&ndash;6 letters for words that are easy to draw. Press <B>New words</B> for each turn, and hide the screen from the guessers.</>,
          <><B>Charades:</B> the same settings work; skip any word that is hard to act and press again.</>,
          <><B>Taboo-style guessing:</B> get one word for the team to guess and agree on three &ldquo;banned&rdquo; words before the timer starts.</>,
          <><B>Story chain:</B> generate 5 words; each player adds a sentence that uses the next word.</>,
        ]} />
        <P>Capitalize turns on a capital first letter, which reads better on a projector or a shared screen.</P>
      </Section>

      <Section title="Random words for passphrases">
        <P>
          The EFF list was built for passphrases. 7,776 is 6 &times; 6 &times; 6 &times; 6 &times; 6, so each word can stand for five dice rolls, and each randomly chosen word adds about 12.9 bits of strength. Five words give about 65 bits and six words about 78 bits, enough that guessing them is not practical. Words must be chosen at random, which is what this tool does; a phrase you make up yourself is much weaker.
        </P>
        <P>
          For a ready-made passphrase with separators, a number and a strength rating, use the <A href="/password-generator">password generator</A>. The list is published by the Electronic Frontier Foundation under CC BY 3.0.
        </P>
      </Section>

      <Section title="How the words are picked">
        <P>
          The list downloads to your browser once. Each word is then chosen with <Code>crypto.getRandomValues</Code>, the browser&rsquo;s secure random generator, using a method that gives no word a higher chance than another. Nothing you generate is sent to our server or stored, and the same settings give a fresh list each time you press <B>New words</B>.
        </P>
      </Section>
    </ToolPage>
  );
}
