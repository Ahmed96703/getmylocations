import ToolPage, { toolMetadata, Section, P, UL, B, A, Table } from '../components/ToolPage.jsx';
import Tool from './Tool.jsx';

const PATH = '/photo-location';

export const metadata = toolMetadata({
  path: PATH,
  title: 'Photo Location Finder: Where Was This Photo Taken?',
  description:
    'Find where a photo was taken from its GPS data: drop a JPEG or iPhone HEIC photo to see the location on a map, the address, date, camera and direction. Free EXIF viewer; photos never leave your device.',
  keywords: ['photo location finder', 'where was this photo taken', 'find location of a photo', 'photo gps location', 'image location finder', 'exif location viewer', 'photo metadata viewer', 'how to find where a picture was taken', 'gps coordinates from photo', 'iphone photo location'],
});

const faqs = [
  {
    q: 'How do I find where a photo was taken?',
    a: 'Drop the photo, or tap to choose it, and the tool reads the GPS coordinates your phone or camera saved inside the file. It shows the spot on a map with the address, the date and time it was taken, the camera, and often the direction the camera was facing.',
  },
  {
    q: 'Why does my photo have no location?',
    a: 'Either location was turned off for the camera when the photo was taken, or the location was removed later. WhatsApp, Facebook, Instagram, X, Messenger and most other social and messaging apps strip GPS data when a photo is sent or posted, and screenshots never have it. Use the original file from the phone or camera, or from a cloud backup such as iCloud Photos or Google Photos.',
  },
  {
    q: 'Are my photos uploaded anywhere?',
    a: 'No. The file is read inside your browser and never leaves your device. Only when the tool looks up an address does it send the photo\'s coordinates, not the photo, to OpenStreetMap\'s geocoder.',
  },
  {
    q: 'Can it find the location of a photo with no GPS data?',
    a: 'No. Without saved coordinates the location can only be guessed from what is in the picture, such as signs, landmarks or the landscape, which is what a reverse image search does. This tool only reports what the file itself records, so its answers are never guesses.',
  },
  {
    q: 'How do I remove the location from my photos before sharing?',
    a: 'On iPhone, tap Options at the top of the share sheet and turn off Location. On Android, Google Photos lets you remove the estimated or GPS location in a photo\'s details, and many cameras have a setting to stop saving it. On Windows, right-click the file, choose Properties, Details, then "Remove Properties and Personal Information". On a Mac, Preview\'s Inspector can remove the location.',
  },
];

export default function Page() {
  return (
    <ToolPage
      path={PATH}
      name="Photo Location Finder"
      eyebrow="Free Tool · Private, runs in your browser"
      h1="Photo location finder"
      accent="where was this photo taken?"
      intro="Find exactly where a photo was taken. Drop a picture from your phone or camera to read the GPS location saved in it and see the spot on a map, with the address, the date and time, the camera and the direction it was pointing. Works with iPhone HEIC and JPEG files, up to 20 at a time. Your photos never leave your device."
      bold={['where a photo was taken', 'GPS location', 'on a map', 'never leave your device']}
      appDescription="Free photo location finder that reads EXIF GPS data in the browser to show where a photo was taken on a map, with address, date, camera and direction. Photos are not uploaded."
      features={['GPS location of a photo on a map', 'Address of the place', 'Date, time, camera and lens', 'Direction the camera faced', 'HEIC, JPEG, PNG, WebP and RAW files', 'Nothing is uploaded']}
      tool={<Tool />}
      faqs={faqs}
      related={[
        { href: '/street-view', label: 'Street View', desc: 'See the place at street level' },
        { href: '/address-finder', label: 'Address Finder', desc: 'Address from coordinates' },
        { href: '/coordinates-converter', label: 'Coordinates Converter', desc: 'Convert the photo coordinates' },
        { href: '/my-location', label: 'My Location', desc: 'Where you are right now' },
      ]}
    >
      <Section title="How to find where a picture was taken">
        <UL items={[
          <><B>Use the original file.</B> On a phone, choose the photo from your gallery. On a computer, use the file copied from the phone or camera, or downloaded from iCloud Photos or Google Photos as the original.</>,
          <><B>Drop it in the box</B> or tap to choose. Several photos can be checked at once and are numbered on the map.</>,
          <><B>Read the result:</B> coordinates, the nearest address, when it was taken and with which camera. Open Street View to see the place, turned the way the camera was facing when the photo saved a direction.</>,
        ]} />
      </Section>

      <Section title="Which photos keep their location">
        <Table
          head={['Where the photo came from', 'GPS location kept?']}
          rows={[
            ['Original from an iPhone or Android camera, location on', 'Yes'],
            ['iCloud Photos or Google Photos, downloaded as original', 'Usually yes'],
            ['AirDrop, or sent by email as an attachment', 'Usually yes, unless the sender turned location off'],
            ['WhatsApp, Messenger, Instagram, Facebook, X, Snapchat', 'No, removed by the app'],
            ['Screenshots and screen recordings', 'No'],
            ['Images saved from websites', 'Rarely'],
          ]}
        />
      </Section>

      <Section title="What is EXIF data?">
        <P>
          EXIF is a block of information that cameras and phones write inside every photo: the date and time, the camera and lens, settings such as exposure and focal length, and, when location services are allowed, the latitude, longitude and altitude where it was taken. Many phones also save the compass direction. The time is the camera&rsquo;s own clock and carries no time zone, which is why the tool shows it exactly as recorded.
        </P>
        <P>
          The same data that makes this tool work can reveal where you live or where your children go to school. Before posting photos publicly from an app that keeps metadata, or sending originals by email, check the location with this tool, and remove it if needed. To see where you are now instead, use <A href="/my-location">My Location</A>.
        </P>
      </Section>
    </ToolPage>
  );
}
