import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { Article } from "@/components/site/Article";
import { FaqSection } from "@/components/site/FaqSection";
import { SoftAgencyCta } from "@/components/ads/SoftAgencyCta";
import { whatsappFaq } from "@/content/faq";
import { pageHead } from "@/lib/page-head";

const STEPS = [
  {
    name: "Treat the bubble, the disk file, and “document” as three objects",
    text: "The preview in chat is WhatsApp’s recode. Photos still holds the original. Send as document can attach the original bytes.",
  },
  {
    name: "Strip a JPEG in this tab first",
    text: "Convert HEIC if needed. Inspect GPS. Fast or Deep. Download a cleaned file into Files.",
  },
  {
    name: "Verify the saved file",
    text: "Re-drop it on Strip. Empty GPS. That is the only file you should point WhatsApp at.",
  },
  {
    name: "Pick that Files object in WhatsApp",
    text: "Do not tap Recents. Recents is Camera Roll. Document send is only safe if the bytes you picked are already stripped.",
  },
  {
    name: "Do not reuse the album original on desktop WhatsApp",
    text: "Windows and macOS often send Pictures / DCIM verbatim. Point the attach dialog at Downloads.",
  },
];

export const Route = createFileRoute("/whatsapp")({
  head: () =>
    pageHead(
      "WhatsApp Chat Bubble Is Not a Clean Photo File | Strip",
      "The bubble is WhatsApp’s recode. The JPEG on disk is still the camera original. Send as document ships those bytes. Strip the download, then pick that file.",
      "/whatsapp",
      {
        appName: "WhatsApp",
        faqs: whatsappFaq,
        howToName: "Stop sending GPS through WhatsApp originals",
        howToSteps: STEPS.map((s) => `${s.name}. ${s.text}`),
      },
    ),
  component: WhatsAppPage,
});

function WhatsAppPage() {
  return (
    <AppShell>
      <Article
        title="WhatsApp: the bubble is not the file on disk"
        lede="Three different objects get called “the photo.” The chat bubble is WhatsApp’s recode. The JPEG in Photos is still the camera file. “Send as document” can ship those original bytes. Strip can clean a copy you download. It cannot edit the thread, and it cannot edit Camera Roll."
        updated="Updated 6 September 2026"
      >
        <h2>Why “WhatsApp already stripped it” is the wrong sentence</h2>
        <p>
          Recipients often get a recompressed still. WhatsApp may drop EXIF on that recode. That is their CDN and
          their encoder, this month, for that send type. It is not a rewrite of your album. The next time you
          forward from Photos, attach the same still to Mail, post it to a marketplace, or open WhatsApp Desktop
          on a folder of originals, the GPS IFD is still there.
        </p>
        <p>
          Status, View once, disappearing messages, and starred messages are delivery modes. They do not walk
          through DCIM and empty GPSLatitude. A “they only saw it once” send still left the original on your
          device and, depending on backup, in a cloud copy you do not think about.
        </p>
        <h2>Photo send versus document send</h2>
        <p>
          <strong>Send as photo.</strong> WhatsApp recodes. Quality drops. Their copy to the other phone is usually
          a new JPEG. Tags on that copy often die because the encoder never copied them. Your Camera Roll is
          untouched. If you later export “original” from Photos, you export the dirty file.
        </p>
        <p>
          <strong>Send as document.</strong> You are closer to attaching the bytes you picked. That is useful when
          you want the other person to receive the stripped download without a second recode. It is dangerous when
          you pick Recents: document send will happily ship GPS. Document is not a cleaner. Document is a pipe.
          Put a verified file in the pipe.
        </p>
        <p>
          HD / quality toggles inside WhatsApp change their recode. They do not strip the album. Do not turn HD on
          “for privacy.” Privacy here is which file you pointed at.
        </p>
        <h2>WhatsApp Desktop is the leaky path</h2>
        <p>
          On a phone, a photo send at least recodes. On desktop, the attach dialog often reads a file from
          Pictures, iCloud Drive, or a synced DCIM folder and sends those bytes. Journalists, sellers, and family
          admins do this when they “just grab it from the computer.” If that computer has the camera original,
          WhatsApp Desktop will send the camera original. Point it at the Downloads file you verified in{" "}
          <Link to="/">this tab</Link>.
        </p>
        <h2>What this page will not talk about</h2>
        <p>
          This is not how to fit a JPEG under a mail cap, and it is not Safari’s blob share sheet. Those are other
          tools’ ceilings. This page is only: bubble ≠ disk ≠ document. For iCloud versus the download, use{" "}
          <Link to="/iphone">iPhone</Link>. For a listing thumbnail versus the seller’s disk, use{" "}
          <Link to="/marketplace">marketplace</Link>. For the GPS field names, use{" "}
          <Link to="/exif-gps">EXIF / GPS</Link>.
        </p>
        <h2>A sequence that matches how the apps actually work</h2>
        <ol>
          <li>
            If the still is HEIC, export JPEG first. Inspect the JPEG — conversion copies tags.
          </li>
          <li>
            Strip in Safari or desktop Chromium with the tab in the foreground. Airplane mode is fine after load.
          </li>
          <li>
            Save into Files with a name you will recognize. Re-drop it. Empty GPS.
          </li>
          <li>
            In WhatsApp, attach from Files (or document from that folder). Skip Recents.
          </li>
          <li>
            If you need the other person to receive your cleaned pixels without another recode, send as document
            — of the stripped file only.
          </li>
          <li>
            If you already sent the album original as document, you cannot unsay it. Clean the next file. Delete
            the original from Photos if you do not want it on the next attach.
          </li>
        </ol>
        <h2>Backups and “I already deleted the chat”</h2>
        <p>
          Deleting a thread does not delete Camera Roll. A WhatsApp backup is not Strip. Google Drive / iCloud
          chat backups are out of this tool’s scope; we do not open them. The file you care about is the JPEG you
          still have in Photos. Inspect that. If GPS remains, strip a copy before the next send, then consider
          deleting the original in Photos yourself.
        </p>
        <h2>What looks like a bug and is not</h2>
        <ul>
          <li>Recipient says the photo looks soft — their recode. Not Strip Fast (Fast does not recompress JPEG).</li>
          <li>Recipient has no GPS, you still do — expected. Two files.</li>
          <li>Forward from the thread looks clean, forward from Photos is not — you forwarded two different objects.</li>
          <li>Desktop attach leaked — it read Pictures. Point at Downloads.</li>
        </ul>
        <h2>Honesty limits</h2>
        <p>
          Strip does not patch WhatsApp. It does not disable their encoder. It does not reach Media/WhatsApp/Images
          on Android or the iOS app sandbox. Empty GPS on the file you hold, then a share sheet that points at that
          file, is the whole job. If the picture shows a street, the street is still in the pixels. Crop is a
          different decision.
        </p>
        <p>
          Related: <Link to="/">open the tool</Link>
          {" · "}
          <Link to="/how-to">how-to</Link>
          {" · "}
          <Link to="/iphone">iPhone album vs download</Link>
          {" · "}
          <Link to="/marketplace">marketplace CDN vs disk</Link>
          {" · "}
          <Link to="/faq">FAQ</Link>.
        </p>
      </Article>
      <FaqSection items={whatsappFaq} />
      <SoftAgencyCta />
    </AppShell>
  );
}
