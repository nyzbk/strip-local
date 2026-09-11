import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { Article } from "@/components/site/Article";
import { FaqSection } from "@/components/site/FaqSection";
import { SoftAgencyCta } from "@/components/ads/SoftAgencyCta";
import { marketplaceFaq } from "@/content/faq";
import { pageHead } from "@/lib/page-head";

const STEPS = [
  {
    name: "Shoot the object. Decide if the room is allowed in the frame",
    text: "Strip will not blur a house number, a unique window, or a neighbor’s plate. Crop or reshoot first if the scene is the leak.",
  },
  {
    name: "Strip the JPEG you will upload",
    text: "Inspect GPS. Fast keeps product detail on typical JPEG. Deep for PNG/WebP or leftover tags. Download a cleaned file.",
  },
  {
    name: "Verify that download",
    text: "Re-drop it. Empty GPS. That file is the only one that should enter the listing, the draft, and the buyer chat.",
  },
  {
    name: "Replace drafts. Do not append the album original “just this angle”",
    text: "Marketplace apps keep drafts. Replace the image in the draft with the cleaned file. Cross-post from Downloads, not Recents.",
  },
  {
    name: "When you message a buyer, attach the same cleaned file",
    text: "Chat is a second pipe. The listing CDN recode is not what you send in DM.",
  },
];

export const Route = createFileRoute("/marketplace")({
  head: () =>
    pageHead(
      "Marketplace Listing CDN Is Not Your Disk File | Strip",
      "The public thumbnail is their recode. Your Camera Roll, drafts and buyer-chat attaches can still carry GPS. House pixels stay. Strip the file you keep and the file you upload.",
      "/marketplace",
      {
        appName: "Marketplace",
        faqs: marketplaceFaq,
        howToName: "Keep GPS off seller files when the listing CDN is already recoded",
        howToSteps: STEPS.map((s) => `${s.name}. ${s.text}`),
      },
    ),
  component: MarketplacePage,
});

function MarketplacePage() {
  return (
    <AppShell>
      <Article
        title="Marketplace: the listing CDN is not your disk"
        lede="A public thumbnail with empty EXIF does not mean the JPEG on your phone is clean. Marketplaces recompress for the listing. Camera Roll, the draft, the extra angle you drop into chat with a buyer — those are other files. Strip those. The house in the picture is still the house."
        updated="Updated 6 September 2026"
      >
        <h2>Two leaks, only one is EXIF</h2>
        <p>
          Sellers mix them up. Leak one: GPSLatitude in the JPEG, enough decimals to name a building. Leak two:
          the pixels — a house number, a unique fence, a reflection of the street, a laptop with mail on the
          screen, a neighbor’s plate. Strip removes leak one from the file you run through this tab. It does not
          touch leak two. If the sofa has to sit in the living room, the living room is in the frame. Fill the
          frame with the object or accept the room.
        </p>
        <p>
          The short “shot in a driveway” story already lives on{" "}
          <Link to="/use-cases">use cases</Link>. This page is the ceiling that page does not own: their CDN copy
          versus your disk, plus pixels that survive any tag scrub.
        </p>
        <h2>What the listing actually stores</h2>
        <p>
          Facebook Marketplace, Craigslist, OLX, Avito, Kolesa, 2GIS and the rest typically ingest your upload,
          recode a few sizes, and serve those. The public “save image” is often their recode. That recode may
          already have no GPS. You look at it, feel safe, and later send the Camera Roll original to a buyer
          “so they see the scratch.” That DM is the pin. Drafts are the pin. Cross-posting from Recents to a
          second site is the pin. Delisting the ad does not delete DCIM.
        </p>
        <p>
          You do not control which path a given app takes this month. Some pass originals longer than others. The
          only file you control is the one you verified in Strip and then picked on purpose.
        </p>
        <h2>Buyer chat is a second marketplace</h2>
        <p>
          The listing is one pipe. The chat with a stranger who wants “one more photo of the serial sticker” is
          another. People strip for the listing and then open Photos. That still has GPS. Use the same Downloads
          file, or strip the new angle before it leaves the device. If the chat app is WhatsApp, the bubble versus
          disk problem is{" "}
          <Link to="/whatsapp">documented separately</Link> — do not send Recents as document.
        </p>
        <h2>Cross-posting does not inherit a clean</h2>
        <p>
          A clean listing on site A is not a mutation of the JPEG. Site B’s uploader will read whatever you pick.
          If you pick Camera Roll, site B gets GPS even if site A’s CDN is clean. Keep a folder of verified stills
          and upload from that folder every time. Replace a draft image; do not append “one extra original.”
        </p>
        <h2>After the listing dies</h2>
        <p>
          You took the ad down. Their cache may still hold a recode for a while. That recode is their problem and
          usually already stripped. Your problem is the original on the phone, the ZIP you emailed yourself “for
          insurance,” and the photo sitting in a sold-items chat. Insurance originals belong in a private folder,
          not in Recents next to the next listing. Strip does not delete those for you.
        </p>
        <h2>Steps</h2>
        <ol>
          <li>Look at the picture as a picture. Crop house numbers and open laptops before you care about tags.</li>
          <li>
            Run the JPEG through the <Link to="/">Strip tool</Link>. Fast on typical product JPEG so fabric and
            scratches stay bit-identical.
          </li>
          <li>Download. Re-drop. Empty GPS. Keep that file in Files / Downloads with a boring name.</li>
          <li>Upload that file to the listing. Replace drafts. Do not grab Recents for “one more angle.”</li>
          <li>When a buyer asks for another still, strip that still too. Chat is not the listing CDN.</li>
          <li>On iPhone, remember the album never updated — <Link to="/iphone">iCloud still has the original</Link>.</li>
        </ol>
        <h2>What this page will not do</h2>
        <p>
          We will not walk through hiding illegal goods, stripping IDs, or “how to stay anonymous while selling.”
          The legitimate job is: the object is the story, the pin is not, and the public thumbnail is not proof
          that your disk is clean. We will not claim a marketplace “always strips EXIF so you can skip this.”
        </p>
        <h2>What looks like a bug and is not</h2>
        <ul>
          <li>Saved listing image has no GPS — their recode. Inspect your disk file.</li>
          <li>Buyer received a pin in chat — you sent Recents. Send the verified download.</li>
          <li>Second site leaked — cross-post from Camera Roll. Use the same Downloads folder.</li>
          <li>House still visible — pixels. Crop. Strip will not invent a blur.</li>
        </ul>
        <h2>Honesty limits</h2>
        <p>
          Strip is not a redaction brush and not a marketplace plugin. Empty GPS on the file you upload and the
          file you DM is the bar. Unique architecture in the background is a shooting problem. MakerNotes we
          cannot parse stay out of the promise. Verify with a re-drop, not with folklore about what the app
          “usually” does.
        </p>
        <p>
          Related: <Link to="/">open the tool</Link>
          {" · "}
          <Link to="/how-to">how-to</Link>
          {" · "}
          <Link to="/use-cases">use cases</Link>
          {" · "}
          <Link to="/iphone">iPhone album vs download</Link>
          {" · "}
          <Link to="/whatsapp">WhatsApp bubble vs disk</Link>
          {" · "}
          <Link to="/faq">FAQ</Link>.
        </p>
      </Article>
      <FaqSection items={marketplaceFaq} />
      <SoftAgencyCta />
    </AppShell>
  );
}
