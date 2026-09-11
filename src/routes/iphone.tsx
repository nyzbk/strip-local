import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { Article } from "@/components/site/Article";
import { FaqSection } from "@/components/site/FaqSection";
import { SoftAgencyCta } from "@/components/ads/SoftAgencyCta";
import { iphoneFaq } from "@/content/faq";
import { pageHead } from "@/lib/page-head";

const STEPS = [
  {
    name: "Export a JPEG, not the HEIC sitting in Photos",
    text: "If Camera Roll is HEIC, duplicate as JPEG or convert first. Strip does not parse HEIC. Conversion often copies GPS into the new JPEG.",
  },
  {
    name: "Open Strip in Safari, not inside a messenger",
    text: "Load the homepage tool. Choose the JPEG from Files. Keep the tab in the foreground.",
  },
  {
    name: "Inspect before you trust the batch",
    text: "Confirm GPS on one outdoor shot. Then add the rest.",
  },
  {
    name: "Strip, then save with Share into Files or Downloads",
    text: "Safari may preview a blob and never write Files. Share → Save to Files. Name it so you can tell it from the album original.",
  },
  {
    name: "Re-drop the saved file onto Strip",
    text: "Empty GPS on that file is the bar. A green moment on the first pass is not enough if you never saved.",
  },
  {
    name: "Attach the saved file. Leave the album original alone until you delete it on purpose",
    text: "Mail, AirDrop, a blog CMS and desktop uploaders will grab Camera Roll if you pick the album. Pick Downloads.",
  },
];

export const Route = createFileRoute("/iphone")({
  head: () =>
    pageHead(
      "iPhone Photos Still Have GPS After You “Clean” Them | Strip",
      "Strip cleans the JPEG you download. iCloud, Camera Roll, Shared Albums and Live Photo video stay dirty. Verify the saved file, then attach that file.",
      "/iphone",
      {
        appName: "iPhone",
        faqs: iphoneFaq,
        howToName: "Clean GPS from an iPhone photo without touching iCloud",
        howToSteps: STEPS.map((s) => `${s.name}. ${s.text}`),
      },
    ),
  component: IphonePage,
});

