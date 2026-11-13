import { useEffect, useRef, useState } from "react";
import { useLabSettings } from "./settings";
const viewports = [360, 390, 768, 1024, 1440];
const criteria = [
  "Visual composition",
  "Originality",
  "Professional finish",
  "Brand consistency",
  "Clear communication",
  "Motion choreography",
  "3D quality",
  "Interaction quality",
  "Mobile presentation",
  "Performance",
  "Accessibility",
];
type Review = {
  ratings: Record<string, string>;
  notes: string;
  status: string;
};
const emptyReview: Review = { ratings: {}, notes: "", status: "" };
export default function ResponsiveLab() {
  const settings = useLabSettings();
  const removeFrameListener = useRef<(() => void) | undefined>(undefined);
  useEffect(() => () => removeFrameListener.current?.(), []);
  function followFrame(frame: HTMLIFrameElement) {
    removeFrameListener.current?.();
    const frameWindow = frame.contentWindow;
    if (!frameWindow) return;
    const update = () => {
      const route = frameWindow.location.hash.slice(1);
      if (["heroes", "spatial", "motion", "live", "sections"].includes(route)) {
        setSubject(route);
      }
    };
    frameWindow.addEventListener("hashchange", update);
    removeFrameListener.current = () =>
      frameWindow.removeEventListener("hashchange", update);
    update();
  }
  const [width, setWidth] = useState(390);
  const [subject, setSubject] = useState("heroes");
  const [reviews, setReviews] = useState<Record<string, Review>>({});
  const reviewKey = `${subject}:${width}:${settings.theme}:${settings.reducedMotion}:${settings.forceFallback}`;
  const { ratings, notes, status } = reviews[reviewKey] || emptyReview;
  function updateReview(update: Partial<Review>) {
    setReviews((previous) => ({
      ...previous,
      [reviewKey]: { ...(previous[reviewKey] || emptyReview), ...update },
    }));
  }
  const src = `./?embed=1&theme=${settings.theme}&reduce=${Number(settings.reducedMotion)}&fallback=${Number(settings.forceFallback)}#${subject}`;
  function download() {
    const content = {
      experiment: subject,
      viewport: width,
      settings,
      ratings: Object.fromEntries(
        criteria.map((key) => [key, ratings[key] || "Unreviewed"]),
      ),
      observations: notes,
      recordedAt: new Date().toISOString(),
      evidence:
        "Manual reviewer entries; no automated visual/performance approval.",
    };
    const url = URL.createObjectURL(
      new Blob([JSON.stringify(content, null, 2)], {
        type: "application/json",
      }),
    );
    const link = document.createElement("a");
    link.href = url;
    link.download = `makendless-${subject}-${width}-review.json`;
    link.click();
    URL.revokeObjectURL(url);
    updateReview({ status: "Review exported locally. Nothing was sent." });
  }
  return (
    <section className="responsive-lab">
      <header className="experiment-heading">
        <span className="lab-eyebrow">06 / RESPONSIVE QUALITY LAB</span>
        <h2>Recompose. Test. Compare.</h2>
        <p>
          The frame creates a real CSS viewport at the chosen width. It does not
          emulate a physical phone, GPU, network or assistive technology.
        </p>
      </header>
      <div className="responsive-tools">
        <label>
          Experiment
          <select
            value={subject}
            onChange={(event) => {
              setSubject(event.target.value);
            }}
          >
            <option value="heroes">Hero concepts</option>
            <option value="spatial">Material & light</option>
            <option value="motion">Motion language</option>
            <option value="live">Live components</option>
            <option value="sections">Section compositions</option>
          </select>
        </label>
        <div role="group" aria-label="Preview viewport width">
          {viewports.map((value) => (
            <button
              key={value}
              aria-pressed={width === value}
              onClick={() => setWidth(value)}
            >
              {value}px
            </button>
          ))}
        </div>
      </div>
      <p className="responsive-frame-note">
        {width}px viewport · scroll horizontally inside this area if the frame
        is wider than your screen. Global palette, reduced-motion and fallback
        settings apply inside the frame.
      </p>
      <div
        className="responsive-frame-scroll"
        role="region"
        aria-label="Scrollable responsive preview"
        tabIndex={0}
      >
        <iframe
          title={`${subject} prototype at ${width}px`}
          src={src}
          width={width}
          height={760}
          loading="lazy"
          onLoad={(event) => followFrame(event.currentTarget)}
        />
      </div>
      <section className="lab-scorecard" aria-labelledby="scorecard-title">
        <div>
          <span className="lab-eyebrow">REVIEW, NOT ASSUMPTION</span>
          <h3 id="scorecard-title">An evidence-led scorecard.</h3>
          <p>
            Leave a criterion unreviewed until you have observed it. A score
            below 4 needs a concrete improvement and another review. One
            viewport cannot establish overall mobile quality or field
            performance.
          </p>
          <p>
            Reviews are separate for each experiment, width, palette and test
            setting. Entries stay in this tab; export them to keep a record.
          </p>
        </div>
        <div>
          <div className="scorecard-fields">
            {criteria.map((criterion) => (
              <label key={criterion}>
                {criterion}
                <select
                  value={ratings[criterion] || ""}
                  onChange={(event) =>
                    updateReview({
                      ratings: {
                        ...ratings,
                        [criterion]: event.target.value,
                      },
                      status: "",
                    })
                  }
                >
                  <option value="">Unreviewed</option>
                  <option value="N/A">Not applicable</option>
                  {[1, 2, 3, 4, 5].map((value) => (
                    <option key={value} value={value}>
                      {value} / 5
                    </option>
                  ))}
                </select>
              </label>
            ))}
          </div>
          <label className="review-notes">
            Observed strengths, weaknesses and next fixes
            <textarea
              rows={5}
              value={notes}
              onChange={(event) =>
                updateReview({ notes: event.target.value, status: "" })
              }
              placeholder="Record what you actually saw, the viewport, interaction steps and evidence file names."
            />
          </label>
          <button className="lab-primary" onClick={download}>
            Export review JSON ↗
          </button>
          <p role="status">{status}</p>
        </div>
      </section>
      <div className="responsive-checklist">
        <h3>Before accepting a prototype</h3>
        <ol>
          <li>Check every viewport, keyboard path and touch control.</li>
          <li>Repeat with reduced motion and forced HTML fallback.</li>
          <li>Capture desktop/mobile frames and record reproducible steps.</li>
          <li>Inspect loading, context loss, hidden tabs and route cleanup.</li>
          <li>
            Measure performance on real devices. Refine the weakest three areas.
          </li>
        </ol>
      </div>
    </section>
  );
}