function IphonePage() {
  return (
    <AppShell>
      <Article
        title="iPhone: Strip cleans the download, not the album"
        lede="The ceiling on iPhone is not Safari’s blob dialog. It is this: Camera Roll, iCloud Photos, Shared Albums and the Live Photo movie are other objects. Strip never reaches them. If you keep sending the album original, the pin is still in the file."
        updated="Updated 6 September 2026"
      >
        <h2>Three copies of the same sunset</h2>
        <p>
          You shoot a still. iOS writes a file in Photos. iCloud Photos (when it is on) holds a cloud copy of that
          same original. A Shared Album or a Family Sharing library may hold a third. Strip does not open any of
          those stores. It reads the bytes you picked in this tab, writes a new file, and offers that new file as a
          download. The album does not update. iCloud does not “sync the strip.” Optimize iPhone Storage can even
          throw the local original away and fetch it again later from iCloud — GPS tags included.
        </p>
        <p>
          People tap Strip, see a preview, and believe the phone is clean. Then they AirDrop from Photos, attach
          from Camera Roll in Mail, or pick the live album in a desktop uploader. Those paths send the original.
          The cleaned object is only the file that landed in Files or Downloads. If that file never landed, you
          still have zero clean copies.
        </p>
        <h2>What this page is not</h2>
        <p>
          This is not a Safari-download troubleshooting note for a compressor, and it is not the field-list of GPS
          tags. For the tag names, read{" "}
          <Link to="/exif-gps">what GPS actually stores</Link>. For numbered buttons on any device, use the{" "}
          <Link to="/how-to">how-to</Link>. For chat recodes, go to{" "}
          <Link to="/whatsapp">WhatsApp</Link>. For listing CDNs, go to{" "}
          <Link to="/marketplace">marketplace</Link>. Here the only job is: iPhone album versus the file you saved.
        </p>
        <h2>Location Services off is not a time machine</h2>
        <p>
          Turning off Location Services for Camera stops new GPS IFDs. It does not walk through last summer’s
          JPEGs. Files already written keep their tags until something rewrites the container. iOS does not strip
          EXIF when you toggle the switch. If you share an old still, inspect it. If GPS is there, strip a copy.
        </p>
        <p>
          “Most Compatible” (JPEG in Camera) only changes the container going forward. It is not a cleaner. A JPEG
          from Camera can still carry GPSLatitude. HEIC is worse for this tool because Strip v1 rejects the
          container — convert, then inspect the JPEG, because conversion often copies the IFD.
        </p>
        <h2>Live Photo is two files</h2>
        <p>
          A Live Photo is a still plus a short .MOV. Strip processes the still you select. It does not open the
          motion file. If you share “as Live Photo,” the movie can travel with whatever the system packed. Share
          the stripped still as a still. Do not assume the movie is mute on location; treat it as out of scope and
          do not send it when the still is the thing you cleaned.
        </p>
        <h2>Files picker versus Photos picker</h2>
        <p>
          On iPhone Safari, Choose files is the reliable control. The Photos picker can hand the tab a still that
          looks right and still be the album original in every other app. After Strip, save into Files with an
          obvious name (`sunset-clean.jpg`). Next time a share sheet asks “which photo,” pick that Files object,
          not the thumbnail in Recents. Recents is the dirty set.
        </p>
        <p>
          AirDrop defaults to the original. Mail photo attach often defaults to the original. Image capture to a
          Mac copies the original. A Windows WhatsApp or a Lightroom publish from a synced folder copies the
          original. The cleaned download is easy to lose in that noise unless you keep it in a folder you actually
          pick from.
        </p>
        <h2>iCloud is a backup of the wrong file</h2>
        <p>
          iCloud Photos is working as designed: it preserves the camera original. That is useful for your map and
          bad for a public post. Strip cannot log into iCloud and rewrite objects. Shared Albums publish what you
          added to the album — if you added the original, the original is what subscribers get. Adding the cleaned
          Files copy is a different add. Replacing is a Photos action. We will not pretend a browser tab can do it.
        </p>
        <h2>Steps that actually change the file you send</h2>
        <ol>
          <li>
            If the shot is HEIC, export JPEG first. Conversion is not a strip. Inspect the JPEG here.
          </li>
          <li>
            Open the <Link to="/">Strip tool</Link> in Safari. Not an in-app browser inside a messenger.
          </li>
          <li>Choose one outdoor JPEG. Confirm the GPS badge. Then batch.</li>
          <li>Run Auto (Fast on typical JPEG, Deep on PNG/WebP). Download.</li>
          <li>
            If Files is empty, Share → Save to Files. Do not screenshot the preview. A screenshot is a new picture
            of a picture; it is not a verified container.
          </li>
          <li>
            Drop the saved file back on Strip. Empty GPS. That file is what you attach, AirDrop, or upload.
          </li>
          <li>
            Leave the album original until you delete it on purpose. Turning off iCloud does not delete the pin
            from a file that already exists.
          </li>
        </ol>
        <h2>What looks like a bug and is not</h2>
        <ul>
          <li>Preview in Safari, nothing in Files — save via Share. Then verify that save.</li>
          <li>iCloud still shows the old still — expected. Cloud copy was never this tab’s job.</li>
          <li>Shared Album still has GPS — you published the original. Add the Files copy instead.</li>
          <li>
            Desktop uploader leaked again — it read Pictures / DCIM, not Downloads. Point it at the verified file.
          </li>
          <li>
            Colors shifted — that is Deep re-encode, not iCloud. Prefer Fast on a print-critical JPEG if Fast
            already cleared tags.
          </li>
        </ul>
        <h2>Honesty limits on iPhone</h2>
        <p>
          Strip does not blur a house, a school gate, or a license plate. It does not wipe MakerNotes we cannot
          parse. It does not edit the Live Photo movie. It does not disable Location Services for you. Empty GPS
          on the file you hold in Files is the success criterion. If you still pick Recents in the next share
          sheet, you undid the work.
        </p>
        <p>
          Related: <Link to="/">open the tool</Link>
          {" · "}
          <Link to="/how-to">how-to</Link>
          {" · "}
          <Link to="/whatsapp">WhatsApp bubble vs disk</Link>
          {" · "}
          <Link to="/marketplace">listing CDN vs disk</Link>
          {" · "}
          <Link to="/faq">FAQ</Link>.
        </p>
      </Article>
      <FaqSection items={iphoneFaq} />
      <SoftAgencyCta />
    </AppShell>
  );
}
